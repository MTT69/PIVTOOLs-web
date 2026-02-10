'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Layers,
  MousePointer2,
  Square,
  FolderOpen,
  Save,
  FileText,
  ChevronDown,
  ChevronRight,
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
              Define regions to exclude from PIV processing. Masked regions produce zero-valued vectors in output fields.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Masking Modes" icon={<Layers size={32} />} id="overview">
            <p className="text-gray-700 text-lg mb-6">
              Two modes are available, selected from the <strong>Masking Mode</strong> dropdown. Toggle <strong>Apply Mask for PIV</strong> to activate masking during processing.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Mode</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Value</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Storage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Polygon</td>
                    <td className="px-6 py-4 text-sm font-mono text-purple-600">file</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Draw arbitrary polygons on the image. Multiple polygons combined into one mask.</td>
                    <td className="px-6 py-4 text-sm text-gray-600"><code className="bg-gray-100 px-1 rounded">mask_CamN.mat</code> per camera</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Pixel Border</td>
                    <td className="px-6 py-4 text-sm font-mono text-purple-600">rectangular</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Mask fixed pixel borders from each image edge.</td>
                    <td className="px-6 py-4 text-sm text-gray-600"><code className="bg-gray-100 px-1 rounded">config.yaml</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Polygon Editor */}
          <Section title="Polygon Mask Editor" icon={<MousePointer2 size={32} />} id="polygon-editor">
            <p className="text-gray-700 text-lg mb-6">
              Interactive canvas for drawing mask regions on PIV images. Supports multiple polygons, edge snapping, and a magnifier for precise placement.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Drawing Workflow</h4>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Select source path, camera, and image index, then click <strong>Load Image</strong>.</li>
                <li>Click on the image to place polygon vertices (shown in green).</li>
                <li>After 3+ points, click the red starting point to close the polygon. It turns orange and a new polygon starts automatically.</li>
                <li>Repeat to add more polygons. All closed polygons combine into a single mask.</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Edge Snapping</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Click in the <strong>padding area</strong> outside the image to snap points to the nearest edge or corner. The magnifier border turns orange in the snap zone.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Magnifier</h4>
                <p className="text-gray-600 text-sm mb-2">
                  2.5x zoomed view following the cursor with crosshairs at the exact click position. Toggle via the magnifier button in the toolbar.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Toolbar Controls</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Button</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { btn: "New Polygon", desc: "Start a fresh polygon (auto-finishes current)" },
                      { btn: "Undo Point", desc: "Remove the last point from active polygon" },
                      { btn: "Delete", desc: "Delete the currently selected polygon" },
                      { btn: "Prev / Next", desc: "Navigate between polygons" },
                      { btn: "Magnifier", desc: "Toggle 2.5x zoom tool" },
                      { btn: "Save PNG", desc: "Download mask as PNG image" },
                      { btn: "Clear Mask", desc: "Remove all polygons and reset" },
                    ].map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 text-sm font-mono text-soton-blue">{item.btn}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <p className="text-green-700 text-sm">
                <strong>Auto-save:</strong> Masks save automatically to <code className="bg-green-100 px-1 rounded">mask_CamN.mat</code> when you complete, delete, or clear a polygon. No manual save needed.
              </p>
            </div>
          </Section>

          {/* Pixel Border */}
          <Section title="Pixel Border Mode" icon={<Square size={32} />} id="pixel-border">
            <p className="text-gray-700 text-lg mb-6">
              Mask fixed rectangular regions from each image edge. Enter pixel values for top, bottom, left, and right.
              The preview updates live with a red overlay showing excluded regions.
            </p>

            <p className="text-gray-600 mb-4">
              Values are saved automatically to <code className="bg-gray-100 px-1 rounded">config.yaml</code>. Same settings apply to all cameras.
            </p>

            <YamlDropdown
              title="Pixel Border YAML"
              defaultOpen={true}
              code={`masking:
  enabled: true
  mode: rectangular
  rectangular:
    top: 64
    bottom: 64
    left: 0
    right: 0`}
            />
          </Section>

          {/* Storage */}
          <Section title="Mask Storage" icon={<FolderOpen size={32} />} id="storage">
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Format</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Standard images</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">source_path/mask_Cam1.mat</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Binary mask + polygon vertices + names</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">LaVision .set files</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{'{name}'}_data/mask_{'{name}'}_Cam1.mat</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Same contents, in sibling directory</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                <strong>Per-camera masks:</strong> Each camera has its own mask file. In stereo setups, create separate masks for Cam1 and Cam2. Switch cameras with the Camera dropdown; the correct mask loads automatically.
              </p>
            </div>
          </Section>

          {/* Export */}
          <Section title="Export" icon={<Save size={32} />} id="saving">
            <p className="text-gray-700 text-lg mb-4">
              Polygon masks auto-save as <code className="bg-gray-100 px-1 rounded">.mat</code> files for PIV processing. The <strong>Save PNG</strong> toolbar button exports a full-resolution binary image for documentation.
            </p>
          </Section>

          {/* YAML Config */}
          <Section title="YAML Reference" icon={<FileText size={32} />} id="yaml-config">
            <YamlDropdown
              title="Complete masking configuration"
              defaultOpen={true}
              code={`masking:
  enabled: true                      # Toggle masking for PIV
  mode: file                         # 'file' (polygon) or 'rectangular' (pixel border)
  mask_file_pattern: mask_Cam%d.mat  # %d = camera number
  mask_threshold: 0.01               # Fraction of window that must be masked
  rectangular:
    top: 0
    bottom: 0
    left: 0
    right: 0`}
            />

            <div className="mt-6 overflow-x-auto">
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
                    { gui: "Apply Mask for PIV", yaml: "masking.enabled", values: "true / false" },
                    { gui: "Masking Mode", yaml: "masking.mode", values: "'file' or 'rectangular'" },
                    { gui: "Top / Bottom / Left / Right", yaml: "masking.rectangular.*", values: "integer >= 0 (pixels)" },
                    { gui: "Mask file pattern", yaml: "masking.mask_file_pattern", values: "String with %d for camera" },
                    { gui: "Mask threshold", yaml: "masking.mask_threshold", values: "float (default 0.01)" },
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
              Apply temporal and spatial filters to enhance images before PIV processing.
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
