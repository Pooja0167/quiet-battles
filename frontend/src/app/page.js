import Link from "next/link";

const collections = [
  {
    slug: "the-gentle-armor",
    series: "SERIES 01",
    title: "THE GENTLE ARMOR™",
    text: "Soft on the surface. Strong underneath. Five chapters about the battles no one sees.",
    available: true,
  },
  {
    series: "SERIES 02",
    title: "COMING SOON",
    text: "The next chapter of the archive is being written.",
    available: false,
  },
  {
    series: "SERIES 03",
    title: "COMING SOON",
    text: "Some stories take time to be told.",
    available: false,
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#14110d] to-ink" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[140px]" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-8 text-xs uppercase tracking-[0.5em] text-steel">
            QUIET BATTLES™
          </p>

          <h1 className="font-display text-5xl font-light leading-tight tracking-widest md:text-8xl">
            WEAR YOUR BATTLES
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base text-steel md:text-lg">
            Every scar is a story. Every story deserves to be worn.
          </p>

          <Link
            href="/archive"
            className="mt-12 inline-block border border-ember px-10 py-4 text-xs uppercase tracking-[0.3em] text-ember transition-colors hover:bg-ember hover:text-ink"
          >
            Enter The Archive
          </Link>
        </div>
      </section>

      {/* BRAND INTRODUCTION */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-ember">
          The Idea
        </p>

        <h2 className="font-display text-3xl font-light leading-relaxed md:text-5xl">
          Not every battle is loud.
        </h2>

        <p className="mt-10 text-base leading-loose text-steel md:text-lg">
          QUIET BATTLES™ is built for the fights fought in silence: the
          doubts, the recoveries, the small victories no one applauds. Each
          piece we make carries a story, and each story is a chapter in
          The Archive. Wear it not as a statement, but as quiet armor.
        </p>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-ember">
            The Archive
          </p>
          <h2 className="font-display text-3xl font-light md:text-5xl">
            Featured Collections
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {collections.map((item) => {
            const card = (
              <div
                className={`group flex h-full min-h-[360px] flex-col justify-end border p-8 transition-colors ${
                  item.available
                    ? "border-steel/30 bg-gradient-to-b from-[#14110d] to-ink hover:border-ember"
                    : "border-steel/10 opacity-50"
                }`}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-ember">
                  {item.series}
                </p>
                <h3 className="font-display text-2xl tracking-widest">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-steel">
                  {item.text}
                </p>
                {item.available && (
                  <span className="mt-6 text-xs uppercase tracking-[0.3em] text-bone transition-colors group-hover:text-ember">
                    Explore →
                  </span>
                )}
              </div>
            );

            return item.available ? (
              <Link key={item.title + item.series} href={`/archive/${item.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={item.title + item.series}>{card}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}