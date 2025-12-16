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
  Settings,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
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
              Convert pixel displacements to physical units (mm, m/s) using calibration targets.
              PIVTools supports four planar calibration methods to match your experimental setup
              and accuracy requirements.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              Calibration converts raw PIV results from pixel displacements to physical velocity units.
              The calibration process typically involves capturing images of a known target, then using
              these to compute the mapping from image coordinates to world coordinates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "1. Configure Images", desc: "Set up calibration target images" },
                { label: "2. Choose Method", desc: "Scale Factor, Dotboard, ChArUco, or Polynomial" },
                { label: "3. Generate Model", desc: "Compute camera parameters" },
                { label: "4. Apply to Vectors", desc: "Calibrate PIV results" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <Section title="Overview" icon={<Target size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIV processing produces velocity fields in units of pixels per frame. To obtain
              physically meaningful results, you need to calibrate the data to convert to real-world
              units (typically m/s). The choice of calibration method depends on your optical setup
              and the level of accuracy required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Uniform Calibration</h4>
                <p className="text-blue-700 mb-4">
                  <strong>Scale Factor method:</strong> Applies the same conversion factor everywhere
                  in the image. Best for telecentric lenses, small fields of view, or preliminary analysis.
                </p>
                <div className="bg-white rounded-lg p-3 text-sm">
                  <code className="text-blue-600">velocity = (pixels / px_per_mm) / dt</code>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Spatially-Varying Calibration</h4>
                <p className="text-green-700 mb-4">
                  <strong>Dotboard, ChArUco, Polynomial:</strong> Accounts for lens distortion by computing
                  different conversion factors across the image. Essential for accurate measurements.
                </p>
                <div className="bg-white rounded-lg p-3 text-sm">
                  <code className="text-green-600">velocity = f(x, y, pixels, dt)</code>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each Method</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Scale Factor</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Quick analysis, telecentric lenses</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Known px/mm ratio, time step</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Planar Dotboard</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Standard PIV with lens distortion</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Circular dot grid target, 10-20 images</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Planar ChArUco</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Robust detection, partial occlusion</td>
                    <td className="px-6 py-4 text-sm text-gray-600">ChArUco board, multiple images</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Polynomial (XML)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">LaVision DaVis users</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Calibration.xml from DaVis export</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Calibration Image Setup Section */}
          <Section title="Calibration Image Setup" icon={<Camera size={32} />} id="image-setup">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Before running calibration, you need to configure how PIVTools locates your calibration
              target images. This setup differs from PIV image configuration in several important ways,
              particularly around directory structure and camera subfolder handling.
            </p>

            {/* Path Order */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Path Order Options</h4>
              </div>
              <p className="text-gray-600 mb-4">
                When using camera subfolders for multi-camera setups, you can choose how the directory
                structure is organised. This flexibility accommodates different lab conventions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">camera_first (default)</h5>
                  <p className="text-blue-700 text-sm mb-2">Camera folder contains calibration subfolder</p>
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
                  <p className="text-green-700 text-sm mb-2">Calibration folder contains camera subfolders</p>
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

              <YamlDropdown
                code={`calibration:
  path_order: camera_first  # or calibration_first
  subfolder: calibration    # subfolder name within path`}
              />
            </div>

            {/* IM7 Container Format */}
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-purple-600" size={20} />
                <h4 className="text-lg font-semibold text-purple-800">IM7 Container Format Handling</h4>
              </div>
              <p className="text-purple-700 mb-4">
                LaVision IM7 files can contain data from multiple cameras in a single file, or
                each camera can have its own files in separate subfolders. The
                <code className="bg-purple-100 px-2 py-1 rounded mx-1">use_camera_subfolders</code>
                setting controls which mode PIVTools expects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Multi-camera IM7 (default)</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Set <code className="bg-gray-100 px-1 rounded">use_camera_subfolders: false</code>.
                    Each .im7 file contains data for all cameras.
                  </p>
                  <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                    source_path/<br />
                    └── calibration/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;├── B00001.im7 (Cam1+Cam2)<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;└── B00002.im7
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Single-camera IM7</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Set <code className="bg-gray-100 px-1 rounded">use_camera_subfolders: true</code>.
                    Each camera&apos;s .im7 files are in separate subdirectories.
                  </p>
                  <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                    source_path/<br />
                    ├── Cam1/B00001.im7<br />
                    ├── Cam1/B00002.im7<br />
                    ├── Cam2/B00001.im7<br />
                    └── Cam2/B00002.im7
                  </div>
                </div>
              </div>
            </div>

            {/* GUI Controls Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">GUI Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Image Type", desc: "Standard, CINE, LaVision SET, LaVision IM7" },
                  { name: "Image Format", desc: "Filename pattern (e.g., calib%05d.tif)" },
                  { name: "Number of Images", desc: "Total calibration images to process" },
                  { name: "Calibration Subfolder", desc: "Subfolder within source path" },
                  { name: "Use Camera Subfolders", desc: "Toggle for multi-camera organisation" },
                  { name: "Path Order", desc: "camera_first or calibration_first" },
                  { name: "Camera Subfolder Names", desc: "Custom names (e.g., View_Left, View_Right)" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="text-soton-gold mt-1 flex-shrink-0" size={16} />
                    <div>
                      <span className="font-medium text-gray-900">{item.name}:</span>
                      <span className="text-gray-600 ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Platform Compatibility</h4>
              </div>
              <p className="text-yellow-700">
                <strong>LaVision formats</strong> (.im7, .set) require the ReadIMX library which is only available
                on <strong>Windows and Linux</strong>. macOS users should export calibration images to TIFF format.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - Calibration Image Settings"
              code={`calibration:
  # Image file settings
  image_format: planar_calibration_plate_%02d.tif
  num_images: 19
  image_type: standard  # standard, cine, lavision_set, lavision_im7
  zero_based_indexing: false

  # Directory structure
  use_camera_subfolders: true
  subfolder: enhanced
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first  # or calibration_first`}
            />
          </Section>

          {/* Scale Factor Method Section */}
          <Section title="Scale Factor Method" icon={<Ruler size={32} />} id="scale-factor">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The simplest calibration method. Scale Factor applies a uniform conversion from pixels
              to millimeters across the entire image. No calibration target images are required -
              you just need to know the pixel-to-mm ratio and the time between frames.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Conversion Formula</h4>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm mb-4">
                  <p className="text-gray-700">x_mm = x_px / px_per_mm</p>
                  <p className="text-gray-700 mt-2">v_ms = (v_px / px_per_mm) / (dt &times; 1000)</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Where <code className="bg-gray-100 px-1 rounded">px_per_mm</code> is the number of pixels
                  per millimeter, and <code className="bg-gray-100 px-1 rounded">dt</code> is the time
                  between frames in seconds.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">How to Measure px_per_mm</h4>
                <ol className="text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Place a ruler or known-size object in the field of view</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Capture an image and measure the pixel distance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Divide pixels by millimeters</span>
                  </li>
                </ol>
                <div className="bg-white rounded-lg p-3 mt-4 text-sm">
                  <strong>Example:</strong> 1024 px across 300 mm = 3.41 px/mm
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
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">dt</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Time between frames (seconds)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">0.56</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">px_per_mm</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Pixels per millimeter</td>
                    <td className="px-6 py-4 text-sm text-gray-600">3.41</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">source_path_idx</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Which source path to use</td>
                    <td className="px-6 py-4 text-sm text-gray-600">0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">GUI Workflow</h4>
              <ol className="space-y-2">
                {[
                  "Select source path from dropdown",
                  "Enter Δt (time between frames in seconds)",
                  "Enter px_per_mm (from your measurement)",
                  "Click \"Calibrate Vectors\" to apply calibration",
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

            <YamlDropdown
              title="YAML Reference - Scale Factor"
              code={`calibration:
  active: scale_factor
  scale_factor:
    dt: 0.56           # Time between frames (seconds)
    px_per_mm: 3.41    # Pixels per millimeter
    source_path_idx: 0 # Which source path to use`}
            />
          </Section>

          {/* Planar Dotboard Section */}
          <Section title="Planar Dotboard (Pinhole)" icon={<Grid3X3 size={32} />} id="dotboard">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Planar Dotboard calibration uses OpenCV&apos;s pinhole camera model to compute intrinsic
              parameters (focal length, principal point) and distortion coefficients from images of
              a circular dot grid target. This method provides spatially-varying calibration that
              corrects for lens distortion.
            </p>

            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400 mb-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Requirements</h4>
              <ul className="text-green-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>Calibration target with regular grid of circular dots</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>Multiple images from different angles (typically 10-20)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                  <span>Known physical spacing between dots</span>
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
                    { param: "pattern_cols", desc: "Horizontal dot count", example: "10" },
                    { param: "pattern_rows", desc: "Vertical dot count", example: "10" },
                    { param: "dot_spacing_mm", desc: "Physical spacing between dots", example: "12.22" },
                    { param: "enhance_dots", desc: "Pre-processing for low contrast images", example: "false" },
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
                  "Set grid detection parameters (cols, rows, spacing)",
                  "Browse calibration images to verify detection works",
                  "Click \"Generate Model\" to run calibration",
                  "Review camera matrix and RMS reprojection error",
                  "Click \"Calibrate Vectors\" to apply to PIV data",
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
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Outputs</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li><strong>Camera Matrix:</strong> Intrinsic parameters (fx, fy, cx, cy)</li>
                  <li><strong>Distortion Coefficients:</strong> 5 radial/tangential params</li>
                  <li><strong>Extrinsics:</strong> Rotation and translation vectors</li>
                  <li><strong>RMS Error:</strong> Reprojection error (quality metric)</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Output Directory</h4>
                <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3">
                  base_path/<br />
                  └── calibration/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── Cam1/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── pinhole_planar/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── model/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── indices/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── figures/
                </div>
              </div>
            </div>

            <YamlDropdown
              title="YAML Reference - Pinhole Calibration"
              code={`calibration:
  active: pinhole
  pinhole:
    camera: 1
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.22
    enhance_dots: false
    asymmetric: false
    grid_tolerance: 0.5
    ransac_threshold: 3
    dt: 0.0057553
    source_path_idx: 0
    image_index: 0`}
            />
          </Section>

          {/* Planar ChArUco Section */}
          <Section title="Planar ChArUco" icon={<QrCode size={32} />} id="charuco">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              ChArUco calibration combines a chessboard pattern with ArUco markers for robust detection.
              The ArUco markers allow identification of which corners are visible, making this method
              work even with partial occlusion or at oblique viewing angles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Advantages over Dotboard</h4>
                <ul className="text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>Works with partial visibility (markers identify corners)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>More robust in low contrast conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-1 flex-shrink-0" size={16} />
                    <span>Easier detection at oblique angles</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">ArUco Dictionary Options</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Different marker sizes and quantities. Larger dictionaries allow more unique markers.
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
                    { param: "squares_h", desc: "Horizontal squares", example: "10" },
                    { param: "squares_v", desc: "Vertical squares", example: "9" },
                    { param: "square_size", desc: "Square size in meters", example: "0.03" },
                    { param: "marker_ratio", desc: "Marker size relative to square", example: "0.5" },
                    { param: "aruco_dict", desc: "ArUco dictionary type", example: "DICT_4X4_1000" },
                    { param: "min_corners", desc: "Minimum corners to accept frame", example: "6" },
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
                <strong>GUI Workflow:</strong> Same as Dotboard - configure images, set parameters,
                generate model, apply to vectors, and set as active method.
              </p>
            </div>

            <YamlDropdown
              title="YAML Reference - ChArUco Calibration"
              code={`calibration:
  active: charuco
  charuco:
    camera: 1
    squares_h: 10
    squares_v: 9
    square_size: 0.03      # meters
    marker_ratio: 0.5
    aruco_dict: DICT_4X4_1000
    min_corners: 6
    dt: 0.0057553
    source_path_idx: 0
    file_pattern: '*.tif'`}
            />
          </Section>

          {/* Polynomial Section */}
          <Section title="Polynomial (LaVision XML)" icon={<FileCode size={32} />} id="polynomial">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Polynomial calibration uses 3rd-order polynomial coefficients exported from LaVision DaVis
              software. This method reads the standard Calibration.xml file format and applies
              polynomial distortion correction to convert pixel coordinates to world coordinates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Use XML Mode (Default)</h4>
                <p className="text-purple-700 mb-4">
                  Automatically reads polynomial coefficients from Calibration.xml file.
                  This is the standard approach for LaVision DaVis users.
                </p>
                <div className="bg-white rounded-lg p-3 text-sm">
                  <strong>Default location:</strong><br />
                  <code className="text-purple-600">source_path/calibration/Calibration.xml</code>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Manual Entry Mode</h4>
                <p className="text-gray-700 mb-4">
                  Disable &quot;Use XML&quot; to manually enter polynomial coefficients.
                  Useful when XML is not available or coefficients are from another source.
                </p>
                <div className="bg-white rounded-lg p-3 text-sm">
                  <strong>10 coefficients per axis:</strong><br />
                  <code className="text-gray-600">1, s, s&sup2;, s&sup3;, t, t&sup2;, t&sup3;, st, s&sup2;t, st&sup2;</code>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-4">Parameters per Camera</h4>
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
                    { param: "normalisation.nx, normalisation.ny", desc: "Normalisation scale factors" },
                    { param: "mm_per_pixel", desc: "Pixel per mm conversion factor" },
                    { param: "coefficients_x", desc: "10-element array for horizontal displacement (dx)" },
                    { param: "coefficients_y", desc: "10-element array for vertical displacement (dy)" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.param}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">GUI Workflow</h4>
              <ol className="space-y-2">
                {[
                  "Enable \"Use XML values\" toggle (default)",
                  "Set XML path (or leave empty for default location)",
                  "Coefficients auto-populate from XML",
                  "Click \"Calibrate Vectors\" to apply calibration",
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

            <YamlDropdown
              title="YAML Reference - Polynomial Calibration"
              code={`calibration:
  active: polynomial
  polynomial:
    xml_path: ''        # Leave empty for default location
    use_xml: true       # Set false for manual entry
    dt: 0.0057553
    source_path_idx: 0
    cameras:
      1:
        origin: {x: 0.0, y: 0.0}
        normalisation: {nx: 512.0, ny: 384.0}
        mm_per_pixel: 0.0
        coefficients_x: []  # 10 coefficients
        coefficients_y: []  # 10 coefficients
      2:
        origin: {x: 0.0, y: 0.0}
        normalisation: {nx: 512.0, ny: 384.0}
        mm_per_pixel: 0.0
        coefficients_x: []
        coefficients_y: []`}
            />
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Calibration uses two separate CLI commands: one to <strong>generate</strong> the camera model
              from calibration images, and one to <strong>apply</strong> the calibration to PIV vectors.
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Generate Camera Model</h4>
              <p className="text-gray-600 mb-4">
                Detect calibration targets and generate camera model files.
              </p>
              <CodeBlock
                title="Model Generation Commands"
                code={`# Detect dot/circle grid and generate camera model
pivtools-cli detect-planar

# Detect ChArUco board and generate camera model
pivtools-cli detect-charuco

# Process specific camera only
pivtools-cli detect-planar --camera 1

# Process specific paths
pivtools-cli detect-planar -p 0,1`}
              />
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Apply Calibration to Vectors</h4>
              <p className="text-gray-600 mb-4">
                Apply the generated camera model to convert PIV vectors from pixels to physical units.
                Use the <code className="bg-gray-100 px-1 rounded">--method</code> flag to override the
                calibration method from config.yaml.
              </p>
              <CodeBlock
                title="Apply Calibration"
                code={`pivtools-cli apply-calibration [OPTIONS]`}
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
                      <td className="px-6 py-4 text-sm text-gray-600">Calibration method: pinhole, charuco, or scale_factor</td>
                      <td className="px-6 py-4 text-sm text-gray-600">From config</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">--camera, -c</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Camera number to process</td>
                      <td className="px-6 py-4 text-sm text-gray-600">All from config</td>
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
                code={`# Calibrate using method from config.yaml
pivtools-cli apply-calibration

# Override with pinhole calibration method
pivtools-cli apply-calibration --method pinhole

# Use scale factor calibration
pivtools-cli apply-calibration --method scale_factor

# Calibrate camera 1 with charuco method
pivtools-cli apply-calibration --method charuco --camera 1

# Calibrate ensemble data
pivtools-cli apply-calibration --type-name ensemble

# Process specific paths and runs
pivtools-cli apply-calibration -c 1 -t instantaneous -r 1,2,3`}
              />
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Complete Workflow</h4>
              <CodeBlock
                title="Full Calibration Workflow"
                code={`# 1. Generate camera model from calibration images
pivtools-cli detect-planar

# 2. Run PIV processing
pivtools-cli instantaneous

# 3. Apply calibration to vectors (uses config method)
pivtools-cli apply-calibration

# Or specify method explicitly
pivtools-cli apply-calibration --method pinhole`}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Tip:</strong> Use <code className="bg-blue-100 px-1 rounded">--method</code> to override
                the calibration method from config.yaml. Available methods:
                <code className="bg-blue-100 px-1 rounded ml-1">pinhole</code>,
                <code className="bg-blue-100 px-1 rounded ml-1">charuco</code>, and
                <code className="bg-blue-100 px-1 rounded ml-1">scale_factor</code>.
              </p>
            </div>
          </Section>

          {/* Complete YAML Configuration Section */}
          <Section title="Complete YAML Configuration" icon={<FileText size={32} />} id="yaml">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For power users who prefer direct YAML configuration, here&apos;s a complete reference with all
              calibration-related options.
            </p>

            <YamlDropdown
              title="Full YAML Configuration Example"
              defaultOpen={true}
              code={`calibration:
  # Active method selection
  active: pinhole  # scale_factor, pinhole, charuco, polynomial
  piv_type: instantaneous  # instantaneous or ensemble

  # Calibration image settings
  image_format: planar_calibration_plate_%02d.tif
  num_images: 19
  image_type: standard  # standard, cine, lavision_set, lavision_im7
  zero_based_indexing: false
  use_camera_subfolders: true
  subfolder: enhanced
  camera_subfolders: ["Cam1", "Cam2"]
  path_order: camera_first  # or calibration_first

  # Scale Factor Method
  scale_factor:
    dt: 0.56
    px_per_mm: 3.41
    source_path_idx: 0

  # Pinhole (Dotboard) Method
  pinhole:
    camera: 1
    pattern_cols: 10
    pattern_rows: 10
    dot_spacing_mm: 12.22
    enhance_dots: false
    asymmetric: false
    grid_tolerance: 0.5
    ransac_threshold: 3
    dt: 0.0057553
    source_path_idx: 0

  # ChArUco Method
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

  # Polynomial (LaVision XML) Method
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
                      { gui: "Active Method Button", yaml: "calibration.active", desc: "scale_factor, pinhole, charuco, polynomial" },
                      { gui: "PIV Type Selector", yaml: "calibration.piv_type", desc: "instantaneous or ensemble" },
                      { gui: "Image Format", yaml: "calibration.image_format", desc: "Calibration image filename pattern" },
                      { gui: "Number of Images", yaml: "calibration.num_images", desc: "Total calibration images" },
                      { gui: "Image Type", yaml: "calibration.image_type", desc: "standard, cine, lavision_set, lavision_im7" },
                      { gui: "Use Camera Subfolders", yaml: "calibration.use_camera_subfolders", desc: "Enable camera subfolder organisation" },
                      { gui: "Path Order", yaml: "calibration.path_order", desc: "camera_first or calibration_first" },
                      { gui: "Calibration Subfolder", yaml: "calibration.subfolder", desc: "Subfolder within source path" },
                      { gui: "Camera Subfolder Names", yaml: "calibration.camera_subfolders", desc: "Custom folder names array" }
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
              Now that your vectors are calibrated, create animated visualisations of your
              velocity fields using the Video Maker tool.
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
