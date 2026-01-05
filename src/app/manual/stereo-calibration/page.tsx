'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Camera,
  Eye,
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
  Settings
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
              Enable three-component (3C) velocity measurements by calibrating stereo camera pairs.
              PIVTools computes the geometric relationship between cameras for accurate 3D reconstruction.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Stereo PIV Overview</h3>
            <p className="text-gray-200 mb-6 text-lg">
              Stereo PIV uses two cameras viewing the measurement plane from different angles. By combining
              the 2D velocity fields from each camera, the out-of-plane velocity component (w) can be recovered,
              giving full 3D velocity vectors (u, v, w).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "1. Configure Cameras", desc: "Set up stereo camera pair" },
                { label: "2. Capture Targets", desc: "Multiple target positions" },
                { label: "3. Generate Model", desc: "Compute stereo geometry" },
                { label: "4. Reconstruct 3D", desc: "Convert 2D to 3D velocity" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <Section title="Overview" icon={<Eye size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo calibration establishes the geometric relationship between two cameras viewing
              the same measurement plane. The resulting stereo model contains intrinsic parameters
              for each camera (focal length, principal point, distortion) as well as extrinsic
              parameters describing the relative position and orientation of the cameras.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Intrinsic Parameters</h4>
                <p className="text-blue-700 mb-4">
                  Computed independently for each camera. Describe the internal optical properties.
                </p>
                <ul className="text-blue-600 space-y-2 text-sm">
                  <li><strong>Camera Matrix:</strong> fx, fy (focal length), cx, cy (principal point)</li>
                  <li><strong>Distortion:</strong> 5 radial/tangential coefficients</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Extrinsic Parameters</h4>
                <p className="text-green-700 mb-4">
                  Describe the geometric relationship between the two cameras.
                </p>
                <ul className="text-green-600 space-y-2 text-sm">
                  <li><strong>Rotation Matrix (R):</strong> 3×3 rotation from cam1 to cam2</li>
                  <li><strong>Translation Vector (T):</strong> Position offset between cameras</li>
                  <li><strong>Essential/Fundamental:</strong> Epipolar geometry matrices</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-purple-600" size={20} />
                <h4 className="text-lg font-semibold text-purple-800">Quality Metrics</h4>
              </div>
              <p className="text-purple-700 mb-4">
                After calibration, review these metrics to assess quality:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <strong className="text-purple-800">Stereo RMS Error</strong>
                  <p className="text-purple-600 text-sm">Reprojection error (pixels). Target: &lt; 0.5 px</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong className="text-purple-800">Relative Angle</strong>
                  <p className="text-purple-600 text-sm">Angle between cameras (degrees). Typical: 30-60°</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <strong className="text-purple-800">Baseline Distance</strong>
                  <p className="text-purple-600 text-sm">Camera separation (mm). Verify against setup</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Available Methods</h3>
            <div className="overflow-x-auto">
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
                    <td className="px-6 py-4 text-sm text-gray-600">Robust detection, partial visibility</td>
                    <td className="px-6 py-4 text-sm text-gray-600">ChArUco board, multiple positions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Calibration Image Setup Section */}
          <Section title="Calibration Image Setup" icon={<Camera size={32} />} id="image-setup">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo calibration requires synchronised images from both cameras at each target position.
              The configuration options are similar to planar calibration but must accommodate two camera views.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Camera Pair Configuration</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Stereo calibration processes images from both cameras simultaneously. The camera pair
                is configured in the stereo calibration settings, specifying which cameras (1 and 2)
                form the stereo pair.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">camera_first (default)</h5>
                  <p className="text-blue-700 text-sm mb-2">Each camera folder contains calibration images</p>
                  <div className="text-xs text-blue-600 font-mono bg-white rounded p-2">
                    source_path/<br />
                    ├── Cam1/<br />
                    │   └── calibration/<br />
                    │       ├── calib_001.tif<br />
                    │       └── calib_002.tif<br />
                    └── Cam2/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;└── calibration/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── calib_001.tif<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── calib_002.tif
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">calibration_first</h5>
                  <p className="text-green-700 text-sm mb-2">Calibration folder contains both camera subfolders</p>
                  <div className="text-xs text-green-600 font-mono bg-white rounded p-2">
                    source_path/<br />
                    └── calibration/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;├── Cam1/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;│   ├── calib_001.tif<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;│   └── calib_002.tif<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;└── Cam2/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── calib_001.tif<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── calib_002.tif
                  </div>
                </div>
              </div>
            </div>

            {/* IM7 Container Format */}
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-purple-600" size={20} />
                <h4 className="text-lg font-semibold text-purple-800">Multi-Camera IM7 Files</h4>
              </div>
              <p className="text-purple-700 mb-4">
                LaVision IM7 files often contain synchronised data from both stereo cameras in a single file.
                Set <code className="bg-purple-100 px-2 py-1 rounded mx-1">use_camera_subfolders: false</code>
                for this configuration. PIVTools will automatically extract both camera frames.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm text-purple-600 font-mono">
                source_path/calibration/B00001.im7 &rarr; Contains Cam1 + Cam2 frames
              </div>
            </div>

            {/* Platform Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Image Synchronisation</h4>
              </div>
              <p className="text-yellow-700">
                <strong>Critical:</strong> Calibration images must be synchronised between cameras. Each image
                index (e.g., calib_001.tif) must show the target at the exact same position for both cameras.
                Misaligned images will produce incorrect stereo geometry.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Calibration Image Settings"
              code={`calibration:
  # Image file settings (shared with stereo methods)
  image_format: calib_%03d.tif
  num_images: 15
  image_type: standard  # standard, cine, lavision_set, lavision_im7
  zero_based_indexing: false

  # Directory structure
  use_camera_subfolders: true
  subfolder: calibration
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first  # or calibration_first`}
            />
          </Section>

          {/* Stereo Dotboard Section */}
          <Section title="Stereo Dotboard" icon={<Grid3X3 size={32} />} id="dotboard">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo Dotboard calibration extends the planar dotboard model to two cameras. Both cameras
              are calibrated simultaneously using shared views of a circular dot grid target at multiple
              positions. The algorithm computes both intrinsic parameters and the stereo geometry.
            </p>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400 mb-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Requirements</h4>
              <ul className="text-green-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>Circular dot grid target with known spacing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>10-20 target positions covering the measurement volume</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>Synchronised images from both cameras at each position</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>Target visible in both camera views simultaneously</span>
                </li>
              </ul>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h4>
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
                  {[
                    { param: "camera_pair", desc: "Cameras forming stereo pair [cam1, cam2]", example: "[1, 2]" },
                    { param: "pattern_cols", desc: "Horizontal dot count", example: "10" },
                    { param: "pattern_rows", desc: "Vertical dot count", example: "10" },
                    { param: "dot_spacing_mm", desc: "Physical spacing between dots", example: "12.22" },
                    { param: "enhance_dots", desc: "Pre-processing for low contrast", example: "false" },
                    { param: "asymmetric", desc: "Asymmetric grid pattern", example: "false" },
                    { param: "dt", desc: "Time between frames (seconds)", example: "0.0057553" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.param}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">GUI Workflow</h4>
              <ol className="space-y-2">
                {[
                  "Configure calibration images (Image Type, Format, Number)",
                  "Set camera pair (e.g., Camera 1 and Camera 2)",
                  "Set grid detection parameters (cols, rows, dot spacing)",
                  "Browse calibration images to verify detection in both views",
                  "Click \"Generate Model\" to compute stereo calibration",
                  "Review stereo RMS error, relative angle, and baseline",
                  "Click \"Calibrate Vectors\" to apply to stereo PIV data",
                  "Click \"Set as Active\" to make this the active method"
                ].map((step, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Stereo Model Outputs</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li><strong>Camera Matrices:</strong> Intrinsics for both cameras</li>
                  <li><strong>Distortion Coefficients:</strong> 5 params per camera</li>
                  <li><strong>Rotation Matrix (R):</strong> Camera 1 to Camera 2 rotation</li>
                  <li><strong>Translation Vector (T):</strong> Baseline offset</li>
                  <li><strong>Rectification (R1, R2):</strong> For image alignment</li>
                  <li><strong>Projection (P1, P2):</strong> Rectified projection matrices</li>
                  <li><strong>Q Matrix:</strong> Disparity-to-depth mapping</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Output Directory</h4>
                <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3">
                  base_path/<br />
                  └── calibration/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── stereo_Cam1_Cam2/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── dotboard/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── model/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│   └── stereo_model.mat<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── indices/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── figures/
                </div>
              </div>
            </div>

            <YamlDropdown
              title="YAML Reference - Stereo Dotboard Calibration"
              code={`calibration:
  active: stereo_dotboard
  stereo_dotboard:
    camera_pair: [1, 2]
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.2222
    enhance_dots: false
    asymmetric: false
    dt: 0.0057553
    stereo_model_type: dotboard`}
            />
          </Section>

          {/* Stereo ChArUco Section */}
          <Section title="Stereo ChArUco" icon={<QrCode size={32} />} id="charuco">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo ChArUco calibration combines the robustness of ArUco marker detection with
              stereo geometry computation. The ChArUco board allows for reliable corner detection
              even with partial occlusion, making it ideal for setups with limited visibility.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Advantages</h4>
                <ul className="text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>Works when target is partially visible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>Robust detection at oblique viewing angles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>ArUco markers identify which corners are visible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>Better performance in varying lighting conditions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">ArUco Dictionary Options</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Choose dictionary based on board size and detection requirements.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-white rounded p-2">DICT_4X4_50/100/250/1000</div>
                  <div className="bg-white rounded p-2">DICT_5X5_50/100/250/1000</div>
                  <div className="bg-white rounded p-2">DICT_6X6_50/100/250/1000</div>
                  <div className="bg-white rounded p-2">DICT_7X7_50/100/250/1000</div>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h4>
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
                  {[
                    { param: "camera_pair", desc: "Cameras forming stereo pair", example: "[1, 2]" },
                    { param: "squares_h", desc: "Horizontal squares", example: "10" },
                    { param: "squares_v", desc: "Vertical squares", example: "9" },
                    { param: "square_size", desc: "Square size in meters", example: "0.03" },
                    { param: "marker_ratio", desc: "Marker size relative to square", example: "0.5" },
                    { param: "aruco_dict", desc: "ArUco dictionary type", example: "DICT_4X4_1000" },
                    { param: "min_corners", desc: "Minimum corners per frame", example: "6" },
                    { param: "dt", desc: "Time between frames (seconds)", example: "0.0057553" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.param}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-600 text-sm">
                <strong>GUI Workflow:</strong> Same as Stereo Dotboard - configure images, set camera pair
                and board parameters, generate model, verify quality metrics, and apply to vectors.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Stereo ChArUco Calibration"
              code={`calibration:
  active: stereo_charuco
  stereo_charuco:
    camera_pair: [1, 2]
    squares_h: 10
    squares_v: 9
    square_size: 0.03      # meters
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    dt: 0.0057553`}
            />
          </Section>

          {/* 3D Reconstruction Section */}
          <Section title="3D Velocity Reconstruction" icon={<Box size={32} />} id="reconstruction">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Once the stereo model is computed, PIVTools can reconstruct three-component (3C) velocity
              fields from the 2D PIV data captured by each camera. The reconstruction uses the stereo
              geometry to triangulate corresponding velocity vectors.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Reconstruction Process</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                  <h5 className="font-semibold text-gray-900 mb-1">2D PIV (Cam 1)</h5>
                  <p className="text-gray-600 text-sm">u&apos;, v&apos; in image plane</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">2</div>
                  <h5 className="font-semibold text-gray-900 mb-1">2D PIV (Cam 2)</h5>
                  <p className="text-gray-600 text-sm">u&apos;&apos;, v&apos;&apos; in image plane</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                  <h5 className="font-semibold text-gray-900 mb-1">3D Velocity</h5>
                  <p className="text-gray-600 text-sm">u, v, w in world coordinates</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Input Requirements</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-soton-gold mt-0.5" size={16} />
                    <span>Valid stereo calibration model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-soton-gold mt-0.5" size={16} />
                    <span>2D PIV vectors from Camera 1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-soton-gold mt-0.5" size={16} />
                    <span>2D PIV vectors from Camera 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-soton-gold mt-0.5" size={16} />
                    <span>Matching grid coordinates between cameras</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Output Variables</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li><strong>u:</strong> Velocity component in x-direction (m/s)</li>
                  <li><strong>v:</strong> Velocity component in y-direction (m/s)</li>
                  <li><strong>w:</strong> Out-of-plane velocity component (m/s)</li>
                  <li><strong>x, y:</strong> World coordinates (mm)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> 3D reconstruction quality depends on stereo calibration accuracy
                and proper overlap between the PIV fields from both cameras. Ensure both cameras cover
                the same measurement region with matching interrogation windows.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Reconstruction Settings"
              code={`calibration:
  piv_type: instantaneous  # or ensemble
  stereo:
    camera_pair: [1, 2]
    dt: 0.0057553  # Used for velocity conversion`}
            />
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stereo calibration uses separate CLI commands: one to <strong>generate</strong> the stereo model
              from calibration images, and <code className="bg-gray-100 px-1 rounded">apply-stereo</code> to
              reconstruct 3D velocities from PIV vectors.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Generate Stereo Model</h4>
              <p className="text-gray-600 mb-4">
                Detect calibration targets from both cameras and generate the stereo calibration model.
              </p>
              <CodeBlock
                title="Stereo Model Generation Commands"
                code={`# Detect dot/circle grid and generate stereo model
pivtools-cli detect-stereo-planar

# Detect ChArUco board and generate stereo model
pivtools-cli detect-stereo-charuco

# Process specific paths
pivtools-cli detect-stereo-planar -p 0`}
              />

              <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-3">Options</h5>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Flag</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--active-paths, -p</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Comma-separated path indices</td>
                      <td className="px-6 py-4 text-sm text-gray-600">From config</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Reconstruct 3D Velocity</h4>
              <p className="text-gray-600 mb-4">
                Use the <code className="bg-gray-100 px-1 rounded">apply-stereo</code> command to reconstruct
                3D velocity vectors (ux, uy, uz) from the 2D PIV data of both cameras.
              </p>
              <CodeBlock
                title="Apply Stereo Calibration"
                code={`pivtools-cli apply-stereo [OPTIONS]`}
              />

              <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-3">Options</h5>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Flag</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--method, -m</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Stereo method: dotboard or charuco</td>
                      <td className="px-6 py-4 text-sm text-gray-600">From config</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--camera-pair, -c</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Camera pair as &quot;1,2&quot;</td>
                      <td className="px-6 py-4 text-sm text-gray-600">From config</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--type-name, -t</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Data type (instantaneous/ensemble)</td>
                      <td className="px-6 py-4 text-sm text-gray-600">instantaneous</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--runs, -r</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Comma-separated run numbers</td>
                      <td className="px-6 py-4 text-sm text-gray-600">All runs</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--active-paths, -p</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Comma-separated path indices</td>
                      <td className="px-6 py-4 text-sm text-gray-600">From config</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <CodeBlock
                title="Examples"
                code={`# Reconstruct 3D velocity (uses config settings)
pivtools-cli apply-stereo

# Specify camera pair explicitly
pivtools-cli apply-stereo --camera-pair 1,2

# Use charuco stereo model with specific method
pivtools-cli apply-stereo --method charuco -c 1,2

# Reconstruct specific runs
pivtools-cli apply-stereo -t instantaneous -r 1,2,3

# Process specific paths
pivtools-cli apply-stereo -p 0,1`}
              />
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Complete Stereo Workflow</h4>
              <CodeBlock
                title="Full Stereo PIV Workflow"
                code={`# 1. Generate stereo calibration model
pivtools-cli detect-stereo-charuco

# 2. Run PIV processing for both cameras
pivtools-cli instantaneous

# 3. Apply stereo 3D reconstruction
pivtools-cli apply-stereo --camera-pair 1,2

# 4. Compute statistics
pivtools-cli statistics`}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Tip:</strong> Use <code className="bg-blue-100 px-1 rounded">--method</code> to specify
                the stereo calibration method (dotboard or charuco) and <code className="bg-blue-100 px-1 rounded">--camera-pair</code>
                to specify which cameras to use for 3D reconstruction.
              </p>
            </div>
          </Section>

          {/* Complete YAML Configuration Section */}
          <Section title="Complete YAML Configuration" icon={<FileText size={32} />} id="yaml">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Complete reference for all stereo calibration settings in config.yaml.
            </p>

            <YamlDropdown
              title="Full YAML Configuration Example"
              defaultOpen={true}
              code={`calibration:
  # Active method selection
  active: stereo_dotboard  # stereo_dotboard or stereo_charuco
  piv_type: instantaneous  # instantaneous or ensemble

  # Calibration image settings (shared)
  image_format: calib_%03d.tif
  num_images: 15
  image_type: standard
  zero_based_indexing: false
  use_camera_subfolders: true
  subfolder: calibration
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first

  # Stereo Dotboard Method
  stereo_dotboard:
    camera_pair: [1, 2]
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.2222
    enhance_dots: false
    asymmetric: false
    dt: 0.0057553
    stereo_model_type: dotboard

  # Stereo ChArUco Method
  stereo_charuco:
    camera_pair: [1, 2]
    squares_h: 10
    squares_v: 9
    square_size: 0.03
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    dt: 0.0057553`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Field Mapping</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">GUI Control</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Field</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { gui: "Active Method Button", yaml: "calibration.active", desc: "stereo_dotboard or stereo_charuco" },
                      { gui: "Camera 1 Selector", yaml: "calibration.stereo_dotboard.camera_pair[0]", desc: "First camera in pair" },
                      { gui: "Camera 2 Selector", yaml: "calibration.stereo_dotboard.camera_pair[1]", desc: "Second camera in pair" },
                      { gui: "Pattern Columns", yaml: "calibration.stereo_dotboard.pattern_cols", desc: "Horizontal dot count" },
                      { gui: "Pattern Rows", yaml: "calibration.stereo_dotboard.pattern_rows", desc: "Vertical dot count" },
                      { gui: "Dot Spacing (mm)", yaml: "calibration.stereo_dotboard.dot_spacing_mm", desc: "Physical grid spacing" },
                      { gui: "Squares H", yaml: "calibration.stereo_charuco.squares_h", desc: "ChArUco horizontal squares" },
                      { gui: "Squares V", yaml: "calibration.stereo_charuco.squares_v", desc: "ChArUco vertical squares" },
                      { gui: "Square Size", yaml: "calibration.stereo_charuco.square_size", desc: "Square size in meters" },
                      { gui: "ArUco Dictionary", yaml: "calibration.stereo_charuco.aruco_dict", desc: "Marker dictionary type" }
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.gui}</td>
                        <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.yaml}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
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
              Visualise your calibrated 3D velocity fields with animated videos using the Video Maker tool.
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
