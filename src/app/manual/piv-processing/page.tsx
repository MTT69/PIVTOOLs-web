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
              <span className="text-sm text-gray-500 italic sm:ml-auto">opinionated defaults -- full reference below</span>
            </div>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">1.</span><span>Pick a mode: <strong>Instantaneous</strong> for per-pair velocity fields, <strong>Ensemble</strong> for time-averaged flow + Reynolds stresses from many pairs.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">2.</span><span>Window table <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">[128,128] &rarr; [64,64] &rarr; [32,32]</code> at <strong>50% overlap</strong> covers the vast majority of setups. Drop the final pass to <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">[16,16]</code> with <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">single</code> mode for ensemble at max resolution.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">3.</span><span>Leave the instantaneous peak finder at its default (<code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">gauss6</code>). Leave outlier detection and infilling <strong>on</strong>.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">4.</span><span>Ensemble users: leave <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">fit_method: kspace</code> alone. It is the only ensemble fitter, and it estimates the Reynolds stresses jointly with the noise floor so noise does not bias them.</span></li>
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
                    { label: "Peak finder", inst: "Configurable (gauss3-6, default gauss6)", ens: "Not applicable: the k-space fitter returns displacement directly" },
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
                    { param: "window_size", format: "[Height, Width]", desc: "Interrogation window in pixels per pass. Each axis must be a built FFT size (8, 12, 16, 24, 32, 48, 64, 96, 128). On an ensemble single-mode pass this is instead the Frame-A mask support inside sum_window rather than an FFT length, so 4 and 6 are also legal there and the grid spacing follows it. Rectangular windows supported." },
                    { param: "overlap", format: "number (%)", desc: "Overlap percentage per pass, from 0 up to but not including 100. Decimals are allowed (62.5). Give one value per pass, or a single value for every pass. 50% doubles grid density." },
                    { param: "runs", format: "list of pass numbers", desc: "Which passes to save (1-based). The list is honoured exactly. An empty list is refused when config.yaml is read: \"instantaneous_piv.runs: no passes to save (list the pass numbers, e.g. [4] for the last pass)\"." },
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

            <p className="text-gray-700 mb-6">
              In the GUI, a box whose text is not a number turns red with the reason under it, and the tab shows
              &quot;Not saved: correct the field marked in red.&quot; until it is fixed. A value is saved as typed, so an
              overlap of 0 stays 0. A save that fails, or that the config rules refuse, shows its error and changes
              nothing (<a href="/manual/cli-reference#config-refused" className="underline">Config Refused</a>).
            </p>

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
                    <td className="px-4 py-3 text-gray-600">FFT correlation window size [H, W] (default [32, 32])</td>
                    <td className="px-4 py-3 text-gray-600">Must be a built FFT size and &gt;= each single-mode pass window</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-purple-600">sum_fitting_window</td>
                    <td className="px-4 py-3 text-gray-600">Central crop of the summed plane used for fitting (default [32, 32]; null fits the whole sum_window)</td>
                    <td className="px-4 py-3 text-gray-600">Positive, even, &lt;= sum_window. Exempt from the FFT-size restriction (it is a crop, not an FFT)</td>
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
              The cameras to process are chosen on Setup, under <a href="/manual/image-configuration#cameras-to-process" className="underline">Cameras to process</a>. The Instantaneous and Ensemble tabs show the saved selection read-only, at every camera count, with a <strong>Change in Setup</strong> link. At least one must be selected. In YAML, set <code className="bg-gray-100 px-1 rounded">paths.camera_numbers</code>.
            </p>
          </Section>

          {/* Peak Finding */}
          <Section title="Peak Finding" icon={<Target size={32} />} id="peak-finding">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Both modes.</strong> Instantaneous and ensemble both default to gauss6.
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
  peak_finder: gauss6   # Options: gauss3, gauss4, gauss5, gauss6`} title="config.yaml" />
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
                    { setting: "predictor_smoothing", default: "true / false", mode: "Inst / Ens", desc: "Gaussian-smooth the predictor between passes. Recommended for instantaneous (reduces single-pair noise). For ensemble, smoothing can destroy real gradients -- leave disabled unless data is very noisy." },
                    { setting: "image_warp_interpolation", default: "lanczos4", mode: "Both", desc: "Interpolation kernel for image warping during predictor deformation. lanczos4 = normalised Lanczos-4 (8\u00d78 stencil): warp bias at or below 0.003 px for 2\u20135 px particles, about 4\u20137 % more run time than cubic. lanczos3 = normalised Lanczos-3 (6\u00d76). cubic = Keys bicubic (4\u00d74): biases vectors by 0.04\u20130.09 px for 3\u201310 px particles. Any other name is refused when the config is read; the old name lanczos is now lanczos3." },
                    { setting: "secondary_peak", default: "false", mode: "Instantaneous", desc: "Extract the second-highest correlation peak per window. Useful for reverse flow or multiple particle populations." },
                    { setting: "num_peaks", default: "1", mode: "Instantaneous", desc: "Number of correlation peaks to detect per window. Usually 1; increase for multi-peak analysis." },
                    { setting: "window_type", default: "gaussian (inst.) / square (ens.)", mode: "Both", desc: "Taper applied to each interrogation window before correlation: square or gaussian. Any other name (including the removed blackman and gaussiantop) is refused when the config is read. No GUI control; set it in YAML." },
                    { setting: "save_mode", default: "minimal", mode: "Instantaneous", desc: "Output fields per vector file. 'minimal' saves ux, uy, b_mask only (fastest). 'full' adds nan_mask, nan_reason, peak_mag, peak_ratio, peak_choice, window centres, n_windows, window_size and predictor_field (13 fields)." },
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
  image_warp_interpolation: lanczos4

ensemble_piv:
  predictor_smoothing: false
  image_warp_interpolation: lanczos4`} title="config.yaml" />
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
                    { setting: "persist_images", default: "false", desc: "Keep all filtered images in worker RAM across passes. Faster on HPC with lots of memory, but significantly increases RAM usage." },
                    { setting: "sum_fitting_window_enabled", default: "true", desc: "Extract a central crop from the summed correlation plane before peak fitting. Reduces memory and speeds up fitting." },
                    { setting: "sum_fitting_window", default: "[32, 32]", desc: "Size [H, W] of the central crop; null fits the whole sum_window. Must be positive, even, and <= sum_window; not restricted to built FFT sizes." },
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
  persist_images: false
  sum_fitting_window_enabled: true
  sum_fitting_window:
  - 32
  - 32`} title="config.yaml" />
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
                stresses. It is the only ensemble fitter. The defaults are the validated recipe and most users should
                leave them alone, but three knobs exist for cases the default model does not describe well:
                <code className="bg-blue-100 px-1 rounded">kspace_shape</code>,
                <code className="bg-blue-100 px-1 rounded">kspace_floor</code> and
                <code className="bg-blue-100 px-1 rounded">envelope_divide</code>, all documented below.
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
                    { setting: "fit_method", default: "kspace", desc: "'kspace' (Fourier-space one-stage joint LM fit: displacement, stresses, gain, noise floor). This is the only accepted value -- any other raises at config load." },
                    { setting: "kspace_shape", default: "gaussian", desc: "Displacement-PDF shape assumed by the fit. 'gaussian', or add quartic kurtosis terms with 'kx4', 'ky4' or 'kx4+ky4'. Use a quartic term when the displacement distribution is measurably non-Gaussian along that axis; the Gaussian assumption otherwise biases the stresses." },
                    { setting: "kspace_floor", default: "coloured", desc: "Noise-floor model. 'coloured' fits an analytic N0*P(k) shaped by the imaging and processing pipeline. 'flat' is the pre-2026-07 constant floor, kept for reproducing older runs." },
                    { setting: "envelope_divide", default: "false", desc: "Divide AA/BB/AB by the pair-count envelope before fitting. Off leaves the tent attenuation in place, which the fit accounts for. Set true only to reproduce pre-2026-07-27 results." },
                    { setting: "background_subtraction_method", default: "correlation", desc: "'correlation': R = <AB> - <A><B> (single-pass, memory efficient). 'image': R = <(A-\u03BCA)(B-\u03BCB)> (two-pass, more stable for k-space). 'window_mean': per-pair per-window mean subtraction inside the correlator. 'correlation+window_mean' / 'image+window_mean': stationary-background removal plus per-pair window-mean removal. 'correlation+dc_zero' / 'image+dc_zero': zero the DC bin after correlation in Fourier space, with no per-pair mean." },
                    { setting: "per_pair_normalization", default: "false", desc: "Equalises fluctuation-energy weighting across pairs. Only legal when background_subtraction_method is exactly 'window_mean' -- any combined mode raises." },
                    { setting: "gradient_correction", default: "false", desc: "Reynolds stress gradient correction near walls" },
                    { setting: "store_planes", default: "false", desc: "Save AA, BB, AB correlation planes to disk (large files)" },
                    { setting: "save_diagnostics", default: "false", desc: "Warped-image diagnostics under filters/, plus a per-window fit_diagnostics_pass_N.mat holding gain, N0, cost_per_pt, n_valid, iter, conv and status (with b4x/b4y when a quartic shape is active). Each file also records the settings that produced it: pass_idx, n_pairs, bg_method, per_pair_normalization, gain_normalised, kspace_shape and kspace_floor." },
                    { setting: "resume_from_pass", default: "0", desc: "Resume from pass N (1-based). 0 = fresh start. Requires an existing ensemble_result.mat that holds the uncorrected stresses (UU/VV/UV_stress_uncorrected), so the gradient correction is applied once. An older file without them is refused with the missing field named; rerun from pass 1." },
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

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Two defaults changed.</strong> <code className="bg-blue-100 px-1 rounded">kspace_floor</code> is now <code className="bg-blue-100 px-1 rounded">coloured</code> rather than flat, and <code className="bg-blue-100 px-1 rounded">envelope_divide</code> is now off where the divide previously always happened. Both change your numbers, and both can be switched back to reproduce an older run. The other recent additions (<code className="bg-blue-100 px-1 rounded">window_mean</code>, <code className="bg-blue-100 px-1 rounded">per_pair_normalization</code>, <code className="bg-blue-100 px-1 rounded">predictor_rounding</code>, <code className="bg-blue-100 px-1 rounded">kspace_shape</code>) all default to the legacy or off behaviour. A config written before these keys existed is refused until they are added; the refusal gives each key with the value a fresh config has.
              </p>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Brightness controls for difficult experimental data</h4>
            <p className="text-gray-700 text-lg mb-4">
              Three controls address distinct brightness artefacts and compose. The <code className="bg-gray-100 px-1 rounded">meannorm</code> preprocessing filter (<code className="bg-gray-100 px-1 rounded">filters: [{'{'}type: meannorm{'}'}]</code> -- an image filter, not an <code className="bg-gray-100 px-1 rounded">ensemble_piv</code> key) divides each frame by its spatial mean and fixes multiplicative gain. <code className="bg-gray-100 px-1 rounded">window_mean</code> removes the additive per-pair pedestal. <code className="bg-gray-100 px-1 rounded">per_pair_normalization</code> equalises fluctuation-energy weighting across pairs.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Recommended escalation ladder when ensemble results degrade on experimental data: <code className="bg-gray-100 px-1 rounded">gain_normalisation</code> &rarr; <code className="bg-gray-100 px-1 rounded">meannorm</code> &rarr; <code className="bg-gray-100 px-1 rounded">window_mean</code> &rarr; add <code className="bg-gray-100 px-1 rounded">per_pair_normalization</code> &rarr; add <code className="bg-gray-100 px-1 rounded">predictor_rounding</code>. If the stresses still look wrong and you have reason to think the displacement PDF is non-Gaussian, try a quartic <code className="bg-gray-100 px-1 rounded">kspace_shape</code>.
            </p>

            <CodeBlock code={`preprocessing:
  gain_normalisation: true        # divide out per-frame laser gain first

filters:
- type: meannorm          # image filter: fixes multiplicative gain

ensemble_piv:
  background_subtraction_method: window_mean
  per_pair_normalization: true    # requires exactly window_mean
  predictor_rounding: true`} title="config.yaml -- difficult-data recipe" />
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
                    { setting: "dask_workers_per_node", default: "1", desc: "Number of parallel Dask workers" },
                    { setting: "dask_memory_limit", default: "12GB", desc: "RAM allocation per worker" },
                    { setting: "dask_max_in_flight_per_worker", default: "3", desc: "Max concurrent tasks queued per worker. Higher values (4-6) improve I/O pipelining on HPC with fast storage." },
                    { setting: "open_dashboard", default: "false", desc: "Auto-open the Dask performance dashboard in your browser when processing starts" },
                    { setting: "cluster_type", default: "local", desc: "'local' or 'slurm'" },
                    { setting: "auto_compute_params", default: "false", desc: "Auto-compute omp_threads, dask_workers, and dask_memory from system resources" },
                    { setting: "slurm.nnodes", default: "(none)", desc: "Number of compute nodes. Required when cluster_type is slurm; it has no default." },
                    { setting: "slurm.walltime", default: "01:00:00", desc: "Job walltime for SLURM submissions" },
                    { setting: "slurm.partition", default: "normal", desc: "SLURM partition name" },
                    { setting: "post_processing_workers", default: "auto", desc: "Max parallel workers for calibration, statistics, merge, and transform. auto = min(cpu_count, 16); null in YAML, a blank box in the GUI" },
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
  dask_workers_per_node: 1
  dask_memory_limit: 12GB
  dask_max_in_flight_per_worker: 3
  open_dashboard: false
  cluster_type: local`} title="config.yaml" />

            <CodeBlock code={`processing:
  cluster_type: slurm
  slurm:
    nnodes: 4               # required under slurm, no default
    walltime: 01:00:00
    partition: normal`} title="config.yaml -- SLURM" />

            <p className="text-gray-700 mt-6">
              The Run PIV panel shows a <strong>Memory estimate</strong> warning when the
              batch will not fit in one worker. The estimate is
              3 &times; <code>batches.size</code> &times; 2 images &times; H &times; W &times; 4 bytes
              (raw, filtered, and warped copies of every image in the batch, as float32),
              compared against <code>dask_memory_limit</code>. The warning updates as you edit
              either value and does not block the run. To clear it, reduce
              <code> batches.size</code> or raise <code>dask_memory_limit</code>.
            </p>
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
                    <td className="px-4 py-3 text-gray-600">threshold: 0.2</td>
                    <td className="px-4 py-3 text-gray-600">Reject vectors with correlation peak below threshold</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-purple-600">median_2d</td>
                    <td className="px-4 py-3 text-gray-600">epsilon: 0.1, threshold: 2, size: 5</td>
                    <td className="px-4 py-3 text-gray-600">PIVware-style normalised median test on the vector norm over a size x size neighbourhood (default 5, so 24 neighbours). The vector is judged as a whole rather than per component.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-mono text-purple-600">sigma</td>
                    <td className="px-4 py-3 text-gray-600">sigma_threshold: 2.0</td>
                    <td className="px-4 py-3 text-gray-600">Reject vectors further than N local standard deviations from the local mean.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-purple-600">div_vort</td>
                    <td className="px-4 py-3 text-gray-600">div_thresh, vort_thresh</td>
                    <td className="px-4 py-3 text-gray-600">Reject on divergence and vorticity magnitude. Set either to null for an automatic threshold of 6 x MAD. In the GUI (Divergence / Vorticity), a blank threshold box means automatic.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              A method whose <code className="bg-gray-100 px-1 rounded font-mono text-xs">type</code> is not one of these
              four is refused when the config is read, before any output folder is touched, even when outlier detection is
              disabled. Each test carries every parameter of its type, and only those: a missing one is refused, and the hint
              gives the value a fresh config has.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <CodeBlock code={`outlier_detection:
  enabled: true
  methods:
  - type: peak_mag
    threshold: 0.2
  - type: median_2d
    epsilon: 0.1
    threshold: 2
    size: 5`} title="Instantaneous" />
              <CodeBlock code={`ensemble_outlier_detection:
  enabled: true
  methods:
  - type: median_2d
    epsilon: 0.1
    threshold: 2
    size: 5`} title="Ensemble" />
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
                    { method: "harmonic", params: "(none)", desc: "Harmonic least-squares inpainting. Filled values stay within the range of their neighbours, so it is robust to noisy donors. Default for final_pass." },
                    { method: "knn", params: "n_neighbors: 32, weights: distance, algorithm: kd_tree", desc: "Distance-weighted regression. Sparse data." },
                    { method: "griddata_linear", params: "method: linear (or cubic, nearest)", desc: "Interpolation over a triangulation of the valid vectors. Gaps outside the triangulation, at the field edges, take the nearest valid vector." },
                    { method: "rbf_local", params: "neighbors: 64, kernel: thin_plate_spline, epsilon: null, smoothing: 0.0", desc: "Radial basis functions fitted to the nearest valid vectors. The multiquadric, inverse_multiquadric, inverse_quadratic and gaussian kernels need epsilon (in 1/pixel); a null one is refused when config.yaml is read. Raise smoothing for noisy data." },
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
            <p className="text-gray-600 text-sm mb-6">
              The GUI&apos;s method menu offers all five: Nearest Valid Neighbour, K-Nearest Neighbors, Harmonic,
              Triangulated Interpolation (griddata) with its Interpolation choice, and Local Radial Basis Functions
              with Neighbors, Kernel, Shape Parameter ε (blank = none) and Smoothing.
            </p>

            <CodeBlock code={`infilling:                  # or ensemble_infilling:
  mid_pass:
    method: nearest
    parameters: {}            # nearest takes no parameters
  final_pass:
    enabled: true
    method: harmonic
    parameters: {}            # harmonic takes no parameters`} title="config.yaml" />
            <p className="text-gray-600 text-sm mt-4">
              Each pass holds <code className="bg-gray-100 px-1 rounded font-mono text-xs">parameters</code> with every
              parameter of its method, and only those. Parameters left from a previous method are refused, so change
              the method and its parameters together.
            </p>
          </Section>

          {/* NaN Reason Codes */}
          <Section title="NaN Reason Codes" icon={<AlertTriangle size={32} />} id="nan-reason">
            <p className="text-gray-700 text-lg mb-4">
              Every interrogation window is assigned a <code className="bg-gray-100 px-1 rounded font-mono text-sm">nan_reason</code> code
              indicating why it was marked invalid, or <strong>0</strong> if it passed all checks.
              This field is saved in the output <code className="bg-gray-100 px-1 rounded font-mono text-sm">.mat</code> file.
              The table below is the ensemble taxonomy, produced by the k-space fitters and the
              accumulator. Instantaneous PIV uses its own codes, aligned where the meanings match.
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
                    { code: '1', stage: 'Fitting', desc: 'Fit failed: the LM solve did not converge' },
                    { code: '2', stage: 'Post-fit validation', desc: 'SNR too low' },
                    { code: '3', stage: 'Post-fit validation', desc: 'Displacement exceeds 3/4 window rule (peak too far from centre)' },
                    { code: '5', stage: 'Post-fit validation', desc: 'Negative sigma / variance values (unphysical fit)' },
                    { code: '6', stage: 'Displacement check', desc: 'Displacement exceeds 3/4 window rule (checked in accumulator)' },
                    { code: '7', stage: 'Pre-fitting', desc: 'Too little data: over 25 % of the window (single mode: of the frame-A window) outside the frame or under the mask. Dropped and infilled' },
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

            <p className="text-gray-500 text-sm mb-6">
              Codes 3 and 6 both enforce the 3/4 displacement rule but at different stages: code 3 is checked inside the fitter, code 6 in the accumulator after the fitter returns. Vectors flagged with codes 10 or 11 are infilled from neighbours if infilling is enabled.
            </p>

            <h5 className="font-semibold text-gray-900 mb-2">Instantaneous codes</h5>
            <p className="text-gray-700 text-sm mb-4">
              Instantaneous PIV writes <code className="bg-gray-100 px-1 rounded font-mono text-xs">nan_reason</code> in the{' '}
              <code className="bg-gray-100 px-1 rounded font-mono text-xs">full</code> save mode with its own taxonomy.
              Shared meanings keep the same numbers (-1 masked, 0 valid, 1 peak-fit failure, 7 too little data,
              10 outlier on the primary peak). Code <strong>6</strong> is a large displacement in both pipelines but is decided
              differently: in instantaneous it is a fitted residual beyond a quarter window after the first pass (described below), in ensemble a displacement
              beyond 3/4 of the window. Instantaneous-only codes are <strong>9</strong> unclassified
              (in the NaN mask but no stage claimed it), <strong>12</strong> outlier on a substituted secondary peak,
              and <strong>13</strong> chosen peak magnitude NaN (peaks exhausted).
            </p>
            <p className="text-gray-700 text-sm mb-4">
              The peak search covers integer lags from &minus;N/4 to +N/4 of the window size N on each axis, on every
              pass. A displacement beyond that reach is not found and is not flagged, so choose a first window
              N &ge; 4 &times; (largest displacement + 1 px). On passes after the first, the predictor has already
              removed most of the displacement, so code <strong>6</strong> marks a fitted residual larger than a quarter
              window. Instantaneous windows under 5 px on an axis are refused.
            </p>
            <p className="text-gray-700 text-sm mb-4">
              Image samples the warp takes from outside the frame, and pixels under the mask, have no data: they are
              left out of the window mean and energy, not read as image intensity, and the correlation plane is normalised
              as for a full window. A window with more than 25 % of its pixels missing is dropped as
              code <strong>7</strong> and infilled like any other invalid vector. Windows with no missing pixel are
              correlated exactly as before.
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
                <li>Click <strong>Run PIV</strong>. If output already exists, a confirmation dialog asks to clear and recompute. With masking on, Run first checks every camera&apos;s mask on every selected dataset, and refuses before starting if one is missing, unreadable or not its camera&apos;s image size. The message names the camera and the mask file. The Masking tab shows the same check for the camera on screen. Run also refuses a pairing the images cannot be read with, and a dataset selection that names a dataset the config does not have.</li>
                <li>Monitor progress via the progress bar (instantaneous) or console logs (both modes). The bar spans every selected dataset, and with more than one selected a line beneath names the dataset currently running.</li>
                <li>Cancel gracefully if needed. Partial results may be saved, and the folder is then not a finished run (see below).</li>
              </ol>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Run state and failed runs</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Every output folder (one dataset, one camera, one mode) holds a <code className="bg-gray-100 px-1 rounded font-mono text-sm">run_manifest.json</code>. It says <strong>running</strong> from before the first result file, <strong>complete</strong> once the folder is finished, and <strong>failed</strong> with the error.</li>
                <li>On Windows with long paths off, a run is refused before it starts if any output file path would exceed 259 characters, the most Windows allows; the refusal names the path and its length. Use a shorter <code className="bg-gray-100 px-1 rounded font-mono text-sm">base_paths</code> folder, or enable Windows long paths (<code className="bg-gray-100 px-1 rounded font-mono text-sm">LongPathsEnabled</code> = 1, as an administrator) and start PIVTOOLs again.</li>
                <li>A run into a folder that already holds results is refused before anything is written, naming the folder. Clear it with the Run PIV dialog or <code className="bg-gray-100 px-1 rounded font-mono text-sm">--overwrite</code>. When a processing setting changed since that folder was written, the refusal names it, as <code className="bg-gray-100 px-1 rounded font-mono text-sm">key: old -&gt; new</code>.</li>
                <li>An ensemble resume (<code className="bg-gray-100 px-1 rounded font-mono text-sm">resume_from_pass</code> &gt; 0) needs a running or failed folder written with identical processing settings, and <code className="bg-gray-100 px-1 rounded font-mono text-sm">resume_from_pass</code> at most one more than the passes it saved. An empty folder, or one written before run manifests existed, cannot be resumed. The resume also needs the code that started the run: on different code Run PIV shows the old and new code (for example 0.7.0 → 0.7.1) and asks whether to continue, and the CLI refuses unless given <code className="bg-gray-100 px-1 rounded font-mono text-sm">--allow-code-change</code>. The code is the installed package version, plus the git commit when PIVTOOLs runs from a git checkout, so a pip install is compared by version and a development checkout by commit too; an uninstalled source tree has no version and always counts as a change. An allowed change is written to the log and the run manifest records the new code. Uncommitted edits and rebuilt C libraries are not detected. Every pass in <code className="bg-gray-100 px-1 rounded font-mono text-sm">ensemble_result.mat</code> must hold its <code className="bg-gray-100 px-1 rounded font-mono text-sm">window_size</code>; an older file without it is refused, so re-run from pass 1. A folder written before this version cannot be resumed or added to: the refusal says &quot;settings format changed in this version; start the run again&quot;. Re-run it with <code className="bg-gray-100 px-1 rounded font-mono text-sm">--overwrite</code> or the Run PIV clear dialog.</li>
                <li>Option names (window types, warp kernels, infill and outlier methods, filter types, the image type and the other named processing choices) are accepted in any capitalisation; <code className="bg-gray-100 px-1 rounded font-mono text-sm">Gaussian</code> and <code className="bg-gray-100 px-1 rounded font-mono text-sm">gaussian</code> are the same.</li>
                <li>When one dataset fails, it is marked failed, the others still finish, and the run exits non-zero naming every failure. Run PIV shows <em>Failed</em> with the error line and lists the failed datasets.</li>
                <li>A run stops with an error that names the pair and the image file when a frame is constant (every pixel the same value, or no finite pixel), when a pair has no valid vector in a pass (instantaneous) or a pass has no valid vector (ensemble; the message counts the vectors each rejection reason removed), when an ensemble batch fails or a pass sums a different number of pairs than the run has, and when a Dask worker dies (often out of memory). A worker death during an ensemble run is reported within 5 minutes.</li>
                <li>The vector viewer, statistics, calibration apply and the video maker refuse a folder whose run is running or failed, and say so. Folders written before run manifests existed are still read. The Run PIV live preview reads the folder while it is being written.</li>
                <li><code className="bg-gray-100 px-1 rounded font-mono text-sm">ensemble_piv.window_size</code> and <code className="bg-gray-100 px-1 rounded font-mono text-sm">ensemble_piv.overlap</code> are required for ensemble; the instantaneous values are never used in their place.</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Instantaneous feedback</h5>
                <p className="text-gray-600 text-sm">Progress bar across all selected datasets with a <em>Dataset n of N</em> counter, live vector field preview of the dataset being written (variable selector, colormap), console logs.</p>
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
                    { path: 'instantaneous_piv.peak_finder', inst: 'Y', ens: '-', desc: 'gauss3 / gauss4 / gauss5 / gauss6 (default gauss6)' },
                    { path: '*_piv.predictor_smoothing', inst: 'Y', ens: 'Y', desc: 'Smooth predictor between passes (inst: true, ens: false)' },
                    { path: 'instantaneous_piv.secondary_peak', inst: 'Y', ens: '-', desc: 'Detect secondary correlation peak (default false)' },
                    { path: 'instantaneous_piv.num_peaks', inst: 'Y', ens: '-', desc: 'Number of peaks to detect (default 1)' },
                    { path: 'ensemble_piv.type', inst: '-', ens: 'Y', desc: 'Per-pass: std or single' },
                    { path: 'ensemble_piv.sum_window', inst: '-', ens: 'Y', desc: '[H, W] for single mode' },
                    { path: 'ensemble_piv.fit_method', inst: '-', ens: 'Y', desc: 'kspace (one-stage joint LM). Only accepted value.' },
                    { path: 'ensemble_piv.kspace_shape', inst: '-', ens: 'Y', desc: 'gaussian / kx4 / ky4 / kx4+ky4 (default gaussian)' },
                    { path: 'ensemble_piv.kspace_floor', inst: '-', ens: 'Y', desc: 'coloured / flat (default coloured)' },
                    { path: 'ensemble_piv.envelope_divide', inst: '-', ens: 'Y', desc: 'Divide by the pair-count envelope (default false)' },
                    { path: 'preprocessing.gain_normalisation', inst: 'Y', ens: 'Y', desc: 'Per-frame laser-gain divide (default false)' },
                    { path: 'ensemble_piv.background_subtraction_method', inst: '-', ens: 'Y', desc: 'correlation, image, window_mean, correlation+window_mean or image+window_mean' },
                    { path: 'ensemble_piv.gradient_correction', inst: '-', ens: 'Y', desc: 'Reynolds stress gradient correction' },
                    { path: 'ensemble_piv.persist_images', inst: '-', ens: 'Y', desc: 'Keep filtered images in worker RAM (default false)' },
                    { path: 'ensemble_piv.image_warp_interpolation', inst: '-', ens: 'Y', desc: 'Image warp kernel: cubic, lanczos3 or lanczos4 (default lanczos4)' },
                    { path: 'instantaneous_piv.image_warp_interpolation', inst: 'Y', ens: '-', desc: 'Image warp kernel: cubic, lanczos3 or lanczos4 (default lanczos4)' },
                    { path: 'instantaneous_piv.save_mode', inst: 'Y', ens: '-', desc: 'minimal (3 fields) or full (13 fields)' },
                    { path: 'instantaneous_piv.save_compression', inst: 'Y', ens: '-', desc: 'ZLIB compression on .mat files (default false)' },
                    { path: 'ensemble_piv.sum_fitting_window_enabled', inst: '-', ens: 'Y', desc: 'Crop summed plane before fitting (default true)' },
                    { path: 'ensemble_piv.sum_fitting_window', inst: '-', ens: 'Y', desc: '[H, W] crop size (default [32, 32]; null fits the whole sum_window)' },
                    { path: 'ensemble_piv.store_planes', inst: '-', ens: 'Y', desc: 'Save correlation planes' },
                    { path: 'ensemble_piv.save_diagnostics', inst: '-', ens: 'Y', desc: 'Warped-image + LM fit diagnostics (default false)' },
                    { path: 'ensemble_piv.resume_from_pass', inst: '-', ens: 'Y', desc: '0 = fresh, N = resume from pass N' },
                    { path: 'outlier_detection.*', inst: 'Y', ens: '-', desc: 'enabled, methods: [{type, threshold, epsilon}]' },
                    { path: 'ensemble_outlier_detection.*', inst: '-', ens: 'Y', desc: 'Same structure as outlier_detection' },
                    { path: 'infilling.*', inst: 'Y', ens: '-', desc: 'mid_pass + final_pass config' },
                    { path: 'ensemble_infilling.*', inst: '-', ens: 'Y', desc: 'Same structure as infilling' },
                    { path: 'processing.omp_threads', inst: 'Y', ens: 'Y', desc: 'OpenMP threads (default 4)' },
                    { path: 'processing.dask_workers_per_node', inst: 'Y', ens: 'Y', desc: 'Dask workers (default 1)' },
                    { path: 'processing.dask_memory_limit', inst: 'Y', ens: 'Y', desc: 'Per-worker RAM (default 12GB)' },
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
  dask_workers_per_node: 1
  dask_memory_limit: 12GB
  dask_max_in_flight_per_worker: 3
  open_dashboard: false
  cluster_type: local
  auto_compute_params: false
  post_processing_workers: null

