import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeries } from "../../../data/content";

export async function generateMetadata({ params }) {
  const { seriesSlug } = await params;
  const series = getSeries(seriesSlug);
  if (!series) return {};
  return {
    title: `${series.title} | QUIET BATTLES™`,
    description: series.description,
  };
}

export default async function SeriesPage({ params }) {
  const { seriesSlug } = await params;
  const series = getSeries(seriesSlug);

  if (!series) notFound();

  return (
    <main>
      {/* Series header */}
      <section className="relative overflow-hidden px-6 pb-24 pt-44 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#14110d] to-ink" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Link
            href="/archive"
            className="text-xs uppercase tracking-[0.3em] text-steel hover:text-ember"
          >
            ← The Archive
          </Link>
          <p className="mb-4 mt-12 text-xs uppercase tracking-[0.5em] text-ember">
            {series.number}
          </p>
          <h1 className="font-display text-4xl font-light tracking-widest md:text-7xl">
            {series.title}
          </h1>
          <p className="mt-6 text-lg text-bone">{series.tagline}</p>
          <p className="mx-auto mt-6 max-w-xl text-steel">
            {series.description}
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <h2 className="mb-12 text-xs uppercase tracking-[0.5em] text-ember">
          The Chapters
        </h2>

        <div className="divide-y divide-steel/20 border-y border-steel/20">
          {series.chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/archive/${series.slug}/${chapter.slug}`}
              className="group flex flex-col gap-2 py-10 transition-colors md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.4em] text-steel">
                  {chapter.number}
                </p>
                <h3 className="font-display text-2xl tracking-wider transition-colors group-hover:text-ember md:text-3xl">
                  {chapter.title}
                </h3>
                <p className="mt-2 text-sm text-steel">{chapter.summary}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-steel transition-colors group-hover:text-ember">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}