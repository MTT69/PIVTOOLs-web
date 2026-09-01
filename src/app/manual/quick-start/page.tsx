'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Cpu } from 'lucide-react';
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

interface StepProps {
  number: string;
  title: string;
  id: string;
  last?: boolean;
  children: React.ReactNode;
}

const Step = ({ number, title, id, last, children }: StepProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative pl-14 sm:pl-16 scroll-mt-24"
    >
      {!last && (
        <div className="absolute left-[15px] sm:left-[19px] top-10 bottom-0 w-px bg-gray-200" />
      )}
      <div className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-soton-gold text-soton-darkblue font-bold text-lg flex items-center justify-center">
        {number}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 pt-1">{title}</h2>
      <div className="pb-14">{children}</div>
    </motion.section>
  );
};

interface CommandLineProps {
  cmd: string;
  label?: string;
}

const CommandLine = ({ cmd, label }: CommandLineProps) => (
  <div className="flex items-center gap-3 font-mono text-sm overflow-x-auto">
    <span className="text-soton-gold select-none" aria-hidden="true">$</span>
    <code className="text-gray-100 whitespace-nowrap">{cmd}</code>
    {label && (
      <span className="ml-auto flex-shrink-0 text-xs uppercase tracking-wide bg-white/10 text-gray-300 px-2 py-0.5 rounded">
        {label}
      </span>
    )}
  </div>
);

const CommandBlock = ({ cmd }: { cmd: string }) => (
  <div className="bg-gray-900 rounded-lg px-4 py-3 mb-3">
    <CommandLine cmd={cmd} />
  </div>
);

interface TerminalRowProps {
  label: string;
  children: React.ReactNode;
}

const TerminalRow = ({ label, children }: TerminalRowProps) => (
  <div className="p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">{label}</p>
    <div className="space-y-2">{children}</div>
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
              From <code className="bg-gray-100 px-2 py-1 rounded text-lg">pip install</code> to
              your first velocity field in four steps. No compiler required.
            </p>
          </motion.div>

          {/* Step 1: Install */}
          <Step number="1" title="Install" id="installation">
            <p className="text-gray-600 mb-4 text-lg">
              Requires <strong className="text-gray-900">Python 3.12, 3.13, or 3.14</strong>.
              All C extensions and dependencies ship pre-compiled.
            </p>
            <div className="bg-gray-900 rounded-xl divide-y divide-white/10 overflow-hidden">
              <TerminalRow label="Create a virtual environment">
                <CommandLine cmd="python3.12 -m venv piv" />
              </TerminalRow>
              <TerminalRow label="Activate it">
                <CommandLine cmd="source piv/bin/activate" label="macOS / Linux" />
                <CommandLine cmd={'piv\\Scripts\\activate'} label="Windows" />
              </TerminalRow>
              <TerminalRow label="Install">
                <CommandLine cmd="pip install pivtools" />
              </TerminalRow>
            </div>
          </Step>

          {/* Step 2: Launch */}
          <Step number="2" title="Launch" id="gui">
            <p className="text-gray-600 mb-4 text-lg">
              Start with the GUI, the CLI, or both — they are two front ends to the same tool.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">GUI</h3>
                <CommandBlock cmd="pivtools-gui" />
                <p className="text-gray-600">
                  Opens a web interface at{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">localhost:5000</code>.
                  Your browser opens automatically.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">CLI</h3>
                <CommandBlock cmd="pivtools-cli init" />
                <p className="text-gray-600">
                  Sets up a workspace in the current directory, ready for the terminal-only
                  workflow.
                </p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <p className="text-green-700">
                Either way, a default{' '}
                <code className="bg-green-100 px-2 py-1 rounded text-sm">config.yaml</code> is
                created in the current directory. The GUI and CLI share this file — configure
                visually, run from the terminal, or the other way round.
              </p>
            </div>
          </Step>

          {/* Step 3: Configure */}
          <Step number="3" title="Point it at your data" id="configure">
            <p className="text-gray-600 mb-4 text-lg">
              Edit <code className="bg-gray-100 px-2 py-1 rounded text-lg">config.yaml</code> to
              set the image source path, the number of cameras, and the file format. In the GUI
              this is the <strong className="text-gray-900">Image Configuration</strong> tab.
            </p>
            <a
              href="/manual/image-configuration"
              className="inline-block bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-3 text-soton-blue font-semibold hover:border-soton-gold transition-colors duration-200"
            >
              Image Configuration guide &rarr;
            </a>
          </Step>

          {/* Step 4: Run PIV */}
          <Step number="4" title="Run PIV" id="cli" last>
            <p className="text-gray-600 mb-4 text-lg">
              Pick the processing mode. Both read the same{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-lg">config.yaml</code>.
            </p>
            <div className="space-y-4 mb-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <CommandBlock cmd="pivtools-cli instantaneous" />
                <p className="text-gray-600">
                  Cross-correlates each image pair. One velocity field per pair.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <CommandBlock cmd="pivtools-cli ensemble" />
                <p className="text-gray-600">
                  Averages correlation planes across all frames before peak detection. One
                  time-averaged velocity field.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <p className="text-blue-700">
                Every command, flag, and workflow — including calibration — is in the{' '}
                <a href="/manual/cli-reference" className="underline font-medium">
                  CLI Reference
                </a>
                .
              </p>
            </div>
          </Step>

          {/* System Requirements Section */}
          <Section title="System Requirements" icon={<Cpu size={32} />} id="requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Supported Platforms</h3>
                <FeatureList items={[
                  "Python 3.12, 3.13, or 3.14",
                  "macOS 15+ (Apple Silicon M1-M4)",
                  "Windows 10/11 (x86_64, AVX2 CPU: Intel 2013+ / AMD 2015+)",
                  "Linux (x86_64, AVX2 CPU: Intel 2013+ / AMD 2015+, glibc 2.28+: RHEL/Alma 8+, Ubuntu 20.04+, Debian 10+)"
                ]} />
                <p className="text-gray-600 text-sm">
                  Older x86 CPUs are refused with a clear error at load time, and on older
                  Linux distros (e.g. CentOS 7, Ubuntu 18.04) pip falls back to the source
                  distribution -- both cases compile from source instead
                  (see the <a href="/manual/developer" className="underline">Developer Guide</a>).
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Bundled C Libraries</h4>
                <div className="space-y-3">
                  {[
                    { title: "libbulkxcorr2d", desc: "SIMD codelet FFT cross-correlation + LM peak fitting (OpenMP)" },
                    { title: "libfusedwarp", desc: "Fused symmetric image warping for multipass deformation (OpenMP)" },
                    { title: "libkspacefit", desc: "k-space transfer-function LM fitter for ensemble PIV, one fit per window (OpenMP)" }
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

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-6 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={20} />
                <h4 className="text-lg font-semibold text-green-800">LaVision Formats (.im7 / .set)</h4>
              </div>
              <p className="text-green-700">
                LaVision formats (<code className="bg-green-100 px-2 py-1 rounded text-sm">.im7</code>,
                <code className="bg-green-100 px-2 py-1 rounded text-sm">.set</code>) are read by a built-in
                pure-Python reader with no <code className="bg-green-100 px-2 py-1 rounded text-sm">lvpyio</code> dependency,
                so they work on macOS, Linux, and Windows alike.
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
