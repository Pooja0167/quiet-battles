import snapshot from "../data/snapshot.json";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const USE_SNAPSHOT = process.env.USE_SNAPSHOT === "1";

function mediaUrl(media) {
  if (!media) return null;
  const file =
    (media.formats && (media.formats.large || media.formats.medium)) || media;
  if (!file.url) return null;
  return file.url.startsWith("http") ? file.url : `${STRAPI_URL}${file.url}`;
}

async function fetchStrapi(path) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${path}`);
  }
  const json = await res.json();
  return json.data;
}

function mapSeries(s) {
  return {
    slug: s.slug,
    number: s.number,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    chapters: [],
  };
}

function mapChapter(c) {
  return {
    slug: c.slug,
    number: c.number,
    title: c.title,
    summary: c.summary,
    quote: c.quote || null,
    mainImage: mediaUrl(c.mainImage),
    story: c.story
      ? c.story
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
      : null,
    highlights:
      c.highlights && c.highlights.length
        ? c.highlights
            .map((h) => ({
              label: h.label,
              text: h.text,
              image: mediaUrl(h.image),
            }))
            .filter((h) => h.image)
        : null,
    productSlug: c.product ? c.product.slug : null,
  };
}

function mapProduct(p) {
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    sizes: p.sizes || [],
    images: (p.images || []).map(mediaUrl).filter(Boolean),
    description: p.description,
  };
}

export async function getAllSeries() {
  if (USE_SNAPSHOT) return snapshot.series;

  const [seriesData, chapterData] = await Promise.all([
    fetchStrapi("/all-series"),
    fetchStrapi(
      "/chapters?populate[series][fields][0]=slug&sort=number:asc&pagination[pageSize]=100"
    ),
  ]);

  return seriesData.map((s) => ({
    ...mapSeries(s),
    chapters: chapterData
      .filter((c) => c.series && c.series.slug === s.slug)
      .map(mapChapter),
  }));
}

export async function getSeries(slug) {
  if (USE_SNAPSHOT) {
    return snapshot.series.find((s) => s.slug === slug) || null;
  }

  const seriesData = await fetchStrapi(
    `/all-series?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  if (!seriesData || seriesData.length === 0) return null;

  const chapterData = await fetchStrapi(
    `/chapters?filters[series][slug][$eq]=${encodeURIComponent(
      slug
    )}&sort=number:asc&pagination[pageSize]=100`
  );

  return { ...mapSeries(seriesData[0]), chapters: chapterData.map(mapChapter) };
}

export async function getChapter(seriesSlug, chapterSlug) {
  if (USE_SNAPSHOT) {
    const series = snapshot.series.find((s) => s.slug === seriesSlug);
    if (!series) return null;
    const index = series.chapters.findIndex((c) => c.slug === chapterSlug);
    if (index === -1) return null;
    return { series, chapter: series.chapters[index], index };
  }

  const series = await getSeries(seriesSlug);
  if (!series) return null;

  const detail = await fetchStrapi(
    `/chapters?filters[slug][$eq]=${encodeURIComponent(
      chapterSlug
    )}&filters[series][slug][$eq]=${encodeURIComponent(
      seriesSlug
    )}&populate[0]=mainImage&populate[1]=product&populate[2]=highlights.image`
  );
  if (!detail || detail.length === 0) return null;

  const index = series.chapters.findIndex((c) => c.slug === chapterSlug);
  return { series, chapter: mapChapter(detail[0]), index };
}

export async function getProduct(slug) {
  if (USE_SNAPSHOT) {
    return snapshot.products.find((p) => p.slug === slug) || null;
  }

  const data = await fetchStrapi(
    `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=images`
  );
  if (!data || data.length === 0) return null;
  return mapProduct(data[0]);
}

export async function getAllProducts() {
  if (USE_SNAPSHOT) return snapshot.products;

  const data = await fetchStrapi(
    "/products?populate=images&pagination[pageSize]=100"
  );
  return data.map(mapProduct);
}