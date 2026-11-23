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
        <InstagramShowcase />
        <LocationAndDirections />
        <ShopContact />
      </main>
      <SalonFooter />
      <MobileActionDock />
    </>
  );
}
