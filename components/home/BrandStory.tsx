export default function BrandStory() {
  return (
    <section className="bg-lumiere-cream py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-6">
              Why LUMIÈRE
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-lumiere-text leading-tight mb-8">
              Skin that knows
              <br />
              it is cared for.
            </h2>
            <div className="space-y-4 text-lumiere-muted leading-relaxed">
              <p>
                LUMIÈRE was founded on a single belief: that great skincare
                should work on the level of your biology, not against it. Every
                formula begins with the question — what does this skin actually
                need?
              </p>
              <p>
                We source rare botanicals from their countries of origin,
                partner with leading cosmetic scientists, and test every product
                against clinical benchmarks before it ever reaches your skin.
              </p>
              <p>
                The result is a collection that performs in whispers, not
                shouts. Skin doesn&apos;t need to be transformed. It needs to be
                illuminated.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-8">
            {[
              { number: "30+", label: "Formulas", sub: "each clinically benchmarked" },
              { number: "6", label: "Categories", sub: "face, body, eye & lip" },
              { number: "100%", label: "Transparent", sub: "full ingredient disclosure" },
              { number: "0", label: "Compromise", sub: "on safety or efficacy" },
            ].map(({ number, label, sub }) => (
              <div key={label} className="border-l-2 border-lumiere-gold pl-6">
                <p className="font-serif text-4xl text-lumiere-text mb-1">
                  {number}
                </p>
                <p className="text-sm font-medium text-lumiere-text mb-1">
                  {label}
                </p>
                <p className="text-xs text-lumiere-muted">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
