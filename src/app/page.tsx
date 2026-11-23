import { ShopContact } from '@/components/ShopContact';
import { HeroShopSign } from '@/components/HeroShopSign';
import { InstagramShowcase } from '@/components/InstagramShowcase';
import { LocationAndDirections } from '@/components/LocationAndDirections';
import { MastheadNav } from '@/components/MastheadNav';
import { MobileActionDock } from '@/components/MobileActionDock';
import { SalonFooter } from '@/components/SalonFooter';
import { ServiceBoard } from '@/components/ServiceBoard';

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:font-bold focus:text-oxblood"
      >
        Skip to content
      </a>
      <MastheadNav />
      <main id="main-content" tabIndex={-1}>
        <HeroShopSign />
        <ServiceBoard />
        <aside aria-labelledby="kashish-title" className="border-b border-rule bg-cream">
          <div className="mx-auto grid max-w-6xl gap-5 px-5 py-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow">Thergaon, Pune</p>
              <h2 id="kashish-title" className="mt-2 text-2xl font-bold text-oxblood">Kashish Beauty Parlour &amp; Training Center</h2>
              <p className="mt-2 text-muted">Visit Kashish for women’s hair styling and bridal makeup, or learn makeup, hairstyling and beauty care in its professional classes.</p>
            </div>
            <nav aria-label="Explore Kashish" className="flex flex-wrap gap-3 md:justify-end">
              <a className="btn btn-line" href="https://mangeshraut712.github.io/kashishbeautyparlour/en/services/">Women’s beauty services</a>
              <a className="btn btn-line" href="https://mangeshraut712.github.io/kashishbeautyparlour/en/training/">Professional beauty classes</a>
            </nav>
          </div>
        </aside>
        <InstagramShowcase />
        <LocationAndDirections />
        <ShopContact />
      </main>
      <SalonFooter />
      <MobileActionDock />
    </>
  );
}
