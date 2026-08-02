'use client';

import { RotateCcw, Ban } from 'lucide-react';
import { optOutOfAnalytics, resetCookieConsent } from '@/components/CookieConsent';

/**
 * Analytics controls for the privacy page.
 *
 * Two distinct actions. Resetting brings the cookie banner back so the visitor can change
 * their storage choice, satisfying GDPR Article 7(3). Opting out suppresses analytics
 * entirely, which is the objection route for the anonymous cookieless measurement that
 * otherwise runs under legitimate interests.
 *
 * Both reload so the change takes effect immediately rather than on next navigation.
 */
export default function CookieSettingsButton() {
  const handleReset = () => {
    resetCookieConsent();
    window.location.reload();
  };

  const handleOptOut = () => {
    optOutOfAnalytics();
    window.location.reload();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        type="button"
        onClick={handleReset}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold bg-soton-blue text-white hover:bg-soton-darkblue transition-colors duration-200"
      >
        <RotateCcw size={16} />
        Change your cookie choice
      </button>
      <button
        type="button"
        onClick={handleOptOut}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        <Ban size={16} />
        Opt out of analytics entirely
      </button>
    </div>
  );
}
