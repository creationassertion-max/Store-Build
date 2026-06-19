import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const footerLinks = {
  Shop: [
    { href: "/products", label: "All Products" },
    { href: "/collections/serums-treatments", label: "Serums & Treatments" },
    { href: "/collections/moisturizers", label: "Moisturizers" },
    { href: "/collections/cleansers-toners", label: "Cleansers & Toners" },
    { href: "/collections/masks-exfoliants", label: "Masks & Exfoliants" },
    { href: "/collections/eye-lip-care", label: "Eye & Lip Care" },
    { href: "/collections/body-care", label: "Body Care" },
  ],
  Brand: [
    { href: "/about", label: "Our Story" },
    { href: "/about#ingredients", label: "Ingredients" },
    { href: "/about#ritual", label: "The Ritual" },
  ],
  Support: [
    { href: "/cart", label: "Cart" },
    { href: "/checkout", label: "Checkout" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-lumiere-text text-lumiere-cream mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="font-serif text-xl tracking-[0.25em] text-lumiere-cream hover:text-lumiere-gold transition-colors"
            >
              LUMIÈRE
            </Link>
            <p className="text-lumiere-muted text-sm mt-4 leading-relaxed max-w-xs">
              Science-led, botanically inspired skincare. Every formula is a
              quiet act of devotion to your skin.
            </p>
            <p className="text-lumiere-gold text-xs tracking-widest uppercase mt-6">
              Illuminate Your Ritual
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs tracking-widest uppercase text-lumiere-muted mb-4">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-lumiere-cream/70 hover:text-lumiere-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-10 mb-10">
          <div className="max-w-md">
            <p className="text-sm text-lumiere-muted mb-1">
              Join the ritual
            </p>
            <p className="font-serif text-xl text-lumiere-cream mb-4">
              Stories of skin, ritual, and science.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-lumiere-muted">
            © {new Date().getFullYear()} LUMIÈRE. All rights reserved. A
            fictional brand for demonstration purposes.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-lumiere-muted">Privacy Policy</span>
            <span className="text-xs text-lumiere-muted">Terms of Service</span>
            <span className="text-xs text-lumiere-muted">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
