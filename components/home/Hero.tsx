import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/svg/hero.svg"
          alt="LUMIÈRE luxury skincare"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-lumiere-bg/80 via-lumiere-bg/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.3em] uppercase text-lumiere-gold mb-6">
            Luxury Skincare — Crafted with Purpose
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-lumiere-text leading-tight mb-6">
            Illuminate
            <br />
            <em className="text-lumiere-gold-dark">your ritual.</em>
          </h1>
          <p className="text-lumiere-muted text-lg leading-relaxed mb-10 max-w-md">
            Science-led. Botanically inspired. Every LUMIÈRE formula is a quiet
            act of devotion — for skin that glows with intent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-block bg-lumiere-text text-lumiere-bg px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors text-center"
            >
              Shop the Collection
            </Link>
            <Link
              href="/about"
              className="inline-block border border-lumiere-border text-lumiere-text px-8 py-4 text-xs tracking-widest uppercase hover:border-lumiere-gold hover:text-lumiere-gold transition-colors text-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest uppercase text-lumiere-muted">Scroll</span>
        <div className="w-px h-8 bg-lumiere-border animate-pulse" />
      </div>
    </section>
  );
}
