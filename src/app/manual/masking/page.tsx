'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Layers,
  MousePointer2,
  CheckCircle,
  AlertTriangle,
  Save,
  FolderOpen,
  RefreshCw,
  Square,
  Hexagon,
  Eye,
  Download,
  FileText,
  ChevronDown,
  ChevronRight,
  Camera
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

export default function MaskingPage() {
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
              Image <span className="text-soton-gold">Masking</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Define regions to exclude from PIV processing using polygon masks or pixel borders.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The Masking panel is found on the <strong>Setup</strong> tab in the PIVTools GUI, below Image Configuration.
              Use it to exclude walls, model supports, reflections, or image edges from PIV analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "1. Choose Mode", desc: "Polygon or Pixel Border" },
                { label: "2. Define Regions", desc: "Draw or set pixel values" },
                { label: "3. Enable Mask", desc: "Toggle 'Apply Mask for PIV'" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <Section title="Masking Modes" icon={<Layers size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools supports two masking modes. Select the mode from the dropdown in the Masking panel.
            </p>

            <ScreenshotPlaceholder
              alt="Masking panel header showing mode dropdown with Polygon and Pixel Border options, and Apply Mask toggle"
              caption="Figure 1: Masking mode selector and enable toggle at the top of the Masking panel"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Hexagon className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Polygon Mode</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Draw custom polygon shapes to mask irregular regions like model supports, walls, or reflections.
                  Multiple polygons can be combined into a single mask.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
                    <strong>Best for:</strong> Complex shapes, angled surfaces, irregular boundaries
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Square className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Pixel Border Mode</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Quickly mask fixed pixel borders from the top, bottom, left, and right edges of the image.
                  Ideal for cropping noisy edges.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
                    <strong>Best for:</strong> Edge artifacts, fixed boundary regions, quick setup
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
              <p className="text-green-700">
                <strong>Enable Masking:</strong> Toggle the <em>&quot;Apply Mask for PIV&quot;</em> switch to activate masking during processing.
                When enabled, masked regions will be set to zero in the output vector fields.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Masking Mode"
              code={`masking:
  enabled: true          # Toggle masking on/off
  mode: file             # 'file' = polygon mode, 'rectangular' = pixel border mode`}
            />
          </Section>

          {/* Polygon Mask Editor Section */}
          <Section title="Polygon Mask Editor" icon={<MousePointer2 size={32} />} id="polygon-editor">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              When <strong>Polygon</strong> mode is selected, an interactive canvas appears for drawing mask regions directly on your PIV images.
            </p>

            <ScreenshotPlaceholder
              alt="Polygon mask editor showing an image with two drawn polygons - one completed (orange) masking a support structure, and one in progress (green) with visible vertices"
              caption="Figure 2: Polygon mask editor with completed mask (orange) and active polygon being drawn (green vertices)"
            />

            {/* Drawing Polygons */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">How to Draw Polygons</h4>
              
              <GUIStep step={1} title="Load an image">
                Select your source path, camera, and image index from the controls at the top, then click <strong>Load Image</strong>.
              </GUIStep>
              
              <GUIStep step={2} title="Click to add points">
                Click on the image to place polygon vertices. Points appear in <span className="text-green-600 font-semibold">green</span> for the active polygon.
              </GUIStep>
              
              <GUIStep step={3} title="Close the polygon">
                After placing at least 3 points, the starting point shows as a <span className="text-pink-600 font-semibold">larger red circle</span>.
                Click within this circle to close the polygon. It will turn <span className="text-orange-500 font-semibold">orange</span> when closed.
              </GUIStep>
              
              <GUIStep step={4} title="Add more polygons">
                After closing, a new polygon starts automatically. Click <strong>New Polygon</strong> to start one manually.
              </GUIStep>
            </div>

            {/* Edge Snapping */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-orange-400">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Edge Snapping</h4>
              <p className="text-gray-700 mb-4">
                Click in the <strong>padding area</strong> outside the image to snap points to the nearest edge or corner.
                This is useful for creating masks that extend precisely to the image boundary.
              </p>
              <div className="flex items-center gap-3">
                <Eye className="text-orange-500" size={20} />
                <p className="text-orange-700 text-sm">
                  The magnifier turns <span className="text-orange-600 font-bold">orange</span> when you&apos;re in the snap zone.
                </p>
              </div>
            </div>

            {/* Magnifier & Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Magnifier Tool</h4>
                <p className="text-gray-600 mb-4">
                  Enable the magnifier for precise point placement. A 2.5× zoomed view follows your cursor with crosshairs.
                </p>
                <FeatureList items={[
                  "Toggle with the magnifier button",
                  "Crosshairs indicate exact click position",
                  "Orange border when in edge-snap zone"
                ]} />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contrast Controls</h4>
                <p className="text-gray-600 mb-4">
                  Adjust image contrast to see mask regions more clearly. Use <strong>Auto-scale</strong> for automatic 1st–99th percentile scaling.
                </p>
                <FeatureList items={[
                  "Drag slider handles for min/max",
                  "Auto-scale checkbox for automatic range",
                  "Works with any bit depth (8-bit, 16-bit)"
                ]} />
              </div>
            </div>

            {/* Editor Controls */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Editor Controls</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { btn: "New Polygon", desc: "Start a fresh polygon" },
                  { btn: "Undo Point", desc: "Remove last point added" },
                  { btn: "Delete", desc: "Delete selected polygon" },
                  { btn: "Prev / Next", desc: "Navigate between polygons" },
                  { btn: "Save Mask", desc: "Save .mat file for PIV" },
                  { btn: "Save PNG", desc: "Download as PNG image" },
                  { btn: "Clear Mask", desc: "Remove all polygons" },
                  { btn: "Magnifier", desc: "Toggle zoom tool" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <code className="text-soton-blue font-mono text-sm">{item.btn}</code>
                    <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <YamlDropdown
              title="YAML Reference - Polygon Mask"
              code={`masking:
  enabled: true
  mode: file                         # 'file' = use polygon mask from disk
  mask_file_pattern: mask_Cam%d.mat  # %d is replaced with camera number
  mask_threshold: 0.01               # Threshold for mask application`}
            />
          </Section>

          {/* Pixel Border Mode Section */}
          <Section title="Pixel Border Mode" icon={<Square size={32} />} id="pixel-border">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Pixel border mode provides a quick way to mask fixed regions at the image edges without drawing polygons.
              Simply enter the number of pixels to exclude from each edge.
            </p>

            <ScreenshotPlaceholder
              alt="Pixel border mode showing image with red semi-transparent overlay on top and bottom edges, with input fields showing Top: 64, Bottom: 64, Left: 0, Right: 0"
              caption="Figure 3: Pixel border masking with 64px masked from top and bottom edges (shown as red overlay)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h4>
                <p className="text-gray-600 mb-4">
                  Enter pixel values for each edge. The preview updates <strong>live</strong> as you type, showing masked regions as a semi-transparent red overlay.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Top</p>
                    <p className="text-gray-600 text-sm">Pixels from top</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Bottom</p>
                    <p className="text-gray-600 text-sm">Pixels from bottom</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Left</p>
                    <p className="text-gray-600 text-sm">Pixels from left</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Right</p>
                    <p className="text-gray-600 text-sm">Pixels from right</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-blue-700">
                    <strong>Live Preview:</strong> Load an image first to see the mask overlay update in real-time as you adjust values.
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <p className="text-red-700">
                    <strong>Red Overlay:</strong> Semi-transparent red regions show areas that will be excluded from PIV processing. Red lines mark the exact boundary.
                  </p>
                </div>
              </div>
            </div>

            <YamlDropdown
              title="YAML Reference - Pixel Border"
              defaultOpen={true}
              code={`masking:
  enabled: true
  mode: rectangular    # 'rectangular' = pixel border mode
  rectangular:
    top: 64            # Mask 64 pixels from top edge
    bottom: 64         # Mask 64 pixels from bottom edge
    left: 0            # No left masking
    right: 0           # No right masking`}
            />
          </Section>

          {/* Mask Storage Section */}
          <Section title="Mask Storage" icon={<FolderOpen size={32} />} id="storage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Polygon masks are saved as MATLAB <code className="bg-gray-100 px-2 py-1 rounded">.mat</code> files.
              Pixel border settings are stored directly in the config file.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Hexagon className="text-green-600" size={24} />
                  <h4 className="text-lg font-semibold text-green-800">Polygon Masks</h4>
                </div>
                <p className="text-green-700 mb-3">
                  Saved to your source directory as <code className="bg-green-100 px-1 rounded">mask_Cam1.mat</code>, <code className="bg-green-100 px-1 rounded">mask_Cam2.mat</code>, etc.
                </p>
                <FeatureList items={[
                  "Binary mask array (image size)",
                  "Polygon vertices (for re-editing)",
                  "One file per camera"
                ]} />
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Square className="text-blue-600" size={24} />
                  <h4 className="text-lg font-semibold text-blue-800">Pixel Borders</h4>
                </div>
                <p className="text-blue-700 mb-3">
                  Stored in <code className="bg-blue-100 px-1 rounded">config.yaml</code> and applied at runtime. No separate file needed.
                </p>
                <FeatureList items={[
                  "Saved automatically when you change values",
                  "Same settings apply to all cameras",
                  "No separate mask file required"
                ]} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="text-gray-600" size={24} />
                <h4 className="text-lg font-semibold text-gray-800">Auto-Loading Masks</h4>
              </div>
              <p className="text-gray-600 mb-3">
                When you open the Masking tab, PIVTools automatically loads any existing polygon mask for the selected camera.
                Status indicators show the loading state.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Loading...</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Loaded 3 polygon(s)</span>
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">No existing mask found</span>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Per-Camera Masks</h4>
              </div>
              <p className="text-yellow-700">
                Each camera has its own polygon mask file. In stereo PIV setups, you&apos;ll need to create separate masks for
                Cam1 and Cam2 to account for different viewing angles. Switch cameras using the dropdown, then draw/save each mask.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Mask File Pattern"
              code={`masking:
  mask_file_pattern: mask_Cam%d.mat  # %d = camera number

# Files are saved/loaded from source_path:
# source_path/mask_Cam1.mat
# source_path/mask_Cam2.mat`}
            />
          </Section>

          {/* Saving Options Section */}
          <Section title="Saving Options" icon={<Download size={32} />} id="saving">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Multiple save options are available depending on your needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Save className="text-soton-blue" size={24} />
                  <div className="bg-soton-blue text-white px-3 py-1 rounded text-sm font-semibold">Save Mask</div>
                </div>
                <p className="text-gray-600 mb-4">
                  <strong>Primary save action.</strong> Saves the polygon mask to disk as a <code className="bg-gray-100 px-1 rounded">.mat</code> file for use during PIV processing.
                </p>
                <FeatureList items={[
                  "Saves to source_path/mask_CamN.mat",
                  "Stores polygon coordinates for re-editing",
                  "Automatically loaded during PIV runs"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="text-gray-600" size={24} />
                  <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-semibold">Save PNG</div>
                </div>
                <p className="text-gray-600 mb-4">
                  Downloads a PNG image of the mask for documentation or use with external tools.
                </p>
                <FeatureList items={[
                  "Full native resolution",
                  "Binary format (white = masked)",
                  "Useful for reports or external software"
                ]} />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <p className="text-blue-700">
                <strong>Pixel Border Note:</strong> Pixel border settings are saved automatically to <code className="bg-blue-100 px-1 rounded">config.yaml</code> when you change them.
                No manual save action is needed—just enable the mask toggle.
              </p>
            </div>
          </Section>

          {/* Complete Configuration Reference */}
          <Section title="Complete Configuration Reference" icon={<FileText size={32} />} id="yaml-config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For power users who prefer direct YAML configuration, here&apos;s the complete masking reference.
            </p>

            <YamlDropdown
              title="Full YAML Configuration"
              defaultOpen={true}
              code={`# config.yaml - Complete masking configuration
masking:
  enabled: true                      # Toggle masking on/off for PIV processing
  mode: file                         # 'file' (polygon) or 'rectangular' (pixel border)
  mask_file_pattern: mask_Cam%d.mat  # Filename pattern for polygon masks
  mask_threshold: 0.01               # Threshold for mask application
  rectangular:                       # Only used when mode: rectangular
    top: 64                          # Pixels to mask from top edge
    bottom: 64                       # Pixels to mask from bottom edge
    left: 0                          # Pixels to mask from left edge
    right: 0                         # Pixels to mask from right edge`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Mapping</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">GUI Control</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Field</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Values</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { gui: "Apply Mask for PIV toggle", yaml: "masking.enabled", values: "true / false" },
                      { gui: "Masking Mode dropdown", yaml: "masking.mode", values: "'file' (polygon) / 'rectangular' (pixel border)" },
                      { gui: "Top (pixels)", yaml: "masking.rectangular.top", values: "integer ≥ 0" },
                      { gui: "Bottom (pixels)", yaml: "masking.rectangular.bottom", values: "integer ≥ 0" },
                      { gui: "Left (pixels)", yaml: "masking.rectangular.left", values: "integer ≥ 0" },
                      { gui: "Right (pixels)", yaml: "masking.rectangular.right", values: "integer ≥ 0" },
                      { gui: "Save Mask button", yaml: "masking.mask_file_pattern", values: "Saved to source_path/mask_CamN.mat" }
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.gui}</td>
                        <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.yaml}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.values}</td>
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
            <h3 className="text-3xl font-bold mb-4">Next: Pre-Processing Filters</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Apply temporal and spatial filters to enhance your images before PIV processing.
            </p>
            <a
              href="/manual/preprocessing"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Pre-Processing
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
