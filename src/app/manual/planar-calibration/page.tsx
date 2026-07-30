'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Target,
  Camera,
  FileText,
  Ruler,
  Grid3X3,
  QrCode,
  FileCode,
  Terminal,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Info,
  Crosshair,
  Database,
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

export default function PlanarCalibrationPage() {
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
              Planar <span className="text-soton-gold">Calibration</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Convert pixel displacements to physical velocity units (m/s).
              Three target types (scale factor, dotboard, ChArUco) and two camera models
              (pinhole, polynomial) depending on your optical setup and accuracy requirements.
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
              <CheckCircle className="text-soton-gold" size={22} />
              <h3 className="text-xl font-bold text-gray-900">Quick Recipe</h3>
              <span className="text-sm text-gray-500 italic sm:ml-auto">opinionated defaults -- full reference below</span>
            </div>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">1.</span><span>Point <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">calibration_sources</code> at the folder holding your calibration images. Per-camera subfolders are opt-in, not the default. Seed the settings sidecar with <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pivtools-cli init-settings</code> or fill in the calibration tab.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">2.</span><span>Pick a method by target type: <strong>Scale Factor</strong> if you have a known px/mm, <strong>Dotboard</strong> for circular dot grids, <strong>ChArUco</strong> for occlusion-tolerant targets, <strong>Polynomial</strong> as a camera model on top of a dotboard or ChArUco detection when a pinhole fit is not flexible enough.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">3.</span><span>Enter board parameters: <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pattern_cols</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pattern_rows</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">dot_spacing_mm</code> (dotboard) or <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">squares_h/v</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">square_size</code> (ChArUco). Set <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">rig.dt</code> to the time between laser pulses in seconds. It is required before a model can be generated and is never defaulted.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">4.</span><span>Click <strong>Detect One</strong> to verify detection on a single frame before running the full sequence. Detected dots/corners are overlaid in the viewer.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">5.</span><span>Click <strong>Generate Model</strong>. Aim for RMS reprojection error below <strong>0.5 px</strong>.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">6.</span><span>Click <strong>Calibrate Vectors</strong> then <strong>Set as Active</strong>. Multi-camera setups with shared features also need Global Coordinates -- see the bottom of this page.</span></li>
            </ol>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Target size={32} />} id="overview">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Calibration settings live beside your images, not in config.yaml.</strong> The{' '}
                <code className="bg-yellow-100 px-1 rounded">calibration:</code> block in{' '}
                <code className="bg-yellow-100 px-1 rounded">config.yaml</code> is a four-key pointer saying which
                source and which method are active. Image format, board geometry, and the rig{' '}
                <code className="bg-yellow-100 px-1 rounded">dt</code> live in a per-source sidecar at{' '}
                <code className="bg-yellow-100 px-1 rounded">&lt;source&gt;/calibration/settings.yaml</code>. Create one
                with <code className="bg-yellow-100 px-1 rounded">pivtools-cli init-settings --source &lt;dir&gt;</code>{' '}
                or by filling in the calibration tab. The image format is required when the settings are read and{' '}
                <code className="bg-yellow-100 px-1 rounded">rig.dt</code> when a model is generated, so a missing
                value stops the run instead of quietly defaulting.
              </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Calibration converts raw PIV results from pixel displacements to physical units.
              Choose a method based on your target type and required accuracy.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Target Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { method: "Scale Factor", type: "Uniform", best: "Telecentric lenses, quick analysis", target: "Known px/mm ratio, no board" },
                    { method: "Dotboard", type: "Spatially-varying", best: "Standard PIV with lens distortion", target: "Circular dot grid, 10-20 images" },
                    { method: "ChArUco", type: "Spatially-varying", best: "Partial occlusion, oblique angles", target: "ChArUco board, multiple images" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.method}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.best}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Uniform calibration</strong> (Scale Factor) applies the same conversion everywhere:
              {' '}<code className="bg-gray-100 px-2 py-1 rounded text-sm">velocity = (pixels / px_per_mm) / (dt * 1000)</code>.
              {' '}<strong>Spatially-varying methods</strong> (Dotboard, ChArUco) compute different
              conversion factors across the image to correct for lens distortion.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Camera Model Choice</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Dotboard and ChArUco tabs share a <strong>Camera Model</strong> dropdown with two
              choices. <strong>Pinhole</strong> (default) is the DaVis-matching PinholeOpenCV model
              (single focal length fx = fy, free principal point cx/cy, distortion k1, k2, p1, p2
              with k3 fixed at 0). <strong>Polynomial</strong> is a single-plane 3rd-order
              pixel-to-mm map -- see the Polynomial section below. Scale Factor is its own tab and
              involves no camera model fit.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Multi-camera is automatic.</strong> With two or more cameras configured, the
                Dotboard and ChArUco tabs run a joint multi-camera solve -- there is no toggle. A
                single camera is a mono solve in the same tab. See the{' '}
                <a href="/manual/global-coordinates" className="underline font-medium">Global
                Coordinates</a> page for the joint solve and the guided wizard.
              </p>
            </div>
          </Section>

          {/* Calibration Image Setup */}
          <Section title="Calibration Image Setup" icon={<Camera size={32} />} id="image-setup">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Dotboard and ChArUco methods require calibration target images. Configure the image
              source before running detection.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Directory Structure</h3>
            <p className="text-gray-700 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">calibration_sources</code> holds
              direct paths to the calibration image locations (the &quot;Calibration Images
              Location&quot; input on each tab). When{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">use_camera_subfolders</code> is
              enabled, per-camera folders are appended to the source path.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">use_camera_subfolders: false</h5>
                <div className="text-xs text-blue-600 font-mono bg-white rounded p-2">
                  calibration_source/<br />
                  ├── calib00001.tif<br />
                  ├── calib00002.tif<br />
                  └── ...
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">use_camera_subfolders: true</h5>
                <div className="text-xs text-green-600 font-mono bg-white rounded p-2">
                  calibration_source/<br />
                  ├── Cam1/<br />
                  │   └── calib00001.tif<br />
                  └── Cam2/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── calib00001.tif
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Image Settings</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Setting</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Key</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: "Calibration Sources", yaml: "calibration_sources", desc: "Direct paths to calibration image locations" },
                    { setting: "Image Format", yaml: "image_format", desc: "Filename pattern (e.g. calib%05d.tif)" },
                    { setting: "Number of Views", yaml: "n_views", desc: "Calibration images (board poses) to process" },
                    { setting: "Image Type", yaml: "image_type", desc: "standard, cine, lavision_set, lavision_im7 (auto-detected from the format if unset)" },
                    { setting: "Zero-Based Indexing", yaml: "zero_based_indexing", desc: "Start image numbering from 0" },
                    { setting: "Camera Subfolders", yaml: "use_camera_subfolders", desc: "Append per-camera folders to the source path" },
                    { setting: "Subfolder Names", yaml: "camera_subfolders", desc: "Custom folder names (default Cam1, Cam2, ...)" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.setting}</td>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.yaml}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-6">
              <h5 className="font-semibold text-blue-800 mb-2">Image Viewer Tools</h5>
              <p className="text-blue-700 text-sm mb-2">
                The Calibration Image Viewer includes interactive tools for verifying your setup:
              </p>
              <ul className="text-blue-700 text-sm space-y-1">
                <li><strong>Measure Tool:</strong> Click two points on the image to measure distance in pixels (dx, dy, and total length). Useful for verifying dot spacing and image scale.</li>
                <li><strong>Grid Overlay:</strong> Toggleable grid with configurable size (8x8 to 64x64) and adjustable line thickness. Helps verify alignment and spacing.</li>
                <li><strong>Magnifier:</strong> 2.5x circular zoom lens following the cursor for precise feature inspection.</li>
                <li><strong>Contrast Controls:</strong> Dual-slider for manual min/max adjustment, with auto-scale toggle.</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-purple-600" size={18} />
                <strong className="text-purple-800">IM7 Container Format</strong>
              </div>
              <p className="text-purple-700 text-sm">
                LaVision IM7 files can contain multiple cameras in a single file.
                Set <code className="bg-purple-100 px-1 rounded">use_camera_subfolders: false</code> for
                multi-camera IM7 containers. PIVTools extracts each camera frame automatically.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="text-green-600" size={18} />
                <strong className="text-green-800">Platform Note</strong>
              </div>
              <p className="text-green-700 text-sm">
                LaVision formats (.im7, .set) are read by a pure-Python, cross-platform reader.
                No lvpyio dependency -- they work on macOS, Linux, and Windows alike.
              </p>
            </div>

            <YamlDropdown
              title="Where the image settings live"
              code={`# config.yaml -- the pointer only
calibration:
  calibration_sources:
    - /data/experiment/calibration
  source_idx: 0

# <source>/calibration/settings.yaml -- everything else
image:
  image_format: calib%05d.tif   # REQUIRED, no default
  image_type: standard          # REQUIRED
  n_views: 19
  start_index: 1
  zero_based_indexing: false
  use_camera_subfolders: true
  camera_subfolders: ["Cam1", "Cam2"]`}
            />
          </Section>

          {/* Scale Factor */}
          <Section title="Scale Factor" icon={<Ruler size={32} />} id="scale-factor">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Uniform px-to-mm conversion. No board and no detection -- enter the known
              pixel-to-mm ratio and the time between laser pulses, then pick the world origin
              and axis directions on the image. World mm = (pixel - origin) / px_per_mm;
              velocity = displacement / px_per_mm / dt / 1000.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">px_per_mm</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Pixels per millimetre</td>
                    <td className="px-6 py-4 text-sm text-gray-600">3.41</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">dt</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Time between frames (seconds)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">0.56</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">Origin (px / mm)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">World-origin pixel + its world position in mm (picked/typed in the GUI, stored in the model, not config)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">click, (0, 0)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">+X / +Y direction</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Axis directions (and optional axis swap); a mirrored camera is handled here, not by a velocity flip</td>
                    <td className="px-6 py-4 text-sm text-gray-600">right, up</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Set the Calibration Images Location (one reference image is enough)",
                "Enter dt (seconds) and px_per_mm -- the two-point measure helper can fill px_per_mm from a known distance",
                "Click \"Pick Origin\" and click the world origin on the image (or type Origin X/Y in px); optionally type the origin's world position in mm",
                "Set the +X and +Y directions (defaults +X right, +Y up)",
                "Click \"Generate Model\" -- the model and a proof figure are saved into the calibration source folder",
                "Click \"Calibrate Vectors\" to apply (instantaneous or ensemble)",
                "Click \"Set as Active\" to make this the active method",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Multiple cameras?</strong> Each camera gets its own scale-factor model.
                To place them all in one shared frame, use the datum + overlap-pair chain on the{' '}
                <a href="/manual/global-coordinates" className="underline font-medium">Global
                Coordinates</a> page (&quot;Compute + Save Global Frame&quot;).
              </p>
            </div>

            <YamlDropdown
              title="Scale Factor settings"
              code={`# config.yaml
calibration:
  active: scale_factor

# <source>/calibration/settings.yaml
rig:
  dt: 0.56                # REQUIRED before generating a model
methods:
  scale_factor:
    px_per_mm: 3.41
# The picked origin (px + mm) and axis directions are stored in the
# model .mat record in the calibration source folder, not in either file.`}
            />
          </Section>

          {/* Dotboard */}
          <Section title="Planar Dotboard" icon={<Grid3X3 size={32} />} id="dotboard">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Uses OpenCV camera model to compute intrinsic parameters and distortion coefficients
              from images of a circular dot grid target. Provides spatially-varying calibration
              that corrects for lens distortion.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: "dot_spacing_mm", desc: "Physical spacing between dot centres (mm)", def: "15.0" },
                    { param: "k_neighbors", desc: "Neighbours per dot in the grid walk", def: "9" },
                    { param: "model_type", desc: "Camera model: pinhole or polynomial", def: "pinhole" },
                    { param: "fix_k2", desc: "Pin the r^4 radial term (only for few-view fits)", def: "false" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.param}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Detection Behaviour</h3>
            <p className="text-gray-700 mb-4">
              Detection needs zero user configuration. Blob detection tries both polarities
              (dark-on-light and light-on-dark) and keeps whichever finds more blobs, then an Otsu
              filter on the blob-size histogram rejects small noise blobs (specular reflections).
              Detected dots are assigned grid indices by a{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">BFS</code> neighbourhood walk --
              purely local neighbour relationships, so it is robust to perspective, tilt, and
              boards partially out of frame -- and a RANSAC homography models the perspective and
              rejects outliers. Missing interior dots are rescued by predicting their position with
              a local homography and confirming by template matching against a nearby healthy dot.
              Grid dimensions are discovered automatically -- only the dot spacing is entered.
              OpenCV <code className="bg-gray-100 px-1 rounded text-sm">calibrateCamera</code> /{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">calibrateCameraRO</code> then
              computes the camera model.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">World Frame from Clicks</h3>
            <p className="text-gray-700 mb-4">
              The coordinate system is defined by three clicks on the datum frame -- origin, +X,
              +Y. Each click snaps to the nearest detected dot, and the buttons auto-advance
              (origin, then +X, then +Y). The axes are built from the board&apos;s orthogonal grid
              axes, so the +X/+Y clicks only choose which grid axis and its sign -- never skew. A
              typed origin X/Y in mm places the origin dot at an absolute world position.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Configure calibration images (location, format, number of views)",
                "Enter the dot spacing (mm) and choose the camera model (pinhole or polynomial)",
                "On the datum frame, click Set Origin, then +X, then +Y -- clicks snap to the nearest detected dot and the detection overlay appears",
                "Optionally type the origin X/Y in mm",
                "Click \"Generate Model\" (disabled until the world frame is complete) to run detection on all frames and compute the camera model",
                "Review the RMS reprojection error (target: < 0.5 px) and the proof figures",
                "Click \"Calibrate Vectors\" to apply calibration to PIV data",
                "Click \"Set as Active\" to make this the active method",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Outputs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Camera Model</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li><strong>Camera Matrix:</strong> focal length f (fx == fy, fixed aspect ratio), cx, cy</li>
                  <li><strong>Distortion:</strong> 4 coefficients (k1, k2, p1, p2; k3 fixed at 0)</li>
                  <li><strong>Extrinsics:</strong> Rotation + translation per frame</li>
                  <li><strong>RMS Error:</strong> Reprojection quality metric</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Output Directory</h4>
                <p className="text-gray-600 text-xs mb-2">
                  Written into the <strong>calibration source folder</strong> (with the images), not
                  the PIV base path -- one project can hold many runs, each calibration living with
                  its images.
                </p>
                <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-2">
                  &lt;source&gt;/calibration/Cam1/dotboard_planar/<br />
                  ├── model/model_pinhole.mat   (or model_polynomial.mat)<br />
                  ├── model/inputs.mat   (detections + clicks sidecar)<br />
                  └── figures/
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Two or more cameras = joint solve.</strong> The tab automatically runs the
                joint multi-camera calibration -- one shared board, one shared world frame, no
                toggle. The datum and cross-camera ties are picked through the guided
                &quot;Set Global Coordinates&quot; wizard -- see the{' '}
                <a href="/manual/global-coordinates" className="underline font-medium">Global
                Coordinates</a> page. A single camera is a mono solve in the same tab.
              </p>
            </div>

            <YamlDropdown
              title="Dotboard settings"
              code={`# config.yaml
calibration:
  active: dotboard

# <source>/calibration/settings.yaml
rig:
  dt: 0.0057553          # REQUIRED; shared by every board on this source
methods:
  dotboard:
    dot_spacing_mm: 15.0 # REQUIRED; no default
    k_neighbors: 9
    model_type: pinhole  # pinhole | polynomial
# World-frame clicks are NOT stored in either file -- they live in the
# model's inputs.mat sidecar (see Persistence & Caching below).`}
            />
          </Section>

          {/* ChArUco */}
          <Section title="Planar ChArUco" icon={<QrCode size={32} />} id="charuco">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Combines a chessboard pattern with ArUco markers. Detection uses OpenCV&apos;s{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">cv2.CharucoDetector</code>;
              the markers identify which corners are visible, so detection works with partial
              occlusion and at oblique viewing angles. Grid indices come directly from the global
              corner ids -- the grid needs <strong>zero clicks</strong>.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: "squares_h", desc: "Horizontal square count", def: "10" },
                    { param: "squares_v", desc: "Vertical square count", def: "7" },
                    { param: "square_size", desc: "Square size in metres", def: "0.03" },
                    { param: "marker_ratio", desc: "Marker size relative to square", def: "0.5" },
                    { param: "aruco_dict", desc: "ArUco dictionary type", def: "DICT_4X4_1000" },
                    { param: "min_corners", desc: "Minimum corners to accept a frame", def: "6" },
                    { param: "model_type", desc: "Camera model: pinhole or polynomial", def: "pinhole" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.param}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">ArUco Dictionaries</h3>
            <p className="text-gray-700 mb-3">
              Available dictionaries: <code className="bg-gray-100 px-1 rounded text-sm">DICT_4X4</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">DICT_5X5</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">DICT_6X6</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">DICT_7X7</code> -- each with 50, 100, 250, or 1000 markers.
              Larger dictionaries support more unique markers; smaller bit sizes detect faster.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <p className="text-gray-700 mb-4">
              Same as Dotboard: configure images, set board parameters, generate model, review RMS,
              apply to vectors, and set as active. For a single camera the origin/+X/+Y clicks
              define the world frame exactly as on the dotboard tab (clicks snap to detected
              corners). Detection itself needs no clicks -- the corner ids fix the grid.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                <strong>Joint (multi-camera) ChArUco origin:</strong> the joint solve currently uses
                the default corner-id origin. Picking a chosen corner as the origin is not yet
                available on the joint ChArUco path -- if you need a clicked origin with multiple
                cameras, use a dotboard.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Output Directory</h3>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
              &lt;source&gt;/calibration/Cam1/charuco_planar/<br />
              ├── model/model_pinhole.mat   (or model_polynomial.mat)<br />
              └── model/inputs.mat
            </div>

            <YamlDropdown
              title="ChArUco settings"
              code={`# config.yaml
calibration:
  active: charuco

# <source>/calibration/settings.yaml
rig:
  dt: 0.0057553          # REQUIRED; shared by every board on this source
methods:
  charuco:
    squares_h: 10        # REQUIRED; no default
    squares_v: 7         # REQUIRED; no default
    square_size: 0.03    # REQUIRED; metres (ChArUco native unit)
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    model_type: pinhole  # pinhole | polynomial`}
            />
          </Section>

          {/* Polynomial */}
          <Section title="Polynomial" icon={<FileCode size={32} />} id="polynomial">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The alternative camera model on the Dotboard and ChArUco tabs (planar only -- the
              stereo tabs are pinhole-only). It is a direct single-plane 3rd-order map from image
              pixels to world mm, fitted from the datum view&apos;s detected features in the clicked
              world frame -- 10 coefficients per axis, per camera. The polynomial absorbs strong
              lens distortion and oblique perspective that a pinhole model cannot. It is fitted
              output, not an imported file: there is no XML and no DaVis import.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The Polynomial Model</h3>
            <p className="text-gray-700 mb-4">
              Pixel coordinates are normalised about the image centre and scaled by the image
              half-dimensions (so s, t span roughly [-1, 1]), then mapped to world mm by a 10-term
              cubic basis per axis:
              {' '}<code className="text-xs bg-gray-100 px-1 rounded">1, s, s2, s3, t, t2, t3, st, s2t, st2</code>.
              The clicked origin/+X/+Y and origin-mm are baked into the coefficients exactly as for
              pinhole. Everything is produced by the fit -- the user enters none of it. Fit quality
              is reported as the per-axis RMS residual in mm
              (<code className="bg-gray-100 px-1 rounded text-sm">rms_x_mm</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">rms_y_mm</code>).
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                <strong>Two deliberate differences from pinhole:</strong> the fit uses only the
                datum view (it is a single-plane map), and it <strong>extrapolates silently</strong>{' '}
                outside the fitted region -- values stay finite but are unconstrained beyond the
                board. Keep the board covering the measurement region.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "On the Dotboard or ChArUco tab, select \"Polynomial\" in the Camera Model dropdown",
                "Complete the world-frame clicks (origin, +X, +Y) on the datum frame as usual",
                "Click \"Generate Model\" -- detection runs, then the two 10-coefficient least-squares fits",
                "Review the per-axis RMS in mm on the results card (it shows coefficients + RMS instead of intrinsics)",
                "Click \"Calibrate Vectors\" to apply, then \"Set as Active\"",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">CLI, Single Camera (ChArUco)</h4>
                <p className="text-purple-700 text-sm">
                  Run <code className="bg-purple-100 px-1 rounded">detect-charuco --model-type polynomial</code>.
                  Detects ChArUco corners and fits the 10-coefficient polynomial per axis. Dotboard
                  polynomial fits are GUI-only (they need the world-frame clicks).
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">CLI, Multi-Camera (joint)</h4>
                <p className="text-purple-700 text-sm">
                  Run <code className="bg-purple-100 px-1 rounded">detect-joint --model-type polynomial</code>.
                  Fits every camera&apos;s datum view in the shared global frame, producing
                  per-camera polynomial records that are mutually consistent.
                </p>
              </div>
            </div>

            <YamlDropdown
              title="config.yaml - Polynomial (a model type, not a separate block)"
              code={`# config.yaml
calibration:
  active: dotboard          # or charuco

# <source>/calibration/settings.yaml
methods:
  dotboard:
    dot_spacing_mm: 15.0
    model_type: polynomial  # <- selects the polynomial camera model
# The fitted coefficients, normalisation, and per-axis RMS live in
# model_polynomial.mat in the calibration source folder, not in either file.`}
            />
          </Section>

          {/* Persistence & Caching */}
          <Section title="Persistence & Caching" icon={<Database size={32} />} id="persistence">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Everything needed to reproduce a model is saved beside it in the calibration source
              folder. You never re-detect or re-click to regenerate.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The inputs.mat Sidecar</h3>
            <p className="text-gray-700 mb-6">
              The fitted model record (.mat) is written to{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">&lt;source&gt;/calibration/Cam&#123;N&#125;/&lt;board&gt;_planar/model/</code>.
              Beside it, an <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code>{' '}
              sidecar stores the detected points, the clicked world frame, and the board geometry.
              Generate re-solves from the sidecar with no re-detecting and no re-clicking -- even
              after deleting the model file, one Generate press rebuilds it. The model is also
              self-describing: the board geometry that produced it is stamped inside, and the GUI
              seeds its parameter panel from the loaded model.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Where each thing lives</h3>
            <p className="text-gray-700 mb-6">
              There are three homes, and it is worth knowing which is which.{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">config.yaml</code> holds only a four-key pointer
              saying which source and which method are active. The per-source{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">settings.yaml</code> sidecar holds everything you
              type before detecting: image settings, the rig <code className="bg-gray-100 px-1 rounded text-sm">dt</code>,
              board geometry, model-type selections, and the global-coordinates block. The model&apos;s{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code> sidecar holds everything you click.
            </p>
            <p className="text-gray-700 mb-6">
              Writing board geometry under <code className="bg-gray-100 px-1 rounded text-sm">calibration:</code> in
              config.yaml has no effect. Those keys are stripped the next time the config is saved, and the values you
              expected to be used silently disappear.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Detection Caching</h3>
            <p className="text-gray-700 mb-6">
              Detections are cached in memory for the session and persisted on disk in the{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code> sidecar, so
              previews and re-opens are instant. The <strong>Re-detect</strong> button forces a
              fresh detection after the images on disk change.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Tolerant Detection</h3>
            <p className="text-gray-700 mb-6">
              A view that fails detection is dropped and reported per-view -- it never aborts the
              solve. A camera only fails if <em>no</em> image detects (almost always a wrong path,
              format, or board parameter).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Load</h3>
            <p className="text-gray-700 mb-6">
              Visiting a tab restores its saved model automatically -- the origin/+X/+Y markers,
              detection overlay, and results card all repaint. There is no &quot;Load Saved&quot;
              button.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Setting the Datum Afterwards</h3>
            <p className="text-gray-700 mb-4">
              After applying any calibration, the vector viewer&apos;s <strong>Set Datum</strong>{' '}
              control shifts a dataset&apos;s coordinate grid in place -- x/y offsets applied to
              the coordinates of all runs in the selected data type. Velocities are untouched.
            </p>
          </Section>

          {/* CLI */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Planar calibration uses two CLI steps: <strong>detect</strong> targets to generate a
              camera model, then <strong>apply</strong> the calibration to PIV vectors.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Generate Camera Model</h3>
            <CodeBlock
              title="Detection Commands"
              code={`# ChArUco detection (mono detection on the CLI is ChArUco-only)
pivtools-cli detect-charuco

# Process a specific camera
pivtools-cli detect-charuco --camera 1

# Choose the camera model and distortion model
pivtools-cli detect-charuco --model-type polynomial
pivtools-cli detect-charuco --model-type pinhole --distortion rational

# Joint multi-camera solve (ChArUco headless; dotboard clicks come from the GUI wizard)
pivtools-cli detect-joint --cameras 1,2,3

# Dotboard detection is GUI-only -- it needs the world-frame clicks.`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Apply Calibration</h3>
            <CodeBlock
              title="Apply Calibration"
              code={`# Use the active method from config.yaml
pivtools-cli apply-calibration --all-paths

# Choose the board / method
pivtools-cli apply-calibration --board dotboard --all-paths
pivtools-cli apply-calibration --board charuco --all-paths
pivtools-cli apply-calibration --board scale_factor --all-paths

# Specific camera + data type
pivtools-cli apply-calibration --camera 1 --type-name ensemble --all-paths

# All source paths
pivtools-cli apply-calibration --all-paths`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-4">apply-calibration Options</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Flag</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { flag: "--board", desc: "Board / method: charuco, dotboard, stepped, scale_factor", def: "From config" },
                    { flag: "--camera", desc: "Camera number", def: "All cameras" },
                    { flag: "--source", desc: "Calibration source dir (where the models live)", def: "From config" },
                    { flag: "--type-name", desc: "Data type (instantaneous / ensemble)", def: "instantaneous" },
                    { flag: "--model-type", desc: "Which record to load when several exist: pinhole, polynomial, polynomial3d, scale_factor", def: "From model" },
                    { flag: "--dt", desc: "Time between frames (seconds)", def: "From config" },
                    { flag: "--all-paths", desc: "Apply to all source paths", def: "Off" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.flag}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Workflow</h3>
            <CodeBlock
              title="Full Planar Calibration Workflow"
              code={`# 1. Detect calibration targets (ChArUco; dotboard is GUI-only)
pivtools-cli detect-charuco

# 2. Run PIV processing
pivtools-cli instantaneous

# 3. Apply calibration to vectors
pivtools-cli apply-calibration --board dotboard --all-paths`}
            />
          </Section>

          {/* YAML */}
          <Section title="Complete YAML Reference" icon={<FileText size={32} />} id="yaml">
            <YamlDropdown
              title="Full Planar Calibration Configuration"
              defaultOpen={true}
              code={`# ============================================================
# config.yaml -- a four-key pointer, nothing more.
# Anything else written under calibration: is stripped on save.
# ============================================================
calibration:
  calibration_sources:
    - /data/experiment/calibration
  source: ''                  # '' means use calibration_sources[source_idx]
  source_idx: 0
  active: dotboard            # charuco | dotboard | stepped | scale_factor
                              # | stereo_charuco | stereo_dotboard | stepped_stereo

# ============================================================
# <source>/calibration/settings.yaml -- everything else.
# Seed it with: pivtools-cli init-settings --source <dir>
# ============================================================
image:
  image_format: calib%05d.tif # REQUIRED at read; no default
  image_type: standard        # REQUIRED. standard | cine | lavision_set | lavision_im7
  n_views: 19                 # optional; frame-count auto-detect is the fallback
  start_index: 1
  zero_based_indexing: false
  use_camera_subfolders: true
  camera_subfolders: ["Cam1", "Cam2"]

rig:
  camera: 1
  dt: 0.0057553               # REQUIRED before generate; never defaulted
  datum_frame: 1              # 1-based
  interpolator: lanczos
  piv_type: instantaneous     # data type for Calibrate Vectors

fit:
  distortion_model: standard
  fix_aspect_ratio: true      # forces fx == fy

# One block per physical board, shared by that board's mono and stereo
# flows. The mono/stereo distinction lives in calibration.active.
methods:
  dotboard:
    dot_spacing_mm: null      # REQUIRED at generate; no default
    k_neighbors: 9
    model_type: pinhole       # pinhole | polynomial
  charuco:
    squares_h: null           # REQUIRED at generate
    squares_v: null           # REQUIRED at generate
    square_size: null         # REQUIRED at generate; metres
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    model_type: pinhole
  scale_factor:
    px_per_mm: null           # REQUIRED at generate

# Multi-camera global frame (scale-factor path -- see Global Coordinates)
global_coordinates:
  enabled: false
  datum_camera: 1
  datum_pixel: null
  datum_physical: [0.0, 0.0]
  datum_frame: 1
  overlap_pairs: []

# World-frame clicks and detections are in neither file -- they persist in
# the model's inputs.mat sidecar in the calibration source folder.`}
            />
          </Section>

          {/* Measure Tool */}
          <Section title="Measure Tool" icon={<Crosshair size={32} />} id="measure-tool">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The calibration image viewer includes a pixel measurement tool for determining distances
              in your images. This is useful for verifying dot spacing or estimating{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">px_per_mm</code> for the Scale
              Factor method.
            </p>

            <FeatureList items={[
              "Toggle measure mode with the ruler button in the viewer toolbar",
              "Click two points on the image to define start and end",
              "A line is drawn between the points showing the pixel distance",
              "Displays dx, dy, and total Euclidean length in pixels",
              "Click again to start a new measurement",
            ]} />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Calculating px_per_mm</h4>
              </div>
              <p className="text-blue-700 text-sm">
                If you know a physical distance in your image (e.g., a ruler or known feature),
                measure it in pixels with this tool, then divide by the known length in mm
                to get your <code className="bg-blue-100 px-1 rounded">px_per_mm</code> value for
                Scale Factor calibration.
              </p>
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Next: Stereo Calibration</h3>
            <p className="text-gray-300 mb-6 text-lg">
              For three-component velocity measurements using stereo camera pairs.
            </p>
            <a
              href="/manual/stereo-calibration"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Stereo Calibration
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
