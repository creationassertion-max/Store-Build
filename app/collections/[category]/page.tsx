import { getProducts, getCategories } from "@/lib/queries";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `Shop LUMIÈRE ${cat.name} — luxury skincare formulas for your ritual.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const [products, categories] = await Promise.all([
    getProducts({ categorySlug: category }),
    getCategories(),
  ]);

  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-lumiere-muted mb-10">
        <Link href="/" className="hover:text-lumiere-text transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/products"
          className="hover:text-lumiere-text transition-colors"
        >
          Shop
        </Link>
        <span>/</span>
        <span className="text-lumiere-text">{cat.name}</span>
      </nav>

      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-2">
          Collection
        </p>
        <h1 className="font-serif text-4xl text-lumiere-text">{cat.name}</h1>
        <p className="text-lumiere-muted text-sm mt-2">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Other collections links */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          href="/products"
          className="text-xs tracking-widest uppercase px-4 py-2 border border-lumiere-border text-lumiere-muted hover:border-lumiere-gold hover:text-lumiere-gold transition-colors"
        >
          All
        </Link>
        {categories
          .filter((c) => c.slug !== category)
          .map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="text-xs tracking-widest uppercase px-4 py-2 border border-lumiere-border text-lumiere-muted hover:border-lumiere-gold hover:text-lumiere-gold transition-colors"
            >
              {c.name}
            </Link>
          ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
