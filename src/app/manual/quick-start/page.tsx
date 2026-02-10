'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Download,
  Terminal,
  CheckCircle,
  Cpu,
  Monitor,
  AlertTriangle,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ManualNavigation from '@/components/ManualNavigation';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
}

const Section = ({ title, children, icon, id }: SectionProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-16 scroll-mt-24"
    >
      <div className="flex items-center gap-4 mb-8">
        {icon && <div className="text-soton-blue">{icon}</div>}
        <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code }: CodeBlockProps) => (
  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
    <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">
      {code}
    </code>
  </div>
);

interface FeatureListProps {
  items: string[];
}

const FeatureList = ({ items }: FeatureListProps) => (
  <ul className="space-y-3 mb-6">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <CheckCircle className="text-soton-gold mt-1 flex-shrink-0" size={20} />
        <span className="text-gray-700 leading-relaxed text-lg">{item}</span>
      </li>
    ))}
  </ul>
);

export default function QuickStartPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ManualNavigation />

      <div className="pt-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Quick <span className="text-soton-gold">Start</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Install PIVTools and start processing in minutes. No compiler required.
            </p>
          </motion.div>

          {/* Installation Section */}
          <Section title="Installation" icon={<Download size={32} />} id="installation">
            <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Install in 3 Steps</h3>
              <p className="text-gray-200 mb-6 text-lg">
                Requires <strong>Python 3.12, 3.13, or 3.14</strong>. All C extensions and dependencies are pre-compiled.
              </p>
              <CodeBlock code={`# 1. Create a virtual environment
python3.12 -m venv piv

# 2. Activate it
source piv/bin/activate        # macOS/Linux
piv\\Scripts\\activate           # Windows

# 3. Install
pip install pivtools`} />
            </div>
          </Section>

          {/* Launch GUI Section */}
          <Section title="Launch the GUI" icon={<Monitor size={32} />} id="gui">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
              <CodeBlock code="pivtools-gui" />
              <p className="text-gray-600 mb-4">
                Opens a web interface at <code className="bg-gray-100 px-2 py-1 rounded text-sm">localhost:5000</code>.
                Your browser opens automatically.
              </p>
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <p className="text-green-700">
                  On first launch, a default <code className="bg-green-100 px-2 py-1 rounded text-sm mx-1">config.yaml</code> is
                  created in the current directory. The GUI and CLI share this file.
                </p>
              </div>
            </div>
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Initialise Workspace</h4>
                <CodeBlock code="pivtools-cli init" />
                <p className="text-gray-600">
                  Creates an editable <code className="bg-gray-100 px-2 py-1 rounded text-sm">config.yaml</code> in the
                  current directory. Edit this to set image paths, camera setup, and processing parameters.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Instantaneous PIV</h4>
                <CodeBlock code="pivtools-cli instantaneous" />
                <p className="text-gray-600">
                  Per-frame cross-correlation. One velocity field per image pair.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Ensemble PIV</h4>
                <CodeBlock code="pivtools-cli ensemble" />
                <p className="text-gray-600">
                  Averages correlation planes across all frames before peak detection. Single time-averaged velocity field.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <p className="text-blue-700">
                The GUI and CLI share the same <code className="bg-blue-100 px-2 py-1 rounded text-sm">config.yaml</code>.
                Configure visually in the GUI, then run via CLI -- or vice versa.
                See the <a href="/manual/cli-reference" className="underline font-medium">CLI Reference</a> for all commands.
              </p>
            </div>
          </Section>

          {/* System Requirements Section */}
          <Section title="System Requirements" icon={<Cpu size={32} />} id="requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Supported Platforms</h3>
                <FeatureList items={[
                  "Python 3.12, 3.13, or 3.14",
                  "macOS 15+ (Apple Silicon M1-M4)",
                  "Windows 10/11 (x86_64)",
                  "Linux (x86_64)"
                ]} />
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Bundled C Libraries</h4>
                <div className="space-y-3">
                  {[
                    { title: "libbulkxcorr2d", desc: "FFT cross-correlation (FFTW3 + OpenMP)" },
                    { title: "libmarquadt", desc: "Gaussian peak fitting (GSL + OpenMP)" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-soton-gold mt-1 flex-shrink-0" size={18} />
                      <div>
                        <h5 className="font-semibold text-gray-900 font-mono text-sm">{item.title}</h5>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">macOS Limitation</h4>
              </div>
              <p className="text-yellow-700">
                LaVision formats (<code className="bg-yellow-100 px-2 py-1 rounded text-sm">.im7</code>,
                <code className="bg-yellow-100 px-2 py-1 rounded text-sm">.set</code>) require the <code className="bg-yellow-100 px-2 py-1 rounded text-sm">lvpyio</code> library,
                available on Windows and Linux only. macOS users should export calibration images to TIFF.
              </p>
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Configure?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Set up your image paths, camera configuration, and file formats.
            </p>
            <a
              href="/manual/image-configuration"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Image Configuration Guide
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
