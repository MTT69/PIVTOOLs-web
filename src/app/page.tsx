import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Motivation from '@/components/Motivation';
import Features from '@/components/Features';
import Documentation from '@/components/Documentation';
import Authors from '@/components/Authors';
import GitHubSection from '@/components/GitHubSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Motivation />
      <Features />
      <Documentation />
      <Authors />
      <GitHubSection />
      <Footer />
    </main>
  );
}
