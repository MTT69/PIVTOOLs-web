'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Eye,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Settings,
  Palette,
  Move,
  Terminal,
  Monitor,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ManualNavigation from '@/components/ManualNavigation';
import Link from 'next/link';

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

interface YamlDropdownProps {
  title?: string;
  code: string;
  defaultOpen?: boolean;
}

const YamlDropdown = ({ title = "YAML Reference", code, defaultOpen = false }: YamlDropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown size={16} className="text-gray-500" />
        ) : (
          <ChevronRight size={16} className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="bg-gray-900 p-4 overflow-x-auto">
            <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">
              {code}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

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

export default function ResultsViewerPage() {
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
              Results <span className="text-soton-gold">Viewer</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Visualise PIV vector fields with interactive controls. The Results Viewer is the central
              hub for inspecting data, applying transforms, merging cameras, and computing statistics.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Eye size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Results Viewer displays colour-mapped vector fields from any data source. It is a GUI-only
              feature -- there is no CLI equivalent for interactive viewing.
            </p>

            <FeatureList items={[
              "Frame-by-frame navigation with slider, arrow buttons, and playback (0.5--10 FPS)",
              "Adjustable colormaps and colour limits (manual or auto-calculated)",
              "Hover data display: coordinates plus velocity at cursor position",
              "Axis limits, coordinate offsets, and custom plot titles",
              "One-click image download and clipboard copy",
              "Access to Transforms, Merging, and Statistics panels from the viewer",
            ]} />
          </Section>

          {/* Data Types */}
          <Section title="Data Types" icon={<Settings size={32} />} id="data-types">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The data source selector determines which vector files are loaded and which post-processing
              operations are available.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Data Source</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">View</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Transforms</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Merge</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Statistics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { source: "Calibrated Instantaneous", view: true, transform: true, merge: true, stats: true },
                    { source: "Calibrated Ensemble", view: true, transform: false, merge: true, stats: false },
                    { source: "Uncalibrated Instantaneous", view: true, transform: false, merge: false, stats: false },
                    { source: "Uncalibrated Ensemble", view: true, transform: false, merge: false, stats: false },
                    { source: "Merged Instantaneous", view: true, transform: true, merge: false, stats: true },
                    { source: "Merged Ensemble", view: true, transform: true, merge: false, stats: true },
                    { source: "Stereo Instantaneous", view: true, transform: false, merge: false, stats: true },
                    { source: "Stereo Ensemble", view: true, transform: false, merge: false, stats: false },
                    { source: "Statistics (mean/merged/stereo)", view: true, transform: false, merge: false, stats: false },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{row.source}</td>
                      {[row.view, row.transform, row.merge, row.stats].map((val, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {val ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                              <CheckCircle size={14} />
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-600" size={20} />
                  <h4 className="text-lg font-semibold text-yellow-800">Uncalibrated Data</h4>
                </div>
                <p className="text-yellow-700 text-sm">
                  View-only. Transforms, merging, and statistics require calibrated data with physical coordinates.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-600" size={20} />
                  <h4 className="text-lg font-semibold text-yellow-800">Stereo Merging</h4>
                </div>
                <p className="text-yellow-700 text-sm">
                  Merging is blocked for stereo data. Stereo calibration already combines both camera
                  views into a single 3D field.
                </p>
              </div>
            </div>
          </Section>

          {/* Viewing Controls */}
          <Section title="Viewing Controls" icon={<Palette size={32} />} id="viewing">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Controls for customising the display. All settings are saved to <code className="bg-gray-100 px-2 py-1 rounded text-sm">config.yaml</code> automatically.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Control</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { control: "Colormap", desc: "default, viridis, plasma, inferno, magma, cividis, jet, gray, and more" },
                    { control: "Lower / Upper Limit", desc: "Manual colour bounds. Leave blank for automatic scaling per frame." },
                    { control: "Auto-Calculate", desc: "Samples up to 50 frames and returns 5th/95th percentile limits." },
                    { control: "Frame Slider", desc: "Drag to any frame. Arrow buttons step +/-1. Playback animates at 0.5--10 FPS." },
                    { control: "Run / Pass", desc: "Select which multi-pass PIV run to display (highest = most refined)." },
                    { control: "Axis Limits", desc: "X min/max, Y min/max. Blank = auto from coordinate data." },
                    { control: "X / Y Offset", desc: "Shift displayed coordinates without modifying data." },
                    { control: "Plot Title", desc: "Custom title shown above the colour-mapped image." },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.control}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Variables */}
          <Section title="Variables" icon={<Move size={32} />} id="variables">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The variable dropdown is populated automatically from the data files. Variables are
              prefixed to indicate their source.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Prefix</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Example Variables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { prefix: "inst:", source: "Instantaneous frame data", vars: "ux, uy, uz, velocity_magnitude, b_mask, peak_mag" },
                    { prefix: "inst_stat:", source: "Per-frame calculated statistics", vars: "vorticity, divergence, u_prime, v_prime, gamma1, gamma2" },
                    { prefix: "mean:", source: "Time-averaged statistics", vars: "ux, uy, uu, vv, uv, tke, vorticity, divergence, mean_peak_height" },
                    { prefix: "ens:", source: "Ensemble-averaged results", vars: "ux, uy, UU_stress, VV_stress, UV_stress" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.prefix}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{row.vars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Display Labels</h4>
              <p className="text-gray-600 mb-3">
                Some variables use mathematical notation in the dropdown for clarity:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "u'u'", desc: "UU Reynolds stress" },
                  { label: "v'v'", desc: "VV Reynolds stress" },
                  { label: "u'v'", desc: "UV shear stress" },
                  { label: "TKE", desc: "Turbulent kinetic energy" },
                  { label: "omega", desc: "Vorticity" },
                  { label: "div u", desc: "Divergence" },
                  { label: "gamma1", desc: "Gamma 1 criterion" },
                  { label: "gamma2", desc: "Gamma 2 criterion" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded px-3 py-2 text-center">
                    <p className="font-mono text-soton-blue">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Configuration */}
          <Section title="Configuration" icon={<Settings size={32} />} id="config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Viewer settings are stored under the <code className="bg-gray-100 px-2 py-1 rounded text-sm">video</code> key
              in <code className="bg-gray-100 px-2 py-1 rounded text-sm">config.yaml</code>. The GUI updates this
              file automatically when you change settings.
            </p>

            <YamlDropdown
              title="Viewer / Video Configuration"
              defaultOpen={true}
              code={`video:
  base_path_idx: 0        # Which base path to use (0-indexed)
  camera: 1               # Camera number (1-based)
  data_source: calibrated # calibrated, uncalibrated, merged, stereo, inst_stats
  variable: ux            # Variable to display
  run: 1                  # Run/pass number (1-based)
  piv_type: instantaneous # instantaneous or ensemble
  cmap: viridis           # Colormap name
  lower: ''               # Lower colour limit (blank = auto)
  upper: ''               # Upper colour limit (blank = auto)`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="text-blue-600" size={20} />
                  <h4 className="text-lg font-semibold text-blue-800">GUI Mode</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  Processes one <code className="bg-blue-100 px-1 rounded">base_path</code> at a time with interactive
                  controls. Ideal for exploration and verifying settings.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="text-green-600" size={20} />
                  <h4 className="text-lg font-semibold text-green-800">CLI Mode</h4>
                </div>
                <p className="text-green-700 text-sm">
                  Transforms, merging, statistics, and video commands process
                  all <code className="bg-green-100 px-1 rounded">active_paths</code>. Configure once in the GUI,
                  then batch process via CLI.
                </p>
              </div>
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Next: Transform Your Data</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Rotate, flip, and scale your vector fields to correct camera orientations
              or convert between unit systems.
            </p>
            <Link
              href="/manual/transforms"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Transforms
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
