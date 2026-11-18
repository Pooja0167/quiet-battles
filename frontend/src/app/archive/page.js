import Link from "next/link";
import { getAllSeries } from "../../lib/strapi";

export const metadata = {
  title: "The Archive | QUIET BATTLES™",
  description: "Every series is a collection of stories. Explore The Archive.",
};

export default async function ArchivePage() {
  const seriesList = await getAllSeries();

  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-40">
      <p className="mb-4 text-xs uppercase tracking-[0.5em] text-ember">
        QUIET BATTLES™
      </p>
      <h1 className="font-display text-4xl font-light tracking-widest md:text-6xl">
        THE ARCHIVE
      </h1>
      <p className="mt-6 max-w-xl text-steel">
        Every series is a collection of stories. Every story is a battle worn
        quietly.
      </p>

      <div className="mt-20 space-y-8">
        {seriesList.map((series) => (
          <Link
            key={series.slug}
            href={`/archive/${series.slug}`}
            className="group block border border-steel/30 bg-gradient-to-b from-[#14110d] to-ink p-10 transition-colors hover:border-ember"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-ember">
              {series.number}
            </p>
            <h2 className="font-display text-3xl tracking-widest md:text-4xl">
              {series.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel">
              {series.description}
            </p>
            <span className="mt-8 inline-block text-xs uppercase tracking-[0.3em] transition-colors group-hover:text-ember">
              {series.chapters.length} Chapters →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}