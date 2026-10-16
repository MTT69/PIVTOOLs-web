import type { MetadataRoute } from "next";
import { MANUAL_PAGES } from "@/data/manualPages";
import { SITE_ORIGIN } from "@/data/site";

/**
 * The pages submitted to search engines: home, every manual page and privacy.
 * /figure and /figure1 are left out on purpose; they are figure drafts, not
 * pages a visitor navigates to.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...MANUAL_PAGES.map((p) => (p.slug ? `/manual/${p.slug}` : "/manual")), "/privacy"];
  return paths.map((path) => ({ url: path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}` }));
}
