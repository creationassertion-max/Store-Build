import Link from "next/link";

const categories = [
  {
    slug: "serums-treatments",
    name: "Serums & Treatments",
    tagline: "Targeted actives",
    color: "bg-amber-50",
    accent: "text-amber-700",
  },
  {
    slug: "moisturizers",
    name: "Moisturizers",
    tagline: "Deep nourishment",
    color: "bg-stone-100",
    accent: "text-stone-600",
  },
  {
    slug: "cleansers-toners",
    name: "Cleansers & Toners",
    tagline: "Pure beginnings",
    color: "bg-blue-50",
    accent: "text-blue-700",
  },
  {
    slug: "masks-exfoliants",
    name: "Masks & Exfoliants",
    tagline: "Weekly rituals",
    color: "bg-violet-50",
    accent: "text-violet-700",
  },
  {
    slug: "eye-lip-care",
    name: "Eye & Lip Care",
    tagline: "Precision care",
    color: "bg-rose-50",
    accent: "text-rose-700",
  },
  {
    slug: "body-care",
    name: "Body Care",
    tagline: "Head to toe",
    color: "bg-emerald-50",
    accent: "text-emerald-700",
  },
];

export default function CategoryBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase text-lumiere-gold mb-3">
          The Collection
        </p>
        <h2 className="font-serif text-4xl text-lumiere-text">
          Your Complete Ritual
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className={`group ${cat.color} p-8 flex flex-col justify-between min-h-40 hover:shadow-md transition-shadow`}
          >
            <span
              className={`text-[10px] tracking-widest uppercase ${cat.accent}`}
            >
              {cat.tagline}
            </span>
            <div>
              <h3 className="font-serif text-xl text-lumiere-text leading-snug mb-2">
                {cat.name}
              </h3>
              <span className="text-xs tracking-widest uppercase text-lumiere-muted group-hover:text-lumiere-gold transition-colors">
                Shop →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