preprocessing:
  gain_normalisation: false

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
  peak_finder: gauss6
  predictor_smoothing: true
  secondary_peak: false
  num_peaks: 1
  image_warp_interpolation: lanczos4
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
  window_type: square
  fit_method: kspace
  kspace_shape: gaussian
  kspace_floor: coloured
  envelope_divide: false
  background_subtraction_method: correlation
  skip_background_subtraction: false
  per_pair_normalization: false
  predictor_rounding: false
  gradient_correction: false
  persist_images: false
  predictor_smoothing: false
  image_warp_interpolation: lanczos4
  sum_fitting_window_enabled: true
  sum_fitting_window:
  - 32
  - 32
  store_planes: false
  save_diagnostics: false
  resume_from_pass: 0

outlier_detection:
  enabled: true
  methods:
  - type: peak_mag
    threshold: 0.4
  - type: median_2d
    epsilon: 0.1
    threshold: 2
    size: 5

ensemble_outlier_detection:
  enabled: true
  methods:
  - type: median_2d
    epsilon: 0.1
    threshold: 2
    size: 5

infilling:
  mid_pass:
    method: nearest
    parameters: {}
  final_pass:
    enabled: true
    method: harmonic
    parameters: {}

ensemble_infilling:
  mid_pass:
    method: nearest
    parameters: {}
  final_pass:
    enabled: true
    method: harmonic
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
