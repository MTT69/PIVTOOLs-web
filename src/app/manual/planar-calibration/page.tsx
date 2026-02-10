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
  AlertTriangle,
  Info,
  Crosshair,
  Globe,
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
              Four methods available depending on your optical setup and accuracy requirements.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Target size={32} />} id="overview">
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
                    { method: "Scale Factor", type: "Uniform", best: "Telecentric lenses, quick analysis", target: "Known px/mm ratio" },
                    { method: "Dotboard", type: "Spatially-varying", best: "Standard PIV with lens distortion", target: "Circular dot grid, 10-20 images" },
                    { method: "ChArUco", type: "Spatially-varying", best: "Partial occlusion, oblique angles", target: "ChArUco board, multiple images" },
                    { method: "Polynomial (XML)", type: "Spatially-varying", best: "LaVision DaVis users", target: "Calibration.xml from DaVis" },
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

            <p className="text-gray-700 leading-relaxed">
              <strong>Uniform calibration</strong> (Scale Factor) applies the same conversion everywhere:
              {' '}<code className="bg-gray-100 px-2 py-1 rounded text-sm">velocity = (pixels / px_per_mm) / (dt * 1000)</code>.
              {' '}<strong>Spatially-varying methods</strong> (Dotboard, ChArUco, Polynomial) compute different
              conversion factors across the image to correct for lens distortion.
            </p>
          </Section>

          {/* Calibration Image Setup */}
          <Section title="Calibration Image Setup" icon={<Camera size={32} />} id="image-setup">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Dotboard and ChArUco methods require calibration target images. Configure the image
              source before running detection.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Directory Structure</h3>
            <p className="text-gray-700 mb-4">
              The <code className="bg-gray-100 px-2 py-1 rounded text-sm">path_order</code> setting
              controls how camera and calibration subfolders are nested.
            </p>

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
                    { setting: "Image Format", yaml: "image_format", desc: "Filename pattern (e.g. calib_%02d.tif)" },
                    { setting: "Number of Images", yaml: "num_images", desc: "Total calibration images to process" },
                    { setting: "Image Type", yaml: "image_type", desc: "standard, cine, lavision_set, lavision_im7" },
                    { setting: "Zero-Based Indexing", yaml: "zero_based_indexing", desc: "Start image numbering from 0" },
                    { setting: "Camera Subfolders", yaml: "use_camera_subfolders", desc: "Enable per-camera subdirectories" },
                    { setting: "Path Order", yaml: "path_order", desc: "camera_first or calibration_first" },
                    { setting: "Subfolder Name", yaml: "subfolder", desc: "Calibration subfolder name" },
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

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Platform Note</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                LaVision formats (.im7, .set) require lvpyio, available on Windows and Linux only.
                macOS users should export calibration images to TIFF.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Calibration Image Settings"
              code={`calibration:
  image_format: calib_%02d.tif
  num_images: 19
  image_type: standard
  zero_based_indexing: false
  use_camera_subfolders: true
  subfolder: calibration
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first`}
            />
          </Section>

          {/* Scale Factor */}
          <Section title="Scale Factor" icon={<Ruler size={32} />} id="scale-factor">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Uniform px-to-mm conversion. No calibration images needed -- just enter the
              known pixel-to-mm ratio and the time between laser pulses.
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
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">source_path_idx</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Which source path to calibrate</td>
                    <td className="px-6 py-4 text-sm text-gray-600">0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Select source path from the dropdown",
                "Enter dt (time between frames in seconds)",
                "Enter px_per_mm (pixels per millimetre)",
                "Click \"Calibrate Vectors\" to apply",
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

            <YamlDropdown
              title="config.yaml - Scale Factor"
              code={`calibration:
  active: scale_factor
  scale_factor:
    dt: 0.56
    px_per_mm: 3.41
    source_path_idx: 0`}
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
                    { param: "pattern_cols", desc: "Horizontal dot count", def: "10" },
                    { param: "pattern_rows", desc: "Vertical dot count", def: "10" },
                    { param: "dot_spacing_mm", desc: "Physical spacing between dot centres (mm)", def: "28.89" },
                    { param: "asymmetric", desc: "Asymmetric grid pattern", def: "false" },
                    { param: "dt", desc: "Time between frames (seconds)", def: "1.0" },
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

            <h3 className="text-xl font-bold text-gray-900 mb-3">Detection Algorithm</h3>
            <p className="text-gray-700 mb-4">
              Histogram-based blob detection determines image polarity automatically (dark dots on
              light or vice versa). Detected dots are linked into a grid using{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">cKDTree</code> nearest-neighbour
              search. A RANSAC homography filters outliers before OpenCV{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">calibrateCamera</code> computes
              the camera model.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Configure calibration images (format, count, subfolder)",
                "Set grid parameters (cols, rows, dot spacing)",
                "Use \"Detect One\" to preview detection on a single frame -- detected dots are overlaid on the image",
                "Click \"Generate Model\" to run detection on all frames and compute the camera model",
                "Review RMS reprojection error (target: < 0.5 px)",
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
                  <li><strong>Camera Matrix:</strong> fx, fy, cx, cy</li>
                  <li><strong>Distortion:</strong> 5 radial/tangential coefficients</li>
                  <li><strong>Extrinsics:</strong> Rotation + translation per frame</li>
                  <li><strong>RMS Error:</strong> Reprojection quality metric</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Output Directory</h4>
                <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-2">
                  base_path/calibration/Cam1/dotboard_planar/<br />
                  ├── model/dotboard_model.mat<br />
                  ├── indices/indexing_*.mat<br />
                  └── figures/
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Multi-camera:</strong> When processing all cameras, each camera runs in a
                separate thread with its own calibrator instance for maximum parallelism.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - Dotboard"
              code={`calibration:
  active: dotboard
  dotboard:
    camera: 1
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.22
    asymmetric: false
    dt: 0.0057553
    source_path_idx: 0`}
            />
          </Section>

          {/* ChArUco */}
          <Section title="Planar ChArUco" icon={<QrCode size={32} />} id="charuco">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Combines a chessboard pattern with ArUco markers. The markers identify which corners
              are visible, so detection works with partial occlusion and at oblique viewing angles.
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
                    { param: "squares_v", desc: "Vertical square count", def: "9" },
                    { param: "square_size", desc: "Square size in metres", def: "0.03" },
                    { param: "marker_ratio", desc: "Marker size relative to square", def: "0.5" },
                    { param: "aruco_dict", desc: "ArUco dictionary type", def: "DICT_4X4_1000" },
                    { param: "min_corners", desc: "Minimum corners to accept a frame", def: "6" },
                    { param: "dt", desc: "Time between frames (seconds)", def: "1.0" },
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
              apply to vectors, and set as active.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Output Directory</h3>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
              base_path/calibration/Cam1/charuco_planar/<br />
              ├── model/camera_model.mat<br />
              └── indices/indexing_*.mat
            </div>

            <YamlDropdown
              title="config.yaml - ChArUco"
              code={`calibration:
  active: charuco
  charuco:
    camera: 1
    squares_h: 10
    squares_v: 9
    square_size: 0.03
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    dt: 0.0057553
    source_path_idx: 0`}
            />
          </Section>

          {/* Polynomial */}
          <Section title="Polynomial (LaVision XML)" icon={<FileCode size={32} />} id="polynomial">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Imports 3rd-order polynomial calibration coefficients from a LaVision DaVis
              {' '}<code className="bg-gray-100 px-1 rounded text-sm">Calibration.xml</code> file.
              No target detection step required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">XML Mode (default)</h4>
                <p className="text-purple-700 text-sm">
                  Enable <code className="bg-purple-100 px-1 rounded">use_xml: true</code>.
                  Reads coefficients directly from the XML file. Default location:
                  {' '}<code className="bg-purple-100 px-1 rounded text-xs">source_path/Calibration.xml</code>.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Manual Entry Mode</h4>
                <p className="text-gray-700 text-sm">
                  Set <code className="bg-gray-100 px-1 rounded">use_xml: false</code> and enter
                  10 polynomial coefficients per axis manually:
                  {' '}<code className="text-xs bg-gray-100 px-1 rounded">1, s, s2, s3, t, t2, t3, st, s2t, st2</code>.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Per-Camera Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: "origin.x, origin.y", desc: "Normalisation origin (s_o, t_o)" },
                    { param: "normalisation.nx, .ny", desc: "Normalisation scale factors" },
                    { param: "mm_per_pixel", desc: "Pixel-to-mm conversion factor" },
                    { param: "coefficients_x", desc: "10-element array for x displacement" },
                    { param: "coefficients_y", desc: "10-element array for y displacement" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.param}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Enable \"Use XML\" toggle (default on)",
                "Set XML path or leave empty for default location",
                "Click \"Load XML\" to populate coefficients",
                "Click \"Calibrate Vectors\" to apply",
                "Click \"Set as Active\"",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Setting the Datum</h3>
            <p className="text-gray-700 mb-4">
              After calibration, use the <strong>Set Datum</strong> control to shift the coordinate origin.
              This applies x/y offsets to the coordinates of all runs in the selected data type.
            </p>

            <YamlDropdown
              title="config.yaml - Polynomial"
              code={`calibration:
  active: polynomial
  polynomial:
    xml_path: ''
    use_xml: true
    dt: 0.0057553
    source_path_idx: 0
    cameras:
      1:
        origin: {x: 0.0, y: 0.0}
        normalisation: {nx: 512.0, ny: 384.0}
        mm_per_pixel: 0.0
        coefficients_x: []
        coefficients_y: []`}
            />
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
              code={`# Dotboard detection
pivtools-cli detect-planar

# ChArUco detection
pivtools-cli detect-charuco

# Process specific camera
pivtools-cli detect-planar --camera 1

# Process specific paths
pivtools-cli detect-planar -p 0,1`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Apply Calibration</h3>
            <CodeBlock
              title="Apply Calibration"
              code={`# Use active method from config.yaml
pivtools-cli apply-calibration

# Override method
pivtools-cli apply-calibration --method dotboard
pivtools-cli apply-calibration --method charuco
pivtools-cli apply-calibration --method scale_factor

# Specific camera + data type
pivtools-cli apply-calibration --camera 1 --type-name ensemble

# Specific runs
pivtools-cli apply-calibration -r 1,2,3`}
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
                    { flag: "--method, -m", desc: "Calibration method: dotboard, charuco, scale_factor", def: "From config" },
                    { flag: "--camera, -c", desc: "Camera number", def: "All cameras" },
                    { flag: "--type-name, -t", desc: "Data type (instantaneous / ensemble)", def: "instantaneous" },
                    { flag: "--runs, -r", desc: "Comma-separated run numbers", def: "All runs" },
                    { flag: "--active-paths, -p", desc: "Comma-separated path indices", def: "From config" },
                    { flag: "--align-coordinates", desc: "Apply global coordinate alignment after calibration", def: "Off" },
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
              code={`# 1. Detect calibration targets
pivtools-cli detect-planar       # or detect-charuco

# 2. Run PIV processing
pivtools-cli instantaneous

# 3. Apply calibration to vectors
pivtools-cli apply-calibration`}
            />
          </Section>

          {/* YAML */}
          <Section title="Complete YAML Reference" icon={<FileText size={32} />} id="yaml">
            <YamlDropdown
              title="Full Planar Calibration Configuration"
              defaultOpen={true}
              code={`calibration:
  # Active method
  active: dotboard  # scale_factor, dotboard, charuco, polynomial
  piv_type: instantaneous

  # Calibration image settings
  image_format: calib_%02d.tif
  num_images: 19
  image_type: standard
  zero_based_indexing: false
  use_camera_subfolders: true
  subfolder: calibration
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first

  # Scale Factor
  scale_factor:
    dt: 0.56
    px_per_mm: 3.41
    source_path_idx: 0

  # Dotboard
  dotboard:
    camera: 1
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.22
    asymmetric: false
    dt: 0.0057553
    source_path_idx: 0

  # ChArUco
  charuco:
    camera: 1
    squares_h: 10
    squares_v: 9
    square_size: 0.03
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    dt: 0.0057553
    source_path_idx: 0

  # Polynomial (LaVision XML)
  polynomial:
    xml_path: ''
    use_xml: true
    dt: 0.0057553
    source_path_idx: 0
    cameras:
      1:
        origin: {x: 0.0, y: 0.0}
        normalisation: {nx: 512.0, ny: 384.0}
        mm_per_pixel: 0.0
        coefficients_x: []
        coefficients_y: []`}
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

          {/* Global Coordinate System */}
          <Section title="Global Coordinate System" icon={<Globe size={32} />} id="global-coordinates">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For multi-camera setups, the Global Coordinate System aligns all cameras into a single
              physical coordinate frame. It uses a chain topology (camera N to camera N+1) with
              shared overlap features between adjacent camera pairs.
            </p>

            <FeatureList items={[
              "Chain topology: N cameras require N-1 adjacent overlap pairs",
              "Datum point defines the coordinate origin (pixel + physical position)",
              "Overlap features link adjacent cameras via shared physical points",
              "Automatic Invert Ux detection based on feature position relative to datum",
              "Applied automatically after calibration in both GUI and CLI",
            ]} />

            <h3 className="text-xl font-bold text-gray-900 mb-4">Configuration</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Setting</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: "enabled", desc: "Enable global coordinate alignment" },
                    { setting: "datum_pixel", desc: "Pixel coordinates of the datum point {x, y}" },
                    { setting: "datum_physical", desc: "Physical coordinates of the datum point {x, y} in mm" },
                    { setting: "datum_frame", desc: "Frame number containing the datum point" },
                    { setting: "overlap_pairs", desc: "List of adjacent camera pairs with shared pixel features" },
                    { setting: "invert_ux", desc: "Negate ux velocity and reflect x-coordinates (auto-detected or manual)" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.setting}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Open the calibration image viewer and navigate to the Global Coordinates panel",
                "Set the datum point by clicking a known physical location on camera 1",
                "Enter the physical coordinates (mm) of the datum point",
                "For each adjacent camera pair, select overlap features visible in both cameras",
                "Invert Ux is auto-detected; override manually if needed",
                "Alignment is applied automatically when calibrating vectors",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">CLI Usage</h3>
            <CodeBlock
              title="Global Coordinate CLI"
              code={`# Apply alignment after calibration in one step
pivtools-cli apply-calibration --align-coordinates

# Or as a standalone command on already-calibrated data
pivtools-cli align-coordinates

# Process specific paths
pivtools-cli align-coordinates -p 0,1`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Invert Ux</h3>
            <p className="text-gray-700 mb-4">
              When the first overlap feature is to the left of the datum origin, the x-axis
              direction is automatically inverted. This negates{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">ux</code> and{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">UV_stress</code> in all
              cameras and reflects x-coordinates around the datum physical x-position in{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">coordinates.mat</code>.
            </p>

            <YamlDropdown
              title="config.yaml - Global Coordinates"
              code={`calibration:
  global_coordinates:
    enabled: true
    datum_pixel: {x: 512, y: 384}
    datum_physical: {x: 0.0, y: 0.0}
    datum_frame: 1
    invert_ux: false
    overlap_pairs:
      - camera_a: 1
        camera_b: 2
        pixel_on_a: {x: 1020, y: 400}
        pixel_on_b: {x: 5, y: 398}
        frame_a: 1
        frame_b: 1`}
            />

            <div className="mt-6 p-4 bg-soton-lightblue border border-soton-blue/20 rounded-lg">
              <p className="text-gray-700">
                For a more detailed guide including camera participation rules, complete YAML field reference,
                and step-by-step workflow, see the dedicated{' '}
                <Link href="/manual/global-coordinates" className="text-soton-blue font-semibold hover:underline">
                  Global Coordinates
                </Link>{' '}
                page.
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
