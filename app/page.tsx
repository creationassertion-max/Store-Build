import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import CategoryBanner from "@/components/home/CategoryBanner";
import NewsletterStrip from "@/components/home/NewsletterStrip";
import { getProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getProducts({ featured: true, limit: 4 });

  return (
    <>
      <Hero />
      <FeaturedProducts products={featured} />
      <BrandStory />
      <CategoryBanner />
      <NewsletterStrip />
    </>
  );
}
