import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhyPivtools from '@/components/WhyPivtools';
import Capabilities from '@/components/Capabilities';
import WorkflowShowcase from '@/components/WorkflowShowcase';
import QuickStart from '@/components/QuickStart';
import Research from '@/components/Research';
import Footer from '@/components/Footer';

export default function Home() {
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
