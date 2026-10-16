import type { Metadata } from "next";

// A figure draft, not a page for visitors: keep it out of search results.
// noindex rather than a robots.txt Disallow, because Google must be able to
// crawl the page to see the noindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
