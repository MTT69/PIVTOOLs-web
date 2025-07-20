import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ManualContent from '@/components/ManualContent';

export default function Manual() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ManualContent />
      <Footer />
    </main>
  );
}
