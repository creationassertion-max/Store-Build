"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-lumiere-border mx-auto mb-6" />
        <h1 className="font-serif text-3xl text-lumiere-text mb-4">
          Nothing to check out
        </h1>
        <Link
          href="/products"
          className="inline-block bg-lumiere-text text-lumiere-bg px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Checkout failed. Please try again.");
        setLoading(false);
        return;
      }

      clearCart();
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-lumiere-text mb-10">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Checkout form */}
        <form
          className="md:col-span-3 space-y-8"
          onSubmit={handleCheckout}
        >
          {/* Contact */}
          <section>
            <h2 className="font-serif text-xl text-lumiere-text mb-5">
              Contact
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="font-serif text-xl text-lumiere-text mb-5">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                    First Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Marie"
                    className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                    Last Name
                  </label>
                  <input
                    required
                    placeholder="Dupont"
                    className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                  Address
                </label>
                <input
                  name="address"
                  required
                  placeholder="123 Rue de la Paix"
                  className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                    City
                  </label>
                  <input
                    name="city"
                    required
                    placeholder="Paris"
                    className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                    Postal Code
                  </label>
                  <input
                    name="postal"
                    required
                    placeholder="75001"
                    className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-lumiere-muted mb-2">
                  Country
                </label>
                <select
                  required
                  className="w-full border border-lumiere-border px-4 py-3 text-sm text-lumiere-text bg-lumiere-bg focus:outline-none focus:border-lumiere-gold transition-colors"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="FR">France</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lumiere-text text-lumiere-bg py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting to payment…" : "Continue to Payment"}
          </button>

          <p className="text-xs text-lumiere-muted text-center">
            You will be securely redirected to Stripe to complete payment.
          </p>
        </form>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="bg-lumiere-cream p-6 space-y-5">
            <h2 className="font-serif text-xl text-lumiere-text">
              Order Summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-14 h-14 flex-shrink-0 bg-lumiere-bg rounded overflow-hidden">
                    <Image
                      src={item.image_path}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-lumiere-muted text-white text-[10px] rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-lumiere-text truncate">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm text-lumiere-text whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-lumiere-border pt-4 space-y-2">
              <div className="flex justify-between text-sm text-lumiere-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-lumiere-muted">
                <span>Shipping & Tax</span>
                <span>At checkout</span>
              </div>
            </div>
            <div className="border-t border-lumiere-border pt-4 flex justify-between">
              <span className="font-medium text-lumiere-text">Total</span>
              <span className="font-serif text-xl text-lumiere-text">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
