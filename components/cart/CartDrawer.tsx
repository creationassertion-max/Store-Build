"use client";

import { useCart } from "./CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, count, subtotal, removeItem, updateQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-lumiere-bg z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-lumiere-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-lumiere-gold" />
            <span className="font-serif text-lg text-lumiere-text">
              Your Ritual ({count})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-lumiere-cream rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-lumiere-muted" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="w-12 h-12 text-lumiere-border mb-4" />
              <p className="font-serif text-xl text-lumiere-text mb-2">
                Your cart is empty
              </p>
              <p className="text-sm text-lumiere-muted mb-6">
                Discover our collection and begin your ritual.
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="bg-lumiere-text text-lumiere-bg px-6 py-3 text-sm tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-start">
                <div className="relative w-20 h-20 flex-shrink-0 bg-lumiere-cream rounded overflow-hidden">
                  <Image
                    src={item.image_path}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={onClose}
                    className="text-sm font-medium text-lumiere-text hover:text-lumiere-gold transition-colors leading-snug block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-lumiere-gold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center border border-lumiere-border hover:border-lumiere-gold hover:text-lumiere-gold transition-colors rounded-full"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center border border-lumiere-border hover:border-lumiere-gold hover:text-lumiere-gold transition-colors rounded-full"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-medium text-lumiere-text">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-lumiere-muted hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-lumiere-border px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lumiere-muted text-sm">Subtotal</span>
              <span className="font-serif text-lg text-lumiere-text">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-lumiere-muted">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-lumiere-text text-lumiere-bg text-center py-4 text-sm tracking-widest uppercase hover:bg-lumiere-gold transition-colors font-medium"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full border border-lumiere-border text-lumiere-text text-center py-3 text-sm tracking-widest uppercase hover:border-lumiere-gold hover:text-lumiere-gold transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
