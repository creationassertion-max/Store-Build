"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/types";
import { ChevronDown } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [storyOpen, setStoryOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/api/products/${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image_path: product.image_path,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
        <div className="font-serif text-xl text-lumiere-muted animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-lumiere-text mb-4">
          Product Not Found
        </h1>
        <Link href="/products" className="text-lumiere-gold hover:underline">
          Browse all products
        </Link>
      </div>
    );
  }

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
        {product.category_name && (
          <>
            <span>/</span>
            <Link
              href={`/collections/${product.category_slug}`}
              className="hover:text-lumiere-text transition-colors"
            >
              {product.category_name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-lumiere-text">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative aspect-square bg-lumiere-cream rounded overflow-hidden">
          <Image
            src={product.image_path}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.category_name && (
            <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-3">
              {product.category_name}
            </p>
          )}
          <h1 className="font-serif text-4xl text-lumiere-text leading-tight mb-4">
            {product.name}
          </h1>
          <p className="font-serif text-2xl text-lumiere-text mb-8">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="text-lumiere-muted leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity + Add to Cart */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border border-lumiere-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-3 text-lumiere-muted hover:text-lumiere-text transition-colors"
              >
                −
              </button>
              <span className="px-4 py-3 text-sm text-lumiere-text min-w-[3rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-3 text-lumiere-muted hover:text-lumiere-text transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${
                added
                  ? "bg-lumiere-gold text-lumiere-text"
                  : "bg-lumiere-text text-lumiere-bg hover:bg-lumiere-gold"
              }`}
            >
              {added ? "Added to Ritual ✓" : "Add to Ritual"}
            </button>
          </div>

          {/* Story accordion */}
          <div className="border-t border-lumiere-border pt-6">
            <button
              onClick={() => setStoryOpen(!storyOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-xs tracking-widest uppercase text-lumiere-text">
                The Story Behind This Formula
              </span>
              <ChevronDown
                className={`w-4 h-4 text-lumiere-muted transition-transform ${
                  storyOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {storyOpen && (
              <p className="mt-4 text-lumiere-muted text-sm leading-relaxed">
                {product.story}
              </p>
            )}
          </div>

          {/* SKU */}
          <p className="mt-6 text-xs text-lumiere-border">SKU: {product.sku}</p>
        </div>
      </div>
    </div>
  );
}
