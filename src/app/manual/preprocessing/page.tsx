'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Sparkles,
  Clock,
  Layers,
  FileText,
  ChevronDown,
  ChevronRight,
  Eye,
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

export default function PreprocessingPage() {
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
              Image <span className="text-soton-gold">Pre-Processing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Build filter stacks to improve correlation quality. Test interactively with side-by-side raw vs. processed comparison.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Sparkles size={32} />} id="overview">
            <p className="text-gray-700 text-lg mb-6">
              Filters are applied sequentially from top to bottom. Temporal filters should precede spatial filters.
              All changes auto-save to <code className="bg-gray-100 px-1 rounded">config.yaml</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Temporal Filters</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Operate across multiple frames (batches) to remove persistent features.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><code className="text-purple-600">time</code> -- Subtract local minimum across batch</li>
                  <li><code className="text-purple-600">pod</code> -- SVD-based background removal (Mendez et al.)</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Spatial Filters</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Operate per-frame via <code className="text-blue-600">scipy.ndimage</code>.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Smoothing: gaussian, median</li>
                  <li>Normalization: norm, norm2, maxnorm</li>
                  <li>Background: ssmin, invert</li>
                  <li>Enhancement: lmax, clahe</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Temporal Filters */}
          <Section title="Temporal Filters" icon={<Clock size={32} />} id="temporal">
            <p className="text-gray-700 text-lg mb-6">
              Require batch processing. Set batch size via the Batch Size input (appears when temporal filters are in the stack).
              Frame A and Frame B channels are processed independently.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Filter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Parameters</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Algorithm</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Removes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-mono text-purple-600">time</td>
                    <td className="px-4 py-3 text-sm text-gray-600">None</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Subtract per-pixel minimum over batch</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Static backgrounds, reflections</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-purple-600">pod</td>
                    <td className="px-4 py-3 text-sm text-gray-600">None (auto mode detection)</td>
                    <td className="px-4 py-3 text-sm text-gray-600">SVD decomposition; auto-detect noise threshold; subtract signal modes</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Coherent structures, time-varying backgrounds</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <YamlDropdown
              title="Temporal filter + batch config"
              code={`filters:
  - type: time
  - type: pod

batches:
  size: 30    # Frames per batch (10-20 for testing, 50+ for production)`}
            />
          </Section>

          {/* Spatial Filters */}
          <Section title="Spatial Filters" icon={<Sparkles size={32} />} id="spatial">
            <p className="text-gray-700 text-lg mb-6">
              Applied per-frame after temporal filters. Kernel sizes are auto-adjusted to be odd.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Filter</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Parameters</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: "gaussian", params: "size: [7, 7], sigma: 1.0", desc: "Gaussian low-pass smoothing. Reduces high-frequency noise while preserving large-scale intensity. Uses a finite (FIR) kernel." },
                    { type: "median", params: "size: [5, 5]", desc: "Replaces each pixel with its neighbourhood median. Removes salt-and-pepper noise and hot pixels without blurring edges." },
                    { type: "norm", params: "size: [7, 7], max_gain: 1.0", desc: "Range normalize: subtracts the local minimum then divides by the local range (max \u2212 min). Maps each pixel to [0, 1] relative to its neighbourhood. Good general-purpose contrast equalization." },
                    { type: "norm2", params: "size: [7, 7], max_gain: 1.0", desc: "Smoothed range normalize: like norm, but box-smooths both the min and max envelopes before normalizing. More robust to single-pixel noise spikes." },
                    { type: "maxnorm", params: "size: [7, 7], max_gain: 1.0", desc: "Background normalize: divides by the smoothed local minimum (background level). Equalizes illumination gradients \u2014 particles come out as values > 1, background \u2192 1. Max gain limits amplification in dark regions." },
                    { type: "ssmin", params: "size: [7, 7]", desc: "SSMin (sliding minimum background subtraction). Median-smooths, extracts the local minimum (background envelope), box-smooths it, and subtracts. Removes slowly-varying background (laser sheet profile, reflections). Output clipped to \u2265 0." },
                    { type: "lmax", params: "size: [7, 7]", desc: "Morphological dilation (local maximum). Replaces each pixel with the maximum in its neighbourhood. Useful for expanding bright features and peak detection." },
                    { type: "invert", params: "(none)", desc: "Inverts intensity: output = max(image) \u2212 pixel. For background-oriented schlieren (BOS) or shadowgraph where particles are dark on a bright background." },
                    { type: "clahe", params: "clip_limit: 2.0, tile_grid_size: [8, 8]", desc: "Contrast Limited Adaptive Histogram Equalization. Enhances local contrast in tiles, useful for images with uneven illumination or very low contrast." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-blue-600">{row.type}</td>
                      <td className="px-4 py-3 text-gray-600">{row.params}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* GUI Usage */}
          <Section title="GUI Workflow" icon={<Eye size={32} />} id="gui">
            <p className="text-gray-700 text-lg mb-6">
              The <strong>ImagePairViewer</strong> displays raw and processed images side-by-side with synchronised zoom/pan.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Workflow</h4>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Add filters from the dropdown. They appear as expandable cards in the filter stack.</li>
                <li>Configure parameters for each filter. Reorder with up/down arrows, remove with delete.</li>
                <li>Click <strong>Test Filters</strong> to apply the stack to the current frame (or batch for temporal filters).</li>
                <li>Compare raw vs. processed. Zoom into regions of interest.</li>
                <li>Use playback controls to verify consistency across frames.</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Spatial-only stacks</h5>
                <p className="text-gray-600 text-sm">Near-instant results -- only the current frame is processed.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">With temporal filters</h5>
                <p className="text-gray-600 text-sm">Processes the full batch. Progress indicator shown during computation.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Recommended order:</strong> Temporal filters first (time, pod) for background removal, then spatial filters for noise reduction and contrast enhancement.
              </p>
            </div>
          </Section>

          {/* YAML Config */}
          <Section title="YAML Reference" icon={<Layers size={32} />} id="yaml-config">
            <YamlDropdown
              title="Complete preprocessing configuration"
              defaultOpen={true}
              code={`filters:
  # Temporal (require batch processing)
  - type: time
  - type: pod

  # Spatial (per-frame, order matters)
  - type: gaussian
    size: [7, 7]            # [int, int]: kernel [h, w] (odd only)
    sigma: 1.0              # float: std dev in pixels
  - type: median
    size: [5, 5]            # [int, int]: kernel [h, w] (odd only)
  - type: norm              # Range normalize
    size: [7, 7]
    max_gain: 1.0           # float: max amplification in low-contrast regions
  - type: norm2             # Smoothed range normalize
    size: [7, 7]
    max_gain: 1.0
  - type: maxnorm           # Background normalize
    size: [7, 7]
    max_gain: 1.0
  - type: ssmin             # Subtract background
    size: [7, 7]
  - type: lmax              # Local maximum (dilation)
    size: [7, 7]
  - type: invert            # Invert (max - pixel)
  - type: clahe             # Adaptive histogram equalization
    clip_limit: 2.0
    tile_grid_size: [8, 8]

batches:
  size: 30                  # Frames per batch (for temporal filters)`}
            />

            <div className="mt-6 overflow-x-auto">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Parameter Quick Reference</h4>
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Filter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { filter: "time", type: "Temporal", param: "(none)", default: "-" },
                    { filter: "pod", type: "Temporal", param: "(none)", default: "-" },
                    { filter: "gaussian", type: "Spatial", param: "size, sigma", default: "[7,7], 1.0" },
                    { filter: "median", type: "Spatial", param: "size", default: "[5, 5]" },
                    { filter: "norm", type: "Spatial", param: "size, max_gain", default: "[7,7], 1.0" },
                    { filter: "norm2", type: "Spatial", param: "size, max_gain", default: "[7,7], 1.0" },
                    { filter: "maxnorm", type: "Spatial", param: "size, max_gain", default: "[7,7], 1.0" },
                    { filter: "ssmin", type: "Spatial", param: "size", default: "[7, 7]" },
                    { filter: "lmax", type: "Spatial", param: "size", default: "[7, 7]" },
                    { filter: "invert", type: "Spatial", param: "(none)", default: "-" },
                    { filter: "clahe", type: "Spatial", param: "clip_limit, tile_grid_size", default: "2.0, [8,8]" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono text-purple-600">{row.filter}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.type === 'Temporal' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-blue-600">{row.param}</td>
                      <td className="px-4 py-3 text-sm font-mono text-green-600">{row.default}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Next: PIV Processing</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Configure cross-correlation parameters for vector field computation.
            </p>
            <a
              href="/manual/piv-processing"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to PIV Processing
            </a>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
