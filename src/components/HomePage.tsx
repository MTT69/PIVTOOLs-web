'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DesignSelector, { DesignVariant } from '@/components/DesignSelector';

// Design A (Original)
import Hero from '@/components/Hero';
import WhyPivtools from '@/components/WhyPivtools';
import Capabilities from '@/components/Capabilities';
import WorkflowShowcase from '@/components/WorkflowShowcase';
import QuickStart from '@/components/QuickStart';
import Research from '@/components/Research';

// Design B (Bold)
import HeroB from '@/components/designs/HeroB';
import WhyPivtoolsB from '@/components/designs/WhyPivtoolsB';
import CapabilitiesB from '@/components/designs/CapabilitiesB';
import WorkflowShowcaseB from '@/components/designs/WorkflowShowcaseB';
import QuickStartB from '@/components/designs/QuickStartB';
import ResearchB from '@/components/designs/ResearchB';

// Design C (Scientific)
import HeroC from '@/components/designs/HeroC';
import WhyPivtoolsC from '@/components/designs/WhyPivtoolsC';
import CapabilitiesC from '@/components/designs/CapabilitiesC';
import WorkflowShowcaseC from '@/components/designs/WorkflowShowcaseC';
import QuickStartC from '@/components/designs/QuickStartC';
import ResearchC from '@/components/designs/ResearchC';

// Design D (Aerodynamic)
import HeroD from '@/components/designs/HeroD';
import WhyPivtoolsD from '@/components/designs/WhyPivtoolsD';
import CapabilitiesD from '@/components/designs/CapabilitiesD';
import WorkflowShowcaseD from '@/components/designs/WorkflowShowcaseD';
import QuickStartD from '@/components/designs/QuickStartD';
import ResearchD from '@/components/designs/ResearchD';

export default function HomePage() {
  const [currentDesign, setCurrentDesign] = useState<DesignVariant>('A');

  // Persist design choice in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pivtools-design');
    if (saved && ['A', 'B', 'C', 'D'].includes(saved)) {
      setCurrentDesign(saved as DesignVariant);
    }
  }, []);

  const handleDesignChange = (design: DesignVariant) => {
    setCurrentDesign(design);
    localStorage.setItem('pivtools-design', design);
    // Scroll to top when changing designs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Design A - Original */}
      {currentDesign === 'A' && (
        <>
          <Hero />
          <WhyPivtools />
          <Capabilities />
          <WorkflowShowcase />
          <QuickStart />
          <Research />
        </>
      )}

      {/* Design B - Bold/Dramatic */}
      {currentDesign === 'B' && (
        <>
          <HeroB />
          <WhyPivtoolsB />
          <CapabilitiesB />
          <WorkflowShowcaseB />
          <QuickStartB />
          <ResearchB />
        </>
      )}

      {/* Design C - Minimal/Scientific */}
      {currentDesign === 'C' && (
        <>
          <HeroC />
          <WhyPivtoolsC />
          <CapabilitiesC />
          <WorkflowShowcaseC />
          <QuickStartC />
          <ResearchC />
        </>
      )}

      {/* Design D - Aerodynamic/Flow Visualization */}
      {currentDesign === 'D' && (
        <>
          <HeroD />
          <WhyPivtoolsD />
          <CapabilitiesD />
          <WorkflowShowcaseD />
          <QuickStartD />
          <ResearchD />
        </>
      )}

      <Footer />

      <DesignSelector
        currentDesign={currentDesign}
        onDesignChange={handleDesignChange}
      />
    </main>
  );
}
