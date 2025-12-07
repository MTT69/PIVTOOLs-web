'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  FolderOpen,
  Camera,
  FileText,
  Layers,
  CheckCircle,
  AlertTriangle,
  Database,
  FileCheck,
  HardDrive,
  ChevronDown,
  ChevronRight,
  Info,
  Settings,
  List
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

export default function ImageConfigurationPage() {
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
              Image <span className="text-soton-gold">Configuration</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Configure image paths, camera setups, file formats, and frame pairing for your PIV experiments.
              This section covers everything you need to tell PIVTools where your raw images are located
              and how they should be interpreted.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The Image Configuration panel is found on the <strong>Setup</strong> tab in the PIVTools GUI.
              It handles everything from locating your raw images to defining how frame pairs are formed.
              Proper configuration here ensures that PIVTools can correctly read your experimental data
              and produce accurate velocity fields.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "1. Set Paths", desc: "Source & output directories" },
                { label: "2. Choose Type", desc: "Standard, CINE, or LaVision" },
                { label: "3. Configure", desc: "Cameras & pairing mode" },
                { label: "4. Validate", desc: "Check files are found" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Source & Base Directories Section */}
          <Section title="Source & Base Directories" icon={<FolderOpen size={32} />} id="directories">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Start by telling PIVTools where your raw images are located and where to save results.
              These paths form the foundation of your processing pipeline. The source path points to
              your experimental image data, while the base path defines where all processed outputs
              (vector fields, statistics, videos, and calibration data) will be stored.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <FolderOpen className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Source Path</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  The folder containing your <strong>raw PIV images</strong>. Click the folder icon or paste the path directly.
                  This is where PIVTools will look for your image files based on the filename pattern you specify.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-blue-700 text-sm">
                    <strong>Tip:</strong> You can add multiple source paths and switch between them using the dropdown selector.
                    This is useful when you have multiple experimental runs with the same settings.
                  </p>
                </div>
                <YamlDropdown
                  code={`paths:
  source_paths:
    - /data/experiment_01/raw_images
    - /data/experiment_02/raw_images`}
                />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Base Path</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Where <strong>processed results</strong> will be saved. PIVTools creates a structured directory hierarchy here,
                  organising outputs by camera, processing type, and pass number for easy navigation.
                </p>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <p className="text-green-700 text-sm">
                    Results include: vector fields (.mat), statistics, videos, and calibration data.
                    Each source path should have a corresponding base path at the same array index.
                  </p>
                </div>
                <YamlDropdown
                  code={`paths:
  base_paths:
    - /data/experiment_01/results
    - /data/experiment_02/results`}
                />
              </div>
            </div>

            {/* Multiple Paths for Batch Processing - NEW SECTION */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <List className="text-purple-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Batch Processing with Multiple Paths</h4>
              </div>
              <p className="text-gray-700 mb-4">
                PIVTools supports processing multiple experimental datasets sequentially by specifying arrays of
                source and base paths. This is ideal when you have several experiments with <strong>identical settings
                and file structures</strong> that you want to process in one run.
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-gray-900 mb-3">How it works:</h5>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">1.</span>
                    <span>Add multiple entries to both <code className="bg-gray-100 px-1 rounded">source_paths</code> and <code className="bg-gray-100 px-1 rounded">base_paths</code> arrays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">2.</span>
                    <span>Each source path is paired with the base path at the same array index (source_paths[0] → base_paths[0], etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">3.</span>
                    <span>Use <code className="bg-gray-100 px-1 rounded">active_paths</code> to select which path indices to process (0-indexed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">4.</span>
                    <span>PIVTools processes each active path sequentially using the same configuration settings</span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> All datasets in a batch must share the same image format, camera count,
                  pairing mode, and PIV settings. If your experiments have different configurations, process them separately.
                </p>
              </div>
              <YamlDropdown
                title="YAML Reference - Multiple Paths"
                defaultOpen={true}
                code={`paths:
  source_paths:
    - /data/run_001/raw_images    # Index 0
    - /data/run_002/raw_images    # Index 1
    - /data/run_003/raw_images    # Index 2
    - /data/run_004/raw_images    # Index 3
  base_paths:
    - /data/run_001/results       # Paired with source index 0
    - /data/run_002/results       # Paired with source index 1
    - /data/run_003/results       # Paired with source index 2
    - /data/run_004/results       # Paired with source index 3
  active_paths:
    - 0    # Process run_001
    - 2    # Process run_003
    # Indices 1 and 3 will be skipped

# All paths must have the same:
# - Image format and naming pattern
# - Camera count and subfolder structure
# - Number of images (or at least the minimum you want to process)`}
              />
            </div>
          </Section>

          {/* Image Type Selection */}
          <Section title="Image Type Selection" icon={<Database size={32} />} id="image-type">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Select the format that matches your image files. This determines how PIVTools reads your data
              and what options are available. The image type affects how cameras are organized, how frames
              are paired, and which reader library is used to decode your files.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  type: "Standard (TIFF/PNG/JPG)",
                  desc: "Individual image files, one frame per file. This is the most common format for scientific cameras and exported data.",
                  color: "bg-green-100 text-green-700",
                  yaml: "standard"
                },
                {
                  type: "Phantom CINE",
                  desc: "High-speed camera container format. All frames from a single camera are stored in one .cine file. Multi-camera setups have one file per camera.",
                  color: "bg-orange-100 text-orange-700",
                  yaml: "cine"
                },
                {
                  type: "LaVision SET",
                  desc: "Single .set file containing all cameras and all timesteps. The entire experiment is stored in one container file.",
                  color: "bg-purple-100 text-purple-700",
                  yaml: "lavision_set"
                },
                {
                  type: "LaVision IM7",
                  desc: "One .im7 file per timestep. Each file may contain data from multiple cameras, or cameras may be in separate subfolders.",
                  color: "bg-purple-100 text-purple-700",
                  yaml: "lavision_im7"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.color}`}>
                      {item.yaml}
                    </span>
                    <h4 className="font-semibold text-gray-900">{item.type}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <YamlDropdown
              title="YAML Reference - Image Type"
              code={`images:
  image_type: standard    # Options: standard, cine, lavision_set, lavision_im7

  # Auto-detection: If image_type is not set, PIVTools will attempt to
  # detect the format from the image_format pattern:
  # - .cine extension → cine
  # - .set extension → lavision_set
  # - .im7 or .ims extension → lavision_im7
  # - Everything else → standard`}
            />

            {/* Platform Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Platform Compatibility</h4>
              </div>
              <p className="text-yellow-700 mb-2">
                <strong>LaVision formats</strong> (.im7, .set) require the ReadIMX library which is only available
                on <strong>Windows and Linux</strong>. The GUI will display a warning if you select these formats on macOS.
              </p>
              <p className="text-yellow-700">
                <strong>Phantom CINE</strong> files require the pycine library. Installation instructions are provided
                in the PIVTools documentation.
              </p>
            </div>
          </Section>

          {/* Camera Configuration Section */}
          <Section title="Camera Configuration" icon={<Camera size={32} />} id="cameras">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Configure how many cameras are in your setup and how their images are organized.
              PIVTools supports both single-camera and multi-camera configurations, with flexible
              options for custom directory structures.
            </p>

            <div className="space-y-6">
              {/* Single vs Multi Camera */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Single Camera</h4>
                  <p className="text-gray-600 mb-4">
                    Set <strong>Camera Count = 1</strong>. Images are expected directly in the source path
                    with no camera subdirectory. This is the simplest configuration for 2D PIV setups.
                  </p>
                  <div className="text-sm text-gray-500 bg-white rounded p-3 font-mono">
                    source_path/<br />
                    ├── B00001_A.tif<br />
                    ├── B00001_B.tif<br />
                    ├── B00002_A.tif<br />
                    ├── B00002_B.tif<br />
                    └── ...
                  </div>
                  <YamlDropdown
                    code={`paths:
  camera_count: 1
  camera_numbers: [1]
  camera_subfolders: []  # Empty = no subfolders`}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Camera (Standard)</h4>
                  <p className="text-gray-600 mb-4">
                    Set <strong>Camera Count = 2+</strong>. Images are organized in camera subfolders,
                    with each camera&apos;s images in a separate directory. This is typical for stereo PIV
                    or multi-view setups.
                  </p>
                  <div className="text-sm text-gray-500 bg-white rounded p-3 font-mono">
                    source_path/<br />
                    ├── Cam1/<br />
                    │   ├── B00001_A.tif<br />
                    │   └── B00001_B.tif ...<br />
                    └── Cam2/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;├── B00001_A.tif<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;└── B00001_B.tif ...
                  </div>
                  <YamlDropdown
                    code={`paths:
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: []  # Uses default Cam1, Cam2`}
                  />
                </div>
              </div>

              {/* Custom Subfolders */}
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Custom Camera Subfolders</h4>
                <p className="text-blue-700 mb-4">
                  If your camera folders aren&apos;t named <code className="bg-blue-100 px-2 py-1 rounded">Cam1</code>, <code className="bg-blue-100 px-2 py-1 rounded">Cam2</code>, etc.,
                  you can specify custom names using the <code className="bg-blue-100 px-2 py-1 rounded">camera_subfolders</code> array.
                  Each entry corresponds to a camera number in order.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-sm text-gray-600 bg-white rounded p-4">
                    <strong>Example directory structure:</strong>
                    <div className="font-mono mt-2 text-xs">
                      source_path/<br />
                      ├── View_Left/<br />
                      │   └── frame_00001.tif ...<br />
                      └── View_Right/<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;└── frame_00001.tif ...
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 bg-white rounded p-4">
                    <strong>Mapping:</strong>
                    <div className="mt-2">
                      <p>Camera 1 → View_Left/</p>
                      <p>Camera 2 → View_Right/</p>
                    </div>
                  </div>
                </div>

                <YamlDropdown
                  title="YAML Reference - Custom Subfolders"
                  code={`paths:
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: ["View_Left", "View_Right"]

# The order matters:
# - camera_subfolders[0] is used for camera_numbers[0]
# - camera_subfolders[1] is used for camera_numbers[1]
# - etc.`}
                />
              </div>

              {/* IM7 Camera Subfolders */}
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="text-purple-600" size={20} />
                  <h4 className="text-lg font-semibold text-purple-800">IM7 Camera Subfolder Mode</h4>
                </div>
                <p className="text-purple-700 mb-4">
                  LaVision IM7 files can be organized in two ways for multi-camera setups. The
                  <code className="bg-purple-100 px-2 py-1 rounded mx-1">use_camera_subfolders</code>
                  setting controls which mode PIVTools expects:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">All cameras in one file (default)</h5>
                    <p className="text-gray-600 text-sm mb-2">
                      Set <code className="bg-gray-100 px-1 rounded">use_camera_subfolders: false</code>.
                      Each .im7 file contains frames for all cameras. PIVTools extracts the specific
                      camera using the <code className="bg-gray-100 px-1 rounded">camera_no</code> parameter.
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                      source_path/<br />
                      ├── B00001.im7  (contains Cam1+Cam2)<br />
                      ├── B00002.im7<br />
                      └── ...
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">One camera per file</h5>
                    <p className="text-gray-600 text-sm mb-2">
                      Set <code className="bg-gray-100 px-1 rounded">use_camera_subfolders: true</code>.
                      Each camera&apos;s .im7 files are in separate subdirectories, with each file
                      containing only that camera&apos;s data.
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

                <YamlDropdown
                  title="YAML Reference - IM7 Subfolders"
                  code={`images:
  image_type: lavision_im7
  use_camera_subfolders: true  # Each camera in its own subfolder

paths:
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: ["Cam1", "Cam2"]  # Or custom names`}
                />
              </div>
            </div>
          </Section>

          {/* Frame Pairing Modes Section */}
          <Section title="Frame Pairing Modes" icon={<Layers size={32} />} id="pairing">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Frame pairing determines how images are grouped for cross-correlation. The pairing mode
              affects the number of vector fields produced and must match how your images were acquired.
              The available options depend on your selected Image Type and experimental setup.
            </p>

            {/* A/B Pair Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Mode 1</div>
                <h4 className="text-xl font-semibold text-gray-900">A/B Pair Format (Double-Frame)</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Separate files for frame A and frame B with matching indices. This is the most common format
                for double-frame cameras where each acquisition captures two exposures. Frame A and frame B
                are saved as separate files with a suffix indicating which frame they are.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-4">
                  <strong>Example files:</strong>
                  <div className="font-mono mt-2 text-xs">
                    B00001_A.tif + B00001_B.tif → Pair 1<br />
                    B00002_A.tif + B00002_B.tif → Pair 2<br />
                    B00003_A.tif + B00003_B.tif → Pair 3<br />
                    ...
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800">
                    <strong>100 image indices → 100 frame pairs</strong>
                  </p>
                  <p className="text-green-700 text-sm mt-2">
                    Each index produces exactly one vector field. The A and B patterns must have
                    different suffixes to distinguish them.
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
                <p className="text-blue-700 text-sm">
                  <strong>GUI Setting:</strong> Keep &quot;Time Resolved&quot; OFF and enter two filename patterns
                  (one for A frames, one for B frames). The GUI will show input fields for both patterns.
                </p>
              </div>
              <YamlDropdown
                code={`images:
  num_images: 100
  time_resolved: false
  pairing_mode: sequential
  image_format:
    - B%05d_A.tif    # Pattern for frame A
    - B%05d_B.tif    # Pattern for frame B

# Alternative common patterns:
#   - img%05d_1.tif / img%05d_2.tif
#   - frame%04dA.png / frame%04dB.png`}
              />
            </div>

            {/* Time-Resolved Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Mode 2</div>
                <h4 className="text-xl font-semibold text-gray-900">Time-Resolved (Overlapping Pairs)</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Sequential images with overlapping pairs. Each image serves as frame B for one pair and
                frame A for the next. This mode is used with high-speed cameras that capture single frames
                in rapid succession. It provides maximum temporal resolution from your data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-4">
                  <strong>Example pairing:</strong>
                  <div className="font-mono mt-2 text-xs">
                    B00001.tif + B00002.tif → Pair 1<br />
                    B00002.tif + B00003.tif → Pair 2<br />
                    B00003.tif + B00004.tif → Pair 3<br />
                    B00004.tif + B00005.tif → Pair 4<br />
                    ...
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800">
                    <strong>100 image files → 99 frame pairs</strong>
                  </p>
                  <p className="text-blue-700 text-sm mt-2">
                    Formula: pairs = images - 1<br />
                    The last image has no partner, so you get one fewer pair than images.
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
                <p className="text-blue-700 text-sm">
                  <strong>GUI Setting:</strong> Turn the &quot;Time Resolved&quot; toggle ON. Only one filename
                  pattern is needed since all images use the same naming convention.
                </p>
              </div>
              <YamlDropdown
                code={`images:
  num_images: 100
  time_resolved: true
  pairing_mode: sequential  # Overlapping: 1+2, 2+3, 3+4, ...
  image_format:
    - B%05d.tif    # Single pattern for all frames`}
              />
            </div>

            {/* Skip Frames Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">Mode 3</div>
                <h4 className="text-xl font-semibold text-gray-900">Skip Frames (Non-Overlapping Pairs)</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Non-overlapping pairs from a single file sequence. Images are paired consecutively but
                each image is used only once. This mode is useful when you have a single image sequence
                but want independent (non-overlapping) frame pairs for statistical purposes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-4">
                  <strong>Example pairing:</strong>
                  <div className="font-mono mt-2 text-xs">
                    B00001.tif + B00002.tif → Pair 1<br />
                    B00003.tif + B00004.tif → Pair 2<br />
                    B00005.tif + B00006.tif → Pair 3<br />
                    ...
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-purple-800">
                    <strong>100 image files → 50 frame pairs</strong>
                  </p>
                  <p className="text-purple-700 text-sm mt-2">
                    Formula: pairs = images ÷ 2<br />
                    Each pair consumes two images, giving half as many pairs.
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
                <p className="text-blue-700 text-sm">
                  <strong>GUI Setting:</strong> Keep &quot;Time Resolved&quot; OFF and use a single filename
                  pattern (not A/B patterns). This triggers skip-frame pairing mode.
                </p>
              </div>
              <YamlDropdown
                code={`images:
  num_images: 100
  time_resolved: false
  pairing_mode: sequential  # With single pattern = non-overlapping
  image_format:
    - B%05d.tif  # Single pattern + time_resolved=false = skip frames`}
              />
            </div>

            {/* Frame Pair Count Display */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-soton-blue" size={20} />
                <h4 className="text-lg font-semibold text-gray-900">Live Frame Pair Count</h4>
              </div>
              <p className="text-gray-600 mb-4">
                The GUI automatically calculates and displays the total number of frame pairs based on your configuration.
                Look for the <strong>&quot;X frame pairs&quot;</strong> indicator next to the Number of Images field.
                This calculation considers your image type, pairing mode, and time-resolved setting.
              </p>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Quick Reference:</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-green-50 rounded p-2">
                    <p className="font-medium text-green-800">A/B Pairs</p>
                    <p className="text-green-700">pairs = num_images</p>
                  </div>
                  <div className="bg-blue-50 rounded p-2">
                    <p className="font-medium text-blue-800">Time-Resolved</p>
                    <p className="text-blue-700">pairs = num_images - 1</p>
                  </div>
                  <div className="bg-purple-50 rounded p-2">
                    <p className="font-medium text-purple-800">Skip Frames</p>
                    <p className="text-purple-700">pairs = num_images ÷ 2</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Image Format Patterns Section */}
          <Section title="Filename Patterns" icon={<FileText size={32} />} id="patterns">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Define how frame numbers appear in your filenames using C-style format specifiers.
              These patterns tell PIVTools how to construct filenames for each frame index.
              The pattern must match your actual files exactly, including any prefixes, suffixes,
              and zero-padding.
            </p>

            <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Format Specifiers</h3>
              <p className="text-gray-200 mb-6 text-lg">
                Use C-style format specifiers to define how frame numbers appear in filenames.
                The <code className="bg-white/20 px-2 py-1 rounded">%</code> symbol marks where the
                frame number will be inserted:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { spec: "%05d", example: "B00001.tif, B00042.tif", desc: "5-digit, zero-padded" },
                  { spec: "%04d", example: "img0001.tif, img0042.tif", desc: "4-digit, zero-padded" },
                  { spec: "%d", example: "frame1.tif, frame42.tif", desc: "No padding (variable width)" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <code className="text-soton-gold font-mono text-lg">{item.spec}</code>
                    <p className="text-gray-300 text-sm mt-1">→ {item.example}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported File Formats</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {[
                { ext: ".tif/.tiff", desc: "TIFF (8/16-bit)" },
                { ext: ".png", desc: "PNG" },
                { ext: ".jpg/.jpeg", desc: "JPEG" },
                { ext: ".cine", desc: "Phantom Video" },
                { ext: ".im7/.set", desc: "LaVision" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <code className="text-soton-blue font-mono font-semibold">{item.ext}</code>
                  <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Zero-based indexing */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Zero-Based Indexing</h4>
              <p className="text-gray-600 mb-4">
                By default, PIVTools expects files to start at index 1 (e.g., B00001.tif).
                Enable <strong>Zero-based indexing</strong> if your files start at 0 (e.g., B00000.tif).
                This is common with some camera software and programming-generated sequences.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">1-based (default):</p>
                  <p className="text-xs font-mono text-gray-600">B00001.tif, B00002.tif, B00003.tif ...</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">0-based:</p>
                  <p className="text-xs font-mono text-gray-600">B00000.tif, B00001.tif, B00002.tif ...</p>
                </div>
              </div>
              <YamlDropdown
                code={`images:
  zero_based_indexing: true  # Files start at 0: B00000.tif, B00001.tif, ...
  # Default is false (files start at 1)`}
              />
            </div>

            {/* Vector Output Pattern */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Vector Output Pattern</h4>
              <p className="text-gray-600 mb-4">
                Define the naming pattern for output vector files. These are saved in the base path under
                the appropriate subdirectory structure. The format uses the same specifier syntax as image patterns.
              </p>
              <YamlDropdown
                code={`images:
  vector_format:
    - '%05d.mat'  # Output: 00001.mat, 00002.mat, ...

# Output location:
# base_path/uncalibrated_piv/{num_pairs}/Cam1/instantaneous/00001.mat`}
              />
            </div>

            {/* Data Type */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Image Data Type</h4>
              <p className="text-gray-600 mb-4">
                Specify the expected data type for your images. This affects memory allocation and
                processing precision. Most scientific cameras produce 16-bit images, but 8-bit and
                32-bit float formats are also supported.
              </p>
              <YamlDropdown
                code={`images:
  dtype: float32  # Options: uint8, uint16, float32, float64

# Common camera bit depths:
# - uint8:   8-bit (0-255) - consumer cameras, compressed exports
# - uint16:  16-bit (0-65535) - most scientific cameras
# - float32: 32-bit float - preprocessed or synthetic data`}
              />
            </div>
          </Section>

          {/* Container Formats Detail Section */}
          <Section title="Container Format Details" icon={<Database size={32} />} id="containers">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Container formats store multiple frames in a single file, reducing filesystem overhead
              and simplifying data management. Here are the specifics for each supported format,
              including how frame pairing works within containers.
            </p>

            {/* CINE Format */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">Phantom</div>
                <h4 className="text-xl font-semibold text-gray-900">.cine Files</h4>
              </div>
              <p className="text-gray-600 mb-4">
                One <code className="bg-gray-100 px-1 rounded">.cine</code> file per camera containing all frames.
                The filename pattern uses <code className="bg-gray-100 px-1 rounded">%d</code> for the camera number
                (not the frame number). PIVTools reads frames directly from the container using their internal indices.
              </p>

              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <p className="text-orange-800">
                  <strong>Frame pairing modes:</strong>
                </p>
                <ul className="text-orange-700 mt-2 space-y-1">
                  <li>• <strong>Time-resolved ON:</strong> Overlapping pairs (0+1, 1+2, 2+3...)</li>
                  <li>• <strong>Time-resolved OFF:</strong> Non-overlapping pairs (0+1, 2+3, 4+5...)</li>
                </ul>
                <p className="text-orange-700 mt-2 text-sm">
                  Note: CINE files use their internal FirstImageNo for indexing. PIVTools handles this
                  translation automatically.
                </p>
              </div>
              <YamlDropdown
                code={`images:
  image_type: cine
  num_images: 1200  # Total frames in the file
  time_resolved: true  # or false for skip-frame pairing
  image_format:
    - Camera%d.cine  # %d = camera number (Camera1.cine, Camera2.cine)

paths:
  camera_count: 2
  camera_numbers: [1, 2]

# File organization:
# source_path/
# ├── Camera1.cine  (all frames for camera 1)
# └── Camera2.cine  (all frames for camera 2)`}
              />
            </div>

            {/* IM7 Format */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">LaVision</div>
                <h4 className="text-xl font-semibold text-gray-900">.im7 Files</h4>
              </div>
              <p className="text-gray-600 mb-4">
                One file per timestep. Each file may contain frames for multiple cameras (multi-camera mode)
                or just one camera (when using camera subfolders). The internal structure depends on how
                the data was acquired in DaVis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Pre-Paired (Standard PIV)</h5>
                  <p className="text-gray-600 text-sm">
                    Each .im7 contains frame A and B for each camera (2 frames per camera).
                    This is the default DaVis export for double-frame acquisitions.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    <strong>GUI:</strong> Time-resolved OFF
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Time-Resolved (TR-PIV)</h5>
                  <p className="text-gray-600 text-sm">
                    Each .im7 contains one frame per camera. Pairs are formed across
                    consecutive files (file N + file N+1).
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    <strong>GUI:</strong> Time-resolved ON
                  </p>
                </div>
              </div>
              <YamlDropdown
                code={`# Pre-paired mode (each file = one A+B pair)
images:
  image_type: lavision_im7
  num_images: 100  # Number of .im7 files
  time_resolved: false
  image_format:
    - B%05d.im7

# Time-resolved mode (pair across files)
images:
  image_type: lavision_im7
  num_images: 100  # 100 files → 99 pairs
  time_resolved: true
  image_format:
    - B%05d.im7`}
              />
            </div>

            {/* SET Format */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">LaVision</div>
                <h4 className="text-xl font-semibold text-gray-900">.set Files</h4>
              </div>
              <p className="text-gray-600 mb-4">
                A single <code className="bg-gray-100 px-1 rounded">.set</code> file contains all cameras and all timesteps.
                Just enter the filename—no pattern needed. This is the most compact format for large datasets
                but requires the full file to be accessible for random access.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <p className="text-purple-700 text-sm">
                  <strong>Note:</strong> The internal structure is indexed by (camera_no, im_no) where im_no
                  is the timestep. PIVTools handles all the internal navigation automatically.
                </p>
              </div>
              <YamlDropdown
                code={`images:
  image_type: lavision_set
  num_images: 100  # Number of timesteps in the set
  time_resolved: false  # or true for single-frame entries
  image_format:
    - experiment.set  # Just the filename, no pattern

# File organization:
# source_path/
# └── experiment.set  (contains all cameras, all timesteps)`}
              />
            </div>
          </Section>

          {/* File Validation Section */}
          <Section title="File Validation" icon={<FileCheck size={32} />} id="validation">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After configuring your settings, PIVTools validates that your files exist and are readable.
              The validation runs automatically when you save changes or click the validate button.
              This prevents processing errors by catching configuration issues early.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">What&apos;s Checked</h4>
                <FeatureList items={[
                  "First frame exists and is readable for each camera",
                  "Last frame exists (based on num_images setting)",
                  "File count matches expected number of images",
                  "Index range matches zero_based_indexing setting",
                  "Container files are accessible and contain expected data",
                  "Image dimensions are consistent across frames"
                ]} />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Status Indicators</h4>
                <div className="space-y-3">
                  {[
                    { status: "Valid", color: "bg-green-500", desc: "All files found and readable" },
                    { status: "Warning", color: "bg-yellow-500", desc: "Processing subset of available files" },
                    { status: "Error", color: "bg-red-500", desc: "Missing files or configuration issue" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-semibold text-gray-900">{item.status}:</span>
                      <span className="text-gray-600">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Common Validation Issues</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• <strong>Files not found:</strong> Check your source path and filename pattern match exactly. Pay attention to underscores, capitalisation, and number formatting.</li>
                <li>• <strong>Wrong count:</strong> Verify the &quot;Number of Images&quot; matches your actual file count.</li>
                <li>• <strong>First file missing:</strong> Check if you need zero-based indexing enabled (files start at 0 instead of 1).</li>
                <li>• <strong>LaVision error on Mac:</strong> IM7 and SET formats require Windows or Linux. Export to TIFF for macOS processing.</li>
              </ul>
            </div>
          </Section>

          {/* Output Directory Structure Section */}
          <Section title="Output Directory Structure" icon={<HardDrive size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Processed PIV data is organised in a structured hierarchy under your base path.
              This organisation makes it easy to locate results, compare different processing runs,
              and manage large datasets. The structure is created automatically during processing.
            </p>

            <CodeBlock code={`base_path/
├── uncalibrated_piv/              # Raw PIV results (pixel displacements)
│   └── {num_frame_pairs}/         # Organised by dataset size
│       ├── Cam1/
│       │   ├── instantaneous/     # Per-frame vector fields
│       │   │   ├── 00001.mat
│       │   │   ├── 00002.mat
│       │   │   └── ...
│       │   └── ensemble/          # Ensemble-averaged results
│       │       └── ensemble_result.mat
│       └── Cam2/
│           └── ...
│
├── calibrated_piv/                # Physical units (mm, m/s)
│   └── {num_frame_pairs}/
│       └── ...
│
├── merged/                        # Multi-camera merged fields
│   └── ...
│
├── statistics/                    # Statistical analysis results
│   └── ...
│
├── videos/                        # Generated animations
│   └── ...
│
└── calibration/                   # Calibration data and coefficients
    └── ...`} title="Output Directory Structure" />

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-600 text-sm">
                <strong>Note:</strong> The <code className="bg-gray-200 px-1 rounded">{'{num_frame_pairs}'}</code> subdirectory
                allows you to process different subsets of your data without overwriting previous results.
                For example, processing 100 pairs vs 500 pairs creates separate output directories.
              </p>
            </div>
          </Section>

          {/* Complete Configuration Example */}
          <Section title="Complete Configuration Reference" icon={<FileText size={32} />} id="example">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For power users who prefer direct YAML configuration, here&apos;s a complete reference with all available options.
              This example shows a multi-path batch processing setup with all image-related settings.
            </p>

            <YamlDropdown
              title="Full YAML Configuration Example"
              defaultOpen={true}
              code={`# config.yaml - Complete image configuration example
paths:
  # Multiple paths for batch processing
  source_paths:
    - /data/experiment_01/raw_images
    - /data/experiment_02/raw_images
    - /data/experiment_03/raw_images
  base_paths:
    - /data/experiment_01/results
    - /data/experiment_02/results
    - /data/experiment_03/results
  active_paths:
    - 0      # Process first dataset
    - 1      # Process second dataset
    # Index 2 will be skipped

  # Camera configuration
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: []  # Empty = use default Cam1, Cam2

images:
  # Basic settings
  num_images: 500
  image_type: standard       # standard, cine, lavision_set, lavision_im7

  # Frame pairing
  time_resolved: false       # true for overlapping pairs
  pairing_mode: sequential   # sequential (default)
  zero_based_indexing: false # true if files start at 0

  # For IM7 only: camera organization
  use_camera_subfolders: false  # true for one-camera-per-file mode

  # Filename patterns
  image_format:
    - B%05d_A.tif   # Frame A pattern
    - B%05d_B.tif   # Frame B pattern
  vector_format:
    - '%05d.mat'    # Output filename pattern

  # Data properties
  dtype: float32   # uint8, uint16, float32, float64

batches:
  size: 25  # Process 25 image pairs per batch

logging:
  file: pypiv.log
  level: INFO      # DEBUG, INFO, WARNING, ERROR
  console: true    # Show log messages in terminal`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Field Mapping</h4>
              <p className="text-gray-600 mb-4">
                This table shows how GUI controls correspond to YAML configuration fields:
              </p>
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
                      { gui: "Source Path", yaml: "paths.source_paths[]", desc: "Array of input directories" },
                      { gui: "Base Path", yaml: "paths.base_paths[]", desc: "Array of output directories" },
                      { gui: "Active Paths", yaml: "paths.active_paths[]", desc: "Which path indices to process (0-indexed)" },
                      { gui: "Image Type", yaml: "images.image_type", desc: "Format: standard, cine, lavision_im7, lavision_set" },
                      { gui: "Number of Images/Frames", yaml: "images.num_images", desc: "Total image files or frames in container" },
                      { gui: "Camera Count", yaml: "paths.camera_count", desc: "Total cameras in setup" },
                      { gui: "Time Resolved toggle", yaml: "images.time_resolved", desc: "Enable overlapping pairs" },
                      { gui: "Zero-based Indexing", yaml: "images.zero_based_indexing", desc: "Files start at 0 vs 1" },
                      { gui: "IM7 Camera Subfolders", yaml: "images.use_camera_subfolders", desc: "One .im7 per camera in subfolders" },
                      { gui: "Raw Image Pattern(s)", yaml: "images.image_format[]", desc: "Filename pattern(s) with %d specifier" },
                      { gui: "Vector Pattern", yaml: "images.vector_format[]", desc: "Output filename pattern" },
                      { gui: "Custom Camera Subfolders", yaml: "paths.camera_subfolders[]", desc: "Override default CamN names" },
                      { gui: "Batch Size", yaml: "batches.size", desc: "Images processed per batch" }
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
            <h3 className="text-3xl font-bold mb-4">Next: Set Up Your Mask</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Now that your images are configured, define regions to exclude from PIV processing.
              Masking helps improve results by removing areas with poor seeding or reflections.
            </p>
            <a
              href="/manual/masking"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Masking
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
