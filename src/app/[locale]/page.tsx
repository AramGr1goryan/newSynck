import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TheIdea from '@/components/TheIdea';
import SynckCrm from '@/components/SynckCrm';
import CrmEcosystem from '@/components/CrmEcosystem';
import Migration from '@/components/Migration';
import TgBot from '@/components/TgBot';
import Business from '@/components/Business';
import GlobalEcosystem from '@/components/GlobalEcosystem';
import Mobile from '@/components/Mobile';
import Cta from '@/components/Cta';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <TheIdea />
      <SynckCrm />
      <CrmEcosystem />
      <Migration />
      <TgBot />
      <Business />
      <GlobalEcosystem />
      <Mobile />
      <Cta />
    </>
  );
}
