import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";

  // Next.js requires 'unsafe-inline' for its hydration scripts
  // This is a known limitation - nonce-based CSP requires experimental features
  // Security improvements over permissive defaults:
  // - 'unsafe-eval' only in development (required for HMR), removed in production
  // - connect-src restricted to localhost websockets in dev only
  // - Strict object-src, frame-ancestors, base-uri, form-action
  const cspDirectives = [
    "default-src 'self'",
    // 'unsafe-inline' required for Next.js hydration scripts
    // 'unsafe-eval' required for Turbopack/Webpack HMR in development
    `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isProduction ? "" : " ws://localhost:* wss://localhost:*"}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    "child-src 'self'",
    "frame-src 'none'",
    "manifest-src 'self'",
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ];

  const cspHeader = cspDirectives.join("; ");

  const response = NextResponse.next();

  // Set security headers
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
    ].join(", ")
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-XSS-Protection", "0");

  if (isProduction) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
