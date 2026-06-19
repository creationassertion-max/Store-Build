import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/types";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-3">
            Editorial Selection
          </p>
          <h2 className="font-serif text-4xl text-lumiere-text">
            Ritual Essentials
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden md:block text-xs tracking-widest uppercase text-lumiere-muted hover:text-lumiere-text transition-colors border-b border-lumiere-border hover:border-lumiere-text pb-0.5"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link
          href="/products"
          className="text-xs tracking-widest uppercase text-lumiere-muted hover:text-lumiere-text transition-colors"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
