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