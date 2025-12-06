'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  Download
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

          {/* Overview Section */}
          <Section title="Overview" icon={<Layers size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools supports two masking modes to exclude unwanted regions from cross-correlation analysis:
            </p>

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
                    <strong>Best for:</strong> Complex shapes, angled surfaces, and irregular boundaries
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
                  Ideal for cropping image edges.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
                    <strong>Best for:</strong> Removing edge artifacts, fixed boundary regions
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
          </Section>

          {/* Polygon Mask Editor Section */}
          <Section title="Polygon Mask Editor" icon={<MousePointer2 size={32} />} id="polygon-editor">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The polygon editor provides an interactive canvas for creating precise mask regions directly on your PIV images.
            </p>

            {/* Drawing Polygons */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Drawing Polygons</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <p className="text-gray-700 font-medium">Load an image</p>
                    <p className="text-gray-600 text-sm">Select your source path, camera, and image index, then click <strong>Load Image</strong>.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <p className="text-gray-700 font-medium">Click to add points</p>
                    <p className="text-gray-600 text-sm">Click on the image to place polygon vertices. Points appear in <span className="text-green-600 font-semibold">green</span> for the active polygon.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <p className="text-gray-700 font-medium">Close the polygon</p>
                    <p className="text-gray-600 text-sm">
                      After placing at least 3 points, the starting point shows as a <span className="text-pink-600 font-semibold">larger red circle</span>.
                      Click within this circle to close the polygon. It will turn <span className="text-yellow-600 font-semibold">orange</span> when closed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-soton-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <p className="text-gray-700 font-medium">Continue adding polygons</p>
                    <p className="text-gray-600 text-sm">After closing, a new polygon starts automatically. Or click <strong>New polygon</strong> to start a new one manually.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edge Snapping */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-orange-400">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Edge Snapping</h4>
              <p className="text-gray-700 mb-4">
                Click in the <strong>padding area</strong> outside the image to snap points to the nearest edge or corner.
                This is useful for creating masks that extend to the image boundary.
              </p>
              <div className="flex items-center gap-3">
                <Eye className="text-orange-500" size={20} />
                <p className="text-orange-700 text-sm">
                  The magnifier turns <span className="text-orange-600 font-bold">orange</span> when you&apos;re in the snap zone.
                </p>
              </div>
            </div>

            {/* Magnifier Tool */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Magnifier Tool</h4>
              <p className="text-gray-600 mb-4">
                Enable the magnifier for precise point placement. The circular magnifier follows your cursor and shows a zoomed view with crosshairs.
              </p>
              <FeatureList items={[
                "Toggle with the magnifier button (shows as zoomed icon when active)",
                "2.5× zoom factor for fine control",
                "Crosshairs indicate exact click position",
                "Orange border when in edge-snap zone"
              ]} />
            </div>

            {/* Editor Controls */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Editor Controls</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { btn: "New polygon", desc: "Start a fresh polygon (auto-closes current)" },
                  { btn: "Undo point", desc: "Remove the last point added" },
                  { btn: "Delete", desc: "Delete the currently selected polygon" },
                  { btn: "Prev / Next", desc: "Navigate between polygons" },
                  { btn: "Save PNG", desc: "Download mask as a PNG image" },
                  { btn: "Save Mask", desc: "Save mask to disk for PIV processing" },
                  { btn: "Clear Mask", desc: "Remove all polygons and start fresh" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <code className="text-soton-blue font-mono text-sm">{item.btn}</code>
                    <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Pixel Border Mode Section */}
          <Section title="Pixel Border Mode" icon={<Square size={32} />} id="pixel-border">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Pixel border mode provides a quick way to mask fixed regions at the image edges without drawing polygons.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h4>
                <p className="text-gray-600 mb-4">
                  Enter pixel values for each edge. The mask preview shows masked regions as a <span className="text-red-500 font-semibold">semi-transparent red overlay</span>.
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

              <div>
                <CodeBlock code={`# config.yaml - Pixel border masking
masking:
  enabled: true
  mode: rectangular
  rectangular:
    top: 64      # Mask 64 pixels from top
    bottom: 64   # Mask 64 pixels from bottom
    left: 0      # No left masking
    right: 0     # No right masking`} title="config.yaml" />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <p className="text-blue-700">
                <strong>Live Preview:</strong> The image viewer updates in real-time as you adjust the pixel values.
                Red overlay regions indicate areas that will be excluded from PIV processing.
              </p>
            </div>
          </Section>

          {/* Mask Storage Section */}
          <Section title="Mask Storage" icon={<FolderOpen size={32} />} id="storage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Polygon masks are saved as MATLAB <code className="bg-gray-100 px-2 py-1 rounded">.mat</code> files in your source directory,
              using a naming pattern based on the camera number.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">File Location</h4>
              <CodeBlock code={`# Default mask file pattern
masking:
  mask_file_pattern: mask_Cam%d.mat

# Example: For Cam1, the mask is saved at:
source_path/mask_Cam1.mat

# For Cam2:
source_path/mask_Cam2.mat`} title="config.yaml" />
              <p className="text-gray-600 mt-4">
                The <code className="bg-gray-100 px-1 rounded">%d</code> is replaced with the camera number.
                You can customize this pattern if needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Save className="text-green-600" size={24} />
                  <h4 className="text-lg font-semibold text-green-800">What Gets Saved</h4>
                </div>
                <FeatureList items={[
                  "Binary mask array (same size as your images)",
                  "Polygon vertex coordinates (for re-editing)",
                  "Polygon names for organization"
                ]} />
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <RefreshCw className="text-blue-600" size={24} />
                  <h4 className="text-lg font-semibold text-blue-800">Auto-Loading</h4>
                </div>
                <p className="text-blue-700 mb-3">
                  When you open the Masking tab, PIVTools automatically loads any existing mask for the selected camera.
                </p>
                <p className="text-blue-600 text-sm">
                  Status indicators show: <strong>Loading...</strong>, <strong>Loaded X polygon(s)</strong>, or <strong>No existing mask found</strong>.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Per-Camera Masks</h4>
              </div>
              <p className="text-yellow-700">
                Each camera has its own mask file. In stereo PIV setups, you&apos;ll typically need to create separate masks for
                Cam1 and Cam2 to account for different viewing angles.
              </p>
            </div>
          </Section>

          {/* Saving Options Section */}
          <Section title="Saving Options" icon={<Download size={32} />} id="saving">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-soton-blue text-white px-3 py-1 rounded text-sm font-semibold">Save Mask</div>
                </div>
                <p className="text-gray-600 mb-4">
                  Saves the mask to disk in <code className="bg-gray-100 px-1 rounded">.mat</code> format for use during PIV processing.
                  This is the <strong>primary save action</strong> you should use.
                </p>
                <FeatureList items={[
                  "Saves to source_path/mask_CamN.mat",
                  "Stores polygon coordinates for re-editing",
                  "Used automatically during PIV processing"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-semibold">Save PNG</div>
                </div>
                <p className="text-gray-600 mb-4">
                  Downloads a PNG image of the mask for documentation or external use.
                  White regions are masked; black regions are unmasked.
                </p>
                <FeatureList items={[
                  "Full native resolution (same as your images)",
                  "Binary mask (white = masked)",
                  "Useful for documentation or external tools"
                ]} />
              </div>
            </div>
          </Section>

          {/* YAML Configuration Section */}
          <Section title="YAML Configuration" icon={<Layers size={32} />} id="yaml-config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The masking configuration in <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> controls how masks are applied during processing.
            </p>

            <CodeBlock code={`# config.yaml - Full masking configuration
masking:
  enabled: true                    # Toggle masking on/off
  mode: file                       # 'file' for polygon masks, 'rectangular' for pixel borders
  mask_file_pattern: mask_Cam%d.mat  # Filename pattern (%d = camera number)
  mask_threshold: 0.01             # Threshold for mask application
  rectangular:                     # Only used when mode: rectangular
    top: 64
    bottom: 64
    left: 0
    right: 0`} title="config.yaml" />

            <div className="mt-6">
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
                      { gui: "Top (pixels)", yaml: "masking.rectangular.top", values: "integer (pixels)" },
                      { gui: "Bottom (pixels)", yaml: "masking.rectangular.bottom", values: "integer (pixels)" },
                      { gui: "Left (pixels)", yaml: "masking.rectangular.left", values: "integer (pixels)" },
                      { gui: "Right (pixels)", yaml: "masking.rectangular.right", values: "integer (pixels)" }
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
            <h3 className="text-3xl font-bold mb-4">Ready to Process?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              With your masks configured, you&apos;re ready to run PIV processing.
            </p>
            <a
              href="/manual/image-configuration"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Back to Image Configuration
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
