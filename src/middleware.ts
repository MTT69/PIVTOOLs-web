import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Google Analytics 4 endpoints. Hits go to *.google-analytics.com/g/collect via
// sendBeacon/fetch (connect-src) with an image-pixel fallback (img-src); regional
// collection uses region*.google-analytics.com and *.analytics.google.com.
// Without these the tag loads but every hit is dropped by the CSP.
const GA_HOSTS =
  "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com";

// gtag.js origin. 'strict-dynamic' already covers it in CSP Level 3 browsers, since
// next/script injects the tag from an already-trusted script. This is the fallback for
// CSP Level 2 browsers, which ignore 'strict-dynamic' and honour the host allowlist.
const GA_SCRIPT_HOST = "https://www.googletagmanager.com";

export function middleware(request: NextRequest) {
  // Generate cryptographic nonce for each request
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isProduction = process.env.NODE_ENV === "production";

  // Build strict CSP with nonce - NO unsafe-inline or unsafe-eval
  const cspDirectives = [
    "default-src 'self'",
    // Nonce-based script loading - 'strict-dynamic' allows scripts loaded by nonced scripts
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${GA_SCRIPT_HOST}${isProduction ? "" : " 'unsafe-eval'"}`,
    // 'unsafe-inline' for styles is acceptable - CSS injection cannot execute JS
    // This is necessary for Tailwind CSS and is low security risk
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${GA_HOSTS}`,
    "font-src 'self'",
    `connect-src 'self' ${GA_HOSTS}${isProduction ? "" : " ws://localhost:* wss://localhost:*"}`,
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

  // Pass nonce to the application via request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

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
