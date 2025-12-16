import type { Metadata, Viewport } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
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

export const metadata: Metadata = {
  title: "PIVTOOLS - High-Performance PIV Processing",
  description: "PIVTOOLS is a Python-based 2D planar and stereo PIV processing code, accelerated with C-MEX extensions for superior performance.",
  keywords: "PIV, Particle Image Velocimetry, Python, Image Processing, Fluid Dynamics, University of Southampton",
  authors: [{ name: "University of Southampton" }],
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
  // The nonce is automatically applied to scripts by Next.js via x-nonce header
  await headers();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
