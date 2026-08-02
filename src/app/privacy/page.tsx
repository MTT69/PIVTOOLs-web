import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Privacy & Cookies - PIVtools',
  description:
    'How the PIVtools website handles analytics cookies and personal data, and how to change your cookie choice.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy &amp; <span className="text-soton-gold">Cookies</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            This page explains what the PIVtools website collects, why, and how to change
            your mind. The short version is that we count visits anonymously without storing
            anything on your device, and we only set cookies if you accept them.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              What we collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This site uses Google Analytics 4 to record anonymous usage statistics. That
              covers which pages are viewed, roughly where in the world visitors are, which
              browser and device type they use, and how they arrived at the site.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By default this runs in a cookieless mode. Nothing is stored on or read from
              your device, and the measurements carry no identifier that would let us
              recognise you on a later visit. We rely on our legitimate interest in knowing
              which parts of the documentation are actually read, and you can object at any
              time using the controls below.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you accept cookies, we can additionally tell repeat visits apart, which makes
              the visitor counts more accurate. We do not attempt to identify individual
              visitors, we run no advertising, and advertising signals are permanently
              disabled. Data is not sold or shared with anyone beyond Google acting as our
              analytics processor.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Cookies we set
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              No analytics cookies are set unless you press Accept. Declining leaves your
              browser untouched, and anonymous cookieless measurement continues unless you
              also opt out below.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Retention</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-mono">_ga</td>
                    <td className="px-4 py-3">
                      Distinguishes one browser from another so repeat visits are not
                      double-counted. Only set after you accept
                    </td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-mono">_ga_8M59P7YDJG</td>
                    <td className="px-4 py-3">
                      Maintains the analytics session state for this site. Only set after you
                      accept
                    </td>
                    <td className="px-4 py-3">2 years</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-mono">pivtools-cookie-consent</td>
                    <td className="px-4 py-3">
                      Remembers your choice above. Stored in your browser&apos;s local
                      storage, never sent to a server, and set whether you accept or decline
                    </td>
                    <td className="px-4 py-3">Until cleared</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Changing your mind
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You can withdraw or grant cookie consent at any time. This clears your stored
              choice and brings the banner back. Clearing your browser cookies and site data
              for this domain has the same effect and also removes any analytics cookies
              already set.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              You can also object to analytics altogether. Opting out stops the cookieless
              measurement as well, and no analytics code is loaded on any page. Both settings
              are stored in this browser, so they need setting again on other devices.
            </p>
            <CookieSettingsButton />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Who is responsible
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The data controller is the University of Southampton. For any question about
              this site&apos;s use of data, or to exercise your rights under UK GDPR, contact{' '}
              <a
                href="mailto:M.T.Taylor@soton.ac.uk"
                className="text-soton-blue hover:text-soton-darkblue underline transition-colors duration-200"
              >
                M.T.Taylor@soton.ac.uk
              </a>
              . The University&apos;s central privacy notice is available at{' '}
              <a
                href="https://www.southampton.ac.uk/about/governance/policies/privacy-notice"
                className="text-soton-blue hover:text-soton-darkblue underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                southampton.ac.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              The PIVtools software
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This notice covers the website only. The PIVtools application itself runs
              locally on your own machine, collects no telemetry, and sends nothing to us.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
