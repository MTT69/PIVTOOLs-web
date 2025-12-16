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
  Play,
  Palette,
  Move,
  BarChart2,
  Layers,
  RotateCw,
  Info,
  Terminal,
  Monitor
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
              Visualise and analyse your PIV vector fields. The Results Viewer is the central hub for
              inspecting velocity data, calculating statistics, transforming coordinates, and merging
              multi-camera fields.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Central Hub for Post-Processing</h3>
            <p className="text-gray-200 mb-6 text-lg">
              After running PIV processing, the Results Viewer lets you explore your data and perform
              additional operations. Choose your data source, select variables to visualise, and access
              powerful post-processing features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: <Eye size={24} />, label: "View", desc: "Visualise any variable" },
                { icon: <RotateCw size={24} />, label: "Transform", desc: "Rotate, flip, scale" },
                { icon: <Layers size={24} />, label: "Merge", desc: "Combine cameras" },
                { icon: <BarChart2 size={24} />, label: "Statistics", desc: "Mean & turbulence" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-soton-gold mb-2 flex justify-center">{item.icon}</div>
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <Section title="Overview" icon={<Eye size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Results Viewer displays PIV vector fields as colour-mapped images with interactive
              controls. It supports multiple data sources including calibrated and uncalibrated results,
              ensemble averages, merged multi-camera fields, and computed statistics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">GUI Features</h4>
                </div>
                <FeatureList items={[
                  "Interactive frame-by-frame navigation",
                  "Adjustable colour limits and colormaps",
                  "Real-time cursor coordinate display",
                  "Magnifier for detailed inspection",
                  "One-click image download and copy"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Post-Processing</h4>
                </div>
                <FeatureList items={[
                  "Geometric transforms (rotate, flip, scale)",
                  "Multi-camera field merging",
                  "Mean and turbulence statistics",
                  "Reynolds stress tensor computation",
                  "Vortex detection (gamma criteria)"
                ]} />
              </div>
            </div>
          </Section>

          {/* Data Types & Operations Section - CRITICAL */}
          <Section title="Data Types & Operations" icon={<Settings size={32} />} id="data-types">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Different data sources have different capabilities. The table below shows which operations
              are available for each data type. Understanding these restrictions is essential for planning
              your post-processing workflow.
            </p>

            {/* Main Operations Table */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Data Source</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">View</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Transforms</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Coordinates</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Merge</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Statistics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { source: "Uncalibrated Instantaneous", view: true, transform: false, coords: false, merge: false, stats: false, note: "" },
                    { source: "Uncalibrated Ensemble", view: true, transform: false, coords: false, merge: false, stats: false, note: "" },
                    { source: "Calibrated Instantaneous", view: true, transform: true, coords: true, merge: true, stats: true, note: "*" },
                    { source: "Calibrated Ensemble", view: true, transform: false, coords: false, merge: false, stats: false, note: "" },
                    { source: "Merged Instantaneous", view: true, transform: true, coords: true, merge: false, stats: true, note: "" },
                    { source: "Merged Ensemble", view: true, transform: false, coords: false, merge: false, stats: false, note: "" },
                    { source: "Mean Statistics", view: true, transform: false, coords: false, merge: false, stats: false, note: "" },
                    { source: "Merged Statistics", view: true, transform: false, coords: false, merge: false, stats: false, note: "" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {row.source}{row.note && <sup className="text-soton-blue">{row.note}</sup>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.view ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                            <CheckCircle size={14} />
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.transform ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                            <CheckCircle size={14} />
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.coords ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                            <CheckCircle size={14} />
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.merge ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                            <CheckCircle size={14} />
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.stats ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                            <CheckCircle size={14} />
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              <sup className="text-soton-blue">*</sup> Merge requires 2+ cameras and planar (2D) data only.
              Stereo setups with a uz component cannot be merged.
            </p>

            {/* Key Restrictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-600" size={20} />
                  <h4 className="text-lg font-semibold text-yellow-800">Uncalibrated Data</h4>
                </div>
                <p className="text-yellow-700 text-sm">
                  Uncalibrated results can only be viewed. Transforms, merging, and statistics require
                  calibrated data with physical coordinates. Run calibration first to enable these features.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-red-600" size={20} />
                  <h4 className="text-lg font-semibold text-red-800">Stereo (3D) Merging</h4>
                </div>
                <p className="text-red-700 text-sm">
                  Merging is blocked for stereo PIV data. When a <code className="bg-red-100 px-1 rounded">uz</code> component
                  is detected, the merge button will be disabled. Stereo calibration combines both cameras automatically.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Ensemble Data</h4>
              </div>
              <p className="text-blue-700 text-sm">
                Ensemble results are already time-averaged across all frames, so per-frame operations
                (transforms, statistics calculation) are not applicable. View ensemble data directly
                to see the mean velocity field from your ensemble PIV processing.
              </p>
            </div>
          </Section>

          {/* Viewing Controls Section */}
          <Section title="Viewing Controls" icon={<Palette size={32} />} id="viewing">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The viewer provides intuitive controls for customising how your data is displayed.
              Adjust colour limits, choose colormaps, and navigate through frames to explore your results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Colormap Selection */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Colormap Selection</h4>
                <p className="text-gray-600 mb-4">
                  Choose from multiple colormaps to best visualise your data. Different colormaps
                  are suited to different types of data and analysis goals.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['default', 'viridis', 'plasma', 'inferno', 'magma', 'cividis', 'jet', 'gray'].map((cmap) => (
                    <div key={cmap} className="bg-gray-50 rounded px-3 py-2 text-sm font-mono text-gray-700">
                      {cmap}
                    </div>
                  ))}
                </div>
              </div>

              {/* Colour Limits */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Colour Limits</h4>
                <p className="text-gray-600 mb-4">
                  Set upper and lower limits for the colour scale. Use &quot;Auto-Calculate&quot; to
                  automatically determine appropriate limits based on your data range.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Lower Limit:</strong> Minimum value (saturates below)</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Upper Limit:</strong> Maximum value (saturates above)</p>
                  <p className="text-sm text-gray-500 mt-3">Leave blank for automatic scaling per frame.</p>
                </div>
              </div>
            </div>

            {/* Frame Navigation */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Play className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Frame Navigation</h4>
              </div>
              <p className="text-gray-600 mb-4">
                For instantaneous data, use the frame slider or arrow buttons to navigate through your
                time series. The playback feature animates through frames at adjustable speeds.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-gray-900">Frame Slider</p>
                  <p className="text-gray-600 text-sm">Drag to any frame</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-gray-900">Arrow Buttons</p>
                  <p className="text-gray-600 text-sm">Step forward/back</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-semibold text-gray-900">Playback</p>
                  <p className="text-gray-600 text-sm">0.5 to 10 FPS</p>
                </div>
              </div>
            </div>

            {/* Axis Limits */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Axis Limits & Plot Title</h4>
              <p className="text-gray-600 mb-4">
                Customise the plot display with specific X and Y axis limits and a custom title.
                Leave blank for automatic axis scaling based on your coordinate data.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded px-3 py-2 text-sm">
                  <span className="text-gray-500">X Min:</span> <span className="font-mono">auto</span>
                </div>
                <div className="bg-white rounded px-3 py-2 text-sm">
                  <span className="text-gray-500">X Max:</span> <span className="font-mono">auto</span>
                </div>
                <div className="bg-white rounded px-3 py-2 text-sm">
                  <span className="text-gray-500">Y Min:</span> <span className="font-mono">auto</span>
                </div>
                <div className="bg-white rounded px-3 py-2 text-sm">
                  <span className="text-gray-500">Y Max:</span> <span className="font-mono">auto</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Variable Selection Section */}
          <Section title="Variable Selection" icon={<Move size={32} />} id="variables">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The variable dropdown provides access to all available fields organised by category.
              Variables are grouped based on their source and calculation type for easy navigation.
            </p>

            <div className="space-y-6">
              {/* Variable Groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Instantaneous Variables</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Raw velocity components from frame files. Available for all data sources.
                  </p>
                  <div className="space-y-2">
                    {[
                      { var: 'ux', desc: 'Horizontal velocity component' },
                      { var: 'uy', desc: 'Vertical velocity component' },
                      { var: 'uz', desc: 'Out-of-plane velocity (stereo only)' },
                    ].map((item) => (
                      <div key={item.var} className="flex items-center gap-3 bg-gray-50 rounded px-3 py-2">
                        <code className="text-soton-blue font-mono text-sm">{item.var}</code>
                        <span className="text-gray-600 text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Calculated Statistics</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Derived quantities from statistics calculation. Requires running the statistics processor.
                  </p>
                  <div className="space-y-2">
                    {[
                      { var: 'Mean ux/uy', desc: 'Time-averaged velocities' },
                      { var: 'TKE', desc: 'Turbulent kinetic energy' },
                      { var: 'uu, vv, uv', desc: 'Reynolds stress tensor' },
                      { var: 'vorticity', desc: 'Out-of-plane vorticity' },
                    ].map((item) => (
                      <div key={item.var} className="flex items-center gap-3 bg-gray-50 rounded px-3 py-2">
                        <code className="text-soton-blue font-mono text-sm">{item.var}</code>
                        <span className="text-gray-600 text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Variable Prefix System */}
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Variable Naming Convention</h4>
                <p className="text-blue-700 mb-4">
                  Variables are prefixed to indicate their source. The viewer automatically filters
                  available variables based on your selected data source.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-soton-blue font-mono">inst:</code>
                    <span className="text-gray-600 ml-2 text-sm">Instantaneous frame data</span>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-soton-blue font-mono">inst_stat:</code>
                    <span className="text-gray-600 ml-2 text-sm">Per-frame calculated stats</span>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-soton-blue font-mono">mean:</code>
                    <span className="text-gray-600 ml-2 text-sm">Time-averaged statistics</span>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-soton-blue font-mono">ens:</code>
                    <span className="text-gray-600 ml-2 text-sm">Ensemble-averaged results</span>
                  </div>
                </div>
              </div>

              {/* Special Labels */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Special Variable Labels</h4>
                <p className="text-gray-600 mb-4">
                  Some variables use mathematical notation for clarity in the dropdown:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "u'u'", desc: "uu Reynolds stress" },
                    { label: "v'v'", desc: "vv Reynolds stress" },
                    { label: "u'v'", desc: "uv Reynolds stress" },
                    { label: "TKE", desc: "Turbulent kinetic energy" },
                    { label: "omega", desc: "Vorticity" },
                    { label: "div u", desc: "Divergence" },
                    { label: "gamma1", desc: "Gamma 1 vortex criterion" },
                    { label: "gamma2", desc: "Gamma 2 vortex criterion" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded px-3 py-2 text-center">
                      <p className="font-mono text-soton-blue">{item.label}</p>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Configuration Section */}
          <Section title="Configuration" icon={<Settings size={32} />} id="config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Results Viewer and all post-processing operations are configured through
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">config.yaml</code>. The GUI
              automatically updates this file when you change settings.
            </p>

            {/* GUI vs CLI */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-purple-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">GUI vs CLI Processing</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Understanding the difference between GUI and CLI usage is important for batch processing:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="text-blue-600" size={18} />
                    <h5 className="font-semibold text-gray-900">GUI Mode</h5>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>- Processes <strong>one base_path</strong> at a time</li>
                    <li>- Interactive visualisation and controls</li>
                    <li>- Select path via dropdown</li>
                    <li>- Ideal for exploration and setup</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="text-green-600" size={18} />
                    <h5 className="font-semibold text-gray-900">CLI Mode</h5>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>- Processes <strong>ALL active_paths</strong> in config</li>
                    <li>- Batch processing without interaction</li>
                    <li>- Configure once, run on many datasets</li>
                    <li>- Ideal for production workflows</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Config Sections */}
            <div className="space-y-4">
              <YamlDropdown
                title="Video/Viewing Configuration"
                defaultOpen={true}
                code={`video:
  base_path_idx: 0        # Which base path to use (0-indexed)
  camera: 1               # Camera number to view
  data_source: calibrated # calibrated or uncalibrated
  variable: ux            # Variable to display
  run: 1                  # Run number for multi-run files
  piv_type: instantaneous # instantaneous or ensemble
  cmap: viridis           # Colormap name
  lower: ''               # Lower colour limit (blank = auto)
  upper: ''               # Upper colour limit (blank = auto)`}
              />

              <YamlDropdown
                title="Paths Configuration"
                code={`paths:
  base_paths:
    - /path/to/experiment_1/results
    - /path/to/experiment_2/results
  source_paths:
    - /path/to/experiment_1/images
    - /path/to/experiment_2/images
  active_paths:
    - 0    # CLI will process these indices
    - 1
  camera_count: 2
  camera_numbers: [1, 2]`}
              />
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Batch Processing Note</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                When using CLI commands for transforms, merging, or statistics, the operations will run
                on <strong>all paths listed in active_paths</strong>. Configure your datasets first
                using the GUI, then run batch processing via CLI for efficiency.
              </p>
            </div>
          </Section>

          {/* Post-Processing Features */}
          <Section title="Post-Processing Features" icon={<BarChart2 size={32} />} id="features">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Results Viewer provides access to three powerful post-processing modules.
              Each feature has its own detailed documentation page with complete workflows and examples.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Transforms Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <RotateCw className="text-purple-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Transforms</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Rotate, flip, and scale your vector fields. Essential for aligning multi-camera
                  setups before merging.
                </p>
                <ul className="text-gray-500 text-sm space-y-1 mb-4">
                  <li>- Geometric: rotate, flip</li>
                  <li>- Scale velocities & coordinates</li>
                  <li>- Swap/invert components</li>
                </ul>
                <Link
                  href="/manual/transforms"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Merging Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Layers className="text-green-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Merging</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Combine vector fields from multiple cameras into a single seamless field using
                  Hanning window blending.
                </p>
                <ul className="text-gray-500 text-sm space-y-1 mb-4">
                  <li>- Requires 2+ cameras</li>
                  <li>- Automatic overlap detection</li>
                  <li>- Distance-based weighting</li>
                </ul>
                <Link
                  href="/manual/merging"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Statistics Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BarChart2 className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Statistics</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Calculate mean velocities, Reynolds stresses, TKE, and turbulence quantities
                  across your time series.
                </p>
                <ul className="text-gray-500 text-sm space-y-1 mb-4">
                  <li>- Mean & instantaneous stats</li>
                  <li>- Reynolds stress tensor</li>
                  <li>- Vortex detection (gamma)</li>
                </ul>
                <Link
                  href="/manual/statistics"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
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
              Ready to align your camera views? Learn how to rotate, flip, and scale your vector
              fields to prepare for merging or correct orientation issues.
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
