"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function CartView() {
  const { items, total, loaded, removeItem, updateQty, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  function handleCheckout() {
    clearCart();
    setOrdered(true);
  }

  if (!loaded) {
    return <p className="text-steel">Loading your cart...</p>;
  }

  if (ordered) {
    return (
      <div className="border border-steel/30 p-10 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.5em] text-ember">
          Demo Checkout
        </p>
        <h2 className="font-display text-3xl tracking-widest">
          Thank you for wearing your battles.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-steel">
          This is a demo order. Payment integration (such as Razorpay) is part
          of the full project plan.
        </p>
        <Link
          href="/archive"
          className="mt-8 inline-block border border-ember px-10 py-4 text-xs uppercase tracking-[0.3em] text-ember transition-colors hover:bg-ember hover:text-ink"
        >
          Back to The Archive
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="font-display text-2xl text-bone">Your cart is empty.</p>
        <p className="mt-4 text-steel">
          Every battle has a story. Find the piece that tells yours.
        </p>
        <Link
          href="/archive"
          className="mt-8 inline-block border border-ember px-10 py-4 text-xs uppercase tracking-[0.3em] text-ember transition-colors hover:bg-ember hover:text-ink"
        >
          Explore The Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 md:grid-cols-3">
      {/* ITEMS */}
      <div className="md:col-span-2">
        <ul className="divide-y divide-steel/20 border-y border-steel/20">
          {items.map((item) => (
            <li key={item.id} className="flex gap-6 py-8">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-display text-xl tracking-wider hover:text-ember"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-steel">
                    Size: {item.size}
                  </p>
                  <p className="mt-2 text-steel">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-steel/40">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className="h-10 w-10 text-lg hover:text-ember"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                      className="h-10 w-10 text-lg hover:text-ember"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs uppercase tracking-[0.3em] text-steel hover:text-ember"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* SUMMARY */}
      <aside className="h-fit border border-steel/30 bg-gradient-to-b from-[#14110d] to-ink p-8">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-ember">
          Order Summary
        </p>

        <div className="flex justify-between text-steel">
          <span>Subtotal</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
        <div className="mt-3 flex justify-between text-steel">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>

        <div className="mt-6 flex justify-between border-t border-steel/20 pt-6 text-lg text-bone">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-8 w-full border border-ember px-10 py-4 text-xs uppercase tracking-[0.3em] text-ember transition-colors hover:bg-ember hover:text-ink"
        >
          Checkout (Demo)
        </button>
      </aside>
    </div>
  );
}