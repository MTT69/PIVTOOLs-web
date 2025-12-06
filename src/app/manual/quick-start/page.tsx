'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Download,
  Terminal,
  CheckCircle,
  Package,
  Cpu,
  Monitor,
  AlertTriangle,
  Rocket
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
              Get PIVTools up and running in minutes with pre-compiled binaries. No compiler required.
            </p>
          </motion.div>

          {/* Installation Section */}
          <Section title="Installation" icon={<Download size={32} />} id="installation">
            <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Install PIVTools in 3 Steps</h3>
              <p className="text-gray-200 mb-6 text-lg">
                PIVTools is distributed via PyPI with all dependencies pre-compiled. Create a virtual environment
                using <strong>Python 3.12 or 3.13</strong> for compatibility.
              </p>
              <CodeBlock code={`# Step 1: Create a virtual environment (Python 3.12 or 3.13 required)
python3.12 -m venv piv
# or: python3.13 -m venv piv

# Step 2: Activate it
# On Windows:
piv\\Scripts\\activate

# On macOS/Linux:
source piv/bin/activate

# Step 3: Install PIVTools
pip install pivtools`} />
              <p className="text-gray-300 text-sm">
                That&apos;s it! PIVTools is now ready to use with both GUI and CLI interfaces.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">What&apos;s Included</h4>
              </div>
              <p className="text-blue-700 mb-4">
                On <code className="bg-blue-100 px-2 py-1 rounded text-sm">pip install</code>, you get:
              </p>
              <FeatureList items={[
                "Pre-compiled C extensions for cross-correlation and peak fitting",
                "FFTW3 and GSL libraries bundled for all platforms",
                "Web-based GUI (React) served via Flask",
                "Command-line interface for batch processing",
                "Default configuration file ready to edit"
              ]} />
            </div>
          </Section>

          {/* Launch GUI Section */}
          <Section title="Launch the GUI" icon={<Monitor size={32} />} id="gui">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
              <CodeBlock code="pivtools-gui" />
              <p className="text-gray-600 mb-4">
                Opens a web-based interface at <code className="bg-gray-100 px-2 py-1 rounded text-sm">localhost:5000</code>.
                Your browser will open automatically.
              </p>
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <p className="text-green-700">
                  <strong>Default Configuration:</strong> On first launch, PIVTools creates a default
                  <code className="bg-green-100 px-2 py-1 rounded text-sm mx-1">config.yaml</code>
                  in the current directory. Use the GUI to configure file locations, image formats, and processing
                  settings - your changes are automatically saved.
                </p>
              </div>
            </div>

            {/* [IMAGE PLACEHOLDER: GUI screenshot showing the setup tab] */}
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
              <CodeBlock code="pivtools-cli init" />
              <p className="text-gray-600 mb-4">
                Creates an editable <code className="bg-gray-100 px-2 py-1 rounded text-sm">config.yaml</code> in your
                current directory for command-line processing.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Package className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Shared Configuration</h4>
              </div>
              <p className="text-blue-700">
                Both the GUI and CLI share the same <code className="bg-blue-100 px-2 py-1 rounded text-sm">config.yaml</code> file.
                Changes made in the GUI are automatically available when you run the CLI, and vice versa.
                This allows you to configure complex setups visually and then run processing in batch mode.
              </p>
            </div>
          </Section>

          {/* System Requirements Section */}
          <Section title="System Requirements" icon={<Cpu size={32} />} id="requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Supported Platforms</h3>
                <FeatureList items={[
                  "Python 3.12 or 3.13 (required)",
                  "macOS 15+ (Apple Silicon M1/M2/M3/M4)",
                  "Windows 10/11 (x86_64)",
                  "Linux (x86_64)"
                ]} />
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Pre-compiled Libraries</h4>
                <div className="space-y-3">
                  {[
                    { title: "libbulkxcorr2d", desc: "FFT-based cross-correlation using FFTW3" },
                    { title: "libmarquadt", desc: "Gaussian peak fitting using GSL" },
                    { title: "libpeak_locate_lm", desc: "Levenberg-Marquardt peak localization" }
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
                LaVision proprietary formats (<code className="bg-yellow-100 px-2 py-1 rounded text-sm">.im7</code>,
                <code className="bg-yellow-100 px-2 py-1 rounded text-sm">.set</code>) are <strong>not supported on macOS</strong> due
                to library limitations. These formats require Windows-specific DLLs from LaVision DaVis.
                Use standard image formats (<code className="bg-yellow-100 px-2 py-1 rounded text-sm">.tif</code>,
                <code className="bg-yellow-100 px-2 py-1 rounded text-sm">.png</code>) on macOS, or run PIVTools on Windows/Linux for LaVision files.
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
              Learn how to set up your image paths, camera configuration, and file formats.
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
