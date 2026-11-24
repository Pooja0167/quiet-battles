import fs from "node:fs/promises";
import path from "node:path";
import {
  getAllSeries,
  getChapter,
  getProduct,
} from "../../../lib/strapi";

export const dynamic = "force-dynamic";

const BASE = process.env.STRAPI_URL || "http://localhost:1337";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not available", { status: 404 });
  }

  const outDir = path.join(process.cwd(), "public", "snapshot-images");
  await fs.mkdir(outDir, { recursive: true });
  const downloaded = new Map();

  async function localize(url) {
    if (typeof url !== "string" || !url.startsWith(`${BASE}/uploads/`)) {
      return url;
    }
    if (downloaded.has(url)) return downloaded.get(url);
    const name = path.basename(new URL(url).pathname);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Image download failed: ${url}`);
    await fs.writeFile(
      path.join(outDir, name),
      Buffer.from(await res.arrayBuffer())
    );
    const local = `/snapshot-images/${name}`;
    downloaded.set(url, local);
    return local;
  }

  async function walk(value) {
    if (typeof value === "string") return localize(value);
    if (Array.isArray(value)) return Promise.all(value.map(walk));
    if (value && typeof value === "object") {
      const entries = await Promise.all(
        Object.entries(value).map(async ([k, v]) => [k, await walk(v)])
      );
      return Object.fromEntries(entries);
    }
    return value;
  }

  const seriesList = await getAllSeries();
  const productSlugs = new Set();
  const series = [];

  for (const s of seriesList) {
    const chapters = [];
    for (const c of s.chapters) {
      const detail = await getChapter(s.slug, c.slug);
      if (detail) {
        chapters.push(detail.chapter);
        if (detail.chapter.productSlug) {
          productSlugs.add(detail.chapter.productSlug);
        }
      }
    }
    series.push({ ...s, chapters });
  }

  const products = [];
  for (const slug of productSlugs) {
    const p = await getProduct(slug);
    if (p) products.push(p);
  }

  const snapshot = await walk({ series, products });
  await fs.writeFile(
    path.join(process.cwd(), "src", "data", "snapshot.json"),
    JSON.stringify(snapshot, null, 2)
  );

  return Response.json({
    ok: true,
    series: snapshot.series.length,
    chapters: snapshot.series.reduce((n, s) => n + s.chapters.length, 0),
    products: snapshot.products.length,
    images: downloaded.size,
  });
}