'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  CheckCircle,
  AlertTriangle,
  Layers,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Plus,
  Terminal
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
              Configure multi-pass cross-correlation for instantaneous frame-pair or ensemble correlation averaging analysis.
            </p>
          </motion.div>

          {/* Overview Section */}
          <Section title="Overview" icon={<Zap size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools supports two distinct processing modes, each suited for different experimental scenarios.
              Choose the mode that best matches your analysis requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="text-blue-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Instantaneous PIV</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Processes <strong>individual frame pairs</strong> to produce velocity fields for each time step.
                  Ideal for time-resolved analysis and turbulent flow statistics.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Per-frame velocity vectors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Temporal statistics (mean, RMS, Reynolds stresses)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Live progress preview during processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Peak finder algorithm selection</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="text-purple-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Ensemble PIV</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Averages <strong>correlation planes</strong> across all frame pairs before peak detection.
                  Produces high-fidelity mean flow fields with reduced noise.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Mean flow field only (no individual frames)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Higher spatial resolution with single mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Resume processing from saved passes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Diagnostic plane storage for inspection</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">When to Use Each Mode</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                <div>
                  <p className="font-medium mb-1">Use Instantaneous when:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>You need time-resolved velocity data</li>
                    <li>Computing turbulence statistics</li>
                    <li>Analysing unsteady/transient flows</li>
                    <li>Good particle seeding density</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Use Ensemble when:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Only mean flow is needed</li>
                    <li>Low particle seeding density</li>
                    <li>Maximum spatial resolution required</li>
                    <li>Noisy or challenging image conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Window Configuration Section */}
          <Section title="Window Configuration" icon={<Grid3X3 size={32} />} id="window-config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Both processing modes use multi-pass refinement with configurable interrogation windows.
              Each pass uses the results of the previous pass to improve vector accuracy.
            </p>

            {/* Common Concepts */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Pass Strategy</h4>
              <FeatureList items={[
                "Window Size: The interrogation window dimensions in pixels [X, Y]. Larger windows capture more particles but reduce spatial resolution.",
                "Overlap: Percentage of window overlap between adjacent vectors. 50% overlap doubles the vector grid density.",
                "Store Flag: Toggle to save intermediate pass results. The final pass is always stored.",
                "Pass Order: Processing starts with large windows and progressively refines to smaller windows for accuracy."
              ]} />
            </div>

            {/* Instantaneous Window Setup */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-bold">Instantaneous</div>
                <h4 className="text-xl font-semibold text-gray-900">Window Setup</h4>
              </div>

              <p className="text-gray-600 mb-4">
                Configure passes in the GUI using the pass table. Each row represents one refinement pass.
              </p>

              {/* Mock GUI representation */}
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 mb-2 px-2">
                  <div className="col-span-2">Window X</div>
                  <div className="col-span-2">Window Y</div>
                  <div className="col-span-2">Overlap %</div>
                  <div className="col-span-1 text-center">Store</div>
                  <div className="col-span-3 text-center">Actions</div>
                  <div className="col-span-2 text-right">Pass #</div>
                </div>
                {[
                  { x: 128, y: 128, overlap: 50, store: false, pass: 1 },
                  { x: 64, y: 64, overlap: 50, store: false, pass: 2 },
                  { x: 32, y: 32, overlap: 50, store: true, pass: 3 }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded mb-1">
                    <div className="col-span-2 bg-gray-50 px-2 py-1 rounded text-sm">{row.x}</div>
                    <div className="col-span-2 bg-gray-50 px-2 py-1 rounded text-sm">{row.y}</div>
                    <div className="col-span-2 bg-gray-50 px-2 py-1 rounded text-sm">{row.overlap}</div>
                    <div className="col-span-1 flex justify-center">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${row.store ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        <Save size={12} />
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-center gap-1">
                      <ChevronUp size={16} className="text-gray-400" />
                      <ChevronDown size={16} className="text-gray-400" />
                      <X size={16} className="text-red-400" />
                    </div>
                    <div className="col-span-2 text-right text-sm text-gray-500">Pass {row.pass}</div>
                  </div>
                ))}
                <div className="flex justify-end mt-2">
                  <div className="flex items-center gap-1 text-sm text-blue-600 cursor-pointer">
                    <Plus size={14} /> Add Pass
                  </div>
                </div>
              </div>

              <CodeBlock code={`instantaneous_piv:
  window_size:
  - [128, 128]   # Pass 1: Large windows for initial estimate
  - [64, 64]    # Pass 2: Medium refinement
  - [32, 32]    # Pass 3: Final high-resolution
  overlap:
  - 50          # 50% overlap for all passes
  - 50
  - 50
  runs:
  - 3           # Save final pass (pass 3)`} title="config.yaml" />
            </div>

            {/* Ensemble Window Setup */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold">Ensemble</div>
                <h4 className="text-xl font-semibold text-gray-900">Window Setup with Pass Types</h4>
              </div>

              <p className="text-gray-600 mb-4">
                Ensemble mode adds a <strong>Type</strong> column to select between standard and single correlation modes.
              </p>

              {/* Mock GUI with Type column */}
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 mb-2 px-2">
                  <div className="col-span-2">Window X</div>
                  <div className="col-span-2">Window Y</div>
                  <div className="col-span-2">Overlap %</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-1 text-center">Store</div>
                  <div className="col-span-2 text-center">Actions</div>
                  <div className="col-span-1 text-right">Pass</div>
                </div>
                {[
                  { x: 128, y: 128, overlap: 50, type: 'std', store: false, pass: 1 },
                  { x: 64, y: 64, overlap: 50, type: 'std', store: false, pass: 2 },
                  { x: 16, y: 16, overlap: 50, type: 'single', store: true, pass: 3 }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded mb-1">
                    <div className="col-span-2 bg-gray-50 px-2 py-1 rounded text-sm">{row.x}</div>
                    <div className="col-span-2 bg-gray-50 px-2 py-1 rounded text-sm">{row.y}</div>
                    <div className="col-span-2 bg-gray-50 px-2 py-1 rounded text-sm">{row.overlap}</div>
                    <div className="col-span-2">
                      <div className={`px-2 py-1 rounded text-sm text-center ${row.type === 'single' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'}`}>
                        {row.type === 'std' ? 'Standard' : 'Single'}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${row.store ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                        <Save size={12} />
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center gap-1">
                      <ChevronUp size={16} className="text-gray-400" />
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <div className="col-span-1 text-right text-sm text-gray-500">{row.pass}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Standard (std)</h5>
                  <p className="text-sm text-gray-600">
                    Both Frame A and Frame B use identical window weighting. Standard cross-correlation at the specified window size.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-900 mb-2">Single</h5>
                  <p className="text-sm text-purple-700">
                    Asymmetric weighting for higher spatial resolution. Requires sum_window configuration. See next section for details.
                  </p>
                </div>
              </div>

              <CodeBlock code={`ensemble_piv:
  window_size:
  - [128, 128]  # Pass 1: Standard mode
  - [64, 64]   # Pass 2: Standard mode
  - [16, 16]   # Pass 3: Single mode (high resolution)
  overlap:
  - 50
  - 50
  - 50
  type:
  - std        # Standard correlation
  - std        # Standard correlation
  - single     # Single-pixel accumulation
  runs:
  - 3          # Save final pass`} title="config.yaml" />
            </div>
          </Section>

          {/* Single Mode & Sum Window Section */}
          <Section title="Single Mode & Sum Window" icon={<Focus size={32} />} id="single-mode">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Focus className="text-blue-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Ensemble-Only Feature</h4>
              </div>
              <p className="text-gray-700 mb-4">
                When any pass uses <strong>&quot;single&quot;</strong> type, the Sum Window configuration appears.
                This enables a powerful technique for achieving higher spatial resolution while maintaining FFT efficiency.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">How Single Mode Works</h4>

              <p className="text-gray-600 mb-4">
                Single mode uses <strong>asymmetric window weighting</strong> between Frame A and Frame B:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Frame A: &quot;singlepix&quot;</h5>
                  <p className="text-sm text-blue-700">
                    Small window (e.g., 4×4) centered within the larger sum_window (16×16). Only the central 4×4 region has weight = 1, surrounding pixels = 0.
                    This concentrates the measurement on a small spatial region.
                  </p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h5 className="font-semibold text-cyan-900 mb-2">Frame B: &quot;bsingle&quot;</h5>
                  <p className="text-sm text-cyan-700">
                    Full sum_window (16×16) with uniform weight = 1 everywhere. Captures particles across the entire correlation domain,
                    providing robust statistics for peak detection.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">Example: window_size [4, 4] with sum_window [16, 16]</h5>
                <p className="text-sm text-gray-600">
                  The correlation is computed at 16×16 resolution, but the effective measurement is concentrated at the central 4×4 region.
                  This gives you the spatial resolution of a 4×4 window with the peak-fitting accuracy of a 16×16 correlation plane.
                </p>
              </div>

              <FeatureList items={[
                "Higher spatial resolution: Effective measurement concentrated at small window size",
                "FFT efficiency: Correlation computed at sum_window size (16×16 FFT, not 4×4)",
                "Better peak definition: Larger correlation plane improves sub-pixel fitting accuracy",
                "Ensemble robustness: Averaging reduces noise while maintaining resolution"
              ]} />

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-600" size={20} />
                  <h5 className="font-semibold text-yellow-800">Validation Requirement</h5>
                </div>
                <p className="text-yellow-700 text-sm">
                  The sum_window must be <strong>greater than or equal to</strong> the window_size for all single-type passes.
                  For example, if window_size is [16, 16], sum_window must be at least [16, 16].
                </p>
              </div>

              <CodeBlock code={`ensemble_piv:
  window_size:
  - [16, 16]    # Small window for single mode
  type:
  - single      # Enables sum_window
  sum_window:
  - 64          # Sum window width (X)
  - 64          # Sum window height (Y)`} title="config.yaml" />
            </div>
          </Section>

          {/* Camera Selection Section */}
          <Section title="Camera Selection" icon={<Camera size={32} />} id="camera-selection">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Select which cameras to process. This is particularly useful for multi-camera setups
              where you want to process specific views independently.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Camera Selector</h4>

              <p className="text-gray-600 mb-4">
                The GUI displays numbered chips for each available camera. Click to toggle selection.
                At least one camera must be selected.
              </p>

              {/* Mock camera selector */}
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-600">Cameras to Process:</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">2</div>
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">3</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Click to select/deselect cameras</p>
              </div>

              <CodeBlock code={`paths:
  camera_count: 3      # Total cameras available
  camera_numbers:      # Cameras to process
  - 1                  # Only process camera 1`} title="config.yaml" />
            </div>
          </Section>

          {/* Peak Finding Section */}
          <Section title="Peak Finding" icon={<Target size={32} />} id="peak-finding">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700">
                <strong>Instantaneous PIV Only:</strong> Peak finder algorithm selection is available in the Advanced PIV Settings.
                Ensemble PIV uses gauss6 by default for optimal accuracy with averaged correlation planes.
              </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The peak finder algorithm determines how sub-pixel displacement is extracted from the correlation peak.
              Higher parameter counts provide better accuracy but require more computation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { name: 'gauss3', title: '3-Parameter Gaussian', desc: 'Fastest. Basic Gaussian fit for quick processing.', speed: 'Fastest', accuracy: 'Good' },
                { name: 'gauss4', title: '4-Parameter Gaussian', desc: 'Adds amplitude parameter. Better peak detection.', speed: 'Fast', accuracy: 'Better' },
                { name: 'gauss5', title: '5-Parameter Gaussian', desc: 'Includes elliptical shape. Good for anisotropic flows.', speed: 'Moderate', accuracy: 'High' },
                { name: 'gauss6', title: '6-Parameter Gaussian', desc: 'Full 2D Gaussian with rotation. Maximum accuracy.', speed: 'Slowest', accuracy: 'Highest' }
              ].map((pf, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{pf.name}</code>
                    <h5 className="font-semibold text-gray-900">{pf.title}</h5>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{pf.desc}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-gray-500">Speed: <strong className="text-gray-700">{pf.speed}</strong></span>
                    <span className="text-gray-500">Accuracy: <strong className="text-gray-700">{pf.accuracy}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock code={`instantaneous_piv:
  peak_finder: gauss3   # Options: gauss3, gauss4, gauss5, gauss6`} title="config.yaml" />
          </Section>

          {/* Ensemble Options Section */}
          <Section title="Ensemble-Specific Options" icon={<Database size={32} />} id="ensemble-options">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-700">
                <strong>Ensemble PIV Only:</strong> These options are available in the collapsible &quot;Ensemble Options&quot; panel.
              </p>
            </div>

            <div className="space-y-6">
              {/* Store Planes */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold">store_planes</div>
                  <h4 className="text-xl font-semibold text-gray-900">Store Correlation Planes</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Saves the auto-correlation (AA, BB) and cross-correlation (AB) planes to <code className="bg-gray-100 px-1 rounded">planes_pass_N.mat</code> files.
                  Useful for manual inspection of correlation quality or debugging.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                  <p className="text-yellow-700 text-sm">
                    <strong>Warning:</strong> Enabling this creates large output files. Use only when debugging or inspecting correlation quality.
                  </p>
                </div>
              </div>

              {/* Save Diagnostics */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold">save_diagnostics</div>
                  <h4 className="text-xl font-semibold text-gray-900">Save Diagnostics</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Saves debug information to a <code className="bg-gray-100 px-1 rounded">filters/</code> subdirectory:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  <li>Peak fitting inputs and outputs</li>
                  <li>Warped images for each pass</li>
                  <li>Filter application results (first batch, first pair)</li>
                </ul>
              </div>

              {/* Resume From Pass */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold">resume_from_pass</div>
                  <h4 className="text-xl font-semibold text-gray-900">Resume From Pass</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Continue processing from existing results. Enter the pass number (1-based) to resume from.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Use Case: Adding a Finer Pass</h5>
                  <p className="text-blue-700 text-sm">
                    If you&apos;ve completed passes 1-3 with window sizes [128, 64, 32] and want to add a pass 4 at 16×16:
                    set <code className="bg-blue-100 px-1 rounded">resume_from_pass: 4</code> to skip re-processing passes 1-3.
                    Requires an existing <code className="bg-blue-100 px-1 rounded">ensemble_result.mat</code> in the output directory.
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  Set to <strong>0</strong> for a fresh start (default).
                </p>
              </div>
            </div>

            <CodeBlock code={`ensemble_piv:
  store_planes: false      # Save AA, BB, AB correlation planes
  save_diagnostics: false  # Save debug images and data
  resume_from_pass: 0      # 0 = fresh start, N = resume from pass N`} title="config.yaml" />
          </Section>

          {/* Performance Settings Section */}
          <Section title="Performance Settings" icon={<Cpu size={32} />} id="performance">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Configure parallel processing resources. These settings affect both instantaneous and ensemble modes.
              Access via the &quot;Performance &amp; Compute Settings&quot; collapsible panel.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Setting</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: 'omp_threads', desc: 'OpenMP threads per worker for parallelized operations', default: '2' },
                    { setting: 'dask_workers_per_node', desc: 'Number of parallel Dask workers (typically = CPU cores)', default: '4' },
                    { setting: 'dask_threads_per_worker', desc: 'Threads each Dask worker can use', default: '1' },
                    { setting: 'dask_memory_limit', desc: 'RAM allocation per worker (e.g., "3GB", "4GB")', default: '3GB' },
                    { setting: 'filter_worker_count', desc: 'Workers dedicated to preprocessing filters', default: '1' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono text-purple-600">{row.setting}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-4 py-3 text-sm font-mono text-green-600">{row.default}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Filter Worker Count</h4>
              <p className="text-blue-700 mb-3">
                The filter worker enables overlapped processing: while correlation workers process the current batch,
                the filter worker can preprocess the next batch.
              </p>
              <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
                <li><strong>Set to 1</strong> for temporal filters (time, POD) to avoid memory issues</li>
                <li><strong>Set to 2+</strong> for spatial-only filters for better throughput</li>
              </ul>
            </div>

            <CodeBlock code={`processing:
  omp_threads: 2
  dask_workers_per_node: 4
  dask_threads_per_worker: 1
  dask_memory_limit: 3GB
  filter_worker_count: 1
  auto_compute_params: false  # Set true to auto-detect optimal values`} title="config.yaml" />
          </Section>

          {/* Outlier Detection Section */}
          <Section title="Outlier Detection" icon={<Filter size={32} />} id="outlier-detection">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Identify and mark spurious vectors for replacement. Multiple detection methods can be chained together.
              Enable/disable via the toggle in the &quot;Outlier Detection&quot; collapsible panel.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  type: 'peak_mag',
                  name: 'Peak Magnitude',
                  desc: 'Rejects vectors with weak correlation peaks below threshold.',
                  params: [{ name: 'threshold', default: '0.3', desc: 'Minimum peak magnitude' }],
                  note: 'Typically used in instantaneous only'
                },
                {
                  type: 'median_2d',
                  name: 'Median-Based',
                  desc: 'Compares each vector to the median of its 8 neighbors.',
                  params: [
                    { name: 'epsilon', default: '0.2', desc: 'Regularization term' },
                    { name: 'threshold', default: '2.0', desc: 'Normalised residual threshold' }
                  ],
                  note: 'Good for local outlier detection'
                },
                {
                  type: 'sigma',
                  name: 'Standard Deviation',
                  desc: 'Statistical outlier based on neighbor standard deviation.',
                  params: [{ name: 'sigma_threshold', default: '2.0', desc: 'Std dev multiplier' }],
                  note: 'Best for Gaussian-distributed errors'
                },
              ].map((method, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">{method.type}</code>
                    <h5 className="font-semibold text-gray-900">{method.name}</h5>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{method.desc}</p>
                  <div className="bg-gray-50 rounded p-2 mb-2">
                    {method.params.map((param, pIdx) => (
                      <div key={pIdx} className="text-xs">
                        <code className="text-purple-600">{param.name}</code>
                        <span className="text-gray-400 mx-1">=</span>
                        <code className="text-green-600">{param.default}</code>
                        <span className="text-gray-500 ml-2">{param.desc}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">{method.note}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="font-semibold text-yellow-800">Different YAML Paths</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                Instantaneous and Ensemble use <strong>separate configuration sections</strong>.
                This allows different outlier detection strategies for each mode.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Instantaneous</h5>
                <CodeBlock code={`outlier_detection:
  enabled: true
  methods:
  - type: peak_mag
    threshold: 0.3
  - type: median_2d
    epsilon: 0.2
    threshold: 2`} title="config.yaml" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Ensemble</h5>
                <CodeBlock code={`ensemble_outlier_detection:
  enabled: true
  methods:
  - type: median_2d
    epsilon: 0.2
    threshold: 2`} title="config.yaml" />
              </div>
            </div>
          </Section>

          {/* Infilling Section */}
          <Section title="Infilling Methods" icon={<Paintbrush size={32} />} id="infilling">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Replace outlier vectors (marked as NaN) with interpolated values. Infilling occurs in two phases:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Mid-Pass Infilling</h5>
                <p className="text-sm text-gray-600">
                  Applied <strong>between</strong> multi-pass iterations. Always enabled to ensure smooth predictor fields for window deformation.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Final-Pass Infilling</h5>
                <p className="text-sm text-blue-700">
                  Applied to the <strong>output</strong> after the last pass. Optional—can be disabled if you prefer to keep NaN markers.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {[
                {
                  method: 'local_median',
                  name: 'Local Median',
                  desc: 'Fast, simple infilling using the median of neighboring vectors.',
                  params: [{ name: 'ksize', default: '3', desc: 'Kernel size (3×3, 5×5, etc.)' }],
                  best: 'Quick infilling, small gaps'
                },
                {
                  method: 'biharmonic',
                  name: 'Biharmonic Inpainting',
                  desc: 'Smooth PDE-based interpolation that respects local flow gradients.',
                  params: [],
                  best: 'High-quality results, larger gaps'
                },
                {
                  method: 'knn',
                  name: 'K-Nearest Neighbors',
                  desc: 'Distance-weighted regression using nearby valid vectors.',
                  params: [
                    { name: 'n_neighbors', default: '32', desc: 'Number of neighbors' },
                    { name: 'weights', default: 'distance', desc: 'Weighting scheme' }
                  ],
                  best: 'Sparse data, irregular gaps'
                }
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">{m.method}</code>
                    <h5 className="font-semibold text-gray-900">{m.name}</h5>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{m.desc}</p>
                  {m.params.length > 0 && (
                    <div className="bg-gray-50 rounded p-2 mb-2">
                      {m.params.map((param, pIdx) => (
                        <div key={pIdx} className="text-xs">
                          <code className="text-purple-600">{param.name}</code>
                          <span className="text-gray-400 mx-1">=</span>
                          <code className="text-green-600">{param.default}</code>
                          <span className="text-gray-500 ml-2">{param.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Best for: {m.best}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Instantaneous</h5>
                <CodeBlock code={`infilling:
  mid_pass:
    method: biharmonic
    parameters:
      ksize: 3
  final_pass:
    enabled: true
    method: biharmonic
    parameters:
      ksize: 3`} title="config.yaml" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Ensemble</h5>
                <CodeBlock code={`ensemble_infilling:
  mid_pass:
    method: biharmonic
    parameters:
      ksize: 3
  final_pass:
    enabled: true
    method: biharmonic
    parameters:
      ksize: 3`} title="config.yaml" />
              </div>
            </div>
          </Section>

          {/* Running PIV Section */}
          <Section title="Running PIV" icon={<Play size={32} />} id="running">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Start processing from the Run PIV card. Both modes share common controls but differ in feedback display.
              You can process multiple datasets sequentially by selecting them in the path list.
            </p>

            {/* Batch Path Processing */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-purple-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Batch Processing Multiple Paths</h4>
              </div>
              <p className="text-gray-700 mb-4">
                When you have configured multiple source/base path pairs in Image Configuration, the Run PIV card
                displays a list with <strong>checkboxes</strong> to select which datasets to process.
              </p>

              {/* Mock path selector */}
              <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                <label className="text-sm font-medium text-gray-700 block mb-2">Source/Base Path Pairs to Process</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {[
                    { name: 'experiment_01', base: 'results_01', checked: true },
                    { name: 'experiment_02', base: 'results_02', checked: true },
                    { name: 'experiment_03', base: 'results_03', checked: false }
                  ].map((path, idx) => (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={path.checked}
                        readOnly
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{path.name}</div>
                        <div className="text-xs text-gray-500">→ {path.base}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <span>2 of 3 path(s) selected</span>
                  <span>•</span>
                  <span className="text-blue-600">Select All</span>
                  <span>•</span>
                  <span className="text-blue-600">Clear All</span>
                </div>
              </div>

              <FeatureList items={[
                "Check/uncheck paths to include or exclude them from processing",
                "Selected paths are processed sequentially in order",
                "Use 'Select All' or 'Clear All' links for quick selection",
                "Same PIV settings (windows, overlap, etc.) apply to all selected paths"
              ]} />
            </div>

            {/* Overwrite Confirmation */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="font-semibold text-yellow-800">Overwrite Confirmation</h4>
              </div>
              <p className="text-yellow-700 mb-3">
                If output data already exists for the selected paths, a confirmation dialog appears asking whether to
                <strong> clear existing data and recompute</strong>. This prevents accidental overwrites of completed processing runs.
              </p>
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <p className="text-gray-700 text-sm font-medium mb-2">Output Data Already Exists</p>
                <p className="text-gray-600 text-sm mb-3">
                  Output data already exists for the selected paths. Would you like to clear the existing data and recompute?
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">Cancel</span>
                  <span className="px-3 py-1 bg-red-600 text-white rounded text-sm">Clear and Recompute</span>
                </div>
              </div>
            </div>

            {/* Common Controls */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Controls</h4>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <p className="text-gray-700 font-medium">Select Paths to Process</p>
                    <p className="text-gray-600 text-sm">Check the datasets you want to process. At least one must be selected.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <p className="text-gray-700 font-medium">Click &quot;Run PIV&quot;</p>
                    <p className="text-gray-600 text-sm">Starts processing. Button disabled while running or if no paths selected.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <p className="text-gray-700 font-medium">Cancel (if needed)</p>
                    <p className="text-gray-600 text-sm">Stops processing gracefully. Partial results may be saved.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode-specific feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Instantaneous */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="text-blue-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Instantaneous Feedback</h4>
                </div>
                <FeatureList items={[
                  "Progress bar with percentage complete",
                  "Live status image preview of processed frames",
                  "Variable selector (ux, uy, nan_mask, peak_mag)",
                  "Colormap and contrast controls",
                  "Console output with real-time logs"
                ]} />
                <div className="bg-blue-100 rounded-lg p-3 mt-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Live Preview:</strong> As each frame pair is processed, you can view the resulting velocity field
                    in real-time. Select which variable to display and adjust colormap settings to inspect data quality during processing.
                  </p>
                </div>
              </div>

              {/* Ensemble */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="text-purple-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Ensemble Feedback</h4>
                </div>
                <FeatureList items={[
                  "Simple status indicator (Processing.../Complete)",
                  "Console output with pass progress",
                  "No preview image (correlation accumulation)",
                  "Batch progress shown in console logs"
                ]} />
                <div className="bg-purple-100 rounded-lg p-3 mt-4">
                  <p className="text-purple-800 text-sm">
                    <strong>No Live Preview:</strong> Ensemble processing accumulates correlation planes across all frames
                    before peak detection. Vectors are only extracted once all images are processed, so there are no interim frame results to display.
                  </p>
                </div>
              </div>
            </div>

            {/* Console Logs - Both Modes */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Console Output (Both Modes)</h4>
              <p className="text-gray-600 mb-4">
                Both instantaneous and ensemble PIV display real-time console logs. Toggle visibility with the &quot;Show/Hide Console Logs&quot; button.
              </p>

              {/* Mock console */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-3 py-2 flex items-center justify-between border-b border-gray-700">
                  <span className="text-gray-300 font-mono text-sm">PIV Console Output</span>
                  <span className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live
                  </span>
                </div>
                <div className="p-3 font-mono text-xs text-green-400 max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{`[INFO] Starting PIV processing for 3 paths
[INFO] Processing path 1/3: experiment_01
[INFO] Pass 1/3: Window 128x128, Overlap 50%
[INFO]   Batch 1/4 complete (25 pairs)
[INFO]   Batch 2/4 complete (25 pairs)
[INFO]   Batch 3/4 complete (25 pairs)
[INFO]   Batch 4/4 complete (25 pairs)
[INFO] Pass 1 complete. Starting Pass 2...
[INFO] Pass 2/3: Window 64x64, Overlap 50%`}</pre>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 text-sm mb-1">Instantaneous logs show:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Frame pair progress (e.g., &quot;Processing pair 45/100&quot;)</li>
                    <li>• Batch completion status</li>
                    <li>• Pass transitions</li>
                    <li>• Outlier detection and infilling stats</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 text-sm mb-1">Ensemble logs show:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Batch accumulation progress</li>
                    <li>• Correlation plane updates</li>
                    <li>• Pass completion and transition</li>
                    <li>• Final peak extraction status</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-blue-600" size={20} />
                <h4 className="font-semibold text-blue-800">Why the Preview Difference?</h4>
              </div>
              <p className="text-blue-700">
                <strong>Instantaneous PIV</strong> produces a complete velocity field for each frame pair as it processes,
                enabling real-time visualisation. <strong>Ensemble PIV</strong> accumulates correlation data across all frames
                and only extracts the final averaged velocity field at the end—there simply are no intermediate results to preview.
                Use the console logs to monitor ensemble progress.
              </p>
            </div>

<CodeBlock code={`# Enable instantaneous mode
processing:
  instantaneous: true
  ensemble: false

# OR enable ensemble mode
processing:
  instantaneous: false
  ensemble: true`} title="config.yaml" />
          </Section>

          {/* YAML Reference Section */}
          <Section title="Complete YAML Reference" icon={<Settings size={32} />} id="yaml-reference">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Below is a complete reference of all PIV-related configuration options.
            </p>

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
                    { path: '*_piv.window_size', inst: '✓', ens: '✓', desc: 'List of [X, Y] window sizes per pass' },
                    { path: '*_piv.overlap', inst: '✓', ens: '✓', desc: 'Overlap percentages per pass' },
                    { path: '*_piv.runs', inst: '✓', ens: '✓', desc: 'Passes to save (1-based list)' },
                    { path: 'ensemble_piv.type', inst: '—', ens: '✓', desc: 'Pass types: std or single' },
                    { path: 'ensemble_piv.sum_window', inst: '—', ens: '✓', desc: 'Sum window for single mode [X, Y]' },
                    { path: 'ensemble_piv.store_planes', inst: '—', ens: '✓', desc: 'Save correlation planes' },
                    { path: 'ensemble_piv.save_diagnostics', inst: '—', ens: '✓', desc: 'Save debug information' },
                    { path: 'ensemble_piv.resume_from_pass', inst: '—', ens: '✓', desc: 'Resume from pass N (0=fresh)' },
                    { path: 'instantaneous_piv.peak_finder', inst: '✓', ens: '—', desc: 'Peak algorithm: gauss3-6' },
                    { path: 'outlier_detection.*', inst: '✓', ens: '—', desc: 'Instantaneous outlier config' },
                    { path: 'ensemble_outlier_detection.*', inst: '—', ens: '✓', desc: 'Ensemble outlier config' },
                    { path: 'infilling.*', inst: '✓', ens: '—', desc: 'Instantaneous infilling config' },
                    { path: 'ensemble_infilling.*', inst: '—', ens: '✓', desc: 'Ensemble infilling config' },
                    { path: 'processing.instantaneous', inst: '✓', ens: '—', desc: 'Enable instantaneous mode' },
                    { path: 'processing.ensemble', inst: '—', ens: '✓', desc: 'Enable ensemble mode' }
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

            <CodeBlock code={`# Complete PIV Configuration Example
# ===================================

# Processing mode (choose one)
processing:
  instantaneous: true   # Frame-pair mode
  ensemble: false       # Correlation averaging mode
  backend: cpu          # cpu or gpu
  omp_threads: 2
  dask_workers_per_node: 4
  dask_threads_per_worker: 1
  dask_memory_limit: 3GB
  filter_worker_count: 1

# Instantaneous PIV settings
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

# Ensemble PIV settings
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
  store_planes: false
  save_diagnostics: false
  resume_from_pass: 0

# Outlier detection (instantaneous)
outlier_detection:
  enabled: true
  methods:
  - type: peak_mag
    threshold: 0.3
  - type: median_2d
    epsilon: 0.2
    threshold: 2

# Outlier detection (ensemble)
ensemble_outlier_detection:
  enabled: true
  methods:
  - type: median_2d
    epsilon: 0.2
    threshold: 2

# Infilling (instantaneous)
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

# Infilling (ensemble)
ensemble_infilling:
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

          {/* CLI Usage Section */}
          <Section title="Command Line Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools can be run from the command line using the <code className="bg-gray-100 px-2 py-1 rounded">pivtools-cli</code> tool.
              This is useful for batch processing, scripting, and integration with other workflows.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Basic Commands</h4>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Initialise a workspace</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Creates a default <code className="bg-gray-100 px-1 rounded">config.yaml</code> in the current directory.
                  </p>
                  <CodeBlock code={`# Initialise with default config
pivtools-cli init

# Overwrite existing config
pivtools-cli init --force`} title="Terminal" />
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Run PIV analysis</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Use separate commands for instantaneous (per-frame) or ensemble (time-averaged) PIV.
                    Both use settings from <code className="bg-gray-100 px-1 rounded">config.yaml</code>.
                  </p>
                  <CodeBlock code={`# Run instantaneous PIV (per-frame)
pivtools-cli instantaneous

# Run ensemble PIV (time-averaged correlation)
pivtools-cli ensemble

# Process specific paths only
pivtools-cli instantaneous -p 0,1`} title="Terminal" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Post-Processing Commands</h4>

              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Command</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { cmd: 'pivtools-cli detect-planar', desc: 'Generate camera model from dot/circle grid' },
                      { cmd: 'pivtools-cli detect-charuco', desc: 'Generate camera model from ChArUco board' },
                      { cmd: 'pivtools-cli apply-calibration', desc: 'Apply calibration to vectors (pixels to m/s)' },
                      { cmd: 'pivtools-cli transform', desc: 'Apply geometric transforms (flip, rotate) to vector fields' },
                      { cmd: 'pivtools-cli merge', desc: 'Merge multi-camera vector fields using Hanning blend' },
                      { cmd: 'pivtools-cli statistics', desc: 'Compute mean velocity, Reynolds stresses, TKE, vorticity' },
                      { cmd: 'pivtools-cli video', desc: 'Create visualisation videos from PIV data' }
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-mono text-purple-600">{row.cmd}</td>
                        <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CodeBlock code={`# Full workflow example
pivtools-cli init                                    # Create config
# ... edit config.yaml to set paths, PIV settings ...
pivtools-cli detect-planar                           # Generate camera model
pivtools-cli instantaneous                           # Run PIV
pivtools-cli apply-calibration                       # Calibrate vectors
pivtools-cli statistics --camera 1                   # Compute stats
pivtools-cli video --variable ux --fps 30            # Create video`} title="Terminal" />
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Common Options</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Camera Selection</h5>
                  <CodeBlock code={`# Process specific camera
pivtools-cli apply-calibration --camera 1

# Process all cameras (default)
pivtools-cli apply-calibration`} title="Terminal" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Data Type</h5>
                  <CodeBlock code={`# Process instantaneous data
pivtools-cli statistics -t instantaneous

# Process ensemble data
pivtools-cli statistics -t ensemble`} title="Terminal" />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="text-blue-600" size={20} />
                <h4 className="font-semibold text-blue-800">Active Paths from Config</h4>
              </div>
              <p className="text-blue-700 mb-3">
                The CLI uses the <code className="bg-blue-100 px-1 rounded">paths.active_paths</code> setting from config.yaml
                to determine which datasets to process. All selected paths are processed sequentially.
              </p>
              <CodeBlock code={`# In config.yaml:
paths:
  source_paths:
    - /data/run_001/images
    - /data/run_002/images
    - /data/run_003/images
  base_paths:
    - /data/run_001/results
    - /data/run_002/results
    - /data/run_003/results
  active_paths:
    - 0   # Process run_001
    - 2   # Process run_003
    # run_002 (index 1) is skipped`} title="config.yaml" />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Get Help</h5>
              <CodeBlock code={`# List all commands
pivtools-cli --help

# Get help for a specific command
pivtools-cli instantaneous --help
pivtools-cli apply-calibration --help
pivtools-cli video --help`} title="Terminal" />
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="text-green-600" size={20} />
                <h4 className="font-semibold text-green-800">Path Override with --active-paths</h4>
              </div>
              <p className="text-green-700 mb-3">
                All commands support the <code className="bg-green-100 px-1 rounded">--active-paths</code> or <code className="bg-green-100 px-1 rounded">-p</code> flag
                to override the <code className="bg-green-100 px-1 rounded">active_paths</code> from config.yaml.
              </p>
              <CodeBlock code={`# Process only path index 0
pivtools-cli instantaneous -p 0

# Process paths 0 and 2
pivtools-cli apply-calibration -p 0,2

# All post-processing commands support -p
pivtools-cli statistics -p 0,1
pivtools-cli video -p 0`} title="Terminal" />
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Need to Calibrate?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Convert pixel displacements to physical velocities with calibration.
            </p>
            <a
              href="/manual/quick-start"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Back to Quick Start
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
