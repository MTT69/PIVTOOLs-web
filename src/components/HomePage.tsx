import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Design A (Original)
import Hero from '@/components/Hero';
import WhyPivtools from '@/components/WhyPivtools';
import Capabilities from '@/components/Capabilities';
import WorkflowShowcase from '@/components/WorkflowShowcase';
import QuickStart from '@/components/QuickStart';
import Research from '@/components/Research';

// Design variants (B/C/D) and DesignSelector commented out — using Design A only
// import DesignSelector, { DesignVariant } from '@/components/DesignSelector';
// import HeroB from '@/components/designs/HeroB';
// import WhyPivtoolsB from '@/components/designs/WhyPivtoolsB';
// import CapabilitiesB from '@/components/designs/CapabilitiesB';
// import WorkflowShowcaseB from '@/components/designs/WorkflowShowcaseB';
// import QuickStartB from '@/components/designs/QuickStartB';
// import ResearchB from '@/components/designs/ResearchB';
// import HeroC from '@/components/designs/HeroC';
// import WhyPivtoolsC from '@/components/designs/WhyPivtoolsC';
// import CapabilitiesC from '@/components/designs/CapabilitiesC';
// import WorkflowShowcaseC from '@/components/designs/WorkflowShowcaseC';
// import QuickStartC from '@/components/designs/QuickStartC';
// import ResearchC from '@/components/designs/ResearchC';
// import HeroD from '@/components/designs/HeroD';
// import WhyPivtoolsD from '@/components/designs/WhyPivtoolsD';
// import CapabilitiesD from '@/components/designs/CapabilitiesD';
// import WorkflowShowcaseD from '@/components/designs/WorkflowShowcaseD';
// import QuickStartD from '@/components/designs/QuickStartD';
// import ResearchD from '@/components/designs/ResearchD';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhyPivtools />
      <Capabilities />
      <WorkflowShowcase />
      <QuickStart />
      <Research />
      <Footer />
    </main>
  );
}
