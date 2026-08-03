'use client';

import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import Script from 'next/script';

/** GA4 measurement ID for the piv.tools stream. Public by design - it ships in the page. */
const GA_MEASUREMENT_ID = 'G-8M59P7YDJG';

/** localStorage key holding the visitor's analytics choice. */
export const CONSENT_STORAGE_KEY = 'pivtools-cookie-consent';

/**
 * Stored analytics choice.
 *
 * - `granted`  - cookies allowed, full GA4
 * - `denied`   - no cookies, anonymous cookieless measurement continues
 * - `objected` - analytics suppressed entirely, GA is never loaded
 *
 * `objected` is the effective objection to the legitimate-interests basis that cookieless
 * measurement relies on. It is set from the privacy page, not the banner.
 */
type Consent = 'granted' | 'denied' | 'objected';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Inline GA bootstrap, run before gtag.js processes the dataLayer queue.
 *
 * Consent Mode v2 requires the consent defaults to be queued ahead of the config call, which
 * is why this is hand-rolled rather than using @next/third-parties - that component emits its
 * own init with no hook to insert anything before its gtag('config') call.
 *
 * With analytics_storage denied, GA4 runs cookieless. It writes nothing to the device and
 * sends no persistent identifier, so PECR regulation 6 is not engaged and the pings need no
 * consent. Accepting the banner flips the flag to granted and normal cookie-based analytics
 * resume.
 *
 * The stored choice is read synchronously here so a returning visitor who already accepted is
 * granted on their very first hit, with no denied-then-upgraded first pageview.
 *
 * Advertising signals are pinned denied permanently - this site carries no advertising.
 */
const GA_INIT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var stored = 'denied';
try {
  if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') stored = 'granted';
} catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: stored
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`;

/**
 * Read the stored consent choice.
 *
 * Returns null when no choice has been made yet, or when localStorage is unavailable
 * (Safari private browsing throws on access). An unreadable store is treated as "no choice",
 * which shows the banner and leaves analytics in the cookieless denied state.
 */
function readConsent(): Consent | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' || stored === 'objected'
      ? stored
      : null;
  } catch {
    return null;
  }
}

/**
 * Suppress analytics entirely for this browser.
 *
 * This is the objection mechanism for the cookieless measurement that otherwise runs under
 * legitimate interests. Once set, neither GA script is rendered at all.
 */
export function optOutOfAnalytics(): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'objected');
  } catch {
    // Nothing more we can do - without storage the choice cannot persist across page loads.
  }
}

/**
 * Clear the stored consent choice so the banner is shown again.
 *
 * Used by the privacy page to let visitors withdraw consent as easily as they gave it,
 * as required by GDPR Article 7(3).
 */
export function resetCookieConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Nothing to clear if the store is unavailable - the banner will show regardless.
  }
}

interface CookieConsentProps {
  /** Per-request CSP nonce, forwarded to the GA scripts. */
  nonce?: string;
}

/**
 * Cookie banner controlling GA4 storage consent.
 *
 * Analytics load for every visitor, but start in Consent Mode's cookieless denied state.
 * The banner grants or explicitly re-denies device storage; it does not gate whether
 * measurement happens at all. Anonymous, cookieless measurement of decliners relies on
 * legitimate interests, and the privacy page carries the route to object to it.
 */
export default function CookieConsent({ nonce }: CookieConsentProps) {
  const [consent, setConsent] = useState<Consent | null>(null);
  // localStorage is unavailable during SSR, so the banner must not render until after mount
  // or the first client render will not match the server's.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);
  }, []);

  const choose = (choice: 'granted' | 'denied') => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Choice cannot be persisted, but honour it for this page view at least.
    }
    window.gtag?.('consent', 'update', { analytics_storage: choice });
    setConsent(choice);
  };

  // Analytics are suppressed outright for visitors who have objected, so the scripts are
  // gated on the stored choice and therefore cannot render until it has been read.
  const analyticsAllowed = mounted && consent !== 'objected';

  return (
    <>
      {analyticsAllowed && (
        <>
          <Script
            id="ga-init"
            nonce={nonce}
            dangerouslySetInnerHTML={{ __html: GA_INIT_SCRIPT }}
          />
          <Script
            id="ga-loader"
            nonce={nonce}
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
        </>
      )}

      {mounted && consent === null && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          className="fixed bottom-0 inset-x-0 z-50 animate-slide-up"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="bg-soton-darkblue text-white rounded-lg shadow-2xl border border-white/10 p-5 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                <div className="flex-1">
                  <h2
                    id="cookie-consent-heading"
                    className="flex items-center gap-2 text-base font-semibold mb-2"
                  >
                    <Cookie size={18} className="text-soton-gold shrink-0" />
                    Analytics cookies
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We count visits anonymously to see which parts of the documentation get
                    read. That much sets nothing on your device. Accepting additionally allows
                    analytics cookies, which lets us tell repeat visits apart. Declining
                    changes nothing about how the site works. See our{' '}
                    <a
                      href="/privacy"
                      className="text-soton-gold hover:text-yellow-300 underline transition-colors duration-200"
                    >
                      Privacy &amp; Cookies
                    </a>{' '}
                    page for details and how to opt out entirely.
                  </p>
                </div>

                <div className="flex gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => choose('denied')}
                    className="flex-1 lg:flex-none px-5 py-2.5 rounded-md text-sm font-medium border border-gray-500 text-gray-200 hover:bg-white/10 transition-colors duration-200"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={() => choose('granted')}
                    className="flex-1 lg:flex-none px-5 py-2.5 rounded-md text-sm font-semibold bg-soton-gold text-soton-darkblue hover:bg-yellow-300 transition-colors duration-200"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
