"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";

export default function ProductDetails({ product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [message, setMessage] = useState("");

  function handleAdd() {
    if (!size) {
      setMessage("Please select a size.");
      return;
    }
    addItem(product, size);
    setMessage(`Added to cart: ${product.name} (${size})`);
  }

  return (
    <div className="grid gap-12 md:grid-cols-2">
      {/* GALLERY */}
      <div>
        <div className="relative h-[420px] overflow-hidden md:h-[600px]">
          <Image
            src={product.images[activeImage]}
            alt={`${product.name} view ${activeImage + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="mt-4 grid grid-cols-6 gap-2">
          {product.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveImage(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-16 overflow-hidden border transition-colors ${
                i === activeImage ? "border-ember" : "border-steel/20"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="md:pt-6">
        <p className="mb-4 text-xs uppercase tracking-[0.5em] text-ember">
          SERIES 01 – THE GENTLE ARMOR™
        </p>
        <h1 className="font-display text-3xl font-light tracking-widest md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-6 text-2xl text-bone">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        <p className="mt-8 leading-loose text-steel">{product.description}</p>

        {/* SIZE */}
        <div className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-steel">
            Select Size
          </p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setMessage("");
                }}
                className={`h-12 w-14 border text-sm transition-colors ${
                  size === s
                    ? "border-ember bg-ember text-ink"
                    : "border-steel/40 text-bone hover:border-ember"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAdd}
          className="mt-10 w-full border border-ember px-10 py-4 text-xs uppercase tracking-[0.3em] text-ember transition-colors hover:bg-ember hover:text-ink md:w-auto"
        >
          Add to Cart
        </button>

        {message && (
          <p className="mt-4 text-sm text-bone" role="status">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}