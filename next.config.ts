import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers are now handled by middleware.ts
  // which allows for per-request nonce generation for CSP
};

export default nextConfig;
