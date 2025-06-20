import { SiteHeader } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedMeals } from "@/components/featured-meals"
import { SiteFooter } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedMeals />
      </main>
      <SiteFooter />
    </div>
  )
}
