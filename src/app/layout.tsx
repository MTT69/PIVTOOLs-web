import type { Metadata, Viewport } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import CookieConsent from "@/components/CookieConsent";
import { OPEN_GRAPH_BASE, SITE_ORIGIN } from "@/data/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Home-page title and description, worded for what people search: the method's
 * full name ("particle image velocimetry", 1k-10k searches a month) and "PIV
 * analysis" (100-1k) rather than "PIV processing" (0-10). Keyword Planner,
 * all locations, Oct 2025 - Sep 2026; see wiki/deployment/search-console-seo.md.
 */
const HOME_TITLE = "PIVtools – Open-Source Particle Image Velocimetry (PIV) in Python";
const HOME_DESCRIPTION =
  "Free, open-source particle image velocimetry (PIV) software for Python: planar and stereo PIV analysis from calibration to turbulence statistics, with a GUI and a CLI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: HOME_TITLE,
    template: "%s - PIVtools",
  },
  description: HOME_DESCRIPTION,
  keywords: "PIV, Particle Image Velocimetry, Python, Image Processing, Fluid Dynamics, University of Southampton",
  authors: [{ name: "University of Southampton" }],
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    ...OPEN_GRAPH_BASE,
  },
  twitter: {
    card: "summary",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og-image.png"],
  },
  // Google Search Console ownership (URL-prefix property https://www.piv.tools/,
  // morgantaylor.mtt@gmail.com). Removing it unverifies the property.
  verification: { google: "9JhjEyumY8W0vDbRGAsb_n62eEdc4B1aUOsq0zbJDg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading headers makes this dynamic, enabling per-request CSP nonces
  // The nonce is automatically applied to scripts by Next.js via x-nonce header;
  // it is forwarded explicitly to the analytics scripts, which are injected at runtime
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
        <CookieConsent nonce={nonce} />
      </body>
    </html>
  );
}
