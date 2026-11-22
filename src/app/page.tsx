import { AppointmentInquiry } from '@/components/AppointmentInquiry';
import { HeroShopSign } from '@/components/HeroShopSign';
import { InstagramShowcase } from '@/components/InstagramShowcase';
import { LocationAndDirections } from '@/components/LocationAndDirections';
import { MastheadNav } from '@/components/MastheadNav';
import { MobileActionDock } from '@/components/MobileActionDock';
import { OwnerAndCraft } from '@/components/OwnerAndCraft';
import { ReviewsAndHours } from '@/components/ReviewsAndHours';
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
      <main id="main-content">
        <HeroShopSign />
        <ServiceBoard />
        <OwnerAndCraft />
        <InstagramShowcase />
        <ReviewsAndHours />
        <LocationAndDirections />
        <AppointmentInquiry />
      </main>
      <SalonFooter />
      <MobileActionDock />
    </>
  );
}
