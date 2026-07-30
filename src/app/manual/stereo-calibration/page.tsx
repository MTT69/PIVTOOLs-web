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
  AlertTriangle,
  Info,
  Box,
  Crosshair,
  Layers,
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
              Three methods available: Dotboard, ChArUco, and Stepped.
            </p>
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Stereo Stepped</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Transmission rigs where cameras image different board faces</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Dual-level (stepped) dot board, 1+ positions (3+ recommended)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Info className="text-blue-600" size={18} />
                <strong className="text-blue-800">Stereo is pinhole only</strong>
              </div>
              <p className="text-blue-700 text-sm">
                The stereo tabs offer no polynomial camera model. A single-plane polynomial has no
                out-of-plane sensitivity, so it cannot recover the W component. The model-type
                dropdown that appears on the planar tabs is absent on the stereo tabs.
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
                    { metric: "Stereo RMS Error", desc: "Joint reprojection error from the stereoCalibrate pose fit (pixels). Dotboard and ChArUco only", target: "< 0.5 px" },
                    { metric: "Stereo Views", desc: "Number of shared views used in the stereo pose fit (n_stereo_views)", target: "10+ typical" },
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
                  <li><strong>R_stereo:</strong> 3x3 rotation from Cam1 to Cam2</li>
                  <li><strong>T_stereo:</strong> Baseline translation (mm)</li>
                  <li><strong>self_cal block:</strong> Laser-sheet z_offset and tilt from self-calibration (empty until run)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Persistence</h3>
            <p className="text-gray-700 mb-2">
              The model record is written into the calibration <em>source</em> folder, not the
              output base path. Beside it, an <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code>{' '}
              sidecar caches the detected points, the clicked world frame, and the board geometry, so
              the model regenerates without re-detecting or re-clicking. Clicks and detections are
              never stored in <code className="bg-gray-100 px-1 rounded text-sm">config.yaml</code> — config holds
              only what you type or select before detecting (image settings, camera pair, dt, geometry seed).
            </p>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
              &lt;calibration_source&gt;/calibration/stereo_cam1_cam2/<br />
              ├── model/stereo_model_pinhole.mat   (includes the self_cal block)<br />
              ├── model/inputs.mat                 (cached detections + clicks)<br />
              └── figures/                         (proof figures; self_cal/ subfolder after self-calibration)
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
              Both cameras view a circular dot grid at multiple target positions. Detection uses the
              same algorithm as planar dotboard (blob detection, neighbour walk, RANSAC filtering) —
              grid dimensions are found automatically, so no row/column counts are configured.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Model Fitting</h3>
            <p className="text-gray-700 mb-4">
              Each camera&apos;s intrinsics are fitted independently. Object-point release
              (<code className="bg-gray-100 px-1 rounded text-sm">calibrateCameraRO</code>) is on by
              default and falls back to plain <code className="bg-gray-100 px-1 rounded text-sm">calibrateCamera</code>{' '}
              per camera when that camera&apos;s views are not identical (partial boards). The
              cross-camera pose then comes from{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">cv2.stereoCalibrate(CALIB_FIX_INTRINSIC)</code>{' '}
              over <em>all</em> shared views — a joint estimate that replaced the old compose of two
              single-view solvePnP poses. The fit reports the stereo RMS (px) and the shared-view
              count (n_stereo_views).
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
                    { param: "dot_spacing_mm", desc: "Physical spacing between dot centres (mm)", def: "15.0" },
                    { param: "datum_frame", desc: "Image index defining the world frame (1-based)", def: "1" },
                    { param: "dt", desc: "Time between frames (seconds)", def: "1.0" },
                    { param: "fix_k2", desc: "Pin the r^4 radial term to zero (toggle appears below 3 frames; on by default there)", def: "false" },
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
                "Set camera pair (e.g. Camera 1 and Camera 2) and dot spacing",
                "Browse images to verify both camera views show the target",
                "Detect dots on the datum frame, then click origin / +X / +Y on camera 1 to define the world frame",
                "Click \"Generate Model\" to compute stereo calibration",
                "Review stereo RMS error, shared-view count, relative angle, and baseline distance",
                "Click \"Calibrate Vectors\" to apply calibration to PIV data",
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
              &lt;calibration_source&gt;/calibration/stereo_cam1_cam2/<br />
              ├── model/stereo_model_pinhole.mat<br />
              ├── model/inputs.mat<br />
              └── figures/
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Detection cache:</strong> detections persist in{' '}
                <code className="bg-blue-100 px-1 rounded">inputs.mat</code> beside the model, so
                Generate reuses them on a reopened tab. The <strong>Re-detect</strong> button ignores
                the cache and detects fresh before recalibrating.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Stereo Dotboard"
              code={`calibration:
  active: stereo_dotboard
  camera_pair: [1, 2]
  dt: 1.0
  datum_frame: 1
  dotboard:                # geometry seed, shared with the planar dotboard tab
    dot_spacing_mm: 15.0
    fix_k2: false`}
            />
          </Section>

          {/* Stereo ChArUco */}
          <Section title="Stereo ChArUco" icon={<QrCode size={32} />} id="charuco">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Combines ArUco marker detection with stereo geometry computation.
              ArUco markers identify which corners are visible, so detection works
              with partial occlusion and oblique viewing angles. Model fitting is identical to
              Stereo Dotboard — independent per-camera intrinsics, then{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">cv2.stereoCalibrate(CALIB_FIX_INTRINSIC)</code>{' '}
              over all shared views, with corners matched across cameras by their global corner ids.
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
              generate model, review quality metrics, and apply to vectors. Detections cache in{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code> with the same
              Re-detect override.
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
  camera_pair: [1, 2]
  dt: 1.0
  datum_frame: 1

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

          {/* Stereo Stepped */}
          <Section title="Stereo Stepped" icon={<Layers size={32} />} id="stepped">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A stepped (dual-level) board carries dots on two Z planes, so a single view is
              non-coplanar and constrains depth on its own. The cameras may image different board
              faces (transmission rigs), which means they share no features and{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">cv2.stereoCalibrate</code> cannot
              run. Instead, two mono pinhole fits are composed into one rig. This composed pose is
              the DaVis-matching un-bundled method, not a weaker fallback.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Model Fitting</h3>
            <p className="text-gray-700 mb-4">
              Each camera is fitted into the shared plate frame independently, then the rig pose is
              composed as
            </p>
            <div className="text-sm text-gray-700 font-mono bg-gray-50 rounded p-3 mb-4">
              R_stereo = R2 · R1&#7488;<br />
              T_stereo = t2 − R_stereo · t1
            </div>
            <p className="text-gray-700 mb-4">
              Because composition has no joint reprojection step, there is no stereo RMS for this
              method — the results card shows the two per-camera RMS values plus the self-calibration
              residual disparity. Stereo stepped is strictly a two-camera pair; there is no
              multi-camera stitching on this tab. The camera model is pinhole only.
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
                    { param: "camera_pair", desc: "Camera numbers forming the stereo pair (Camera 1 is the world reference)", def: "[1, 2]" },
                    { param: "dot_spacing_mm", desc: "Physical spacing between dot centres (mm)", def: "15.0" },
                    { param: "step_height_mm", desc: "Height between peak and trough levels (mm)", def: "3.0" },
                    { param: "board_thickness_mm", desc: "Total thickness of the board (mm)", def: "14.8" },
                    { param: "datum_frame", desc: "World origin image, 1-based, both cameras", def: "1" },
                    { param: "stereo_config", desc: "Rig geometry: auto (from clicks), same_side, or transmission", def: "auto" },
                    { param: "dt", desc: "Time between frames (seconds)", def: "1.0" },
                    { param: "fix_k2", desc: "Pin the r^4 radial term to zero (toggle appears below 3 usable poses)", def: "on when shown" },
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

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Fewer than 3 poses: keep fix k2 on</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                One near-planar view has no leverage on the r^4 radial term. A free k2 runs away into
                a degenerate basin, dragging focal length, principal point, stereo angle, and baseline
                with it. The toggle defaults on below 3 poses. In-plane vectors stay usable either
                way, but W picks up a bias from the wrong angle — use 3 or more views for
                quantitative 3C.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Configure calibration images and the camera pair (both cameras, same frame count)",
                "Set the board geometry (dot spacing, step height, thickness) and datum frame",
                "Run detection — dots on both Z levels are found for every frame of both cameras",
                "Click the three fiducials (origin / +X / +Y) on each camera's datum frame",
                "Verify every usable pose: click one peak or trough dot per pose to label its face",
                "Click \"Generate Model\" and review the per-camera RMS values",
                "Optionally run self-calibration, then \"Calibrate Vectors\" for 3C reconstruction",
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
                <strong>Peak/trough verification is enforced:</strong> Generate stays disabled until
                every usable pose has its face labelled on both cameras. The detection figure colours
                peaks blue and troughs red so labels can be checked at a glance. Detections,
                fiducials, and labels persist per-pick to <code className="bg-blue-100 px-1 rounded">inputs.mat</code>,
                so a reopened tab regenerates the model with one Generate press.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700 text-sm">
                <strong>No polynomial3d:</strong> the stereo stepped model is pinhole only. A
                per-camera polynomial pair builds no usable stereo baseline, so the UI drops the
                option and the backend rejects it.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Stereo Stepped"
              code={`calibration:
  active: stereo_stepped
  camera_pair: [1, 2]
  dt: 1.0
  datum_frame: 1
  stepped:                  # physical board geometry (shared seed)
    dot_spacing_mm: 15.0
    step_height_mm: 3.0
    board_thickness_mm: 14.8
  stepped_stereo:           # stereo-only selections
    stereo_config: auto     # auto | same_side | transmission
    model_type: pinhole
    fix_k2: true`}
            />
          </Section>

          {/* 3D Reconstruction */}
          <Section title="3D Velocity Reconstruction" icon={<Box size={32} />} id="reconstruction">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After computing the stereo model, reconstruction converts the 2D PIV velocity fields
              from each camera into 3C velocity vectors (u, v, w) in world coordinates. The solve is
              the Willert/Soloff method — both cameras&apos; projection Jacobians are stacked into a
              4x3 least-squares system per grid point and solved for (U, V, W).
            </p>

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
                  <li>Overlapping camera views on the sheet plane (empty overlap raises)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Output Variables</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li><strong>ux:</strong> x-velocity (m/s)</li>
                  <li><strong>uy:</strong> y-velocity (m/s)</li>
                  <li><strong>uz:</strong> out-of-plane velocity (m/s)</li>
                  <li><strong>b_mask:</strong> validity mask (0 = valid, non-zero = excluded)</li>
                  <li><strong>x, y:</strong> world coordinates (mm)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Output Grid and Conventions</h3>
            <ul className="text-gray-700 space-y-2 mb-6 text-sm list-disc pl-6">
              <li>
                Output lands on a <strong>regular world-mm grid</strong> spanning the two
                cameras&apos; overlap on the sheet plane. Spacing is automatic — the median
                world-space vector pitch of both PIV grids. To change the output resolution, change
                the PIV window/overlap and re-run.
              </li>
              <li>
                <strong>Row 0 is the top of the view</strong> (y descending down the rows), matching
                every other calibrated product.
              </li>
              <li>
                The frame is <strong>right-handed with +Z = +X x +Y</strong>, so W shares its axis
                with the world z coordinate. The legacy &quot;+w toward cameras&quot; flip
                (z_toward_cameras) has been removed.
              </li>
              <li>
                A point is masked in <code className="bg-gray-100 px-1 rounded">b_mask</code> where
                either camera&apos;s projection leaves its PIV grid or either camera flagged its
                contributing vector.
              </li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Old stereo files are rejected</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                The vector reader requires <code className="bg-yellow-100 px-1 rounded">b_mask</code>.
                Stereo results written before it existed (ux/uy/uz only) raise on load and must be
                re-reconstructed.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Stereo ensemble reconstructs mean flow only</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Applying stereo calibration to ensemble results reconstructs the mean velocity
                (ux/uy/uz/b_mask) per pass — the 4x3 solve is linear in the displacements, so the
                ensemble mean reconstructs exactly. Reynolds stresses are <strong>not</strong>{' '}
                reconstructed through stereo (they transform quadratically and require a separate
                method).
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Ensure a stereo model has been generated (Dotboard, ChArUco, or Stepped)",
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
              base_path/stereo_calibrated/&#123;N&#125;/Cam1_Cam2/instantaneous/<br />
              ├── B00001.mat ... B0NNNN.mat   (ux, uy, uz, b_mask per frame)<br />
              └── coordinates.mat             (regular world-mm grid)<br />
              <br />
              base_path/stereo_calibrated/&#123;N&#125;/Cam1_Cam2/ensemble/<br />
              └── per-pass coordinates.mat + ensemble_result.mat (ux, uy, uz, b_mask)
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
              Self-calibration detects and corrects laser-sheet misalignment from the recorded
              particle images, not the calibration board. The laser sheet may be offset from the
              calibration plane (z_offset) or tilted relative to it (tilt_x, tilt_y).
              Self-calibration measures the disparity between camera views and iteratively refines
              the sheet parameters until the corrections stabilise. It is available on the stereo
              board tabs and on stereo stepped, for pinhole models only.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithm Steps</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Dewarp both camera images to a common reference plane using the existing stereo model",
                "Cross-correlate Camera 1 vs Camera 2 (same time instant, different viewpoints)",
                "Extract the disparity field -- residual displacement between the two dewarped views",
                "Fit the disparity to a plane model, extracting Z-offset and tilt angles",
                "Update the dewarping maps and repeat until the per-iteration corrections (Z-offset and tilt) stabilise below threshold",
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
                "Complete stereo calibration (Dotboard, ChArUco, or Stepped pinhole)",
                "Open the Self-Calibration panel below the stereo model results",
                "Select the PIV dataset (base path) providing the particle images",
                "Preview the dewarp alignment (red-cyan overlay shows before/after)",
                "Set number of images, window size, and overlap",
                "Click \"Run Self-Calibration\" to start the iterative process",
                "Review convergence history, final RMS disparity, and the diagnostic figures",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Storage and Application</h3>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                Results are stored in the stereo record&apos;s <code className="bg-blue-100 px-1 rounded">self_cal</code>{' '}
                block inside <code className="bg-blue-100 px-1 rounded">stereo_model_pinhole.mat</code> —
                not a sidecar file and not <code className="bg-blue-100 px-1 rounded">config.yaml</code>.
                Subsequent stereo reconstruction applies the stored sheet automatically, so no extra
                step is needed. Regenerating the stereo model clears the block — re-run
                self-calibration after recalibrating.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnostic Output</h3>
            <p className="text-gray-700 mb-2">
              Seven diagnostic figures plus <code className="bg-gray-100 px-1 rounded text-sm">correlation_planes.mat</code>{' '}
              are written beside the model, shareable with the dataset.
            </p>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
              &lt;calibration_source&gt;/calibration/stereo_cam1_cam2/figures/self_cal/
            </div>
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
              code={`# Stereo ChArUco detection (CLI detection is ChArUco-only —
# dotboard and stepped need interactive clicks, so they are GUI-only)
pivtools-cli detect-stereo

# Specify the camera pair explicitly
pivtools-cli detect-stereo --camera-pair 1,2`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Reconstruct 3D Velocity</h3>
            <CodeBlock
              title="Apply Stereo Calibration"
              code={`# Reconstruct using the ChArUco stereo model
pivtools-cli apply-stereo --board charuco

# Specify the camera pair explicitly
pivtools-cli apply-stereo --board charuco --camera-pair 1,2

# Process every configured path (like the GUI)
pivtools-cli apply-stereo --board charuco --all-paths

# Choose the resample kernel
pivtools-cli apply-stereo --board charuco --interpolator lanczos`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Self-Calibration (Optional)</h3>
            <CodeBlock
              title="Self-Calibration Command"
              code={`# Run self-calibration to correct laser-sheet misalignment
# (--base-path-idx selects the PIV dataset providing particle images)
pivtools-cli self-calibrate --board dotboard --camera-pair 1,2 \\
  --base-path-idx 0 --n-images 20 --window-size 64 --overlap 50`}
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
                    { flag: "--board", desc: "Stereo board: charuco, dotboard, or stepped", def: "From config" },
                    { flag: "--camera-pair", desc: "Camera pair as \"1,2\"", def: "From config" },
                    { flag: "--dt", desc: "Time between frames (seconds)", def: "From model / config" },
                    { flag: "--all-paths", desc: "Derive every base_path from config (like the GUI)", def: "off" },
                    { flag: "--type-name", desc: "PIV result type for --all-paths: instantaneous or ensemble", def: "instantaneous" },
                    { flag: "--interpolator", desc: "Resample kernel: cubic or lanczos", def: "lanczos" },
                    { flag: "--model-type", desc: "Which stereo record to load when several exist in the model dir", def: "pinhole" },
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
              code={`# 1. Generate stereo calibration model (ChArUco; dotboard/stepped via GUI)
pivtools-cli detect-stereo

# 2. Run PIV processing for both cameras
pivtools-cli instantaneous

# 3. Reconstruct 3D velocities
pivtools-cli apply-stereo --board charuco --camera-pair 1,2

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
  active: stereo_dotboard  # stereo_dotboard | stereo_charuco | stereo_stepped
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

  # Shared stereo settings (all three stereo methods)
  camera_pair: [1, 2]
  dt: 1.0
  datum_frame: 1

  # Dotboard geometry seed (shared with planar dotboard)
  dotboard:
    dot_spacing_mm: 15.0
    fix_k2: false

  # ChArUco board parameters (shared with planar ChArUco)
  charuco:
    squares_h: 10
    squares_v: 9
    square_size: 0.03
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6

  # Stepped board geometry (shared seed)
  stepped:
    dot_spacing_mm: 15.0
    step_height_mm: 3.0
    board_thickness_mm: 14.8

  # Stereo-stepped selections
  stepped_stereo:
    stereo_config: auto    # auto | same_side | transmission
    model_type: pinhole
    fix_k2: true

# World-frame clicks, detections, and self-calibration results are NOT in
# config.yaml — they live in the model record + inputs.mat sidecar beside
# the calibration images.`}
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
                      { gui: "Active Method", yaml: "calibration.active", values: "stereo_dotboard, stereo_charuco, or stereo_stepped" },
                      { gui: "Camera 1", yaml: "calibration.camera_pair[0]", values: "Integer (1-based)" },
                      { gui: "Camera 2", yaml: "calibration.camera_pair[1]", values: "Integer (1-based)" },
                      { gui: "dt", yaml: "calibration.dt", values: "Float (seconds)" },
                      { gui: "Datum Frame", yaml: "calibration.datum_frame", values: "Integer (1-based)" },
                      { gui: "Dot Spacing (mm)", yaml: "calibration.dotboard.dot_spacing_mm", values: "Float (mm)" },
                      { gui: "Fix radial k2 = 0", yaml: "calibration.dotboard.fix_k2 / stepped_stereo.fix_k2", values: "Boolean" },
                      { gui: "Squares H", yaml: "calibration.charuco.squares_h", values: "Integer" },
                      { gui: "Squares V", yaml: "calibration.charuco.squares_v", values: "Integer" },
                      { gui: "Square Size", yaml: "calibration.charuco.square_size", values: "Float (metres)" },
                      { gui: "ArUco Dictionary", yaml: "calibration.charuco.aruco_dict", values: "DICT_{4-7}X{4-7}_{50-1000}" },
                      { gui: "Step Height (mm)", yaml: "calibration.stepped.step_height_mm", values: "Float (mm)" },
                      { gui: "Board Thickness (mm)", yaml: "calibration.stepped.board_thickness_mm", values: "Float (mm)" },
                      { gui: "Stereo Geometry", yaml: "calibration.stepped_stereo.stereo_config", values: "auto, same_side, or transmission" },
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
