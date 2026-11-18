import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "../../../lib/strapi";
import ProductDetails from "../../components/ProductDetails";

export async function generateMetadata({ params }) {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);
  if (!product) return {};
  return {
    title: `${product.name} | QUIET BATTLES™`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-32 pt-40">
      <Link
        href="/archive"
        className="mb-10 inline-block text-xs uppercase tracking-[0.3em] text-steel hover:text-ember"
      >
        ← The Archive
      </Link>
      <ProductDetails product={product} />
    </main>
  );
}