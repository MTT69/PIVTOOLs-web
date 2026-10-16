import { manualMetadata } from "@/data/manualPages";

// page.tsx is a client component, so its metadata lives here.
export const metadata = manualMetadata("planar-calibration");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
