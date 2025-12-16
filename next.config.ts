import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers handled by middleware.ts with nonce generation
  experimental: {
    // Enable strict CSP with nonces
  },
};

export default nextConfig;
