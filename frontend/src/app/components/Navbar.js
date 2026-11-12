"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "The Archive" },
  { href: "/cart", label: "Cart" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.3em] text-bone"
        >
          QUIET BATTLES™
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-10 text-xs tracking-[0.25em] uppercase text-steel">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-ember"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-bone text-2xl"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-6 px-6 pb-8 text-xs tracking-[0.25em] uppercase text-steel">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-ember"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}