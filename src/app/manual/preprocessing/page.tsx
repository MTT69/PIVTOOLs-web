'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Filter,
  Layers,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Play,
  Settings,
  ChevronUp,
  ChevronDown,
  X,
  Gauge,
  Eye
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
              Apply temporal and spatial filters to enhance PIV image quality before cross-correlation analysis.
            </p>
          </motion.div>

          {/* Overview Section */}
          <Section title="Overview" icon={<Filter size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools provides a powerful filter stack system that lets you chain multiple image filters together.
              Filters are applied in order from top to bottom, and fall into two categories:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-purple-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Temporal (Batch) Filters</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Operate across <strong>multiple frames</strong> to remove time-invariant features like
                  background reflections, static particles, or coherent structures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">Time Filter</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">POD Filter</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-blue-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Spatial Filters</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Operate on <strong>individual frames</strong> to enhance contrast, reduce noise,
                  or normalize intensity distributions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Gaussian</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Median</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Clip</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">+8 more</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Filter Order Matters</h4>
              </div>
              <p className="text-yellow-700">
                Filters are applied sequentially from top to bottom in the filter stack.
                Generally, temporal filters should be applied <strong>before</strong> spatial filters
                for best results. Use the up/down arrows in the GUI to reorder filters.
              </p>
            </div>
          </Section>

          {/* Temporal Filters Section */}
          <Section title="Temporal (Batch) Filters" icon={<Clock size={32} />} id="temporal">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Temporal filters analyze patterns across multiple image frames to identify and remove
              unwanted features. They require a <strong>batch</strong> of images to operate effectively.
            </p>

            {/* Time Filter */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold">time</div>
                <h4 className="text-xl font-semibold text-gray-900">Time Filter</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Subtracts the <strong>local minimum intensity</strong> across time for each pixel.
                This removes static background features that appear consistently across all frames
                in the batch, such as reflections, dust, or illumination gradients.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 font-mono text-sm">
                  For each pixel (x, y):<br />
                  <code className="text-purple-600">output[t, x, y] = input[t, x, y] - min(input[:, x, y])</code>
                </p>
              </div>
              <FeatureList items={[
                "Removes static background reflections",
                "Eliminates stuck particles on windows",
                "Reduces intensity gradients from uneven illumination",
                "No parameters required - fully automatic"
              ]} />
              <CodeBlock code={`filters:
  - type: time`} title="config.yaml" />
            </div>

            {/* POD Filter */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold">pod</div>
                <h4 className="text-xl font-semibold text-gray-900">POD Filter</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Applies <strong>Proper Orthogonal Decomposition</strong> to identify and remove coherent
                structures from the image sequence. This is particularly effective for removing
                large-scale flow features or periodic structures that would otherwise dominate the correlation.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400 mb-4">
                <h5 className="text-lg font-semibold text-blue-800 mb-2">How POD Filtering Works</h5>
                <ol className="list-decimal list-inside text-blue-700 space-y-2">
                  <li>Computes the covariance matrix of the image sequence</li>
                  <li>Performs SVD to extract eigenvectors (PSI) and eigenvalues</li>
                  <li>Automatically identifies the first &quot;noise mode&quot; using thresholds:
                    <ul className="list-disc list-inside ml-4 mt-1 text-blue-600 text-sm">
                      <li>Mean of eigenvector &lt; 0.01</li>
                      <li>Eigenvalue difference &lt; 0.01 × max eigenvalue</li>
                    </ul>
                  </li>
                  <li>Removes all &quot;signal modes&quot; (modes before the noise mode)</li>
                </ol>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-gray-700 text-sm">
                  <strong>Reference:</strong> The POD filter implementation is based on the methodology
                  described by Mendez et al. [Reference to be added]
                </p>
              </div>

              <FeatureList items={[
                "Removes coherent structures and large-scale flow features",
                "Automatic mode identification - no manual threshold tuning",
                "Preserves random fluctuations (the actual PIV signal)",
                "Processes Frame A and Frame B independently"
              ]} />
              <CodeBlock code={`filters:
  - type: pod`} title="config.yaml" />
            </div>

            {/* Batch Size */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="text-purple-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Batch Size</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Temporal filters require multiple frames to compute statistics. The <strong>batch size</strong>
                determines how many consecutive frames are processed together.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Larger Batch Size</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>+ Better statistical estimation</li>
                    <li>+ More effective background removal</li>
                    <li>- Higher memory usage</li>
                    <li>- Longer processing time per batch</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Smaller Batch Size</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>+ Lower memory usage</li>
                    <li>+ Better for non-stationary flows</li>
                    <li>- Less effective filtering</li>
                    <li>- May miss slowly-varying features</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-700">
                  <strong>Recommendation:</strong> Start with a batch size of 30-50 frames. For highly
                  dynamic flows where the background changes, use smaller batches (10-20). For steady
                  flows with consistent backgrounds, larger batches (50-100) work better.
                </p>
              </div>

              <CodeBlock code={`# config.yaml - Set batch size for temporal filters
batches:
  size: 30  # Number of frames per batch`} title="config.yaml" />
            </div>
          </Section>

          {/* Spatial Filters Section */}
          <Section title="Spatial Filters" icon={<Sparkles size={32} />} id="spatial">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Spatial filters operate on individual image frames, modifying pixel intensities based on
              local neighborhoods. They are applied frame-by-frame and don&apos;t require batching.
            </p>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  type: "gaussian",
                  name: "Gaussian Blur",
                  desc: "Smooths images using a Gaussian kernel. Reduces high-frequency noise while preserving edges.",
                  params: [{ name: "sigma", default: "1.0", desc: "Standard deviation of kernel" }]
                },
                {
                  type: "median",
                  name: "Median Filter",
                  desc: "Replaces each pixel with the median of its neighborhood. Excellent for removing salt-and-pepper noise.",
                  params: [{ name: "size", default: "[5, 5]", desc: "Kernel size [height, width]" }]
                },
                {
                  type: "clip",
                  name: "Clip Filter",
                  desc: "Clips pixel intensities to a threshold range. Auto-mode uses median ± n×std.",
                  params: [{ name: "n", default: "2.0", desc: "Std devs for auto-threshold" }]
                },
                {
                  type: "norm",
                  name: "Normalization",
                  desc: "Normalizes by subtracting local min and dividing by local range.",
                  params: [
                    { name: "size", default: "[7, 7]", desc: "Kernel size" },
                    { name: "max_gain", default: "1.0", desc: "Maximum gain" }
                  ]
                },
                {
                  type: "maxnorm",
                  name: "Max-Norm",
                  desc: "Normalizes by local max-min contrast with smoothing. Good for varying illumination.",
                  params: [
                    { name: "size", default: "[7, 7]", desc: "Kernel size" },
                    { name: "max_gain", default: "1.0", desc: "Maximum gain" }
                  ]
                },
                {
                  type: "lmax",
                  name: "Local Maximum",
                  desc: "Morphological dilation - replaces each pixel with the maximum in its neighborhood.",
                  params: [{ name: "size", default: "[7, 7]", desc: "Kernel size" }]
                },
                {
                  type: "invert",
                  name: "Invert",
                  desc: "Inverts image intensities: output = offset - input. Useful for dark particles on light background.",
                  params: [{ name: "offset", default: "255", desc: "Value to subtract from" }]
                },
                {
                  type: "sbg",
                  name: "Subtract Background",
                  desc: "Subtracts a reference background image from all frames.",
                  params: [{ name: "bg", default: "null", desc: "Path to background image" }]
                },
                {
                  type: "levelize",
                  name: "Levelize",
                  desc: "Normalizes by dividing by a white reference image. Corrects uneven illumination.",
                  params: [{ name: "white", default: "null", desc: "Path to white reference" }]
                },
                {
                  type: "transpose",
                  name: "Transpose",
                  desc: "Swaps height and width dimensions. No parameters required.",
                  params: []
                }
              ].map((filter, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{filter.type}</code>
                    <h5 className="font-semibold text-gray-900">{filter.name}</h5>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{filter.desc}</p>
                  {filter.params.length > 0 && (
                    <div className="bg-gray-50 rounded p-2">
                      {filter.params.map((param, pIdx) => (
                        <div key={pIdx} className="text-xs">
                          <code className="text-purple-600">{param.name}</code>
                          <span className="text-gray-400 mx-1">=</span>
                          <code className="text-green-600">{param.default}</code>
                          <span className="text-gray-500 ml-2">{param.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <CodeBlock code={`# config.yaml - Example spatial filter stack
filters:
  - type: gaussian
    sigma: 1.5
  - type: median
    size: [5, 5]
  - type: norm
    size: [7, 7]
    max_gain: 2.0
  - type: clip
    n: 2.5`} title="config.yaml" />
          </Section>

          {/* GUI Usage Section */}
          <Section title="Using Filters in the GUI" icon={<Settings size={32} />} id="gui">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Image Pre-Processing &amp; Viewer panel provides an interactive interface for
              building and testing filter stacks before running full PIV processing.
            </p>

            {/* Filter Stack UI */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Building a Filter Stack</h4>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <p className="text-gray-700 font-medium">Select a filter type</p>
                    <p className="text-gray-600 text-sm">Use the dropdown to choose from Batch Filters (Time, POD) or Spatial Filters (Gaussian, Median, etc.)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <p className="text-gray-700 font-medium">Click &quot;Add Filter&quot;</p>
                    <p className="text-gray-600 text-sm">The filter is added to the stack with default parameters. Multiple filters can be added.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <p className="text-gray-700 font-medium">Configure parameters</p>
                    <p className="text-gray-600 text-sm">Adjust filter-specific parameters like sigma, kernel size, or thresholds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <p className="text-gray-700 font-medium">Reorder filters</p>
                    <p className="text-gray-600 text-sm">
                      Use <ChevronUp className="inline w-4 h-4" /> and <ChevronDown className="inline w-4 h-4" /> buttons
                      to change filter order. Use <X className="inline w-4 h-4" /> to remove a filter.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Filters */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Play className="text-green-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Test Filters</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Click <strong>&quot;Test Filters&quot;</strong> to apply the filter stack to the current frame and
                view the results side-by-side with the raw image. This lets you fine-tune parameters
                before running full batch processing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Spatial Filters Only</h5>
                  <p className="text-gray-600 text-sm">
                    Results appear immediately - filters are applied on-demand to the current frame.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">With Temporal Filters</h5>
                  <p className="text-gray-600 text-sm">
                    Processes a full batch (based on Batch Size setting) before displaying results.
                    Status shows &quot;Processing...&quot; during batch computation.
                  </p>
                </div>
              </div>
            </div>

            {/* Batch Size in GUI */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Setting Batch Size</h4>
              <p className="text-gray-600 mb-4">
                When temporal filters (Time or POD) are in your filter stack, the <strong>Batch Size</strong>
                field appears next to the filter selector. This determines how many frames are loaded
                together for temporal analysis.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700 text-sm">
                  <strong>Note:</strong> Batch size cannot exceed the total number of frame pairs in your dataset.
                  The GUI will automatically cap the value if you enter a larger number.
                </p>
              </div>
            </div>

            {/* Image Viewer */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Comparing Raw vs Processed</h4>
              </div>
              <p className="text-gray-600 mb-4">
                The viewer shows two panels: <strong>Raw Image</strong> (left) and <strong>Processed Image</strong> (right).
                Both panels share zoom and pan controls, so you can compare the exact same region.
              </p>
              <FeatureList items={[
                "Toggle between Frame A and Frame B independently for each panel",
                "Auto Scale adjusts contrast automatically based on image statistics",
                "Manual contrast sliders for fine control (disables auto scale)",
                "Grid overlay to visualize interrogation window sizes",
                "Play button to cycle through frames and see filter effects over time"
              ]} />
            </div>
          </Section>

          {/* YAML Configuration Section */}
          <Section title="YAML Configuration" icon={<Layers size={32} />} id="yaml-config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Filters are stored in the <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> file
              as an array under the <code className="bg-gray-100 px-1 rounded">filters</code> key.
              Changes made in the GUI are automatically saved to this file.
            </p>

            <CodeBlock code={`# config.yaml - Complete filter stack example
# Filters are applied in order from top to bottom

filters:
  # 1. First remove static background with time filter
  - type: time

  # 2. Then remove coherent structures with POD
  - type: pod

  # 3. Apply spatial smoothing
  - type: gaussian
    sigma: 1.0

  # 4. Remove outlier pixels
  - type: median
    size: [5, 5]

  # 5. Normalize local contrast
  - type: norm
    size: [7, 7]
    max_gain: 1.5

  # 6. Clip extreme values
  - type: clip
    n: 2.0

# Batch settings for temporal filters
batches:
  size: 30  # Frames per batch`} title="config.yaml" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Filter Parameter Reference</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Filter</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { filter: "time", param: "(none)", type: "-", default: "-" },
                      { filter: "pod", param: "(none)", type: "-", default: "-" },
                      { filter: "gaussian", param: "sigma", type: "float", default: "1.0" },
                      { filter: "median", param: "size", type: "[int, int]", default: "[5, 5]" },
                      { filter: "clip", param: "n", type: "float", default: "2.0" },
                      { filter: "clip", param: "threshold", type: "[float, float]", default: "null" },
                      { filter: "norm", param: "size", type: "[int, int]", default: "[7, 7]" },
                      { filter: "norm", param: "max_gain", type: "float", default: "1.0" },
                      { filter: "maxnorm", param: "size", type: "[int, int]", default: "[7, 7]" },
                      { filter: "maxnorm", param: "max_gain", type: "float", default: "1.0" },
                      { filter: "lmax", param: "size", type: "[int, int]", default: "[7, 7]" },
                      { filter: "invert", param: "offset", type: "int", default: "255" },
                      { filter: "sbg", param: "bg", type: "string", default: "null" },
                      { filter: "levelize", param: "white", type: "string", default: "null" },
                      { filter: "transpose", param: "(none)", type: "-", default: "-" }
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-mono text-purple-600">{row.filter}</td>
                        <td className="px-4 py-3 text-sm font-mono text-blue-600">{row.param}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.type}</td>
                        <td className="px-4 py-3 text-sm font-mono text-green-600">{row.default}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <h3 className="text-3xl font-bold mb-4">Ready to Process?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              With your filter stack configured, you&apos;re ready to run PIV processing.
            </p>
            <a
              href="/manual/masking"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Configure Masking
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
