import { getAllSeries, getAllProducts } from "../lib/strapi";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const [seriesList, products] = await Promise.all([
    getAllSeries(),
    getAllProducts(),
  ]);

  const pages = [
    { url: base, lastModified: new Date() },
    { url: `${base}/archive`, lastModified: new Date() },
  ];

  for (const s of seriesList) {
    pages.push({ url: `${base}/archive/${s.slug}`, lastModified: new Date() });
    for (const c of s.chapters) {
      pages.push({
        url: `${base}/archive/${s.slug}/${c.slug}`,
        lastModified: new Date(),
      });
    }
  }

  for (const p of products) {
    pages.push({ url: `${base}/product/${p.slug}`, lastModified: new Date() });
  }

  return pages;
}