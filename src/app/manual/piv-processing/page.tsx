'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Zap,
  Grid3X3,
  Focus,
  Camera,
  Target,
  Database,
  Cpu,
  Filter,
  Paintbrush,
  Play,
  Settings,
  Terminal,
  FileText,
  ChevronDown,
  ChevronRight,
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

export default function PIVProcessingPage() {
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
              PIV <span className="text-soton-gold">Processing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Configure multi-pass cross-correlation for instantaneous or ensemble analysis.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Zap size={32} />} id="overview">
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900"></th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Instantaneous</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Ensemble</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {[
                    { label: "Output", inst: "Velocity field per frame pair", ens: "Single mean velocity field" },
                    { label: "Correlation", inst: "Per frame pair", ens: "Averaged across all pairs" },
                    { label: "Use case", inst: "Time-resolved data, turbulence statistics", ens: "Mean flow, low seeding, max resolution" },
                    { label: "Pass types", inst: "Standard only", ens: "Standard + Single mode" },
                    { label: "Peak finder", inst: "Configurable (gauss3-6)", ens: "gauss6 (fixed)" },
                    { label: "Live preview", inst: "Yes (per-frame)", ens: "No (accumulated)" },
                    { label: "Resume", inst: "No", ens: "Yes (resume_from_pass)" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.label}</td>
                      <td className="px-4 py-3 text-gray-600">{row.inst}</td>
                      <td className="px-4 py-3 text-gray-600">{row.ens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Window Configuration */}
          <Section title="Window Configuration" icon={<Grid3X3 size={32} />} id="window-config">
            <p className="text-gray-700 text-lg mb-6">
              Both modes use multi-pass refinement. Each pass refines results from the previous one. Configure passes in the GUI pass table or directly in YAML.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Parameter</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Format</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: "window_size", format: "[Height, Width]", desc: "Interrogation window in pixels per pass. Must be powers of 2. Rectangular windows supported." },
                    { param: "overlap", format: "integer (%)", desc: "Overlap percentage per pass. 50% doubles grid density." },
                    { param: "runs", format: "list of pass numbers", desc: "Which passes to save (1-based). Last pass always saved." },
                    { param: "type (ensemble)", format: "'std' | 'single'", desc: "Standard or single-pixel mode per pass." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-purple-600">{row.param}</td>
                      <td className="px-4 py-3 text-gray-600">{row.format}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Window size convention:</strong> <code className="bg-blue-100 px-1 rounded">[Height, Width]</code> (row-major). Height = vertical (Y), Width = horizontal (X). Use rectangular windows for directional flows (e.g., <code className="bg-blue-100 px-1 rounded">[32, 64]</code> for predominantly horizontal flow).
              </p>
            </div>

            <CodeBlock code={`# Typical 3-pass configuration
instantaneous_piv:
  window_size:
  - [128, 128]    # Pass 1: large windows
  - [64, 64]      # Pass 2: refinement
  - [32, 32]      # Pass 3: final
  overlap:
  - 50
  - 50
  - 50
  runs:
  - 3             # Save pass 3 only`} title="config.yaml" />
          </Section>

          {/* Single Mode & Sum Window */}
          <Section title="Single Mode and Sum Window" icon={<Focus size={32} />} id="single-mode">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-700 text-sm">
                <strong>Ensemble only.</strong> Appears when any pass uses type <code className="bg-purple-100 px-1 rounded">single</code>.
              </p>
            </div>

            <p className="text-gray-700 text-lg mb-6">
              Single mode uses asymmetric window weighting: Frame A gets a small central window (the configured <code className="bg-gray-100 px-1 rounded">window_size</code>), Frame B gets the full <code className="bg-gray-100 px-1 rounded">sum_window</code>. This concentrates the measurement on a small region while computing correlations at the larger FFT size.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Parameter</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Constraint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-mono text-purple-600">sum_window</td>
                    <td className="px-4 py-3 text-gray-600">FFT correlation window size [H, W]</td>
                    <td className="px-4 py-3 text-gray-600">Must be &gt;= window_size</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-purple-600">sum_fitting_window</td>
                    <td className="px-4 py-3 text-gray-600">Central extraction for fitting (optional)</td>
                    <td className="px-4 py-3 text-gray-600">Reduces memory and speeds fitting</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock code={`ensemble_piv:
  window_size:
  - [128, 128]    # Pass 1: std
  - [64, 64]      # Pass 2: std
  - [16, 16]      # Pass 3: single
  type:
  - std
  - std
  - single
  sum_window:
  - 64
  - 64            # [Height, Width] for single passes`} title="config.yaml" />
          </Section>

          {/* Camera Selection */}
          <Section title="Camera Selection" icon={<Camera size={32} />} id="camera-selection">
            <p className="text-gray-700 text-lg mb-4">
              Select which cameras to process via numbered chips in the GUI. At least one must be selected. In YAML, set <code className="bg-gray-100 px-1 rounded">paths.camera_numbers</code>.
            </p>
          </Section>

          {/* Peak Finding */}
          <Section title="Peak Finding" icon={<Target size={32} />} id="peak-finding">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Instantaneous only.</strong> Ensemble uses gauss6 by default.
              </p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Algorithm</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">DOF</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: "gauss3", dof: "3", desc: "Parabolic (1D Gaussian). Fastest." },
                    { name: "gauss4", dof: "4", desc: "Circular Gaussian with amplitude." },
                    { name: "gauss5", dof: "5", desc: "Elliptical Gaussian. Good for anisotropic flows." },
                    { name: "gauss6", dof: "6", desc: "Rotated elliptical Gaussian. Maximum accuracy." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-blue-600">{row.name}</td>
                      <td className="px-4 py-3 text-gray-600">{row.dof}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock code={`instantaneous_piv:
  peak_finder: gauss3   # Options: gauss3, gauss4, gauss5, gauss6`} title="config.yaml" />
          </Section>

          {/* Ensemble Options */}
          <Section title="Ensemble Options" icon={<Database size={32} />} id="ensemble-options">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-700 text-sm">
                <strong>Ensemble only.</strong> Available in the collapsible Ensemble Options panel.
              </p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Setting</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Default</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: "fit_method", default: "gaussian", desc: "Peak fitting: 'gaussian' (C, fast) or 'kspace' (Python, BETA -- better Reynolds stresses)" },
                    { setting: "background_subtraction_method", default: "correlation", desc: "'correlation' or 'image' based background removal" },
                    { setting: "gradient_correction", default: "false", desc: "Reynolds stress gradient correction" },
                    { setting: "store_planes", default: "false", desc: "Save AA, BB, AB correlation planes to disk (large files)" },
                    { setting: "save_diagnostics", default: "false", desc: "Save debug images and peak fitting data to filters/ directory" },
                    { setting: "resume_from_pass", default: "0", desc: "Resume from pass N (1-based). 0 = fresh start. Requires existing ensemble_result.mat." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-purple-600">{row.setting}</td>
                      <td className="px-4 py-3 font-mono text-green-600">{row.default}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Performance */}
          <Section title="Performance Settings" icon={<Cpu size={32} />} id="performance">
            <p className="text-gray-700 text-lg mb-6">
              Configure parallel processing resources. Applies to both modes.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Setting</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Default</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: "backend", default: "cpu", desc: "Processing backend" },
                    { setting: "omp_threads", default: "1", desc: "OpenMP threads per worker for C extensions" },
                    { setting: "dask_workers_per_node", default: "1", desc: "Number of parallel Dask workers" },
                    { setting: "dask_memory_limit", default: "4GB", desc: "RAM allocation per worker" },
                    { setting: "cluster_type", default: "local", desc: "'local' or 'slurm'" },
                    { setting: "filter_worker_count", default: "1", desc: "Workers for preprocessing. Set 1 for temporal filters, 2+ for spatial-only." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-purple-600">{row.setting}</td>
                      <td className="px-4 py-3 font-mono text-green-600">{row.default}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock code={`processing:
  backend: cpu
  omp_threads: 2
  dask_workers_per_node: 4
  dask_memory_limit: 4GB
  cluster_type: local
  filter_worker_count: 1`} title="config.yaml" />
          </Section>

          {/* Outlier Detection */}
          <Section title="Outlier Detection" icon={<Filter size={32} />} id="outlier-detection">
            <p className="text-gray-700 text-lg mb-6">
              Identify and mark spurious vectors for replacement. Multiple methods can be chained. Instantaneous and ensemble use separate config sections.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Method</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Parameters</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-mono text-purple-600">peak_mag</td>
                    <td className="px-4 py-3 text-gray-600">threshold: 0.4</td>
                    <td className="px-4 py-3 text-gray-600">Reject vectors with correlation peak below threshold</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-purple-600">median_2d</td>
                    <td className="px-4 py-3 text-gray-600">epsilon: 0.2, threshold: 2.0</td>
                    <td className="px-4 py-3 text-gray-600">Normalised median test against 8 neighbours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <CodeBlock code={`outlier_detection:
  enabled: true
  methods:
  - type: peak_mag
    threshold: 0.4
  - type: median_2d
    epsilon: 0.2
    threshold: 2`} title="Instantaneous" />
              <CodeBlock code={`ensemble_outlier_detection:
  enabled: true
  methods:
  - type: median_2d
    epsilon: 0.2
    threshold: 2`} title="Ensemble" />
            </div>
          </Section>

          {/* Infilling */}
          <Section title="Infilling" icon={<Paintbrush size={32} />} id="infilling">
            <p className="text-gray-700 text-lg mb-4">
              Replace outlier vectors (NaN) with interpolated values. Applied in two phases: <strong>mid-pass</strong> (between passes, always enabled) and <strong>final-pass</strong> (on output, optional).
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Method</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Parameters</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { method: "local_median", params: "ksize: 3", desc: "Median of neighbours. Fast, small gaps." },
                    { method: "biharmonic", params: "(none)", desc: "PDE-based smooth interpolation. High quality." },
                    { method: "knn", params: "n_neighbors: 32, weights: 'distance'", desc: "Distance-weighted regression. Sparse data." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-green-600">{row.method}</td>
                      <td className="px-4 py-3 text-gray-600">{row.params}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock code={`infilling:                  # or ensemble_infilling:
  mid_pass:
    method: biharmonic
    parameters:
      ksize: 3
  final_pass:
    enabled: true
    method: biharmonic
    parameters:
      ksize: 3`} title="config.yaml" />
          </Section>

          {/* Running PIV */}
          <Section title="Running PIV" icon={<Play size={32} />} id="running">
            <p className="text-gray-700 text-lg mb-6">
              Start processing from the Run PIV card. Select which source/base path pairs to process via checkboxes.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Workflow</h4>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Check the datasets to include. Same PIV settings apply to all selected paths.</li>
                <li>Click <strong>Run PIV</strong>. If output already exists, a confirmation dialog asks to clear and recompute.</li>
                <li>Monitor progress via the progress bar (instantaneous) or console logs (both modes).</li>
                <li>Cancel gracefully if needed. Partial results may be saved.</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Instantaneous feedback</h5>
                <p className="text-gray-600 text-sm">Progress bar, live vector field preview (variable selector, colormap), console logs.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Ensemble feedback</h5>
                <p className="text-gray-600 text-sm">Status indicator + console logs only. No preview until all pairs are accumulated.</p>
              </div>
            </div>

            <CodeBlock code={`# Enable one mode at a time
processing:
  instantaneous: true
  ensemble: false`} title="config.yaml" />
          </Section>

          {/* YAML Reference */}
          <Section title="Complete YAML Reference" icon={<Settings size={32} />} id="yaml-reference">
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">YAML Path</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-900">Inst.</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-900">Ens.</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { path: 'processing.instantaneous', inst: 'Y', ens: '-', desc: 'Enable instantaneous mode' },
                    { path: 'processing.ensemble', inst: '-', ens: 'Y', desc: 'Enable ensemble mode' },
                    { path: '*_piv.window_size', inst: 'Y', ens: 'Y', desc: 'List of [H, W] per pass' },
                    { path: '*_piv.overlap', inst: 'Y', ens: 'Y', desc: 'Overlap % per pass' },
                    { path: '*_piv.runs', inst: 'Y', ens: 'Y', desc: 'Passes to save (1-based)' },
                    { path: 'instantaneous_piv.peak_finder', inst: 'Y', ens: '-', desc: 'gauss3 / gauss4 / gauss5 / gauss6' },
                    { path: 'ensemble_piv.type', inst: '-', ens: 'Y', desc: 'Per-pass: std or single' },
                    { path: 'ensemble_piv.sum_window', inst: '-', ens: 'Y', desc: '[H, W] for single mode' },
                    { path: 'ensemble_piv.fit_method', inst: '-', ens: 'Y', desc: 'gaussian or kspace [BETA]' },
                    { path: 'ensemble_piv.background_subtraction_method', inst: '-', ens: 'Y', desc: 'correlation or image' },
                    { path: 'ensemble_piv.gradient_correction', inst: '-', ens: 'Y', desc: 'Reynolds stress gradient correction' },
                    { path: 'ensemble_piv.store_planes', inst: '-', ens: 'Y', desc: 'Save correlation planes' },
                    { path: 'ensemble_piv.save_diagnostics', inst: '-', ens: 'Y', desc: 'Save debug data' },
                    { path: 'ensemble_piv.resume_from_pass', inst: '-', ens: 'Y', desc: '0 = fresh, N = resume from pass N' },
                    { path: 'outlier_detection.*', inst: 'Y', ens: '-', desc: 'enabled, methods: [{type, threshold, epsilon}]' },
                    { path: 'ensemble_outlier_detection.*', inst: '-', ens: 'Y', desc: 'Same structure as outlier_detection' },
                    { path: 'infilling.*', inst: 'Y', ens: '-', desc: 'mid_pass + final_pass config' },
                    { path: 'ensemble_infilling.*', inst: '-', ens: 'Y', desc: 'Same structure as infilling' },
                    { path: 'processing.omp_threads', inst: 'Y', ens: 'Y', desc: 'OpenMP threads (default 1)' },
                    { path: 'processing.dask_workers_per_node', inst: 'Y', ens: 'Y', desc: 'Dask workers (default 1)' },
                    { path: 'processing.dask_memory_limit', inst: 'Y', ens: 'Y', desc: 'Per-worker RAM (default 4GB)' },
                    { path: 'processing.cluster_type', inst: 'Y', ens: 'Y', desc: 'local or slurm' },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 font-mono text-purple-600">{row.path}</td>
                      <td className="px-3 py-2 text-center">{row.inst}</td>
                      <td className="px-3 py-2 text-center">{row.ens}</td>
                      <td className="px-3 py-2 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <YamlDropdown
              title="Full config example"
              defaultOpen={true}
              code={`processing:
  instantaneous: true
  ensemble: false
  backend: cpu
  omp_threads: 2
  dask_workers_per_node: 4
  dask_memory_limit: 4GB
  cluster_type: local
  filter_worker_count: 1

instantaneous_piv:
  window_size:
  - [128, 128]
  - [64, 64]
  - [32, 32]
  overlap:
  - 50
  - 50
  - 50
  runs:
  - 3
  peak_finder: gauss3

ensemble_piv:
  window_size:
  - [128, 128]
  - [64, 64]
  - [16, 16]
  overlap:
  - 50
  - 50
  - 50
  type:
  - std
  - std
  - single
  runs:
  - 3
  sum_window:
  - 64
  - 64
  fit_method: gaussian
  background_subtraction_method: correlation
  gradient_correction: false
  store_planes: false
  save_diagnostics: false
  resume_from_pass: 0

outlier_detection:
  enabled: true
  methods:
  - type: peak_mag
    threshold: 0.4
  - type: median_2d
    epsilon: 0.2
    threshold: 2

ensemble_outlier_detection:
  enabled: true
  methods:
  - type: median_2d
    epsilon: 0.2
    threshold: 2

infilling:
  mid_pass:
    method: biharmonic
    parameters:
      ksize: 3
  final_pass:
    enabled: true
    method: biharmonic
    parameters:
      ksize: 3

ensemble_infilling:
  mid_pass:
    method: biharmonic
    parameters:
      ksize: 3
  final_pass:
    enabled: true
    method: biharmonic
    parameters:
      ksize: 3`}
            />
          </Section>

          {/* CLI */}
          <Section title="Command Line Usage" icon={<Terminal size={32} />} id="cli">
            <CodeBlock code={`# Run instantaneous PIV
pivtools-cli instantaneous

# Run ensemble PIV
pivtools-cli ensemble

# Process specific paths only (0-indexed)
pivtools-cli instantaneous -p 0,2

# Override active paths
pivtools-cli ensemble --active-paths 0,1`} title="Terminal" />

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Command</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { cmd: "pivtools-cli init", desc: "Create default config.yaml" },
                    { cmd: "pivtools-cli instantaneous", desc: "Run instantaneous PIV" },
                    { cmd: "pivtools-cli ensemble", desc: "Run ensemble PIV" },
                    { cmd: "pivtools-cli apply-calibration", desc: "Apply calibration to vectors" },
                    { cmd: "pivtools-cli statistics", desc: "Compute statistics" },
                    { cmd: "pivtools-cli transform", desc: "Apply geometric transforms" },
                    { cmd: "pivtools-cli merge", desc: "Merge multi-camera fields" },
                    { cmd: "pivtools-cli video", desc: "Create visualisation videos" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-purple-600">{row.cmd}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 text-sm">
              All commands read settings from <code className="bg-gray-100 px-1 rounded">config.yaml</code> in the current directory. Use <code className="bg-gray-100 px-1 rounded">-p 0,1</code> to override <code className="bg-gray-100 px-1 rounded">paths.active_paths</code>. Use <code className="bg-gray-100 px-1 rounded">--help</code> for command-specific options.
            </p>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Next: Calibration</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Convert pixel displacements to physical velocities.
            </p>
            <a
              href="/manual/planar-calibration"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Planar Calibration Guide
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
