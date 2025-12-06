'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GitBranch,
  Terminal,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Apple,
  Monitor as Windows,
  Server,
  Play
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
  title?: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => (
  <div className="mb-6">
    {title && (
      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg text-sm font-mono">
        {title}
      </div>
    )}
    <div className={`bg-gray-900 ${title ? 'rounded-b-lg' : 'rounded-lg'} p-6 overflow-x-auto`}>
      <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">
        {code}
      </code>
    </div>
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

export default function DeveloperPage() {
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
              Developer <span className="text-soton-gold">Installation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Build PIVTools from source for development, customization, or contribution.
            </p>
          </motion.div>

          {/* Clone Repository Section */}
          <Section title="Clone Repository" icon={<GitBranch size={32} />} id="clone">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-600 mb-4">
                For developers who want to modify PIVTools or contribute to the project:
              </p>
              <CodeBlock code={`# Clone the backend repository
git clone https://github.com/MTT69/python-PIVTOOLs.git
cd python-PIVTOOLs`} />
            </div>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400 mb-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Included Static Libraries</h4>
              <p className="text-green-700 mb-4">
                The repository includes pre-compiled static libraries for <strong>FFTW3</strong> and <strong>GSL</strong>
                for <strong>all supported operating systems</strong> (macOS, Windows, Linux). This means if you have a compiler
                set up on your system, you can simply run <code className="bg-green-100 px-2 py-1 rounded">pip install -e .</code> and
                the C libraries will be compiled automatically in the correct location.
              </p>
              <p className="text-green-600 text-sm">
                See <code className="bg-green-100 px-1 rounded">setup.py</code> in the repository root if you need to modify the build process.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">C Extension Modules</h4>
              <p className="text-blue-700 mb-4">
                The following C libraries are compiled during installation:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "libbulkxcorr2d", desc: "FFT-based cross-correlation" },
                  { name: "libmarquadt", desc: "Gaussian peak fitting" },
                  { name: "libpeak_locate_lm", desc: "Levenberg-Marquardt peak localization" }
                ].map((lib, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <code className="text-soton-blue font-mono text-sm">{lib.name}</code>
                    <p className="text-gray-600 text-sm mt-2">{lib.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* macOS Setup Section */}
          <Section title="macOS Setup" icon={<Apple size={32} />} id="macos">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Requirements</h4>
              </div>
              <p className="text-gray-600 mb-4">
                With Homebrew installed, you only need GCC:
              </p>
              <CodeBlock code="brew install gcc" />
              <p className="text-gray-600">
                The build system looks for <code className="bg-gray-100 px-1 rounded">gcc-15</code> at
                <code className="bg-gray-100 px-1 rounded ml-1">/opt/homebrew/bin/gcc-15</code>.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Build from Source</h4>
              <p className="text-gray-600 mb-4">
                From the default Terminal, navigate to the repository root and run:
              </p>
              <CodeBlock code={`# From the repository root directory
pip install -e .`} />
              <p className="text-gray-600">
                This installs all Python dependencies and compiles the C extension modules using the bundled
                FFTW3 and GSL static libraries.
              </p>
            </div>
          </Section>

          {/* Windows Setup Section */}
          <Section title="Windows Setup" icon={<Windows size={32} />} id="windows">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Requirements</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Install Visual Studio with C++ build tools (Desktop development with C++).
              </p>
              <FeatureList items={[
                "Visual Studio 2019 or newer",
                "Desktop development with C++ workload",
                "Windows 10/11 SDK"
              ]} />
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Important: Use x64 Native Tools Command Prompt</h4>
              </div>
              <p className="text-yellow-700">
                You <strong>must</strong> build from the <strong>x64 Native Tools Command Prompt for VS</strong>,
                not the standard Command Prompt or PowerShell. Find it in your Start Menu under Visual Studio.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Build from Source</h4>
              <CodeBlock code={`# Open "x64 Native Tools Command Prompt for VS"
# Navigate to the repository root
cd C:\\path\\to\\python-PIVTOOLs

# Install and build
pip install -e .`} title="x64 Native Tools Command Prompt" />
              <p className="text-gray-600">
                The FFTW and GSL binaries are included in the <code className="bg-gray-100 px-1 rounded">static_fftw</code> and
                <code className="bg-gray-100 px-1 rounded ml-1">static_gsl</code> folders within the repository.
              </p>
            </div>
          </Section>

          {/* Linux Setup Section */}
          <Section title="Linux Setup" icon={<Server size={32} />} id="linux">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Requirements</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Ensure you have GCC installed. On most distributions:
              </p>
              <CodeBlock code={`# Ubuntu/Debian
sudo apt install build-essential

# Fedora/RHEL
sudo dnf install gcc gcc-c++ make

# Arch Linux
sudo pacman -S base-devel`} />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Build from Source</h4>
              <CodeBlock code={`# From the repository root directory
pip install -e .`} />
              <p className="text-gray-600">
                The bundled static libraries handle FFTW3 and GSL dependencies automatically.
              </p>
            </div>
          </Section>

          {/* GUI Development Section */}
          <Section title="GUI Development" icon={<Terminal size={32} />} id="gui-dev">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <p className="text-gray-600 mb-4">
                The GUI is built with React/Next.js and served by the Flask backend. To modify the GUI:
              </p>
              <CodeBlock code={`# Clone the GUI repository
git clone https://github.com/MTT69/PIVTOOLs-GUI.git
cd PIVTOOLs-GUI

# Install dependencies
npm install

# Development server (hot reload)
npm run dev

# Build for production
npm run build`} />
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Deploying GUI Changes</h4>
              <p className="text-blue-700 mb-4">
                After making changes to the frontend, run <code className="bg-blue-100 px-2 py-1 rounded">npm run build</code>.
                This creates an <code className="bg-blue-100 px-2 py-1 rounded">out</code> folder containing the compiled static files.
              </p>
              <p className="text-blue-700">
                To deploy your changes:
              </p>
              <ol className="list-decimal list-inside text-blue-700 mt-2 space-y-1">
                <li>Copy the <code className="bg-blue-100 px-1 rounded">out</code> folder to <code className="bg-blue-100 px-1 rounded">python-PIVTOOLs/pivtools_gui/</code></li>
                <li>Rename <code className="bg-blue-100 px-1 rounded">out</code> to <code className="bg-blue-100 px-1 rounded">static</code> (replacing the existing static folder)</li>
                <li>Run <code className="bg-blue-100 px-1 rounded">app.py</code> to see your changes in the GUI</li>
              </ol>
            </div>
          </Section>

          {/* Running the Code Section */}
          <Section title="Running the Code" icon={<Play size={32} />} id="running">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After building from source, you have two ways to run PIVTools:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI Mode</h4>
                <p className="text-gray-600 mb-4">
                  Run <code className="bg-gray-100 px-2 py-1 rounded">app.py</code> to start the Flask server and open the web-based GUI:
                </p>
                <CodeBlock code={`# From the repository root
python pivtools_gui/app.py`} />
                <p className="text-gray-500 text-sm">
                  Opens at <code className="bg-gray-100 px-1 rounded">localhost:5000</code>
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Command Line Mode</h4>
                <p className="text-gray-600 mb-4">
                  Run <code className="bg-gray-100 px-2 py-1 rounded">example.py</code> to execute PIV processing from the command line:
                </p>
                <CodeBlock code={`# From the repository root
python example.py`} />
                <p className="text-gray-500 text-sm">
                  Uses <code className="bg-gray-100 px-1 rounded">config.yaml</code> to determine what to run
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Configuration File</h4>
              <p className="text-gray-600">
                Both GUI and command line modes use the same <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> file
                to determine processing parameters. Changes made in the GUI are saved to this file, and the command line reads from it.
                This allows you to configure complex setups visually and then run batch processing from the terminal.
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
