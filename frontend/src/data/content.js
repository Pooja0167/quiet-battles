export const products = [
  {
    slug: "first-silence-hoodie",
    name: "THE FIRST SILENCE HOODIE",
    price: 3499,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/images/photo4.jpg",
      "/images/photo5.jpg",
      "/images/photo6.jpg",
      "/images/photo7.jpg",
      "/images/photo8.jpg",
      "/images/photo9.jpg",
    ],
    description:
      "A heavyweight hoodie made for the days you carry more than you say. Soft inside, structured outside: gentle armor you can wear anywhere.",
  },
];

export const seriesList = [
  {
    slug: "the-gentle-armor",
    number: "SERIES 01",
    title: "THE GENTLE ARMOR™",
    tagline: "Soft on the surface. Strong underneath.",
    description:
      "Five chapters about the battles no one sees. Each piece is armor made gentle: worn close, carried quietly.",
    chapters: [
      {
        slug: "the-first-silence",
        number: "CHAPTER 01",
        title: "The First Silence",
        summary: "Where every quiet battle begins.",
        quote: "Some battles begin without a sound.",
        mainImage: "/images/photo1.jpg",
        story: [
          "It starts small. A thought you do not say out loud. A morning you get through without telling anyone how heavy it felt.",
          "Silence is not weakness. It is where most of us learn to be strong: alone, patient, and unseen.",
          "This chapter is for the first quiet moment you chose to keep going. It was not dramatic. No one clapped. But it was the beginning of everything.",
          "So we made something to wear for that moment: soft enough to hold you, strong enough to remind you that you already started.",
        ],
        highlights: [
          {
            label: "The Feeling",
            text: "Calm on the outside, a storm held gently within.",
            image: "/images/photo2.jpg",
          },
          {
            label: "The Fabric",
            text: "Heavyweight, brushed soft. Built to feel like a held breath.",
            image: "/images/photo3.jpg",
          },
        ],
        productSlug: "first-silence-hoodie",
      },
      {
        slug: "held-together",
        number: "CHAPTER 02",
        title: "Held Together",
        summary: "On the strength found in staying whole.",
      },
      {
        slug: "thread-by-thread",
        number: "CHAPTER 03",
        title: "Thread by Thread",
        summary: "Healing happens slowly, one stitch at a time.",
      },
      {
        slug: "the-weight-you-carry",
        number: "CHAPTER 04",
        title: "The Weight You Carry",
        summary: "What we hold, we learn to wear lightly.",
      },
      {
        slug: "still-standing",
        number: "CHAPTER 05",
        title: "Still Standing",
        summary: "The quiet victory of simply continuing.",
      },
    ],
  },
];

export function getSeries(slug) {
  return seriesList.find((s) => s.slug === slug);
}

export function getChapter(seriesSlug, chapterSlug) {
  const series = getSeries(seriesSlug);
  if (!series) return null;
  const index = series.chapters.findIndex((c) => c.slug === chapterSlug);
  if (index === -1) return null;
  return { series, chapter: series.chapters[index], index };
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}