import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

// Set here, not in the root layout, so pages without their own canonical do
// not inherit one claiming they are the home page.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomePage />;
}
