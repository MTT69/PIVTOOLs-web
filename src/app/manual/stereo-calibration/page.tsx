'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Eye,
  Camera,
  FileText,
  Grid3X3,
  QrCode,
  Terminal,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Box,
  Crosshair,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';
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

export default function StereoCalibrationPage() {
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
              Stereo <span className="text-soton-gold">Calibration</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calibrate stereo camera pairs for three-component (3C) velocity measurements.
              Two detection methods available: Dotboard and ChArUco.
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
              <span className="text-sm text-gray-500 italic sm:ml-auto">opinionated defaults &mdash; full reference below</span>
            </div>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">1.</span><span>Note your configuration: <strong>same-side</strong> (both cameras on one side of the light sheet) or <strong>transmission</strong> (on opposite sides). If your setup is high-magnification or fragile at single-plane calibration, consider the <Link href="/manual/stepped-calibration" className="text-soton-blue font-semibold hover:underline">stepped board</Link> instead.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">2.</span><span>Pick detection: <strong>Stereo Dotboard</strong> (circular dot grids) or <strong>Stereo ChArUco</strong> (occlusion-tolerant). Configure images for both cameras in the calibration tab.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">3.</span><span>Click <strong>Generate Model</strong>. Targets: stereo RMS &lt; 0.5 px, relative angle 30&ndash;60&deg;. Verify the baseline matches your physical setup.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">4.</span><span>Run PIV on <em>both cameras</em> first (<code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pivtools-cli instantaneous</code> or <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">ensemble</code>).</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">5.</span><span>Click <strong>Reconstruct 3D</strong> (GUI) or run <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pivtools-cli apply-stereo</code> to produce <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">ux</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">uy</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">uz</code>.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">6.</span><span>Recommended: run <strong>Self-Calibration</strong> afterwards to correct for laser-sheet Z-offset and tilt. Adds a few minutes, meaningfully improves accuracy.</span></li>
            </ol>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Eye size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo calibration computes the geometric relationship between two cameras viewing the
              same measurement plane. The stereo model contains intrinsic parameters for each camera
              and extrinsic parameters (rotation and translation) describing their relative geometry.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Target Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Stereo Dotboard</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Standard stereo PIV setups</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Circular dot grid, 10-20 positions</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Stereo ChArUco</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Partial target visibility, oblique angles</td>
                    <td className="px-6 py-4 text-sm text-gray-600">ChArUco board, multiple positions</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Stepped Board</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Transmission setups, high-magnification PIV</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Stepped dot board (two Z-levels), multi-pose sequence</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Stepped Board:</strong> For setups where cameras view opposite sides of the
                target (transmission) or at high magnification where single-plane calibration is
                fragile, see the dedicated{' '}
                <a href="/manual/stepped-calibration" className="text-blue-800 font-semibold hover:underline">
                  Stepped Calibration
                </a>{' '}
                page. Stepped boards use two Z-levels for robust 3D camera models.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Metrics</h3>
            <p className="text-gray-700 mb-4">
              After calibration, review these metrics to assess quality.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Metric</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { metric: "Stereo RMS Error", desc: "Overall stereo reprojection error (pixels)", target: "< 0.5 px" },
                    { metric: "Cam1 / Cam2 RMS Error", desc: "Per-camera reprojection error (pixels)", target: "< 0.5 px each" },
                    { metric: "Relative Angle", desc: "Angle between camera optical axes (degrees)", target: "30-60 degrees typical" },
                    { metric: "Baseline Distance", desc: "Physical camera separation (mm)", target: "Verify against setup" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.metric}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Stereo Model Outputs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Intrinsic Parameters (per camera)</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li><strong>Camera Matrix:</strong> fx, fy (focal length), cx, cy (principal point)</li>
                  <li><strong>Distortion:</strong> 5 radial/tangential coefficients</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Extrinsic Parameters</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li><strong>Rotation Matrix (R):</strong> 3x3 rotation from Cam1 to Cam2</li>
                  <li><strong>Translation Vector (T):</strong> Baseline offset</li>
                  <li><strong>Rectification:</strong> R1, R2, P1, P2, Q matrices</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Calibration Image Setup */}
          <Section title="Calibration Image Setup" icon={<Camera size={32} />} id="image-setup">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo calibration requires synchronised images from both cameras at each target position.
              Image settings are shared with planar calibration.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Directory Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">camera_first (default)</h5>
                <div className="text-xs text-blue-600 font-mono bg-white rounded p-2">
                  source_path/<br />
                  ├── Cam1/<br />
                  │   └── calibration/<br />
                  │       └── calib_001.tif<br />
                  └── Cam2/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── calibration/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── calib_001.tif
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">calibration_first</h5>
                <div className="text-xs text-green-600 font-mono bg-white rounded p-2">
                  source_path/<br />
                  └── calibration/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;├── Cam1/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;│   └── calib_001.tif<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── Cam2/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── calib_001.tif
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-purple-600" size={18} />
                <strong className="text-purple-800">IM7 Container Format</strong>
              </div>
              <p className="text-purple-700 text-sm">
                LaVision IM7 files can contain both stereo cameras in a single file.
                Set <code className="bg-purple-100 px-1 rounded">use_camera_subfolders: false</code> and
                PIVTools will extract each camera frame automatically.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Image Synchronisation</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Each image index must show the target at the same position for both cameras.
                Misaligned images produce incorrect stereo geometry.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Calibration Image Settings"
              code={`calibration:
  image_format: calib_%03d.tif
  num_images: 15
  image_type: standard
  zero_based_indexing: false
  use_camera_subfolders: true
  subfolder: calibration
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first`}
            />
          </Section>

          {/* Stereo Dotboard */}
          <Section title="Stereo Dotboard" icon={<Grid3X3 size={32} />} id="dotboard">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Both cameras are calibrated simultaneously using shared views of a circular dot grid
              at multiple target positions. Detection uses the same pipeline as planar dotboard &mdash;
              auto-polarity selection by assembled grid size, reciprocal BFS grid walk, template-matching
              rescue for missing interior dots, and a two-pass outlier refinement. See the{' '}
              <Link href="/manual/planar-calibration#dotboard" className="text-soton-blue font-semibold hover:underline">Planar Dotboard</Link> section
              for troubleshooting detection failures.
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
                    { param: "camera_pair", desc: "Camera numbers forming the stereo pair", def: "[1, 2]" },
                    { param: "pattern_cols", desc: "Horizontal dot count", def: "10" },
                    { param: "pattern_rows", desc: "Vertical dot count", def: "10" },
                    { param: "dot_spacing_mm", desc: "Physical spacing between dot centres (mm)", def: "12.22" },
                    { param: "asymmetric", desc: "Asymmetric grid pattern", def: "false" },
                    { param: "dt", desc: "Time between frames (seconds)", def: "0.0057553" },
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

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Configure calibration images (format, count, subfolder)",
                "Set camera pair (e.g. Camera 1 and Camera 2)",
                "Set grid parameters (cols, rows, dot spacing)",
                "Browse images to verify both camera views show the target",
                "Click \"Generate Model\" to compute stereo calibration",
                "Review stereo RMS error, relative angle, and baseline distance",
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

            <h3 className="text-xl font-bold text-gray-900 mb-3">Output Directory</h3>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
              base_path/calibration/stereo_cam1_cam2/<br />
              ├── model/stereo_model.mat<br />
              ├── indices/indexing_*.mat<br />
              └── figures/
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Validation:</strong> Stereo validation checks that images exist for both cameras
                and reports the matching count (minimum of frames found in each camera).
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Stereo Dotboard"
              code={`calibration:
  active: stereo_dotboard
  stereo_dotboard:
    camera_pair: [1, 2]
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.2222
    asymmetric: false
    dt: 0.0057553
    stereo_model_type: dotboard`}
            />
          </Section>

          {/* Stereo ChArUco */}
          <Section title="Stereo ChArUco" icon={<QrCode size={32} />} id="charuco">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Combines ArUco marker detection with stereo geometry computation.
              ArUco markers identify which corners are visible, so detection works
              with partial occlusion and oblique viewing angles.
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
                    { param: "camera_pair", desc: "Camera numbers forming the stereo pair", def: "[1, 2]" },
                    { param: "squares_h", desc: "Horizontal square count", def: "10" },
                    { param: "squares_v", desc: "Vertical square count", def: "9" },
                    { param: "square_size", desc: "Square size in metres", def: "0.03" },
                    { param: "marker_ratio", desc: "Marker size relative to square", def: "0.5" },
                    { param: "aruco_dict", desc: "ArUco dictionary type", def: "DICT_4X4_1000" },
                    { param: "min_corners", desc: "Minimum corners to accept a frame", def: "6" },
                    { param: "dt", desc: "Time between frames (seconds)", def: "0.0057553" },
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
            <p className="text-gray-700 mb-4">
              Available dictionaries: <code className="bg-gray-100 px-1 rounded text-sm">DICT_4X4</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">DICT_5X5</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">DICT_6X6</code>,{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">DICT_7X7</code> -- each with 50, 100, 250, or 1000 markers.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <p className="text-gray-700 mb-4">
              Same as Stereo Dotboard: configure images, set camera pair and board parameters,
              generate model, review quality metrics, apply to vectors, and set as active.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Shared board parameters:</strong> ChArUco board settings (squares_h, squares_v, etc.)
                are read from the <code className="bg-blue-100 px-1 rounded">calibration.charuco</code> section,
                shared with the planar ChArUco method.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Stereo ChArUco"
              code={`calibration:
  active: stereo_charuco

  # Stereo-specific settings
  stereo_charuco:
    camera_pair: [1, 2]
    dt: 0.0057553

  # Board parameters (shared with planar ChArUco)
  charuco:
    squares_h: 10
    squares_v: 9
    square_size: 0.03
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6`}
            />
          </Section>

          {/* 3D Reconstruction */}
          <Section title="3D Velocity Reconstruction" icon={<Box size={32} />} id="reconstruction">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After computing the stereo model, use reconstruction to convert the 2D PIV velocity
              fields from each camera into 3D velocity vectors (u, v, w) in world coordinates.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm mb-2">
                <strong>How reconstruction works:</strong> Camera 1&apos;s PIV grid defines the world
                coordinates. Camera 2&apos;s displacement field is interpolated at the <em>same</em> physical
                locations (projected through the stereo model), so both cameras measure the same world points.
                A least-squares system combines the two 2D measurements into one 3D velocity per grid point.
                This avoids the pitfall of pairing cameras by array index &mdash; which looks right on a uniform
                grid but silently gives wrong answers for any real stereo setup.
              </p>
              <p className="text-blue-700 text-sm">
                <strong>Sign convention:</strong> <code className="bg-blue-100 px-1 rounded">uz</code> is
                negated on output, so positive <code className="bg-blue-100 px-1 rounded">uz</code> points
                <em>away</em> from the cameras in world coordinates (matching physical intuition for
                out-of-plane flow). <code className="bg-blue-100 px-1 rounded">ux</code> and{' '}
                <code className="bg-blue-100 px-1 rounded">uy</code> are not negated.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
                <h5 className="font-semibold text-gray-900 mb-1">2D PIV (Cam 1)</h5>
                <p className="text-gray-600 text-sm">ux, uy in image plane</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                <h5 className="font-semibold text-gray-900 mb-1">2D PIV (Cam 2)</h5>
                <p className="text-gray-600 text-sm">ux, uy in image plane</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                <h5 className="font-semibold text-gray-900 mb-1">3D Velocity</h5>
                <p className="text-gray-600 text-sm">ux, uy, uz in world coords</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>Valid stereo calibration model</li>
                  <li>2D PIV vectors from Camera 1</li>
                  <li>2D PIV vectors from Camera 2</li>
                  <li>Matching grid coordinates between cameras</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Output Variables</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li><strong>ux:</strong> x-velocity (m/s)</li>
                  <li><strong>uy:</strong> y-velocity (m/s)</li>
                  <li><strong>uz:</strong> out-of-plane velocity (m/s)</li>
                  <li><strong>x, y:</strong> world coordinates (mm)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Ensure a stereo model has been generated (Dotboard or ChArUco)",
                "Run PIV processing for both cameras",
                "Select data type (instantaneous or ensemble)",
                "Click \"Reconstruct 3D\" to start reconstruction",
                "View reconstructed vectors in the Vector Viewer with the Stereo data source",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Output Directory</h3>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
              base_path/stereo_calibrated/&#123;N&#125;/Cam1_Cam2/&#123;type&#125;/<br />
              ├── B00001.mat ... B0NNNN.mat<br />
              └── coordinates.mat
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> Reconstruction quality depends on stereo calibration accuracy
                and proper overlap between the PIV fields from both cameras.
              </p>
            </div>
          </Section>

          {/* Self-Calibration */}
          <Section title="Self-Calibration (Wieneke 2005)" icon={<Crosshair size={32} />} id="self-calibration">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Self-calibration automatically detects and corrects laser-sheet misalignment in stereo PIV
              setups. The laser sheet may be offset from the calibration plane (Z-offset) or tilted
              relative to it. Self-calibration measures the disparity between camera views and iteratively
              refines the dewarping parameters until the residual disparity converges.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithm Steps</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Dewarp both camera images to a common reference plane using the existing stereo model",
                "Cross-correlate Camera 1 vs Camera 2 (same time instant, different viewpoints)",
                "Extract the disparity field -- residual displacement between the two dewarped views",
                "Fit the disparity to a plane model, extracting Z-offset and tilt angles",
                "Update the dewarping maps and repeat until RMS disparity converges",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

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
                    { param: "n_images", desc: "Number of image pairs used for disparity estimation", def: "20" },
                    { param: "window_size", desc: "Correlation window size (pixels)", def: "64" },
                    { param: "overlap", desc: "Window overlap percentage", def: "50.0" },
                    { param: "convergence_threshold", desc: "RMS disparity convergence target (pixels)", def: "0.05" },
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

            <h3 className="text-xl font-bold text-gray-900 mb-4">Output Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Estimated Parameters</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li><strong>z_offset:</strong> Laser sheet Z-offset (mm)</li>
                  <li><strong>tilt_x:</strong> Tilt about X-axis (radians)</li>
                  <li><strong>tilt_y:</strong> Tilt about Y-axis (radians)</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Quality Metrics</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li><strong>RMS disparity:</strong> Residual disparity (pixels)</li>
                  <li><strong>Iteration count:</strong> Number of refinement iterations</li>
                  <li><strong>Convergence status:</strong> Whether threshold was reached</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Complete stereo calibration (Dotboard or ChArUco)",
                "Open the Self-Calibration panel below the stereo calibration section",
                "Preview the dewarp alignment (red-cyan overlay shows before/after)",
                "Set number of images and window size",
                "Click \"Run Self-Calibration\" to start the iterative process",
                "Review convergence history and final RMS disparity",
                "Results are automatically saved to config and applied during reconstruction",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <YamlDropdown
              title="config.yaml - Self-Calibration"
              code={`calibration:
  self_calibration:
    z_offset: 0.0          # Laser sheet Z-offset (mm) — estimated by self-cal
    tilt_x: 0.0            # Tilt about X-axis (radians)
    tilt_y: 0.0            # Tilt about Y-axis (radians)
    method: dotboard       # Calibration method used for stereo model
    n_images: 20           # Image pairs for disparity estimation
    window_size: 64        # Correlation window (pixels)
    convergence_history: [] # Per-iteration RMS disparity values`}
            />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mt-4">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> Self-calibration results are automatically applied during 3D
                reconstruction. The corrected dewarping maps account for the measured Z-offset and tilt,
                eliminating systematic errors caused by laser-sheet misalignment.
              </p>
            </div>
          </Section>

          {/* Stereo Ensemble PIV */}
          <Section title="Stereo Ensemble PIV" icon={<Cpu size={32} />} id="stereo-ensemble">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo ensemble PIV combines correlation-of-correlations with stereo reconstruction to
              estimate all three velocity components (U, V, W) and the full 3D Reynolds stress tensor
              (6 components) from time-averaged data.
            </p>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Info className="text-purple-600" size={18} />
                <strong className="text-purple-800">Ensemble only</strong>
              </div>
              <p className="text-purple-700 text-sm">
                Requires a stereo camera pair and uses the <code className="bg-purple-100 px-1 rounded">stereo_ensemble_piv</code> config
                section (falls back to <code className="bg-purple-100 px-1 rounded">ensemble_piv</code> for unset keys).
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Outputs</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Output</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { output: "ux, uy, uz", desc: "Time-averaged 3D velocity (m/s)" },
                    { output: "UU, VV, WW", desc: "Normal Reynolds stresses" },
                    { output: "UV, UW, VW", desc: "Shear Reynolds stresses" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.output}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <YamlDropdown
              title="config.yaml - Stereo Ensemble PIV"
              code={`processing:
  ensemble: true

stereo_ensemble_piv:
  # Inherits all settings from ensemble_piv
  # Override specific settings here if needed
  window_size:
  - [128, 128]
  - [64, 64]
  - [32, 32]`}
            />
          </Section>

          {/* CLI */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo calibration uses two CLI steps: <strong>detect</strong> targets to generate
              a stereo model, then <strong>apply-stereo</strong> to reconstruct 3D velocities.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Generate Stereo Model</h3>
            <CodeBlock
              title="Detection Commands"
              code={`# Dotboard stereo detection
pivtools-cli detect-stereo-planar

# ChArUco stereo detection
pivtools-cli detect-stereo-charuco

# Process specific paths
pivtools-cli detect-stereo-planar -p 0,1`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Reconstruct 3D Velocity</h3>
            <CodeBlock
              title="Apply Stereo Calibration"
              code={`# Use active settings from config.yaml
pivtools-cli apply-stereo

# Specify camera pair explicitly
pivtools-cli apply-stereo --camera-pair 1,2

# Use charuco stereo model
pivtools-cli apply-stereo --method charuco

# Specific data type and runs
pivtools-cli apply-stereo -t instantaneous -r 1,2,3

# Process specific paths
pivtools-cli apply-stereo -p 0,1`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Self-Calibration (Optional)</h3>
            <CodeBlock
              title="Self-Calibration Command"
              code={`# Run self-calibration to correct laser-sheet misalignment
pivtools-cli self-calibrate --camera-pair 1,2 --method dotboard --n-images 20`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-4">apply-stereo Options</h3>
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
                    { flag: "--method, -m", desc: "Stereo method: dotboard or charuco", def: "From config" },
                    { flag: "--camera-pair, -c", desc: "Camera pair as \"1,2\"", def: "From config" },
                    { flag: "--type-name, -t", desc: "Data type (instantaneous / ensemble)", def: "instantaneous" },
                    { flag: "--runs, -r", desc: "Comma-separated run numbers", def: "All runs" },
                    { flag: "--active-paths, -p", desc: "Comma-separated path indices", def: "From config" },
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
              title="Full Stereo PIV Workflow"
              code={`# 1. Generate stereo calibration model
pivtools-cli detect-stereo-planar       # or detect-stereo-charuco

# 2. Run PIV processing for both cameras
pivtools-cli instantaneous

# 3. Reconstruct 3D velocities
pivtools-cli apply-stereo --camera-pair 1,2

# 4. Compute statistics on stereo data
pivtools-cli statistics --source-endpoint stereo`}
            />
          </Section>

          {/* YAML */}
          <Section title="Complete YAML Reference" icon={<FileText size={32} />} id="yaml">
            <YamlDropdown
              title="Full Stereo Calibration Configuration"
              defaultOpen={true}
              code={`calibration:
  # Active method
  active: stereo_dotboard  # stereo_dotboard, stereo_charuco, or stepped_board
  piv_type: instantaneous

  # Calibration image settings (shared)
  image_format: calib_%03d.tif
  num_images: 15
  image_type: standard
  zero_based_indexing: false
  use_camera_subfolders: true
  subfolder: calibration
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first

  # Stereo Dotboard
  stereo_dotboard:
    camera_pair: [1, 2]
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.2222
    asymmetric: false
    dt: 0.0057553
    stereo_model_type: dotboard

  # Stereo ChArUco (board params from charuco section)
  stereo_charuco:
    camera_pair: [1, 2]
    dt: 0.0057553

  # ChArUco board parameters (used by both planar and stereo)
  charuco:
    squares_h: 10
    squares_v: 9
    square_size: 0.03
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6

  # Self-calibration (Wieneke 2005)
  self_calibration:
    z_offset: 0.0          # Laser sheet Z-offset (mm)
    tilt_x: 0.0            # Tilt about X-axis (radians)
    tilt_y: 0.0            # Tilt about Y-axis (radians)
    method: dotboard       # Calibration method used for stereo model
    n_images: 20           # Image pairs for disparity estimation
    window_size: 64        # Correlation window (pixels)
    convergence_history: [] # Per-iteration RMS disparity values

# Stereo Ensemble PIV
stereo_ensemble_piv:
  # Inherits all settings from ensemble_piv
  # Override specific settings here if needed
  window_size:
  - [128, 128]
  - [64, 64]
  - [32, 32]`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Field Mapping</h4>
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
                      { gui: "Active Method", yaml: "calibration.active", values: "stereo_dotboard or stereo_charuco" },
                      { gui: "Camera 1", yaml: "*.camera_pair[0]", values: "Integer (1-based)" },
                      { gui: "Camera 2", yaml: "*.camera_pair[1]", values: "Integer (1-based)" },
                      { gui: "Pattern Columns", yaml: "stereo_dotboard.pattern_cols", values: "Integer" },
                      { gui: "Pattern Rows", yaml: "stereo_dotboard.pattern_rows", values: "Integer" },
                      { gui: "Dot Spacing (mm)", yaml: "stereo_dotboard.dot_spacing_mm", values: "Float (mm)" },
                      { gui: "Squares H", yaml: "charuco.squares_h", values: "Integer" },
                      { gui: "Squares V", yaml: "charuco.squares_v", values: "Integer" },
                      { gui: "Square Size", yaml: "charuco.square_size", values: "Float (metres)" },
                      { gui: "ArUco Dictionary", yaml: "charuco.aruco_dict", values: "DICT_{4-7}X{4-7}_{50-1000}" },
                      { gui: "dt", yaml: "stereo_dotboard.dt / stereo_charuco.dt", values: "Float (seconds)" },
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
            <h3 className="text-3xl font-bold mb-4">Next: Create Visualisation Videos</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Visualise your calibrated velocity fields with animated videos.
            </p>
            <a
              href="/manual/video-maker"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Video Maker
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
