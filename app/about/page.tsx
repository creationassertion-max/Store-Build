import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about LUMIÈRE — why we make what we make, and the philosophy behind every formula.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-24">
        <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-6">
          Our Story
        </p>
        <h1 className="font-serif text-5xl md:text-7xl text-lumiere-text leading-tight mb-8">
          Light is not
          <br />
          <em className="text-lumiere-gold-dark">given. It is made.</em>
        </h1>
        <p className="text-xl text-lumiere-muted leading-relaxed">
          LUMIÈRE began with a question: why does luxury skincare so rarely
          deliver on its promises? We spent three years finding the answer —
          and building something better.
        </p>
      </div>

      {/* Story sections */}
      <div className="grid md:grid-cols-2 gap-24 mb-24">
        <div>
          <h2 className="font-serif text-3xl text-lumiere-text mb-6">
            The Beginning
          </h2>
          <div className="space-y-4 text-lumiere-muted leading-relaxed">
            <p>
              In 2019, our founder — a cosmetic chemist with 15 years in the
              pharmaceutical industry — walked into a high-end beauty retailer
              and purchased six serums, each promising radiant, transformed
              skin. None of them worked.
            </p>
            <p>
              The problem wasn&apos;t the ingredients. The problem was the
              concentration, the delivery, and the fundamentally decorative
              approach to formulation. Skincare that looked good on a shelf but
              didn&apos;t perform at the level of skin biology.
            </p>
            <p>
              LUMIÈRE was founded to change that. Every formula is built from
              the active ingredient outward — starting with what the skin needs,
              then designing a delivery system worthy of it.
            </p>
          </div>
        </div>

        <div id="ingredients">
          <h2 className="font-serif text-3xl text-lumiere-text mb-6">
            Ingredients Philosophy
          </h2>
          <div className="space-y-4 text-lumiere-muted leading-relaxed">
            <p>
              We source every key ingredient from its country of origin — rose
              water from Bulgarian Valley of Roses, shea butter from
              single-origin Ghanaian cooperatives, bakuchiol from
              Ayurvedic-certified Psoralea corylifolia seeds.
            </p>
            <p>
              We disclose every ingredient. No proprietary blend hiding.
              No &quot;fragrance&quot; umbrella. Every compound is listed,
              named, and explained on our product pages.
            </p>
            <p>
              We test every formula against clinical efficacy benchmarks — not
              just for safety, but for performance. If it doesn&apos;t work at
              the level of science, it doesn&apos;t reach you.
            </p>
          </div>
        </div>
      </div>

      {/* Ritual section */}
      <div id="ritual" className="bg-lumiere-cream p-12 md:p-16 mb-24">
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-6">
            The Ritual
          </p>
          <h2 className="font-serif text-4xl text-lumiere-text mb-8">
            Skincare is not vanity.
            <br />
            It is devotion.
          </h2>
          <p className="text-lumiere-muted leading-relaxed mb-6">
            The LUMIÈRE ritual is designed around the skin&apos;s natural
            rhythms — light work in the morning, intensive renewal at night. We
            build each formula to work in concert with your skin&apos;s biology,
            not against it.
          </p>
          <p className="text-lumiere-muted leading-relaxed mb-8">
            Each product is a quiet gesture of care. The sequence matters. The
            texture matters. The scent — where we include it — matters. Because
            a ritual that you don&apos;t enjoy is a ritual you won&apos;t
            maintain.
          </p>
          <Link
            href="/products"
            className="inline-block bg-lumiere-text text-lumiere-bg px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
          >
            Build Your Ritual
          </Link>
        </div>
      </div>

      {/* Values */}
      <div className="mb-24">
        <h2 className="font-serif text-3xl text-lumiere-text mb-12 text-center">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Scientific Integrity",
              body: "Every active is dosed at clinically effective concentrations. We cite the studies. We show the data. We don't hide behind storytelling.",
            },
            {
              title: "Honest Sourcing",
              body: "Single-origin ingredients, ethical supply chains, and full transparency on where everything comes from. No shortcuts.",
            },
            {
              title: "Zero Compromise",
              body: "Safe and effective are not competing values. We refuse to formulate products that sacrifice one for the other.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="border-t-2 border-lumiere-gold pt-6"
            >
              <h3 className="font-serif text-xl text-lumiere-text mb-4">
                {title}
              </h3>
              <p className="text-lumiere-muted leading-relaxed text-sm">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-lumiere-muted mb-6">
          Ready to begin your ritual?
        </p>
        <Link
          href="/products"
          className="inline-block bg-lumiere-text text-lumiere-bg px-10 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
        >
          Shop the Collection
        </Link>
      </div>
    </div>
  );
}
