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
              PIVTools includes three C libraries compiled via <code className="bg-gray-100 px-2 py-1 rounded">setup.py</code>.
              There are <strong>no external C dependencies</strong> -- the FFT engine is a
              code-generated SIMD codelet kernel and the peak fitter is a hand-rolled
              Levenberg-Marquardt, so FFTW and GSL are not needed (the whole package is
              BSD-3, with no copyleft libraries linked). The only requirement is an
              OpenMP-capable <strong>clang</strong> toolchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { name: "libbulkxcorr2d", desc: "SIMD codelet FFT cross-correlation + LM peak fitting (OpenMP)" },
                { name: "libfusedwarp", desc: "Fused symmetric image warping for multipass deformation (OpenMP)" },
                { name: "libkspacefit", desc: "k-space transfer-function LM fitter for ensemble PIV, one fit per window (OpenMP). Built as its own library because it must compile with no architecture or SIMD flags." }
              ].map((lib, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <code className="text-soton-blue font-mono text-sm">{lib.name}</code>
                  <p className="text-gray-600 text-sm mt-2">{lib.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Build Steps</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Install the package in editable mode (this compiles the C extensions), with
              the optional dev/cine extras for tests and Phantom .cine support:
            </p>
            <CodeBlock code={`# Editable install -- compiles all three C libraries into pivtools_cli/lib/
pip install -e ".[dev,cine]"

# Recompile the C extensions after editing C sources
python setup.py build`} />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-6">
              <p className="text-blue-700 text-sm">
                The Python side loads the compiled libraries via <code className="bg-blue-100 px-1 rounded">ctypes</code> by
                absolute path from <code className="bg-blue-100 px-1 rounded">pivtools_cli/lib/</code>, so a rebuild is
                picked up <strong>without reinstalling</strong> -- just restart the GUI/CLI. Nothing recompiles
                automatically after a C edit, so always rebuild before running.
              </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              The FFT engine is generated for a fixed set of interrogation window sizes --
              <strong> 8, 12, 16, 24, 32, 48, 64, 96, 128</strong>. Config validation rejects any
              other window size at load time, with one exception: on an ensemble
              <code className="bg-gray-100 px-1 rounded">single</code>-mode pass the window size is a Frame-A mask
              support rather than an FFT length, so 4 and 6 are also accepted there.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Builds never use <code className="bg-gray-100 px-1 rounded">-ffast-math</code>, and the SIMD output is
              validated bit-identical to the old FFTW build. Floating-point contraction is set per translation unit
              rather than globally: the FFT units build with
              <code className="bg-gray-100 px-1 rounded">-ffp-contract=fast</code>, while the LM peak fitter and
              <code className="bg-gray-100 px-1 rounded">libkspacefit</code> build with
              <code className="bg-gray-100 px-1 rounded">-ffp-contract=off</code>, because FMA contraction perturbs
              Levenberg-Marquardt convergence.
            </p>

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
                    <td className="py-3 pr-4 font-medium">macOS (Apple Silicon)</td>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">clang</code> (Homebrew LLVM)</td>
                    <td className="py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">brew install llvm libomp</code> -- auto-detected, no CC needed</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium">Windows</td>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">clang-cl</code></td>
                    <td className="py-3">Visual Studio &quot;Desktop development with C++&quot; workload <strong>plus the &quot;C++ Clang tools for Windows&quot; component</strong></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Linux</td>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">clang</code></td>
                    <td className="py-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">sudo apt install clang libomp-dev</code></td>
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
                run from the <strong>x64 Native Tools Command Prompt for VS</strong> (or a shell where <code className="bg-red-100 px-1 rounded">vcvars64.bat</code> has
                been called). A plain Command Prompt, PowerShell, or VS Code terminal fails with <code className="bg-red-100 px-1 rounded">clang-cl not found</code>.
              </p>
              <p className="text-red-700 text-sm">
                Find it in Start Menu &rarr; Visual Studio &rarr; <strong>x64 Native Tools Command Prompt for VS 2022</strong>.
                Set <code className="bg-red-100 px-1 rounded">PIVTOOLS_WIN_COMPILER</code> to a specific <code className="bg-red-100 px-1 rounded">clang-cl.exe</code>,
                or to <code className="bg-red-100 px-1 rounded">cl</code> to force plain MSVC (the batched SIMD peak fitter is unavailable under plain cl).
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
              <h4 className="text-lg font-semibold text-green-800 mb-2">End Users: No Compiler Needed</h4>
              <p className="text-green-700 mb-2">
                PyPI wheels ship with pre-compiled <code className="bg-green-100 px-1 rounded">.dll</code>/<code className="bg-green-100 px-1 rounded">.so</code> files.
                Running <code className="bg-green-100 px-2 py-1 rounded">pip install pivtools</code> just works.
              </p>
              <p className="text-green-700 text-sm">
                One wheel per platform serves every Python 3.12+: Linux x86_64
                (<code className="bg-green-100 px-1 rounded">manylinux_2_28</code>, glibc 2.28+), macOS arm64
                (macOS 15+, floor set by the bundled Homebrew libomp), and Windows AMD64. Linux and Windows
                wheels enforce an AVX2+FMA CPU floor at load time
                (<code className="bg-green-100 px-1 rounded">pivtools_cpu_supported()</code>) -- pre-Haswell CPUs
                get a clear error pointing at the source install.
              </p>
            </div>
          </Section>

          {/* Build Tuning */}
          <Section title="Build Tuning" icon={<Wrench size={32} />} id="build-tuning">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              All build knobs are environment variables read by <code className="bg-gray-100 px-2 py-1 rounded">setup.py</code> at
              build time. Local source builds default to native tuning
              (<code className="bg-gray-100 px-1 rounded">-march=native</code> / <code className="bg-gray-100 px-1 rounded">-mcpu=native</code>);
              PyPI wheels pin portable flags instead.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 pr-4 text-gray-900 font-semibold">Variable</th>
                    <th className="py-3 pr-4 text-gray-900 font-semibold">Default</th>
                    <th className="py-3 text-gray-900 font-semibold">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">PIVTOOLS_FFT_ISA</code></td>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">neon4</code> (macOS arm64), <code className="bg-gray-100 px-2 py-0.5 rounded">vext8</code> (Linux x86_64), <code className="bg-gray-100 px-2 py-0.5 rounded">avx2</code> (Windows)</td>
                    <td className="py-3">SIMD lane width of the codelet FFT and batched peak fitter (one PIV window per lane). <code className="bg-gray-100 px-1 rounded">avx512</code> is available for HPC but is a measured <strong>loss</strong> on AMD Zen 4 (double-pumped AVX-512) -- keep <code className="bg-gray-100 px-1 rounded">vext8</code> there; it only pays on true-512-bit Intel nodes.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">PIVTOOLS_FFT_MARCH</code></td>
                    <td className="py-3 pr-4">platform arch flag (native)</td>
                    <td className="py-3">Replaces the FFT arch flag verbatim (e.g. <code className="bg-gray-100 px-1 rounded">-march=icelake-server</code>). Important on HPC: <code className="bg-gray-100 px-1 rounded">native</code> bakes in the <em>build host&apos;s</em> ISA, so build on a compute node or pin this explicitly.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">PIVTOOLS_WARP_MARCH</code></td>
                    <td className="py-3 pr-4">platform arch flag (native)</td>
                    <td className="py-3">Same override for <code className="bg-gray-100 px-1 rounded">libfusedwarp</code>&apos;s SIMD warp kernel.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">PIVTOOLS_FFT_LTO</code></td>
                    <td className="py-3 pr-4">off</td>
                    <td className="py-3"><code className="bg-gray-100 px-1 rounded">1</code> enables link-time optimisation for the FFT translation units.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">PIVTOOLS_WIN_COMPILER</code></td>
                    <td className="py-3 pr-4">VS-bundled clang-cl</td>
                    <td className="py-3">Path to a specific <code className="bg-gray-100 px-1 rounded">clang-cl.exe</code>, or <code className="bg-gray-100 px-1 rounded">cl</code> to force MSVC.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4"><code className="bg-gray-100 px-2 py-0.5 rounded">CC</code></td>
                    <td className="py-3 pr-4">clang (macOS/Linux)</td>
                    <td className="py-3">Explicit compiler override on macOS/Linux (e.g. <code className="bg-gray-100 px-1 rounded">CC=gcc</code>). There is no silent fallback -- missing clang is a hard error.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock title="Example: pinned HPC build (Intel AVX-512 compute nodes)" code={`PIVTOOLS_FFT_ISA=avx512 \\
PIVTOOLS_FFT_MARCH='-march=icelake-server' \\
PIVTOOLS_WARP_MARCH='-march=icelake-server' \\
pip install -e .`} />

            <p className="text-gray-600 text-sm">
              The build prints what it resolved
              (<code className="bg-gray-100 px-1 rounded">isa=... lanes=... arch=...</code>) and emits a NOTICE
              whenever a <code className="bg-gray-100 px-1 rounded">native</code> arch flag is in play. See
              <code className="bg-gray-100 px-1 rounded"> BUILD-SIMD.md</code> in the repository for per-platform
              build and verification recipes.
            </p>
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
# init, instantaneous, ensemble,
# transform, merge, statistics, video`} />
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
