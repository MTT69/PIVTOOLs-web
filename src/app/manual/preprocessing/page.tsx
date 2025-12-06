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
  ChevronUp,
  X,
  Plus,
  RefreshCcw,
  Pause,
  SkipForward,
  SkipBack,
  ToggleLeft,
  ZoomIn,
  Maximize2,
  Camera,
  Info,
  ArrowRight,
  CheckCircle,
  FileText
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

interface ScreenshotPlaceholderProps {
  caption: string;
  alt: string;
}

const ScreenshotPlaceholder = ({ caption, alt }: ScreenshotPlaceholderProps) => (
  <div className="my-6">
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
      <div className="text-gray-400 mb-2">
        <Camera size={48} />
      </div>
      <p className="text-gray-500 text-sm text-center">[Screenshot: {alt}]</p>
    </div>
    <p className="text-center text-sm text-gray-600 mt-2 italic">{caption}</p>
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
              See real-time results before committing to full processing.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The <strong>Pre-Processing</strong> panel lets you build filter stacks and test them 
              on individual frames before running full PIV processing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "1. Add Filters", desc: "Build your filter stack" },
                { label: "2. Test", desc: "Apply to current frame" },
                { label: "3. Compare", desc: "Raw vs processed view" },
                { label: "4. Iterate", desc: "Adjust and re-test" }
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
              Image pre-processing improves PIV quality by removing noise, correcting uneven illumination, 
              and subtracting stationary backgrounds. PIVTools provides two types of filters:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-purple-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Temporal Filters</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Work across multiple frames (batches). Great for removing static backgrounds 
                  and slow-varying features.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <strong>Time Filter:</strong> Subtracts local minimum</li>
                  <li>• <strong>POD Filter:</strong> Removes coherent structures</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Grid3X3 className="text-blue-600" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Spatial Filters</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Work on individual frames. Use for smoothing, noise removal, 
                  and contrast normalization.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Gaussian, Median, Clip</li>
                  <li>• Normalize, Max-Norm, Local Max</li>
                  <li>• Invert, Background Subtract, Levelize</li>
                </ul>
              </div>
            </div>

            <ScreenshotPlaceholder
              alt="Pre-Processing panel showing the filter stack builder and ImagePairViewer"
              caption="Figure 1: The Pre-Processing panel with filter stack builder (left) and ImagePairViewer (right)"
            />
          </Section>

          {/* The ImagePairViewer */}
          <Section title="The ImagePairViewer" icon={<Eye size={32} />} id="viewer">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>ImagePairViewer</strong> is your interactive workspace for developing filter stacks. 
              It shows raw and processed images side-by-side, lets you play through frames, and overlay a grid 
              to visualize interrogation window sizes.
            </p>

            <ScreenshotPlaceholder
              alt="ImagePairViewer showing raw image (left) and processed image (right) with grid overlay"
              caption="Figure 2: The ImagePairViewer with raw vs processed comparison and grid overlay enabled"
            />

            {/* Viewer Layout */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Viewer Layout</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Eye size={18} className="text-gray-500" /> Left Panel — Raw Image
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Shows the original, unprocessed image. Use as your reference.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-blue-500" /> Right Panel — Processed Image
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Shows the result after applying your filter stack. Updates when you click &quot;Test Filters&quot;.
                  </p>
                </div>
              </div>
            </div>

            {/* Frame Controls */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Play size={24} className="text-green-600" /> Frame Playback Controls
              </h4>
              <p className="text-gray-600 mb-4">
                Navigate through your image sequence to see how filters perform across different frames.
              </p>
              <FeatureList items={[
                "Play button cycles through frames automatically",
                "Previous/Next buttons step through frames one at a time",
                "Frame slider lets you jump to any frame instantly",
                "Both panels (raw and processed) update together"
              ]} />
            </div>

            {/* Frame A/B Toggle */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ToggleLeft size={24} className="text-purple-600" /> Frame A / Frame B Toggle
              </h4>
              <p className="text-gray-600 mb-4">
                PIV works with image pairs. Each panel has an <strong>A / B toggle</strong> so you can view 
                either frame of the pair independently. This helps verify that both frames are processed correctly.
              </p>
            </div>
          </Section>

          {/* Grid Overlay */}
          <Section title="Grid Overlay" icon={<Grid3X3 size={32} />} id="grid">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>Grid Overlay</strong> draws interrogation windows on top of your images, 
              helping you visualize how your PIV settings will divide up the image for cross-correlation.
            </p>

            <ScreenshotPlaceholder
              alt="Grid overlay showing 64×64 interrogation windows with 50% overlap"
              caption="Figure 3: Grid overlay showing interrogation window layout on a processed image"
            />

            <GUIStep step={1} title="Open Processing settings">
              Set your interrogation window size and overlap in the Processing tab
            </GUIStep>
            <GUIStep step={2} title="Toggle Grid Overlay">
              Click the grid icon in the viewer toolbar to show/hide the grid
            </GUIStep>
            <GUIStep step={3} title="Visualize coverage">
              The grid shows how the current window size divides your image
            </GUIStep>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Tip:</strong> Use the grid to check that particles span at least 3-4 pixels and that 
                each interrogation window contains multiple particles.
              </p>
            </div>
          </Section>

          {/* Zoom & Contrast Controls */}
          <Section title="Zoom & Contrast Controls" icon={<SlidersHorizontal size={32} />} id="controls">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Both image panels share zoom and pan state, so when you zoom into a region, 
              both raw and processed views show the same area for easy comparison.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ZoomIn size={20} /> Zoom & Pan
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li><strong>Scroll wheel:</strong> Zoom in/out</li>
                  <li><strong>Click + drag:</strong> Pan the view</li>
                  <li><strong>Double-click:</strong> Reset to fit</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <SlidersHorizontal size={20} /> Contrast
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li><strong>Auto Scale:</strong> Adjusts automatically (recommended)</li>
                  <li><strong>Manual:</strong> Use sliders for fine control</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Building a Filter Stack */}
          <Section title="Building a Filter Stack" icon={<Layers size={32} />} id="filter-stack">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Filters are applied in order from top to bottom. Build your stack by adding filters, 
              configuring their parameters, and reordering as needed.
            </p>

            <ScreenshotPlaceholder
              alt="Filter stack builder showing Time, POD, Gaussian, and Median filters queued"
              caption="Figure 4: The filter stack builder with multiple filters queued in order"
            />

            <GUIStep step={1} title="Select a filter type">
              Use the dropdown to choose from Temporal filters (Time, POD) or Spatial filters (Gaussian, Median, etc.)
            </GUIStep>
            <GUIStep step={2} title="Click Add Filter">
              The filter is added to your stack with default parameters
            </GUIStep>
            <GUIStep step={3} title="Configure parameters">
              Expand the filter card to adjust settings like sigma, kernel size, or thresholds
            </GUIStep>
            <GUIStep step={4} title="Reorder if needed">
              Use the up/down arrows to change order, or the X button to remove a filter
            </GUIStep>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Order Matters:</strong> Temporal filters (Time, POD) should come first, followed by 
                spatial filters. A typical stack: Time → POD → Gaussian → Median → Normalize.
              </p>
            </div>

            <YamlDropdown 
              title="Filter stack in config.yaml"
              code={`# Filters are applied in order from top to bottom
filters:
  # 1. Temporal filters first
  - type: time          # Subtract minimum over time
  
  - type: pod           # Remove coherent structures
  
  # 2. Then spatial filters
  - type: gaussian      # Smooth high-frequency noise
    sigma: 1.0
    
  - type: median        # Remove salt-and-pepper noise
    size: [5, 5]
    
  - type: norm          # Normalize local contrast
    size: [7, 7]
    max_gain: 1.5`}
            />
          </Section>

          {/* Testing Filters */}
          <Section title="Testing Filters" icon={<Play size={32} />} id="test-filters">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>Test Filters</strong> button applies your current filter stack to the active frame 
              and displays the result in the right panel. This is the key to developing effective filter settings.
            </p>

            <ScreenshotPlaceholder
              alt="Before and after comparison with Time + Gaussian filters applied"
              caption="Figure 5: Before (raw) and after (processed) comparison showing filter effects"
            />

            <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Play size={24} className="text-green-600" /> Testing Workflow
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700 mb-2">Spatial Filters Only</h5>
                  <p className="text-gray-600 text-sm">
                    Results appear <strong>instantly</strong> — filters are applied to the single current frame.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 mb-2">With Temporal Filters</h5>
                  <p className="text-gray-600 text-sm">
                    Processes a <strong>full batch</strong> of frames first. Shows &quot;Processing...&quot; during computation.
                  </p>
                </div>
              </div>

              <GUIStep step={1} title="Add filters to your stack">
                Build your filter pipeline using the dropdown and Add Filter button
              </GUIStep>
              <GUIStep step={2} title="Click Test Filters">
                Apply the filter stack to the current frame
              </GUIStep>
              <GUIStep step={3} title="Compare raw vs processed">
                Use the side-by-side view to evaluate filter effectiveness
              </GUIStep>
              <GUIStep step={4} title="Adjust and re-test">
                Tweak parameters and test again until satisfied
              </GUIStep>
              <GUIStep step={5} title="Check consistency">
                Use Play to verify filters work across multiple frames
              </GUIStep>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Pro Tip:</strong> After testing, play through several frames to ensure filters 
                perform consistently. What works on one frame may not work on all frames!
              </p>
            </div>
          </Section>

          {/* Batch Size */}
          <Section title="Batch Size for Temporal Filters" icon={<Clock size={32} />} id="batch-size">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Temporal filters (Time and POD) process multiple frames together. The <strong>Batch Size</strong> 
              setting controls how many consecutive frames are included in each batch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Larger Batch Size (50-100)</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>✓ Better statistical estimation</li>
                  <li>✓ More effective background removal</li>
                  <li>✗ Higher memory usage</li>
                  <li>✗ Longer processing time</li>
                </ul>
                <p className="text-gray-500 text-xs mt-3 italic">Best for: Steady flows, consistent backgrounds</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Smaller Batch Size (10-30)</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>✓ Lower memory usage</li>
                  <li>✓ Better for changing conditions</li>
                  <li>✗ Less effective filtering</li>
                  <li>✗ May miss slow features</li>
                </ul>
                <p className="text-gray-500 text-xs mt-3 italic">Best for: Dynamic flows, varying backgrounds</p>
              </div>
            </div>

            <YamlDropdown 
              title="Batch size in config.yaml"
              code={`# Batch settings for temporal filters
batches:
  size: 30  # Number of frames processed together

# Recommendation: Start with 30-50 frames.
# For dynamic flows: use 10-20
# For steady flows: use 50-100`}
            />
          </Section>

          {/* Temporal Filters Reference */}
          <Section title="Temporal Filters" icon={<Clock size={32} />} id="temporal">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Temporal filters analyze patterns across multiple frames to remove stationary or slowly-varying features.
            </p>

            {/* Time Filter */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <code className="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold">time</code>
                <h4 className="text-xl font-semibold text-gray-900">Time Filter</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Subtracts the <strong>local minimum</strong> intensity from each pixel across all frames in the batch. 
                Effectively removes static backgrounds while preserving moving particles.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>How it works:</strong> For each pixel, finds the minimum value across batch frames, 
                  then subtracts that minimum from every frame. Static features become zero.
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-3">No parameters required</p>
            </div>

            {/* POD Filter */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <code className="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold">pod</code>
                <h4 className="text-xl font-semibold text-gray-900">POD Filter</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Uses <strong>Proper Orthogonal Decomposition</strong> to identify and remove coherent structures 
                (large-scale flow features, reflections) while preserving particle signal.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>How it works:</strong> Decomposes the image sequence into spatial modes ranked by energy. 
                  Removes dominant modes (background/large structures) and reconstructs from remaining modes.
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-3">No parameters required</p>
            </div>

            <YamlDropdown 
              title="Temporal filters in config.yaml"
              code={`filters:
  - type: time    # Remove static background
  - type: pod     # Remove coherent structures

# Both require batch processing.
# Set batch size in the batches section.`}
            />
          </Section>

          {/* Spatial Filters Reference */}
          <Section title="Spatial Filters" icon={<Sparkles size={32} />} id="spatial">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Spatial filters operate on individual frames, modifying pixel intensities based on local neighborhoods.
            </p>

            {/* Filter Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  type: "gaussian",
                  name: "Gaussian Blur",
                  desc: "Smooths images using a Gaussian kernel. Reduces high-frequency noise.",
                  params: [{ name: "sigma", default: "1.0", desc: "Standard deviation" }]
                },
                {
                  type: "median",
                  name: "Median Filter",
                  desc: "Replaces each pixel with neighborhood median. Great for salt-and-pepper noise.",
                  params: [{ name: "size", default: "[5, 5]", desc: "Kernel size" }]
                },
                {
                  type: "clip",
                  name: "Clip Filter",
                  desc: "Clips pixel intensities to threshold range. Auto-mode uses median ± n×std.",
                  params: [{ name: "n", default: "2.0", desc: "Std devs for auto" }]
                },
                {
                  type: "norm",
                  name: "Normalization",
                  desc: "Normalizes by subtracting local min and dividing by local range.",
                  params: [
                    { name: "size", default: "[7, 7]", desc: "Kernel size" },
                    { name: "max_gain", default: "1.0", desc: "Max gain" }
                  ]
                },
                {
                  type: "maxnorm",
                  name: "Max-Norm",
                  desc: "Normalizes by local max-min contrast. Good for varying illumination.",
                  params: [
                    { name: "size", default: "[7, 7]", desc: "Kernel size" },
                    { name: "max_gain", default: "1.0", desc: "Max gain" }
                  ]
                },
                {
                  type: "lmax",
                  name: "Local Maximum",
                  desc: "Morphological dilation — replaces each pixel with neighborhood max.",
                  params: [{ name: "size", default: "[7, 7]", desc: "Kernel size" }]
                },
                {
                  type: "invert",
                  name: "Invert",
                  desc: "Inverts intensities: output = offset - input. For dark particles on light background.",
                  params: [{ name: "offset", default: "255", desc: "Value to subtract from" }]
                },
                {
                  type: "sbg",
                  name: "Subtract Background",
                  desc: "Subtracts a reference background image from all frames.",
                  params: [{ name: "bg", default: "null", desc: "Path to background" }]
                },
                {
                  type: "levelize",
                  name: "Levelize",
                  desc: "Divides by a white reference image. Corrects uneven illumination.",
                  params: [{ name: "white", default: "null", desc: "Path to white ref" }]
                },
                {
                  type: "transpose",
                  name: "Transpose",
                  desc: "Swaps height and width dimensions.",
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

            <YamlDropdown 
              title="Spatial filters in config.yaml"
              code={`filters:
  - type: gaussian
    sigma: 1.5
    
  - type: median
    size: [5, 5]
    
  - type: clip
    n: 2.5
    
  - type: norm
    size: [7, 7]
    max_gain: 2.0
    
  - type: invert
    offset: 255
    
  - type: sbg
    bg: /path/to/background.tif
    
  - type: levelize
    white: /path/to/white_reference.tif`}
            />
          </Section>

          {/* Complete YAML Reference */}
          <Section title="Complete YAML Reference" icon={<FileText size={32} />} id="yaml-reference">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Filters configured in the GUI are saved to <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>. 
              Here&apos;s a complete reference of all filter parameters.
            </p>

            <YamlDropdown 
              title="Complete filter configuration"
              defaultOpen={true}
              code={`# config.yaml - Complete preprocessing configuration

filters:
  # TEMPORAL FILTERS (require batching)
  - type: time          # No parameters
  - type: pod           # No parameters
  
  # SPATIAL FILTERS (applied per-frame)
  - type: gaussian
    sigma: 1.0          # float: Gaussian std dev
    
  - type: median
    size: [5, 5]        # [int, int]: Kernel size
    
  - type: clip
    n: 2.0              # float: Std devs for auto threshold
    # threshold: [lo, hi]  # Alternative: explicit [min, max]
    
  - type: norm
    size: [7, 7]        # [int, int]: Kernel size
    max_gain: 1.0       # float: Maximum gain
    
  - type: maxnorm
    size: [7, 7]
    max_gain: 1.0
    
  - type: lmax
    size: [7, 7]
    
  - type: invert
    offset: 255         # int: Value to subtract from
    
  - type: sbg
    bg: null            # string: Path to background image
    
  - type: levelize
    white: null         # string: Path to white reference
    
  - type: transpose     # No parameters

# BATCH SETTINGS
batches:
  size: 30              # Frames per batch`}
            />

            {/* Parameter Table */}
            <div className="mt-6 overflow-x-auto">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Parameter Quick Reference</h4>
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
                    { filter: "norm", param: "size", type: "[int, int]", default: "[7, 7]" },
                    { filter: "norm", param: "max_gain", type: "float", default: "1.0" },
                    { filter: "maxnorm", param: "size", type: "[int, int]", default: "[7, 7]" },
                    { filter: "lmax", param: "size", type: "[int, int]", default: "[7, 7]" },
                    { filter: "invert", param: "offset", type: "int", default: "255" },
                    { filter: "sbg", param: "bg", type: "string", default: "null" },
                    { filter: "levelize", param: "white", type: "string", default: "null" }
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
          </Section>

          {/* Troubleshooting */}
          <Section title="Troubleshooting" icon={<Info size={32} />} id="troubleshooting">
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Processed image looks the same as raw</h4>
                <p className="text-gray-600 text-sm">
                  Make sure you clicked <strong>Test Filters</strong> after adding or modifying filters. 
                  The processed panel only updates when you explicitly test.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Temporal filters taking too long</h4>
                <p className="text-gray-600 text-sm">
                  Reduce the <strong>Batch Size</strong> to process fewer frames at once. 
                  For testing, a batch size of 10-20 is often sufficient.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Grid not visible on image</h4>
                <p className="text-gray-600 text-sm">
                  The grid uses your current interrogation window settings from the Processing tab. 
                  Make sure you&apos;ve configured those settings first, then toggle the grid icon.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Filters not saving to config.yaml</h4>
                <p className="text-gray-600 text-sm">
                  Filter changes are saved automatically when you modify them in the GUI. 
                  Check that you have write permissions to the config file.
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
            <h3 className="text-3xl font-bold mb-4">Ready to Configure PIV Processing?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              With your filter stack optimized, set up your cross-correlation parameters.
            </p>
            <a
              href="/manual/processing"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Configure Processing →
            </a>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
