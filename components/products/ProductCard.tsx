"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_path: product.image_path,
      slug: product.slug,
    });
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-lumiere-bg"
    >
      {/* Image */}
      <div className="relative aspect-square bg-lumiere-cream overflow-hidden">
        <Image
          src={product.image_path}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAddToCart}
            className="w-full bg-lumiere-text text-lumiere-bg py-3 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
          >
            Add to Ritual
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2 space-y-1">
        {product.category_name && (
          <p className="text-[10px] tracking-widest uppercase text-lumiere-gold">
            {product.category_name}
          </p>
        )}
        <h3 className="font-serif text-base text-lumiere-text leading-snug group-hover:text-lumiere-gold-dark transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-lumiere-muted">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
