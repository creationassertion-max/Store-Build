"use client";

export default function NewsletterStrip() {
  return (
    <section className="bg-lumiere-text py-16">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-3">
          Join the Ritual
        </p>
        <h2 className="font-serif text-3xl text-lumiere-cream mb-4">
          Stories of skin, science & intention.
        </h2>
        <p className="text-lumiere-muted text-sm mb-8">
          Be first to know about new formulas, ingredient features, and
          members-only rituals.
        </p>
        <form
          className="flex gap-0 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
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
      </div>
    </section>
  );
}
