import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/queries";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";

export const metadata = {
  title: "Shop All Products",
  description:
    "Browse the complete LUMIÈRE collection — serums, moisturizers, cleansers, masks, eye & lip care, and body care.",
};

export const dynamic = "force-dynamic";

interface SearchParams {
  category?: string;
  min_price?: string;
  max_price?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [allProducts, categories] = await Promise.all([
    getProducts({ categorySlug: params.category }),
    getCategories(),
  ]);

  const minPrice = params.min_price ? parseFloat(params.min_price) : null;
  const maxPrice = params.max_price ? parseFloat(params.max_price) : null;

  const products =
    minPrice !== null && maxPrice !== null
      ? allProducts.filter(
          (p) => p.price >= minPrice! && p.price <= maxPrice!
        )
      : allProducts;

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-2">
          The Collection
        </p>
        <h1 className="font-serif text-4xl text-lumiere-text">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="text-lumiere-muted text-sm mt-2">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="flex gap-12">
        <Suspense fallback={null}>
          <FilterSidebar categories={categories} />
        </Suspense>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-24">
            <p className="text-lumiere-muted font-serif text-xl">
              No products found.
            </p>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
