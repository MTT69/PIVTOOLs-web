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
  AlertTriangle,
  Sliders,
  Crosshair,
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

          {/* Quick Recipe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-soton-gold/40 rounded-xl p-6 mb-16"
          >
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Zap className="text-soton-gold" size={22} />
              <h3 className="text-xl font-bold text-gray-900">Quick Recipe</h3>
              <span className="text-sm text-gray-500 italic sm:ml-auto">opinionated defaults &mdash; full reference below</span>
            </div>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">1.</span><span>Pick a mode: <strong>Instantaneous</strong> for per-pair velocity fields, <strong>Ensemble</strong> for time-averaged flow + Reynolds stresses from many pairs.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">2.</span><span>Window table <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">[128,128] &rarr; [64,64] &rarr; [32,32]</code> at <strong>50% overlap</strong> covers the vast majority of setups. Drop the final pass to <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">[16,16]</code> with <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">single</code> mode for ensemble at max resolution.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">3.</span><span>Leave the peak finder at default (<code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">gauss3</code> instantaneous, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">gauss6</code> ensemble). Leave outlier detection and infilling <strong>on</strong>.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">4.</span><span>Ensemble users: keep <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">fit_method: kspace</code> (the default) &mdash; it is faster and gives more accurate Reynolds stresses than the Gaussian fitter.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">5.</span><span>Click <strong>Run PIV</strong> (GUI) or <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pivtools-cli instantaneous</code> / <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">ensemble</code>. Come back to this page if results look wrong.</span></li>
            </ol>
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
                    { label: "Peak finder", inst: "Configurable (gauss3-6)", ens: "Configurable (default gauss6)" },
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
                <strong>Both modes.</strong> Instantaneous defaults to gauss3. Ensemble defaults to gauss6.
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

          {/* Predictor & Peak Settings */}
          <Section title="Predictor & Peak Settings" icon={<Sliders size={32} />} id="predictor-peak">
            <p className="text-gray-700 text-lg mb-6">
              Control how the predictor field is refined between multi-pass iterations and configure multi-peak detection.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Setting</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Default</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Mode</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: "predictor_smoothing", default: "true / false", mode: "Inst / Ens", desc: "Gaussian-smooth the predictor between passes. Recommended for instantaneous (reduces single-pair noise). For ensemble, smoothing can destroy real gradients — leave disabled unless data is very noisy." },
                    { setting: "image_warp_interpolation", default: "cubic", mode: "Both", desc: "Interpolation kernel for image warping during predictor deformation. cubic = bicubic (4\u00d74 stencil), lanczos = Lanczos-3 (6\u00d76 stencil, slightly sharper)." },
                    { setting: "secondary_peak", default: "false", mode: "Instantaneous", desc: "Extract the second-highest correlation peak per window. Useful for reverse flow or multiple particle populations." },
                    { setting: "num_peaks", default: "1", mode: "Instantaneous", desc: "Number of correlation peaks to detect per window. Usually 1; increase for multi-peak analysis." },
                    { setting: "save_mode", default: "minimal", mode: "Instantaneous", desc: "Output fields per vector file. 'minimal' saves ux, uy, b_mask only (fastest). 'full' saves all 11 fields including peak height, sigma, stresses." },
                    { setting: "save_compression", default: "false", mode: "Instantaneous", desc: "Enable ZLIB compression on .mat output files. Slower writes but smaller file size." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-purple-600">{row.setting}</td>
                      <td className="px-4 py-3 font-mono text-green-600">{row.default}</td>
                      <td className="px-4 py-3 text-gray-600">{row.mode}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock code={`instantaneous_piv:
  predictor_smoothing: true
  secondary_peak: false
  num_peaks: 1
  save_mode: minimal
  save_compression: false
  image_warp_interpolation: cubic

ensemble_piv:
  predictor_smoothing: false
  image_warp_interpolation: cubic`} title="config.yaml" />
          </Section>

          {/* Boundary Conditions */}
          <Section title="Boundary Conditions" icon={<Crosshair size={32} />} id="boundary-conditions">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-700 text-sm">
                <strong>Ensemble only.</strong> Overrides edge-replicated predictor padding near walls with prescribed velocity values.
              </p>
            </div>

            <p className="text-gray-700 text-lg mb-6">
              In wall-bounded flows, the predictor field near boundaries can be corrupted by edge replication. Boundary conditions let you prescribe known velocities (e.g., no-slip: ux=0, uy=0) at specific wall positions.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Field</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { field: "y_position", type: "int (px)", desc: "Row position of the wall in the image" },
                    { field: "ux", type: "float (px/frame)", desc: "Prescribed horizontal displacement at the wall" },
                    { field: "uy", type: "float (px/frame)", desc: "Prescribed vertical displacement at the wall" },
                    { field: "edge", type: "'bottom' | 'top'", desc: "Which image edge the wall is near" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-purple-600">{row.field}</td>
                      <td className="px-4 py-3 text-gray-600">{row.type}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock code={`ensemble_piv:
  predictor_boundary_conditions:
  - y_position: 10
    ux: 0
    uy: 0
    edge: bottom
  - y_position: 950
    ux: 0
    uy: 0
    edge: top`} title="config.yaml — no-slip walls at top and bottom" />
          </Section>

          {/* Correlation & Fitting */}
          <Section title="Correlation & Fitting" icon={<Crosshair size={32} />} id="correlation-fitting">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-700 text-sm">
                <strong>Ensemble only.</strong> Advanced controls for peak fitting and memory management.
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
                    { setting: "fit_offset", default: "true", desc: "Include a constant offset in the Gaussian sub-pixel fit. Accounts for correlation plane background level." },
                    { setting: "mask_center_pixel", default: "true", desc: "Mask the autocorrelation center pixel before peak fitting. Prevents the zero-lag spike from biasing displacement estimates." },
                    { setting: "persist_images", default: "false", desc: "Keep all filtered images in worker RAM across passes. Faster on HPC with lots of memory, but significantly increases RAM usage." },
                    { setting: "sum_fitting_window_enabled", default: "false", desc: "Extract a central sub-region from the summed correlation plane before peak fitting. Reduces memory and speeds up fitting." },
                    { setting: "sum_fitting_window", default: "[16, 16]", desc: "Size [H, W] of the central extraction window. Only active when sum_fitting_window_enabled is true." },
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

            <CodeBlock code={`ensemble_piv:
  fit_offset: true
  mask_center_pixel: true
  persist_images: false
  sum_fitting_window_enabled: false
  sum_fitting_window:
  - 16
  - 16`} title="config.yaml" />
          </Section>

          {/* Ensemble Options */}
          <Section title="Ensemble Options" icon={<Database size={32} />} id="ensemble-options">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-700 text-sm">
                <strong>Ensemble only.</strong> Available in the collapsible Ensemble Options panel.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Why <code className="bg-blue-100 px-1 rounded">kspace</code> is the ensemble default:</strong>{' '}
                The k-space fitter (ensemble only) jointly estimates displacement, Reynolds stresses, the
                loss-of-correlation gain and the spectral noise floor in one fit, so noise does not bias the
                stresses. There are no tuning knobs &mdash; the defaults are the validated recipe.
                Instantaneous PIV always uses the LM Gaussian peak fitter; the k-space
                option does not apply there.
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
                    { setting: "fit_method", default: "kspace", desc: "'kspace' (Fourier-space one-stage joint LM fit: displacement, stresses, gain, noise floor; default) or 'kspace_linear' (closed-form linear fitter \u2014 cannot fail to converge, robust on hostile experimental data)." },
                    { setting: "background_subtraction_method", default: "correlation", desc: "'correlation': R = <AB> - <A><B> (single-pass, memory efficient). 'image': R = <(A-\u03BCA)(B-\u03BCB)> (two-pass, more stable for k-space). 'window_mean': per-pair per-window mean subtraction inside the correlator. 'correlation+window_mean' / 'image+window_mean': both \u2014 stationary-background removal plus per-pair window-mean removal (per_pair_normalization must be off)" },
                    { setting: "gradient_correction", default: "false", desc: "Reynolds stress gradient correction near walls" },
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
                    { setting: "omp_threads", default: "4", desc: "OpenMP threads per worker for C extensions" },
                    { setting: "dask_workers_per_node", default: "2", desc: "Number of parallel Dask workers" },
                    { setting: "dask_memory_limit", default: "8GB", desc: "RAM allocation per worker" },
                    { setting: "dask_max_in_flight_per_worker", default: "3", desc: "Max concurrent tasks queued per worker. Higher values (4-6) improve I/O pipelining on HPC with fast storage." },
                    { setting: "open_dashboard", default: "false", desc: "Auto-open the Dask performance dashboard in your browser when processing starts" },
                    { setting: "cluster_type", default: "local", desc: "'local' or 'slurm'" },
                    { setting: "filter_worker_count", default: "1", desc: "Workers for preprocessing. Set 1 for temporal filters, 2+ for spatial-only." },
                    { setting: "auto_compute_params", default: "false", desc: "Auto-compute omp_threads, dask_workers, and dask_memory from system resources" },
                    { setting: "n_nodes", default: "1", desc: "Number of compute nodes (SLURM cluster only)" },
                    { setting: "slurm_walltime", default: "01:00:00", desc: "Job walltime for SLURM submissions" },
                    { setting: "slurm_partition", default: "(none)", desc: "SLURM partition name" },
                    { setting: "post_processing_workers", default: "auto", desc: "Max parallel workers for calibration, statistics, merge, and transform. auto = min(cpu_count, 16)" },
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
  omp_threads: 4
  dask_workers_per_node: 2
  dask_memory_limit: 8GB
  dask_max_in_flight_per_worker: 3
  open_dashboard: false
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
                    { method: "nearest", params: "(none)", desc: "Nearest valid vector via distance transform. Fastest, robust for clustered gaps." },
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
    method: nearest           # no parameters needed
  final_pass:
    enabled: true
    method: biharmonic        # no parameters needed`} title="config.yaml" />
          </Section>

          {/* NaN Reason Codes */}
          <Section title="NaN Reason Codes" icon={<AlertTriangle size={32} />} id="nan-reason">
            <p className="text-gray-700 text-lg mb-4">
              Every interrogation window is assigned a <code className="bg-gray-100 px-1 rounded font-mono text-sm">nan_reason</code> code
              indicating why it was marked invalid, or <strong>0</strong> if it passed all checks.
              This field is saved in the output <code className="bg-gray-100 px-1 rounded font-mono text-sm">.mat</code> file
              and is shared by both Gaussian and k-space fitters.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Code</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Stage</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { code: '-1', stage: 'Pre-fitting', desc: 'Masked vector (outside ROI / polygon mask)' },
                    { code: '0', stage: 'Success', desc: 'Fit succeeded and passed all validation checks' },
                    { code: '1', stage: 'Fitting', desc: 'Solver did not converge (LM for Gaussian, TRF for k-space)' },
                    { code: '2', stage: 'Post-fit validation', desc: 'AB peak height invalid (Gaussian) or SNR too low (k-space)' },
                    { code: '3', stage: 'Post-fit validation', desc: 'Displacement exceeds 3/4 window rule (peak too far from centre)' },
                    { code: '5', stage: 'Post-fit validation', desc: 'Negative sigma / variance values (unphysical fit)' },
                    { code: '6', stage: 'Displacement check', desc: 'Displacement exceeds 3/4 window rule (checked in accumulator)' },
                    { code: '10', stage: 'Outlier detection', desc: 'Velocity outlier: fit succeeded but flagged by median-based displacement outlier detection' },
                    { code: '11', stage: 'Outlier detection', desc: 'Stress outlier: fit succeeded but flagged by stress field median test or Cauchy-Schwarz realizability violation (ensemble only)' },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-red-600 font-bold">{row.code}</td>
                      <td className="px-4 py-3 text-gray-600">{row.stage}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <h5 className="font-semibold text-gray-900 mb-2">Validation pipeline order</h5>
              <ol className="list-decimal list-inside text-gray-600 space-y-1 text-sm">
                <li>Fitter attempts fit (codes 1, 2)</li>
                <li>Post-fit parameter validation (codes 3, 5)</li>
                <li>Displacement magnitude check in accumulator (code 6)</li>
                <li>Velocity outlier detection via median test (code 10)</li>
                <li>Stress outlier detection + realizability check, ensemble final pass only (code 11)</li>
                <li>Vectors with code 0 after all checks are valid</li>
              </ol>
            </div>

            <p className="text-gray-500 text-sm">
              Codes 3 and 6 both enforce the 3/4 displacement rule but at different stages: code 3 is checked inside the fitter, code 6 in the accumulator after the fitter returns. Vectors flagged with codes 10 or 11 are infilled from neighbours if infilling is enabled.
            </p>
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
                    { path: '*_piv.peak_finder', inst: 'Y', ens: 'Y', desc: 'gauss3 (inst default) / gauss4 / gauss5 / gauss6 (ens default)' },
                    { path: '*_piv.predictor_smoothing', inst: 'Y', ens: 'Y', desc: 'Smooth predictor between passes (inst: true, ens: false)' },
                    { path: 'instantaneous_piv.secondary_peak', inst: 'Y', ens: '-', desc: 'Detect secondary correlation peak (default false)' },
                    { path: 'instantaneous_piv.num_peaks', inst: 'Y', ens: '-', desc: 'Number of peaks to detect (default 1)' },
                    { path: 'ensemble_piv.type', inst: '-', ens: 'Y', desc: 'Per-pass: std or single' },
                    { path: 'ensemble_piv.sum_window', inst: '-', ens: 'Y', desc: '[H, W] for single mode' },
                    { path: 'ensemble_piv.fit_method', inst: '-', ens: 'Y', desc: 'kspace (one-stage joint LM) or kspace_linear (closed-form)' },
                    { path: 'ensemble_piv.background_subtraction_method', inst: '-', ens: 'Y', desc: 'correlation, image, window_mean, correlation+window_mean or image+window_mean' },
                    { path: 'ensemble_piv.gradient_correction', inst: '-', ens: 'Y', desc: 'Reynolds stress gradient correction' },
                    { path: 'ensemble_piv.fit_offset', inst: '-', ens: 'Y', desc: 'Include offset in Gaussian fit (default true)' },
                    { path: 'ensemble_piv.mask_center_pixel', inst: '-', ens: 'Y', desc: 'Mask autocorrelation center pixel (default true)' },
                    { path: 'ensemble_piv.persist_images', inst: '-', ens: 'Y', desc: 'Keep filtered images in worker RAM (default false)' },
                    { path: 'ensemble_piv.image_warp_interpolation', inst: '-', ens: 'Y', desc: 'Image warp kernel: cubic or lanczos' },
                    { path: 'instantaneous_piv.image_warp_interpolation', inst: 'Y', ens: '-', desc: 'Image warp kernel: cubic or lanczos (default cubic)' },
                    { path: 'instantaneous_piv.save_mode', inst: 'Y', ens: '-', desc: 'minimal (3 fields) or full (11 fields)' },
                    { path: 'instantaneous_piv.save_compression', inst: 'Y', ens: '-', desc: 'ZLIB compression on .mat files (default false)' },
                    { path: 'ensemble_piv.predictor_boundary_conditions', inst: '-', ens: 'Y', desc: 'Wall boundary conditions array' },
                    { path: 'ensemble_piv.sum_fitting_window_enabled', inst: '-', ens: 'Y', desc: 'Extract central sub-region for fitting' },
                    { path: 'ensemble_piv.sum_fitting_window', inst: '-', ens: 'Y', desc: '[H, W] extraction size (default [16,16])' },
                    { path: 'ensemble_piv.store_planes', inst: '-', ens: 'Y', desc: 'Save correlation planes' },
                    { path: 'ensemble_piv.save_diagnostics', inst: '-', ens: 'Y', desc: 'Save debug data' },
                    { path: 'ensemble_piv.resume_from_pass', inst: '-', ens: 'Y', desc: '0 = fresh, N = resume from pass N' },
                    { path: 'outlier_detection.*', inst: 'Y', ens: '-', desc: 'enabled, methods: [{type, threshold, epsilon}]' },
                    { path: 'ensemble_outlier_detection.*', inst: '-', ens: 'Y', desc: 'Same structure as outlier_detection' },
                    { path: 'infilling.*', inst: 'Y', ens: '-', desc: 'mid_pass + final_pass config' },
                    { path: 'ensemble_infilling.*', inst: '-', ens: 'Y', desc: 'Same structure as infilling' },
                    { path: 'processing.omp_threads', inst: 'Y', ens: 'Y', desc: 'OpenMP threads (default 4)' },
                    { path: 'processing.dask_workers_per_node', inst: 'Y', ens: 'Y', desc: 'Dask workers (default 2)' },
                    { path: 'processing.dask_memory_limit', inst: 'Y', ens: 'Y', desc: 'Per-worker RAM (default 8GB)' },
                    { path: 'processing.dask_max_in_flight_per_worker', inst: 'Y', ens: 'Y', desc: 'Max tasks per worker (default 3)' },
                    { path: 'processing.open_dashboard', inst: 'Y', ens: 'Y', desc: 'Auto-open Dask dashboard (default false)' },
                    { path: 'processing.cluster_type', inst: 'Y', ens: 'Y', desc: 'local or slurm' },
                    { path: 'processing.auto_compute_params', inst: 'Y', ens: 'Y', desc: 'Auto-compute worker/thread settings (default false)' },
                    { path: 'processing.post_processing_workers', inst: 'Y', ens: 'Y', desc: 'Parallel post-processing workers (default auto)' },
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
  omp_threads: 4
  dask_workers_per_node: 2
  dask_memory_limit: 8GB
  dask_max_in_flight_per_worker: 3
  open_dashboard: false
  cluster_type: local
  filter_worker_count: 1
  auto_compute_params: false
  post_processing_workers: null

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
  predictor_smoothing: true
  secondary_peak: false
  num_peaks: 1
  image_warp_interpolation: cubic
  save_mode: minimal
  save_compression: false

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
  fit_method: kspace
  background_subtraction_method: correlation
  gradient_correction: false
  fit_offset: true
  mask_center_pixel: true
  persist_images: false
  predictor_smoothing: false
  image_warp_interpolation: cubic
  predictor_boundary_conditions: []
  sum_fitting_window_enabled: false
  sum_fitting_window:
  - 16
  - 16
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
    parameters: {}
  final_pass:
    enabled: true
    method: biharmonic
    parameters: {}

ensemble_infilling:
  mid_pass:
    method: biharmonic
    parameters: {}
  final_pass:
    enabled: true
    method: biharmonic
    parameters: {}`}
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
