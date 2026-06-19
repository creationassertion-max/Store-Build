"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/lib/types";

interface FilterSidebarProps {
  categories: Category[];
}

export default function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  const setFilter = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      <div className="sticky top-24">
        <h2 className="text-xs tracking-widest uppercase text-lumiere-muted mb-6">
          Filter
        </h2>

        <div className="space-y-1">
          <button
            onClick={() => setFilter("")}
            className={`w-full text-left py-2 text-sm transition-colors ${
              !activeCategory
                ? "text-lumiere-text font-medium"
                : "text-lumiere-muted hover:text-lumiere-text"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              className={`w-full text-left py-2 text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "text-lumiere-gold font-medium"
                  : "text-lumiere-muted hover:text-lumiere-text"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-lumiere-border">
          <h2 className="text-xs tracking-widest uppercase text-lumiere-muted mb-4">
            Price Range
          </h2>
          <div className="space-y-1">
            {[
              { label: "Under $60", min: 0, max: 60 },
              { label: "$60 – $100", min: 60, max: 100 },
              { label: "$100 – $150", min: 100, max: 150 },
              { label: "Over $150", min: 150, max: 9999 },
            ].map(({ label, min, max }) => {
              const activeMin = searchParams.get("min_price");
              const activeMax = searchParams.get("max_price");
              const isActive =
                activeMin === String(min) && activeMax === String(max);
              return (
                <button
                  key={label}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (isActive) {
                      params.delete("min_price");
                      params.delete("max_price");
                    } else {
                      params.set("min_price", String(min));
                      params.set("max_price", String(max));
                    }
                    router.push(`/products?${params.toString()}`, {
                      scroll: false,
                    });
                  }}
                  className={`w-full text-left py-2 text-sm transition-colors ${
                    isActive
                      ? "text-lumiere-gold font-medium"
                      : "text-lumiere-muted hover:text-lumiere-text"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
