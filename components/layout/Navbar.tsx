"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/products", label: "Shop All" },
  { href: "/collections/serums-treatments", label: "Serums" },
  { href: "/collections/moisturizers", label: "Moisturizers" },
  { href: "/collections/body-care", label: "Body" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-lumiere-bg/95 backdrop-blur-sm border-b border-lumiere-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-lumiere-muted hover:text-lumiere-text transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.25em] text-lumiere-text hover:text-lumiere-gold transition-colors"
          >
            LUMIÈRE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-lumiere-muted hover:text-lumiere-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-lumiere-text hover:text-lumiere-gold transition-colors"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span
                data-testid="cart-count"
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-lumiere-gold text-white text-[10px] rounded-full flex items-center justify-center font-medium"
              >
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-lumiere-border bg-lumiere-bg px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-xs tracking-widest uppercase text-lumiere-muted hover:text-lumiere-text transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
