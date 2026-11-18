import CartView from "../components/CartView";

export const metadata = {
  title: "Your Cart | QUIET BATTLES™",
  description: "Review the pieces you have chosen from The Archive.",
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-32 pt-40">
      <p className="mb-4 text-xs uppercase tracking-[0.5em] text-ember">
        QUIET BATTLES™
      </p>
      <h1 className="mb-16 font-display text-4xl font-light tracking-widest md:text-6xl">
        YOUR CART
      </h1>
      <CartView />
    </main>
  );
}