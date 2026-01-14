'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Sparkles,
  Play,
  Eye,
  Clock,
  Grid3X3,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ToggleLeft,
  ZoomIn,
  Info,
  FileText,
  Download,
  Image as ImageIcon,
  Palette,
  ArrowUp,
  ArrowDown,
  Trash2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ManualNavigation from '@/components/ManualNavigation';

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

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

interface GUIStepProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const GUIStep = ({ step, title, children }: GUIStepProps) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold text-sm">
      {step}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

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
              Build and test filter stacks interactively with the ImagePairViewer.
              See real-time results before committing to full processing, with
              side-by-side comparison of raw and filtered images.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The <strong>Pre-Processing</strong> panel provides a complete workspace for developing
              and testing image filter pipelines. Build filter stacks, see results instantly,
              and iterate until you achieve optimal particle visibility and background removal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "1. Add Filters", desc: "Build your filter stack from temporal and spatial options" },
                { label: "2. Test", desc: "Apply filters to the current frame with one click" },
                { label: "3. Compare", desc: "View raw vs processed side-by-side" },
                { label: "4. Iterate", desc: "Adjust parameters and playback through frames to verify" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Pre-process */}
          <Section title="Why Pre-process?" icon={<Info size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Image pre-processing is a critical step in PIV analysis that significantly improves
              cross-correlation accuracy and vector quality. By removing noise, correcting uneven
              illumination, and subtracting stationary backgrounds, you can enhance particle visibility
              and reduce spurious vectors. PIVTools provides two categories of filters, each serving
              distinct purposes in the preprocessing pipeline:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-purple-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Temporal Filters</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Temporal filters analyse patterns across multiple consecutive frames (batches) to
                  identify and remove features that persist over time. These are particularly effective
                  for eliminating static backgrounds, reflections, and slowly-varying illumination
                  patterns that would otherwise contaminate cross-correlation results.
                </p>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">time:</span>
                    <span>Subtracts the local minimum intensity across the batch, removing static features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">pod:</span>
                    <span>Uses Proper Orthogonal Decomposition to remove coherent large-scale structures</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Grid3X3 className="text-blue-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Spatial Filters</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Spatial filters operate on individual frames, modifying pixel intensities based on
                  local neighbourhoods. Use these for smoothing high-frequency noise, enhancing particle
                  contrast, normalising intensity variations, and preparing images for optimal
                  cross-correlation performance.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><strong>Smoothing:</strong> Gaussian, Median</li>
                  <li><strong>Contrast:</strong> Clip, Normalise, Max-Norm, Local Max</li>
                  <li><strong>Correction:</strong> Invert, Background Subtract, Levelize</li>
                  <li><strong>Geometric:</strong> Transpose</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Processing Order:</strong> Filters are applied sequentially from top to bottom
                in your filter stack. Temporal filters should typically come first to remove background
                features, followed by spatial filters for noise reduction and contrast enhancement.
              </p>
            </div>
          </Section>

          {/* The ImagePairViewer */}
          <Section title="The ImagePairViewer" icon={<Eye size={32} />} id="viewer">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>ImagePairViewer</strong> is your interactive workspace for developing and
              refining filter stacks. It displays raw and processed images in a synchronised side-by-side
              layout, with shared zoom and pan controls for precise comparison.
            </p>

            {/* Viewer Layout */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Viewer Layout</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Eye size={18} className="text-gray-500" /> Left Panel &mdash; Raw Image
                  </h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Displays the original, unprocessed image from your source data. This panel
                    serves as your reference point for evaluating filter effectiveness. All contrast
                    adjustments and zoom operations are independent from the processed view, but
                    pan and zoom can be synchronised for direct comparison.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>&bull; Frame A/B toggle to view either image of the pair</li>
                    <li>&bull; Independent contrast controls with auto-scale option</li>
                    <li>&bull; Download buttons for exporting raw images</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-blue-500" /> Right Panel &mdash; Processed Image
                  </h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Shows the result after applying your complete filter stack. This panel updates
                    when you click &quot;Test Filters&quot; and allows you to evaluate how each filter
                    affects particle visibility and background removal. For temporal filters,
                    processing includes the entire batch of frames.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>&bull; Frame A/B toggle matching the raw panel</li>
                    <li>&bull; Processing status indicator during batch operations</li>
                    <li>&bull; Download buttons for exporting processed results</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Frame Controls */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Play size={24} className="text-green-600" /> Frame Playback Controls
              </h4>
              <p className="text-gray-600 mb-4">
                Navigate through your image sequence to verify that filters perform consistently
                across all frames.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Navigation Controls</h5>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li><strong>Frame Slider:</strong> Drag to jump to any frame in your sequence</li>
                    <li><strong>Direct Input:</strong> Type a specific frame number for precise navigation</li>
                    <li><strong>Previous/Next Buttons:</strong> Step through frames one at a time</li>
                    <li><strong>Frame Counter:</strong> Shows current position (e.g., &quot;25 / 100&quot;)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Playback Controls</h5>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li><strong>Play/Pause:</strong> Toggle automatic frame advancement</li>
                    <li><strong>Playback Speed:</strong> Select from 0.5, 1, 2, 5, or 10 FPS</li>
                    <li><strong>Loop:</strong> Playback automatically wraps from last frame to first</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <p className="text-yellow-800 text-sm">
                  <strong>Performance Tip:</strong> Use JPEG format for faster playback during filter
                  development. Switch to PNG only when you need lossless precision for final inspection.
                </p>
              </div>
            </div>

            {/* Frame A/B Toggle */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ToggleLeft size={24} className="text-purple-600" /> Frame A / Frame B Toggle
              </h4>
              <p className="text-gray-600 mb-4">
                PIV analysis works with image pairs, where Frame A and Frame B are captured with a
                short time delay. Each viewer panel includes an <strong>A / B toggle</strong> that
                lets you inspect either frame independently. This is essential for verifying that
                filters process both frames consistently and that particle patterns are preserved
                correctly for cross-correlation.
              </p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>&bull; Both raw and processed panels have independent A/B toggles</li>
                <li>&bull; Download buttons export the currently selected frame (A or B)</li>
                <li>&bull; Auto-contrast adjusts independently for each frame if enabled</li>
              </ul>
            </div>
          </Section>

          {/* Image Format Selection */}
          <Section title="Image Format Selection" icon={<ImageIcon size={32} />} id="format">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The ImagePairViewer supports two image formats for displaying frames. Choose the
              format that best matches your current workflow stage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded font-bold text-sm">JPEG</div>
                  <h4 className="text-xl font-semibold text-gray-900">Fast Mode</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  JPEG compression provides significantly smaller file sizes and faster network
                  transfer, making it ideal for interactive filter development and playback. The
                  compression introduces minor artifacts, but these are typically imperceptible
                  during normal inspection.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#10003; Faster frame loading and smoother playback</li>
                  <li>&#10003; Reduced bandwidth and memory usage</li>
                  <li>&#10003; Recommended for filter development workflow</li>
                  <li>&#10007; Minor compression artifacts (usually invisible)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold text-sm">PNG</div>
                  <h4 className="text-xl font-semibold text-gray-900">Precise Mode</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  PNG provides lossless compression that preserves exact pixel values. Use this
                  mode when you need to inspect fine details, verify intensity distributions, or
                  export images for publication or further analysis.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#10003; Lossless quality with exact pixel values</li>
                  <li>&#10003; Best for final inspection and export</li>
                  <li>&#10003; Accurate intensity measurements</li>
                  <li>&#10007; Larger files and slower loading</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Grid Overlay */}
          <Section title="Grid Overlay" icon={<Grid3X3 size={32} />} id="grid">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>Grid Overlay</strong> draws interrogation window boundaries on your images,
              helping you visualise how PIV processing will divide the image for cross-correlation.
              This is invaluable for verifying that particles span appropriate sizes relative to
              window dimensions and that each window contains sufficient particle density.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Grid Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Grid Size Options</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    Select from preset sizes or enter a custom value to match your intended
                    interrogation window dimensions:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">8×8</code> &mdash; Fine resolution for small particles</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">16×16</code> &mdash; Common final pass size</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">32×32</code> &mdash; Standard intermediate pass</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">64×64</code> &mdash; Large windows for initial passes</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">Custom</code> &mdash; Enter any value from 1-512 pixels</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Grid Thickness</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    Adjust line thickness for visibility at different zoom levels:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">1px</code> &mdash; Minimal visual interference</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">2px</code> &mdash; Good balance (recommended)</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">4-6px</code> &mdash; High visibility at low zoom</li>
                    <li><code className="bg-gray-100 px-2 py-0.5 rounded">8-10px</code> &mdash; Maximum visibility</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>PIV Guidelines:</strong> For optimal cross-correlation, particles should span
                at least 2-4 pixels in diameter, and each interrogation window should contain 5-10
                particle images. Use the grid overlay to verify these conditions are met across your
                entire field of view.
              </p>
            </div>
          </Section>

          {/* Zoom & Contrast Controls */}
          <Section title="Zoom & Contrast Controls" icon={<SlidersHorizontal size={32} />} id="controls">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Both image panels share zoom and pan state, so when you zoom into a region of interest,
              both raw and processed views show the same area for direct comparison.
              Contrast controls are independent for each panel, allowing you to optimise visibility
              for both the original and filtered images.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ZoomIn size={20} /> Zoom & Pan
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li><strong>Scroll Wheel:</strong> Zoom in and out centred on cursor position</li>
                  <li><strong>Click + Drag:</strong> Pan the view to explore different regions</li>
                  <li><strong>Double-Click:</strong> Reset zoom and pan to fit the entire image</li>
                  <li><strong>Synchronised:</strong> Both panels track the same zoom level and position</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <SlidersHorizontal size={20} /> Contrast (Percentage-Based)
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li><strong>Auto Scale:</strong> Automatically adjusts vmin/vmax based on image statistics (1st-99th percentile)</li>
                  <li><strong>Manual Sliders:</strong> Dual-thumb slider for precise min/max control (0-100%)</li>
                  <li><strong>Direct Input:</strong> Type exact percentage values in the input fields</li>
                  <li><strong>Independent:</strong> Raw and processed panels have separate contrast settings</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Palette size={20} /> Colourmap Selection
              </h4>
              <p className="text-gray-600 mb-4">
                Choose between two colourmap options for visualising intensity distributions:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Grayscale</h5>
                  <p className="text-gray-600 text-sm">
                    Traditional black-to-white mapping. Best for natural image appearance and
                    evaluating particle visibility against backgrounds.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Viridis</h5>
                  <p className="text-gray-600 text-sm">
                    Perceptually uniform colourmap from purple through blue-green to yellow.
                    Excellent for revealing subtle intensity variations and gradients.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Building a Filter Stack */}
          <Section title="Building a Filter Stack" icon={<Layers size={32} />} id="filter-stack">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Filters are applied in order from top to bottom of your stack. Build your preprocessing
              pipeline by adding filters, configuring their parameters, and reordering as needed.
              All changes are automatically saved to your <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> file
              with a 500ms debounce to prevent excessive writes during rapid editing.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Filter Stack Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Adding Filters</h5>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li><strong>Filter Dropdown:</strong> Select from temporal (time, pod) or spatial filters</li>
                    <li><strong>Add Button:</strong> Appends the selected filter to the bottom of your stack</li>
                    <li><strong>Default Parameters:</strong> New filters use sensible defaults that you can adjust</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Managing Filters</h5>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowUp size={14} className="text-gray-500" />
                      <ArrowDown size={14} className="text-gray-500" />
                      <span>Move filter up or down in the processing order</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Trash2 size={14} className="text-red-500" />
                      <span>Remove filter from the stack</span>
                    </li>
                    <li><strong>Expand/Collapse:</strong> Click filter header to show/hide parameters</li>
                  </ul>
                </div>
              </div>
            </div>

            <GUIStep step={1} title="Select a filter type">
              Use the dropdown menu to choose from Temporal filters (Time, POD) or Spatial filters
              (Gaussian, Median, Clip, Normalise, Max-Norm, Local Max, Invert, Background Subtract,
              Levelize, Transpose). The dropdown groups filters by category for easier navigation.
            </GUIStep>
            <GUIStep step={2} title="Click Add Filter">
              The selected filter is added to the bottom of your stack with default parameters.
              If you add temporal filters, a Batch Size control appears to configure how many
              frames are processed together.
            </GUIStep>
            <GUIStep step={3} title="Configure parameters">
              Expand the filter card by clicking on it to reveal parameter controls. Each filter
              type has specific parameters (e.g., sigma for Gaussian, kernel size for Median).
              Changes are saved automatically after a brief delay.
            </GUIStep>
            <GUIStep step={4} title="Reorder if needed">
              Use the up/down arrow buttons to change the processing order. Remember that temporal
              filters should typically precede spatial filters for best results.
            </GUIStep>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Recommended Order:</strong> Start with temporal filters (Time, POD) to remove
                backgrounds, then apply spatial filters for noise reduction and contrast enhancement.
                A typical effective stack: Time → POD → Gaussian → Median → Normalise.
              </p>
            </div>

            <YamlDropdown
              title="Filter stack in config.yaml"
              code={`# Filters are applied in order from top to bottom
filters:
  # 1. Temporal filters first (require batch processing)
  - type: time          # Subtract minimum over time

  - type: pod           # Remove coherent structures via POD

  # 2. Then spatial filters (applied per-frame)
  - type: gaussian      # Smooth high-frequency noise
    sigma: 1.0

  - type: median        # Remove salt-and-pepper noise
    size: [5, 5]

  - type: norm          # Normalise local contrast
    size: [7, 7]
    max_gain: 1.5`}
            />
          </Section>

          {/* Testing Filters */}
          <Section title="Testing Filters" icon={<Play size={32} />} id="test-filters">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>Test Filters</strong> button applies your current filter stack to the active
              frame and displays the result in the processed panel. This is the core workflow for
              developing effective preprocessing pipelines&mdash;test, evaluate, adjust, and repeat
              until you achieve optimal results.
            </p>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Play size={24} className="text-green-600" /> Testing Workflow
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700 mb-2">Spatial Filters Only</h5>
                  <p className="text-gray-600 text-sm">
                    When your stack contains only spatial filters, results appear <strong>nearly
                    instantly</strong> since processing applies only to the single current frame.
                    This enables rapid iteration and parameter tuning.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 mb-2">With Temporal Filters</h5>
                  <p className="text-gray-600 text-sm">
                    When temporal filters (Time, POD) are present, clicking Test Filters processes
                    a <strong>full batch</strong> of frames. A progress indicator shows &quot;Processing...&quot;
                    during computation. Results for all frames in the batch become available for
                    playback after processing completes.
                  </p>
                </div>
              </div>

              <GUIStep step={1} title="Add filters to your stack">
                Build your filter pipeline using the dropdown and Add Filter button. Configure
                parameters for each filter as needed.
              </GUIStep>
              <GUIStep step={2} title="Click Test Filters">
                Apply the filter stack to the current frame (or batch for temporal filters).
                The button shows &quot;Processing...&quot; and is disabled during computation.
              </GUIStep>
              <GUIStep step={3} title="Compare raw vs processed">
                Use the side-by-side view to evaluate filter effectiveness. Zoom into regions
                of interest to inspect particle visibility and background removal.
              </GUIStep>
              <GUIStep step={4} title="Adjust and re-test">
                Tweak filter parameters, reorder filters, or add/remove filters as needed.
                Click Test Filters again to see updated results.
              </GUIStep>
              <GUIStep step={5} title="Verify across frames">
                Use the playback controls to step or play through multiple frames, verifying
                that filters perform consistently across your entire sequence.
              </GUIStep>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Processing State Indicators</h4>
              <ul className="text-gray-600 text-sm space-y-2">
                <li><strong>Loading Spinner:</strong> Appears over the processed panel during computation</li>
                <li><strong>&quot;Frame not yet processed&quot;:</strong> Shown when navigating to a frame outside the processed batch</li>
                <li><strong>&quot;No filters configured&quot;:</strong> Displayed when the filter stack is empty</li>
                <li><strong>Processing Blocked Dialog:</strong> Appears if you try to modify filters during batch processing, offering to cancel or wait</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Pro Tip:</strong> After testing, use the Play button to automatically advance
                through several frames. Watch for any frames where filters underperform&mdash;what works
                on one frame may need adjustment for frames with different lighting or particle density.
              </p>
            </div>
          </Section>

          {/* Batch Size */}
          <Section title="Batch Size for Temporal Filters" icon={<Clock size={32} />} id="batch-size">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Temporal filters (Time and POD) analyse patterns across multiple consecutive frames to
              identify and remove persistent features. The <strong>Batch Size</strong> setting
              controls how many frames are included in each processing batch, directly affecting
              both filter effectiveness and computational requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Larger Batch Size (50-100)</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#10003; Better statistical estimation of background features</li>
                  <li>&#10003; More effective removal of slowly-varying patterns</li>
                  <li>&#10003; POD can identify more coherent modes</li>
                  <li>&#10007; Higher memory usage (frames loaded simultaneously)</li>
                  <li>&#10007; Longer processing time per batch</li>
                </ul>
                <p className="text-gray-500 text-xs mt-3 italic">
                  Best for: Steady flows, consistent backgrounds, stationary cameras
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Smaller Batch Size (10-30)</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#10003; Lower memory usage during processing</li>
                  <li>&#10003; Faster iteration during filter development</li>
                  <li>&#10003; Better for time-varying conditions</li>
                  <li>&#10007; Less effective background estimation</li>
                  <li>&#10007; May miss slowly-varying features</li>
                </ul>
                <p className="text-gray-500 text-xs mt-3 italic">
                  Best for: Dynamic flows, varying illumination, testing filters quickly
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Batch Size Control</h4>
              <p className="text-gray-600 text-sm mb-3">
                When temporal filters are present in your stack, a <strong>Batch Size</strong> input
                field appears next to the filter selector. The value is validated against your total
                frame count and saved automatically to the configuration.
              </p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>&bull; Minimum: 1 frame (though temporal filters need multiple frames to be effective)</li>
                <li>&bull; Maximum: Total number of frame pairs in your sequence</li>
                <li>&bull; Changes saved on blur (when you click away from the input)</li>
              </ul>
            </div>

            <YamlDropdown
              title="Batch size in config.yaml"
              code={`# Batch settings for temporal filters
batches:
  size: 30  # Number of frames processed together

# Recommendations:
# - Testing/development: 10-20 frames (faster iteration)
# - Standard processing: 30-50 frames (good balance)
# - High-quality results: 50-100 frames (best statistics)
#
# Note: Batch size should not exceed your total frame count`}
            />
          </Section>

          {/* Temporal Filters Reference */}
          <Section title="Temporal Filters" icon={<Clock size={32} />} id="temporal">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Temporal filters analyse intensity patterns across multiple frames to identify and
              remove features that persist over time. These are essential for removing static
              backgrounds, reflections, and large-scale flow structures that would otherwise
              dominate cross-correlation peaks.
            </p>

            {/* Time Filter */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <code className="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold">time</code>
                <h4 className="text-xl font-semibold text-gray-900">Time Filter</h4>
              </div>
              <p className="text-gray-600 mb-4">
                The Time filter subtracts the <strong>local minimum</strong> intensity from each pixel
                across all frames in the batch. Any feature that appears consistently across frames
                (static background, reflections, sensor artifacts) will be removed because its minimum
                value equals its typical value. Moving particles, which only occupy each pixel briefly,
                are preserved.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 text-sm">
                  <strong>Algorithm:</strong> For each pixel position (x, y), compute the minimum
                  intensity value across all N frames in the batch. Subtract this minimum from every
                  frame at that position. Clip negative values to zero. Process Frame A and Frame B
                  channels independently.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="font-semibold text-green-800 text-sm mb-2">Effective For</h5>
                  <ul className="text-green-700 text-xs space-y-1">
                    <li>&bull; Static background removal</li>
                    <li>&bull; Constant reflections and glare</li>
                    <li>&bull; Fixed sensor artifacts</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <h5 className="font-semibold text-red-800 text-sm mb-2">Less Effective For</h5>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>&bull; Moving backgrounds</li>
                    <li>&bull; Time-varying illumination</li>
                    <li>&bull; Large coherent structures</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                <strong>Parameters:</strong> None &mdash; operates automatically on the batch
              </p>
            </div>

            {/* POD Filter */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <code className="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold">pod</code>
                <h4 className="text-xl font-semibold text-gray-900">POD Filter (Proper Orthogonal Decomposition)</h4>
              </div>
              <p className="text-gray-600 mb-4">
                The POD filter uses <strong>Proper Orthogonal Decomposition</strong> (also known as
                Principal Component Analysis in the temporal domain) to identify and remove coherent
                structures from the image sequence. This advanced technique decomposes the flow field
                into ranked spatial modes, automatically identifies which modes represent &quot;signal&quot;
                (background/large structures) versus &quot;noise&quot; (particles), and reconstructs images
                with signal modes removed.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 text-sm">
                  <strong>Algorithm (Mendez et al.):</strong>
                </p>
                <ol className="text-gray-700 text-sm space-y-1 mt-2 ml-4 list-decimal">
                  <li>Reshape each frame to a 1D vector and stack into matrix M (frames × pixels)</li>
                  <li>Compute covariance matrix C = M × M<sup>T</sup></li>
                  <li>Perform SVD: C = PSI × S × PSI<sup>T</sup> to get eigenvectors and eigenvalues</li>
                  <li>Auto-detect first &quot;noise mode&quot; where mean(PSI) &lt; 0.01 and eigenvalue difference is small</li>
                  <li>Compute spatial modes (PHI) and temporal coefficients for signal modes</li>
                  <li>Reconstruct and subtract signal contribution from each frame</li>
                </ol>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="font-semibold text-green-800 text-sm mb-2">Effective For</h5>
                  <ul className="text-green-700 text-xs space-y-1">
                    <li>&bull; Large-scale flow structures</li>
                    <li>&bull; Coherent vortices and wakes</li>
                    <li>&bull; Periodic flow features</li>
                    <li>&bull; Complex time-varying backgrounds</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <h5 className="font-semibold text-red-800 text-sm mb-2">Considerations</h5>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>&bull; Computationally intensive (SVD)</li>
                    <li>&bull; Needs sufficient batch size (&gt;30)</li>
                    <li>&bull; May over-filter sparse particle fields</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                <strong>Parameters:</strong> None &mdash; automatic mode detection using eps_auto_psi=0.01 and eps_auto_sigma=0.01
              </p>
            </div>

            <YamlDropdown
              title="Temporal filters in config.yaml"
              code={`filters:
  - type: time    # Remove static background (subtract local minimum)
  - type: pod     # Remove coherent structures via POD

# Both require batch processing.
# Set batch size in the batches section:
batches:
  size: 30

# Note: Temporal filters process Frame A and Frame B
# channels independently to preserve pair correlation.`}
            />
          </Section>

          {/* Spatial Filters Reference */}
          <Section title="Spatial Filters" icon={<Sparkles size={32} />} id="spatial">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Spatial filters operate on individual frames, modifying pixel intensities based on
              local neighbourhoods. These filters are applied per-frame after any temporal filters,
              and are used for noise reduction, contrast enhancement, and image correction.
            </p>

            {/* Filter Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  type: "gaussian",
                  name: "Gaussian Blur",
                  desc: "Smooths images using a Gaussian kernel with specified standard deviation. Reduces high-frequency noise while preserving larger features. Applied in both spatial dimensions.",
                  params: [{ name: "sigma", default: "1.0", desc: "Standard deviation (pixels)" }]
                },
                {
                  type: "median",
                  name: "Median Filter",
                  desc: "Replaces each pixel with the median value of its neighbourhood. Excellent for removing salt-and-pepper noise while preserving edges better than Gaussian smoothing.",
                  params: [{ name: "size", default: "[5, 5]", desc: "Kernel size [height, width]" }]
                },
                {
                  type: "clip",
                  name: "Clip Filter",
                  desc: "Clips pixel intensities to a threshold range. Auto-mode computes threshold as median ± n×std for each frame, handling hot pixels and sensor noise automatically.",
                  params: [
                    { name: "n", default: "2.0", desc: "Std devs for auto threshold" },
                    { name: "threshold", default: "null", desc: "Optional explicit [min, max]" }
                  ]
                },
                {
                  type: "norm",
                  name: "Normalisation",
                  desc: "Local contrast normalisation that subtracts sliding minimum and divides by local range (max-min). Equalises intensity variations across the image.",
                  params: [
                    { name: "size", default: "[7, 7]", desc: "Kernel size [height, width]" },
                    { name: "max_gain", default: "1.0", desc: "Maximum normalisation gain" }
                  ]
                },
                {
                  type: "maxnorm",
                  name: "Max-Norm",
                  desc: "Normalises by local max-min contrast with smoothing. Similar to norm but includes uniform filtering of the contrast field for smoother results.",
                  params: [
                    { name: "size", default: "[7, 7]", desc: "Kernel size [height, width]" },
                    { name: "max_gain", default: "1.0", desc: "Maximum allowed gain" }
                  ]
                },
                {
                  type: "lmax",
                  name: "Local Maximum",
                  desc: "Morphological dilation that replaces each pixel with the maximum value in its neighbourhood. Useful for enhancing bright features (particles) and filling small gaps.",
                  params: [{ name: "size", default: "[7, 7]", desc: "Kernel size [height, width]" }]
                },
                {
                  type: "invert",
                  name: "Invert",
                  desc: "Inverts image intensities: output = offset - input. Use when you have dark particles on a light background (e.g., shadowgraph, backlit imaging).",
                  params: [{ name: "offset", default: "255", desc: "Value to subtract from (typically max intensity)" }]
                },
                {
                  type: "sbg",
                  name: "Subtract Background",
                  desc: "Subtracts a reference background image from all frames and clips at zero. Requires a pre-captured background image without particles.",
                  params: [{ name: "bg", default: "null", desc: "Path to background image file" }]
                },
                {
                  type: "levelize",
                  name: "Levelize",
                  desc: "Divides by a white reference image to correct uneven illumination. The white reference should capture your illumination pattern without particles.",
                  params: [{ name: "white", default: "null", desc: "Path to white reference image" }]
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

            <YamlDropdown
              title="Spatial filters in config.yaml"
              code={`filters:
  - type: gaussian
    sigma: 1.5              # Float: Gaussian std dev in pixels

  - type: median
    size: [5, 5]            # [int, int]: Kernel height, width

  - type: clip
    n: 2.5                  # Float: Std devs for auto threshold
    # threshold: [10, 250]  # Alternative: explicit [min, max]

  - type: norm
    size: [7, 7]
    max_gain: 2.0

  - type: maxnorm
    size: [7, 7]
    max_gain: 1.5

  - type: lmax
    size: [5, 5]

  - type: invert
    offset: 255             # For 8-bit images

  - type: sbg
    bg: /path/to/background.tif

  - type: levelize
    white: /path/to/white_reference.tif`}
            />
          </Section>

          {/* Download & Export */}
          <Section title="Download & Export" icon={<Download size={32} />} id="download">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Both raw and processed images can be downloaded directly from the viewer. Use these
              exports for documentation, publication figures, or further analysis in external tools.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Download Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Raw Image Downloads</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Download the original, unprocessed image data for the currently displayed frame.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>&bull; <strong>Download Raw A:</strong> Exports Frame A of the current pair</li>
                    <li>&bull; <strong>Download Raw B:</strong> Exports Frame B of the current pair</li>
                    <li>&bull; Format matches current viewer setting (JPEG or PNG)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Processed Image Downloads</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Download the filtered result after your filter stack has been applied.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>&bull; <strong>Download Processed A:</strong> Exports filtered Frame A</li>
                    <li>&bull; <strong>Download Processed B:</strong> Exports filtered Frame B</li>
                    <li>&bull; Only available after running Test Filters</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Complete YAML Reference */}
          <Section title="Complete YAML Reference" icon={<FileText size={32} />} id="yaml-reference">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              All filter configurations from the GUI are automatically saved to <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>.
              Here&apos;s a complete reference of all preprocessing parameters and their relationships.
            </p>

            <YamlDropdown
              title="Complete preprocessing configuration"
              defaultOpen={true}
              code={`# config.yaml - Complete preprocessing configuration

filters:
  # TEMPORAL FILTERS (require batch processing)
  # These analyse multiple frames together
  - type: time          # No parameters - subtracts local minimum
  - type: pod           # No parameters - automatic mode detection

  # SPATIAL FILTERS (applied per-frame)
  # Order matters - applied sequentially
  - type: gaussian
    sigma: 1.0          # float: Gaussian std dev (pixels)

  - type: median
    size: [5, 5]        # [int, int]: Kernel size [height, width]

  - type: clip
    n: 2.0              # float: Std devs for auto threshold
    # threshold: [lo, hi]  # Alternative: explicit [min, max] values

  - type: norm
    size: [7, 7]        # [int, int]: Kernel size
    max_gain: 1.0       # float: Maximum normalisation gain

  - type: maxnorm
    size: [7, 7]
    max_gain: 1.0

  - type: lmax
    size: [7, 7]        # Morphological dilation kernel

  - type: invert
    offset: 255         # int: Value to subtract from

  - type: sbg
    bg: null            # string: Path to background image

  - type: levelize
    white: null         # string: Path to white reference

# BATCH SETTINGS (for temporal filters)
batches:
  size: 30              # Number of frames per batch

# Note: Kernel sizes are automatically adjusted to be odd
# (e.g., [6, 6] becomes [7, 7]) for proper centering`}
            />

            {/* Parameter Table */}
            <div className="mt-6 overflow-x-auto">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Parameter Quick Reference</h4>
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Filter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Data Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { filter: "time", type: "Temporal", param: "(none)", dtype: "-", default: "-" },
                    { filter: "pod", type: "Temporal", param: "(none)", dtype: "-", default: "-" },
                    { filter: "gaussian", type: "Spatial", param: "sigma", dtype: "float", default: "1.0" },
                    { filter: "median", type: "Spatial", param: "size", dtype: "[int, int]", default: "[5, 5]" },
                    { filter: "clip", type: "Spatial", param: "n", dtype: "float", default: "2.0" },
                    { filter: "clip", type: "Spatial", param: "threshold", dtype: "[float, float]", default: "null" },
                    { filter: "norm", type: "Spatial", param: "size", dtype: "[int, int]", default: "[7, 7]" },
                    { filter: "norm", type: "Spatial", param: "max_gain", dtype: "float", default: "1.0" },
                    { filter: "maxnorm", type: "Spatial", param: "size", dtype: "[int, int]", default: "[7, 7]" },
                    { filter: "maxnorm", type: "Spatial", param: "max_gain", dtype: "float", default: "1.0" },
                    { filter: "lmax", type: "Spatial", param: "size", dtype: "[int, int]", default: "[7, 7]" },
                    { filter: "invert", type: "Spatial", param: "offset", dtype: "int", default: "255" },
                    { filter: "sbg", type: "Spatial", param: "bg", dtype: "string", default: "null" },
                    { filter: "levelize", type: "Spatial", param: "white", dtype: "string", default: "null" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono text-purple-600">{row.filter}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.type === 'Temporal' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-blue-600">{row.param}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.dtype}</td>
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
            <h3 className="text-3xl font-bold mb-4">Ready to Configure PIV Processing?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              With your filter stack configured and verified across multiple frames, you&apos;re ready
              to configure cross-correlation parameters for vector field computation.
            </p>
            <a
              href="/manual/processing"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Configure Processing &rarr;
            </a>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
