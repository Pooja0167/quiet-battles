import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getChapter, getProduct } from "../../../../lib/strapi";

export async function generateMetadata({ params }) {
  const { seriesSlug, chapterSlug } = await params;
  const data = await getChapter(seriesSlug, chapterSlug);
  if (!data) return {};
  return {
    title: `${data.chapter.title} | ${data.series.title}`,
    description: data.chapter.quote || data.chapter.summary,
  };
}

export default async function ChapterPage({ params }) {
  const { seriesSlug, chapterSlug } = await params;
  const data = await getChapter(seriesSlug, chapterSlug);

  if (!data) notFound();

  const { series, chapter, index } = data;
  const product = chapter.productSlug
    ? await getProduct(chapter.productSlug)
    : null;
  const prev = series.chapters[index - 1];
  const next = series.chapters[index + 1];

  return (
    <main>
      {/* HEADER */}
      <section className="relative overflow-hidden px-6 pb-24 pt-44 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#14110d] to-ink" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-ember/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Link
            href={`/archive/${series.slug}`}
            className="text-xs uppercase tracking-[0.3em] text-steel hover:text-ember"
          >
            ← {series.title}
          </Link>
          <p className="mb-4 mt-12 text-xs uppercase tracking-[0.5em] text-ember">
            {chapter.number}
          </p>
          <h1 className="font-display text-4xl font-light tracking-widest md:text-7xl">
            {chapter.title}
          </h1>
          {chapter.quote && (
            <p className="mt-8 font-display text-xl italic text-bone md:text-2xl">
              “{chapter.quote}”
            </p>
          )}
        </div>
      </section>

      {/* MAIN VISUAL */}
      {chapter.mainImage && (
        <section className="mx-auto max-w-5xl px-6">
          <div className="relative h-[320px] overflow-hidden md:h-[520px]">
            <Image
              src={chapter.mainImage}
              alt={`${chapter.title} chapter visual`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </section>
      )}

      {/* STORY */}
      <section className="mx-auto max-w-2xl px-6 py-28">
        {chapter.story ? (
          <div className="space-y-8">
            {chapter.story.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-2xl leading-relaxed text-bone md:text-3xl"
                    : "text-base leading-loose text-steel md:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-center text-steel">
            This chapter is still being written. {chapter.summary}
          </p>
        )}
      </section>

      {/* HIGHLIGHTS */}
      {chapter.highlights && (
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="grid gap-8 md:grid-cols-2">
            {chapter.highlights.map((item) => (
              <div key={item.label}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.4em] text-ember">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCT LINK */}
      {product && product.images[0] && (
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="grid items-center gap-10 border border-steel/30 bg-gradient-to-b from-[#14110d] to-ink p-8 md:grid-cols-2 md:p-12">
            <div className="relative h-72 overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-ember">
                The piece from this chapter
              </p>
              <h2 className="font-display text-2xl tracking-widest md:text-3xl">
                {product.name}
              </h2>
              <p className="mt-4 text-steel">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <Link
                href={`/product/${product.slug}`}
                className="mt-8 inline-block border border-ember px-10 py-4 text-xs uppercase tracking-[0.3em] text-ember transition-colors hover:bg-ember hover:text-ink"
              >
                Shop this piece
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section className="mx-auto flex max-w-5xl justify-between gap-6 border-t border-steel/20 px-6 py-12 text-xs uppercase tracking-[0.3em]">
        {prev ? (
          <Link
            href={`/archive/${series.slug}/${prev.slug}`}
            className="text-steel hover:text-ember"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/archive/${series.slug}/${next.slug}`}
            className="text-right text-steel hover:text-ember"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </section>
    </main>
  );
}