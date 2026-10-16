/**
 * The one public address of the site. piv.tools redirects to it, so canonical
 * links, Open Graph URLs, robots.txt and the sitemap all name this host.
 */
export const SITE_ORIGIN = "https://www.piv.tools";

/**
 * Shared Open Graph fields. A page's `openGraph` replaces the root layout's
 * whole object rather than merging into it, so pages that set their own spread
 * these back in.
 */
export const OPEN_GRAPH_BASE: {
  siteName: string;
  type: "website";
  images: { url: string; width: number; height: number; alt: string }[];
} = {
  siteName: "PIVtools",
  type: "website",
  images: [{ url: "/og-image.png", width: 512, height: 512, alt: "PIVtools logo" }],
};
