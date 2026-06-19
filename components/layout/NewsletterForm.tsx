"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 bg-white/5 border border-white/10 text-lumiere-cream placeholder-lumiere-muted px-4 py-3 text-sm focus:outline-none focus:border-lumiere-gold transition-colors"
      />
      <button
        type="submit"
        className="bg-lumiere-gold text-lumiere-text px-6 py-3 text-xs tracking-widest uppercase hover:bg-lumiere-gold-dark transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
