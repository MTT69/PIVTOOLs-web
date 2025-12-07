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
  Sliders,
  Target,
  Trash2,
  Info
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
              Masking prevents erroneous vectors in areas with poor seeding, reflections, or model boundaries.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The Masking panel is found on the <strong>Setup</strong> tab in the PIVTools GUI, below Image Configuration.
              Use it to exclude walls, model supports, reflections, or image edges from PIV analysis. Masked regions
              produce zero-valued vectors in the output fields.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "1. Choose Mode", desc: "Polygon or Pixel Border" },
                { label: "2. Define Regions", desc: "Draw polygons or set pixel values" },
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
              PIVTools supports two masking modes. Select the mode from the <strong>Masking Mode</strong> dropdown
              in the Masking panel. Both modes can be toggled on or off for PIV processing using the
              <strong> Apply Mask for PIV</strong> switch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Hexagon className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Polygon Mode</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Draw custom polygon shapes to mask irregular regions like model supports, walls, or reflections.
                  Multiple polygons can be combined into a single mask. Polygons <strong>auto-save</strong> when
                  completed, so your work is preserved automatically.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
                    <strong>Best for:</strong> Complex shapes, angled surfaces, irregular boundaries, non-rectangular regions
                  </p>
                </div>
                <YamlDropdown
                  code={`masking:
  enabled: true
  mode: file  # 'file' = polygon mask from .mat file`}
                />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Square className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Pixel Border Mode</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Quickly mask fixed pixel borders from the top, bottom, left, and right edges of the image.
                  Ideal for cropping noisy edges or removing fixed boundary regions. Values are stored
                  directly in <code className="bg-gray-100 px-1 rounded">config.yaml</code>.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
                    <strong>Best for:</strong> Edge artifacts, fixed boundary regions, quick setup, uniform borders
                  </p>
                </div>
                <YamlDropdown
                  code={`masking:
  enabled: true
  mode: rectangular  # 'rectangular' = pixel border mode`}
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
              <p className="text-green-700">
                <strong>Enable Masking:</strong> Toggle the <em>&quot;Apply Mask for PIV&quot;</em> switch to activate masking during processing.
                When enabled, masked regions will be set to zero in the output vector fields. The toggle affects both
                polygon and pixel border modes—whichever is currently selected.
              </p>
            </div>
          </Section>

          {/* Polygon Mask Editor Section */}
          <Section title="Polygon Mask Editor" icon={<MousePointer2 size={32} />} id="polygon-editor">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              When <strong>Polygon</strong> mode is selected, an interactive canvas appears for drawing mask regions
              directly on your PIV images. The editor supports multiple polygons, edge snapping for precise boundary
              alignment, and a magnifier tool for accurate point placement.
            </p>

            {/* Drawing Polygons */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">How to Draw Polygons</h4>

              <GUIStep step={1} title="Load an image">
                Select your source path, camera, and image index from the controls at the top of the Masking panel,
                then click <strong>Load Image</strong>. The image will appear in the editor canvas with adjustable contrast.
              </GUIStep>

              <GUIStep step={2} title="Click to add points">
                Click on the image to place polygon vertices. Points appear in <span className="text-green-600 font-semibold">green</span> for
                the active polygon. Each click adds a new vertex, and lines are drawn between consecutive points.
              </GUIStep>

              <GUIStep step={3} title="Close the polygon">
                After placing at least 3 points, the starting point shows as a <span className="text-pink-600 font-semibold">larger red circle</span> with
                a transparent halo indicating the click radius. Click within this circle to close the polygon. Once closed,
                the polygon turns <span className="text-orange-500 font-semibold">orange/yellow</span> and a new empty polygon is automatically started.
              </GUIStep>

              <GUIStep step={4} title="Add more polygons">
                After closing, a new polygon starts automatically. You can also click <strong>New Polygon</strong> to
                start one manually at any time. All closed polygons are combined into a single mask.
              </GUIStep>
            </div>

            {/* Auto-save Feature */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <Save className="text-green-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Automatic Saving</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Masks are <strong>saved automatically</strong> whenever you:
              </p>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Complete a polygon by clicking the starting point</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Delete a polygon using the Delete button</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Clear all polygons using the Clear Mask button</span>
                </li>
              </ul>
              <p className="text-green-700 text-sm mt-4">
                No manual save action is required—your work is preserved automatically to <code className="bg-green-100 px-1 rounded">mask_CamN.mat</code>.
              </p>
            </div>

            {/* Edge Snapping */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-orange-400">
              <div className="flex items-center gap-3 mb-3">
                <Target className="text-orange-500" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Edge Snapping</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Click in the <strong>padding area</strong> outside the image boundaries to automatically snap points
                to the nearest edge or corner. This is essential for creating masks that extend precisely to the
                image boundary without leaving gaps.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">How it works:</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• The editor has padding around the image</li>
                    <li>• Clicking in the padding snaps to the nearest edge</li>
                    <li>• Corner snapping works at image corners</li>
                    <li>• Snapped points are clamped to 0 or max-1</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="text-orange-500" size={20} />
                    <h5 className="font-semibold text-gray-900">Visual Indicator</h5>
                  </div>
                  <p className="text-gray-600 text-sm">
                    When the magnifier is enabled, its border turns <span className="text-orange-600 font-bold">orange</span> when
                    you&apos;re in the snap zone outside the image. This confirms that your next click will snap to an edge.
                  </p>
                </div>
              </div>
            </div>

            {/* Magnifier & Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="text-soton-blue" size={24} />
                  <h4 className="text-lg font-semibold text-gray-900">Magnifier Tool</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Enable the magnifier for precise point placement. A 2.5× zoomed circular view follows your cursor,
                  showing crosshairs at the exact click position. The magnifier displays both the base image and
                  any drawn polygons.
                </p>
                <FeatureList items={[
                  "Toggle with the 🔍 button in the toolbar",
                  "2.5× zoom factor for fine detail work",
                  "Crosshairs indicate exact click position",
                  "Orange border when in edge-snap zone",
                  "Works in both image and padding areas"
                ]} />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sliders className="text-soton-blue" size={24} />
                  <h4 className="text-lg font-semibold text-gray-900">Contrast Controls</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Adjust image contrast to see mask regions and boundaries more clearly. The contrast controls
                  appear above the polygon editor when an image is loaded.
                </p>
                <FeatureList items={[
                  "Dual-handle slider for min/max values",
                  "Values shown as percentages (0-100%)",
                  "Auto Scale toggle for automatic 1st-99th percentile",
                  "Works with any bit depth (8-bit, 16-bit)",
                  "Adjusting disables auto-scale automatically"
                ]} />
              </div>
            </div>

            {/* Editor Controls */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Editor Toolbar</h4>
              <p className="text-gray-600 mb-4">
                The toolbar above the canvas provides controls for polygon management, navigation, and export options:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { btn: "New Polygon", desc: "Start a fresh polygon (auto-finishes current)" },
                  { btn: "Undo Point", desc: "Remove the last point added to active polygon" },
                  { btn: "Delete", desc: "Delete the currently selected polygon" },
                  { btn: "Prev / Next", desc: "Navigate between polygons in the list" },
                  { btn: "Polygon Dropdown", desc: "Select any polygon by name" },
                  { btn: "🔍 Magnifier", desc: "Toggle the 2.5× zoom magnifier tool" },
                  { btn: "Save PNG", desc: "Download mask as a PNG image file" },
                  { btn: "🗑️ Clear Mask", desc: "Remove all polygons and reset mask" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <code className="text-soton-blue font-mono text-sm">{item.btn}</code>
                    <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Indicators */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Status Indicators</h4>
              <p className="text-gray-600 mb-4">
                The editor shows helpful status messages above the canvas:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                  <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                  <span className="text-yellow-800 text-sm"><strong>Loading existing mask...</strong> — Checking for saved mask file</span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-green-700 text-sm"><strong>Loaded 3 polygon(s)</strong> — Existing mask loaded successfully</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <Info className="text-gray-500" size={16} />
                  <span className="text-gray-600 text-sm"><strong>No existing mask found</strong> — Start clicking to create polygons</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <Info className="text-blue-500" size={16} />
                  <span className="text-blue-700 text-sm"><strong>💡 Tips</strong> — Helpful hints about edge snapping and auto-closing</span>
                </div>
              </div>
            </div>

            <YamlDropdown
              title="YAML Reference - Polygon Mask"
              code={`masking:
  enabled: true
  mode: file                         # 'file' = use polygon mask from disk
  mask_file_pattern: mask_Cam%d.mat  # %d is replaced with camera number
  mask_threshold: 0.01               # Threshold for mask application

# Mask files are saved to:
# source_path/mask_Cam1.mat
# source_path/mask_Cam2.mat (for stereo setups)`}
            />
          </Section>

          {/* Pixel Border Mode Section */}
          <Section title="Pixel Border Mode" icon={<Square size={32} />} id="pixel-border">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Pixel border mode provides a quick way to mask fixed rectangular regions at the image edges without
              drawing polygons. Simply enter the number of pixels to exclude from each edge. This is ideal for
              removing noisy edges, cropping fixed boundary artifacts, or creating a uniform border mask.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h4>
                <p className="text-gray-600 mb-4">
                  Enter pixel values for each edge in the input fields. The preview updates <strong>live</strong> as
                  you type, showing masked regions as a semi-transparent red overlay with red border lines at the mask boundaries.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Top</p>
                    <p className="text-gray-600 text-sm">Pixels from top edge</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Bottom</p>
                    <p className="text-gray-600 text-sm">Pixels from bottom edge</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Left</p>
                    <p className="text-gray-600 text-sm">Pixels from left edge</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-gray-900">Right</p>
                    <p className="text-gray-600 text-sm">Pixels from right edge</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-blue-700">
                    <strong>Live Preview:</strong> Load an image first to see the mask overlay update in real-time as you adjust values.
                    The preview shows exactly which regions will be excluded from PIV processing.
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <p className="text-red-700">
                    <strong>Red Overlay:</strong> Semi-transparent red regions show areas that will be excluded from PIV processing.
                    Solid red lines mark the exact mask boundary for precise verification.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <p className="text-green-700">
                    <strong>Automatic Saving:</strong> Pixel border values are saved automatically to <code className="bg-green-100 px-1 rounded">config.yaml</code> when
                    you change them. No separate save action is needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Preview Information</h4>
              <p className="text-gray-600 mb-3">
                The pixel border preview displays helpful information:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>Current values:</strong> Shows Top, Bottom, Left, Right pixel values above the preview</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>Image size:</strong> Displays the native image dimensions (width × height in pixels)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>Contrast adjustment:</strong> Works with auto-scale for optimal visibility</span>
                </li>
              </ul>
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
    right: 0           # No right masking

# All values are in pixels
# Same settings apply to all cameras`}
            />
          </Section>

          {/* Mask Storage Section */}
          <Section title="Mask Storage & Loading" icon={<FolderOpen size={32} />} id="storage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Polygon masks are saved as MATLAB <code className="bg-gray-100 px-2 py-1 rounded">.mat</code> files containing
              both the binary mask array and the polygon vertex coordinates (for re-editing). Pixel border settings are
              stored directly in <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Hexagon className="text-green-600" size={24} />
                  <h4 className="text-lg font-semibold text-green-800">Polygon Masks</h4>
                </div>
                <p className="text-green-700 mb-3">
                  Saved to your source directory as <code className="bg-green-100 px-1 rounded">mask_Cam1.mat</code>, <code className="bg-green-100 px-1 rounded">mask_Cam2.mat</code>, etc.
                  The file contains both the binary mask and the polygon coordinates.
                </p>
                <FeatureList items={[
                  "Binary mask array at full image resolution",
                  "Polygon vertices stored for re-editing",
                  "Polygon names preserved for reference",
                  "One file per camera",
                  "Auto-saved when polygons change"
                ]} />
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Square className="text-blue-600" size={24} />
                  <h4 className="text-lg font-semibold text-blue-800">Pixel Borders</h4>
                </div>
                <p className="text-blue-700 mb-3">
                  Stored in <code className="bg-blue-100 px-1 rounded">config.yaml</code> under the <code className="bg-blue-100 px-1 rounded">masking.rectangular</code> section.
                  Applied at runtime during PIV processing—no separate file needed.
                </p>
                <FeatureList items={[
                  "Saved automatically when you change values",
                  "Same settings apply to all cameras",
                  "No separate mask file required",
                  "Computed on-the-fly during processing",
                  "Values in pixels from each edge"
                ]} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="text-gray-600" size={24} />
                <h4 className="text-lg font-semibold text-gray-800">Auto-Loading Masks</h4>
              </div>
              <p className="text-gray-600 mb-3">
                When you open the Masking tab or change cameras, PIVTools automatically attempts to load any existing
                polygon mask for the selected camera. The editor shows the loading status with clear indicators:
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">⏳ Loading...</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">✓ Loaded 3 polygon(s)</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">No existing mask found</span>
                <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm font-medium">✗ Error loading mask</span>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Loaded polygons can be edited, deleted, or added to—changes are auto-saved back to the mask file.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Per-Camera Masks</h4>
              </div>
              <p className="text-yellow-700">
                Each camera has its own polygon mask file. In stereo PIV setups, you&apos;ll need to create separate masks for
                Cam1 and Cam2 to account for different viewing angles. Switch cameras using the <strong>Camera</strong> dropdown
                in the image loader, then draw and save each mask independently. The correct mask is loaded automatically
                when you switch cameras.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Mask File Pattern"
              code={`masking:
  mask_file_pattern: mask_Cam%d.mat  # %d = camera number

# Files are saved/loaded from source_path:
# source_path/mask_Cam1.mat
# source_path/mask_Cam2.mat

# For .set files, the pattern includes the set name:
# source_path/mask_experiment_Cam1.mat (for experiment.set)`}
            />
          </Section>

          {/* Export Options Section */}
          <Section title="Export Options" icon={<Download size={32} />} id="saving">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              While masks auto-save for PIV processing, you can also export them in additional formats
              for documentation or use with external tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Save className="text-soton-blue" size={24} />
                  <div className="bg-soton-blue text-white px-3 py-1 rounded text-sm font-semibold">Auto-Save (MAT)</div>
                </div>
                <p className="text-gray-600 mb-4">
                  <strong>Primary save mechanism.</strong> Polygon masks are automatically saved to disk as
                  <code className="bg-gray-100 px-1 rounded">.mat</code> files whenever you complete, delete, or clear polygons.
                </p>
                <FeatureList items={[
                  "Saves to source_path/mask_CamN.mat",
                  "Contains binary mask at full resolution",
                  "Stores polygon coordinates for re-editing",
                  "Polygon names preserved",
                  "Automatically loaded during PIV runs"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="text-gray-600" size={24} />
                  <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-semibold">Save PNG</div>
                </div>
                <p className="text-gray-600 mb-4">
                  Downloads a PNG image of the mask for documentation, reports, or use with external tools.
                  Click the <strong>Save PNG</strong> button in the toolbar.
                </p>
                <FeatureList items={[
                  "Full native resolution (same as source image)",
                  "Binary format (white = masked regions)",
                  "Named with camera, index, and frame info",
                  "Useful for reports or external software",
                  "Downloaded directly to your browser"
                ]} />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <p className="text-blue-700">
                <strong>Note:</strong> Pixel border settings don&apos;t require any manual save—they&apos;re stored in
                <code className="bg-blue-100 px-1 rounded mx-1">config.yaml</code> automatically when you change the values.
                Just make sure the <strong>Apply Mask for PIV</strong> toggle is enabled before processing.
              </p>
            </div>
          </Section>

          {/* Complete Configuration Reference */}
          <Section title="Complete Configuration Reference" icon={<FileText size={32} />} id="yaml-config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For power users who prefer direct YAML configuration, here&apos;s the complete masking reference
              with all available options and their descriptions.
            </p>

            <YamlDropdown
              title="Full YAML Configuration"
              defaultOpen={true}
              code={`# config.yaml - Complete masking configuration
masking:
  enabled: true                      # Toggle masking on/off for PIV processing
  mode: file                         # 'file' (polygon) or 'rectangular' (pixel border)
  mask_file_pattern: mask_Cam%d.mat  # Filename pattern for polygon masks
  mask_threshold: 0.01               # Threshold for mask application (fraction of window)
  rectangular:                       # Only used when mode: rectangular
    top: 64                          # Pixels to mask from top edge
    bottom: 64                       # Pixels to mask from bottom edge
    left: 0                          # Pixels to mask from left edge
    right: 0                         # Pixels to mask from right edge

# Note: The GUI uses 'polygon' and 'pixel_border' internally,
# which map to 'file' and 'rectangular' in the YAML config.`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Mapping</h4>
              <p className="text-gray-600 mb-4">
                This table shows how GUI controls correspond to YAML configuration fields:
              </p>
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
                      { gui: "Mask file location", yaml: "masking.mask_file_pattern", values: "Pattern with %d for camera number" },
                      { gui: "Mask threshold", yaml: "masking.mask_threshold", values: "float (default 0.01)" }
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
              Filters can improve correlation quality by removing background, reducing noise, or normalising intensity.
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
