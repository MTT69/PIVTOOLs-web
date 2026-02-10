'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  GitBranch,
  Terminal,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Play,
  Cpu,
  Bot
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
              Developer <span className="text-soton-gold">Guide</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Build from source, modify the GUI, and contribute to PIVTools.
            </p>
          </motion.div>

          {/* Getting the Source */}
          <Section title="Getting the Source" icon={<GitBranch size={32} />} id="clone">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools is split across two repositories.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Backend + Processing</h4>
                <p className="text-gray-600 mb-4">
                  Flask server, PIV processing engine, C extensions, and CLI.
                </p>
                <CodeBlock code={`git clone https://github.com/MTT69/python-PIVTOOLs.git
cd python-PIVTOOLs`} />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Frontend (React)</h4>
                <p className="text-gray-600 mb-4">
                  Next.js web interface. Only needed if you want to modify the GUI.
                </p>
                <CodeBlock code={`git clone https://github.com/MTT69/PIVTOOLs-GUI.git
cd PIVTOOLs-GUI`} />
              </div>
            </div>
          </Section>

          {/* Building C Extensions */}
          <Section title="Building C Extensions" icon={<Cpu size={32} />} id="c-extensions">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools includes two C libraries compiled via <code className="bg-gray-100 px-2 py-1 rounded">setup.py</code>.
              Pre-compiled static libraries for FFTW3 and GSL are bundled for all platforms
              in <code className="bg-gray-100 px-2 py-1 rounded">static_fftw/</code> and <code className="bg-gray-100 px-2 py-1 rounded">static_gsl/</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { name: "libbulkxcorr2d", desc: "FFT-based cross-correlation (FFTW3 + OpenMP)" },
                { name: "libmarquadt", desc: "Gaussian peak fitting (GSL + OpenMP)" }
              ].map((lib, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <code className="text-soton-blue font-mono text-sm">{lib.name}</code>
                  <p className="text-gray-600 text-sm mt-2">{lib.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Build Steps</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Install the package in editable mode, then compile the C extensions separately:
            </p>
            <CodeBlock code={`# Install dependencies in editable mode
pip install -e .

# Compile C extensions
python setup.py build`} />

            {/* Platform Requirements */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Platform Requirements</h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 pr-4 text-gray-900 font-semibold">Platform</th>
                    <th className="py-3 pr-4 text-gray-900 font-semibold">Compiler</th>
                    <th className="py-3 text-gray-900 font-semibold">Setup</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium">macOS</td>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">gcc-15</code> (Homebrew)</td>
                    <td className="py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">brew install gcc</code></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium">Windows</td>
                    <td className="py-3 pr-4">MSVC (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm">cl</code>)</td>
                    <td className="py-3">Visual Studio with &quot;Desktop development with C++&quot; workload</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Linux</td>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">gcc</code></td>
                    <td className="py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">sudo apt install build-essential</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-red-600" size={20} />
                <h4 className="text-lg font-semibold text-red-800">Windows: x64 Native Tools Command Prompt Required</h4>
              </div>
              <p className="text-red-700 mb-3">
                All commands (<code className="bg-red-100 px-1 rounded">pip install -e .</code> and <code className="bg-red-100 px-1 rounded">python setup.py build</code>) <strong>must</strong> be
                run from the <strong>x64 Native Tools Command Prompt for VS</strong>. The standard Command Prompt, PowerShell, and VS Code terminal will not work.
              </p>
              <p className="text-red-700 text-sm">
                Find it in Start Menu &rarr; Visual Studio &rarr; <strong>x64 Native Tools Command Prompt for VS 2022</strong>.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
              <h4 className="text-lg font-semibold text-green-800 mb-2">End Users: No Compiler Needed</h4>
              <p className="text-green-700">
                PyPI wheels ship with pre-compiled <code className="bg-green-100 px-1 rounded">.dll</code>/<code className="bg-green-100 px-1 rounded">.so</code> files.
                Running <code className="bg-green-100 px-2 py-1 rounded">pip install pivtools</code> just works.
              </p>
            </div>
          </Section>

          {/* GUI Development */}
          <Section title="GUI Development" icon={<Terminal size={32} />} id="gui-dev">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The GUI is a Next.js React app served as static files by the Flask backend.
            </p>

            <CodeBlock code={`# Clone and install
git clone https://github.com/MTT69/PIVTOOLs-GUI.git
cd PIVTOOLs-GUI
npm install

# Development server with hot reload
npm run dev

# Build for production
npm run build`} />

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Deploying GUI Changes</h4>
              <p className="text-blue-700 mb-2">
                After building, deploy the compiled output to the backend:
              </p>
              <ol className="list-decimal list-inside text-blue-700 space-y-1">
                <li>Run <code className="bg-blue-100 px-1 rounded">npm run build</code> to create the <code className="bg-blue-100 px-1 rounded">out/</code> folder</li>
                <li>Copy <code className="bg-blue-100 px-1 rounded">out/</code> to <code className="bg-blue-100 px-1 rounded">python-PIVTOOLs/pivtools_gui/</code></li>
                <li>Rename it to <code className="bg-blue-100 px-1 rounded">static</code> (replacing the existing folder)</li>
                <li>Run <code className="bg-blue-100 px-1 rounded">pivtools-gui</code> to see your changes</li>
              </ol>
            </div>
          </Section>

          {/* AI-Assisted Development */}
          <Section title="AI-Assisted Development" icon={<Bot size={32} />} id="ai-development">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The repository includes <code className="bg-gray-100 px-2 py-1 rounded">CLAUDE.md</code>, a comprehensive
              reference file that serves as the single source of truth for the entire codebase architecture.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">What CLAUDE.md Contains</h4>
              <p className="text-gray-600 mb-4">
                At ~1200 lines, it documents:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Feature-to-file map (backend modules, frontend hooks, components)",
                  "All REST API routes with parameters and return types",
                  "Every config.yaml property with types and defaults",
                  "Processing pipeline architecture (Dask, sliding window I/O)",
                  "C extension function signatures and array conventions",
                  "Data formats (.mat structure, directory layout)",
                  "Build system details (setup.py, static libraries, CI/CD)",
                  "Code conventions and architectural patterns"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-soton-gold mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Point-and-Shoot Development</h4>
              <p className="text-gray-700 mb-3">
                Give any AI coding assistant (Claude Code, Cursor, Copilot, etc.) access to the codebase and it can
                understand the full architecture immediately. No onboarding needed.
              </p>
              <p className="text-gray-600 text-sm">
                The file maps every feature to its exact files, every route to its handler, and every config key
                to its purpose. An AI assistant can navigate the codebase, add features, fix bugs, and refactor
                code with full context from the start.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Keep It Updated</h4>
              </div>
              <p className="text-yellow-700">
                When making changes to the codebase, update <code className="bg-yellow-100 px-1 rounded">CLAUDE.md</code> to
                reflect new routes, config keys, or architectural changes. It is the documentation that makes
                AI-assisted development work.
              </p>
            </div>
          </Section>

          {/* Running the Code */}
          <Section title="Running the Code" icon={<Play size={32} />} id="running">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After building from source, PIVTools provides two interfaces. Both use the same <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI</h4>
                <CodeBlock code={`pivtools-gui
# or
python pivtools_gui/app.py`} />
                <p className="text-gray-500 text-sm">
                  Opens at <code className="bg-gray-100 px-1 rounded">localhost:5000</code>
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">CLI</h4>
                <CodeBlock code={`pivtools-cli <command>
# e.g. instantaneous, ensemble,
# detect-planar, statistics, etc.`} />
                <p className="text-gray-500 text-sm">
                  See <a href="/manual/cli-reference" className="text-soton-blue hover:underline">CLI Reference</a> for all commands
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600">
                Changes made in the GUI are saved to <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>.
                The CLI reads from the same file, so you can configure in the GUI and run batch processing from the terminal.
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
