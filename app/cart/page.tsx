"use client";

import { useCart } from "@/components/cart/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-lumiere-border mx-auto mb-6" />
        <h1 className="font-serif text-3xl text-lumiere-text mb-4">
          Your cart is empty
        </h1>
        <p className="text-lumiere-muted mb-8">
          Your ritual begins with a single product.
        </p>
        <Link
          href="/products"
          className="inline-block bg-lumiere-text text-lumiere-bg px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-lumiere-text mb-10">Your Ritual</h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-lumiere-border pb-8">
              <div className="relative w-24 h-24 flex-shrink-0 bg-lumiere-cream rounded overflow-hidden">
                <Image
                  src={item.image_path}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-serif text-lg text-lumiere-text hover:text-lumiere-gold transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-lumiere-gold mt-1">
                  ${item.price.toFixed(2)} each
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-lumiere-border">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-lumiere-muted hover:text-lumiere-text transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 py-2 text-sm min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="px-3 py-2 text-lumiere-muted hover:text-lumiere-text transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-lumiere-muted hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif text-lg text-lumiere-text">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="md:col-span-1">
          <div className="bg-lumiere-cream p-8 sticky top-24">
            <h2 className="font-serif text-xl text-lumiere-text mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-lumiere-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-lumiere-muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm text-lumiere-muted">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-lumiere-border pt-4 mb-6">
              <span className="font-medium text-lumiere-text">Total</span>
              <span className="font-serif text-xl text-lumiere-text">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-lumiere-text text-lumiere-bg text-center py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/products"
              className="block w-full text-center mt-4 text-xs tracking-widest uppercase text-lumiere-muted hover:text-lumiere-text transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
