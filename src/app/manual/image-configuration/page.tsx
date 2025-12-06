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

interface ScreenshotPlaceholderProps {
  caption: string;
  alt: string;
}

const ScreenshotPlaceholder = ({ caption, alt }: ScreenshotPlaceholderProps) => (
  <div className="my-6">
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
      <div className="text-gray-400 mb-2">
        <Camera size={48} />
      </div>
      <p className="text-gray-500 text-sm text-center">[Screenshot: {alt}]</p>
    </div>
    <p className="text-center text-sm text-gray-600 mt-2 italic">{caption}</p>
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
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The Image Configuration panel is found on the <strong>Setup</strong> tab in the PIVTools GUI.
              It handles everything from locating your raw images to defining how frame pairs are formed.
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
            </p>

            <ScreenshotPlaceholder
              alt="Setup tab showing source path and base path input fields"
              caption="Figure 1: The Setup tab with source and base path configuration"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <FolderOpen className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Source Path</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  The folder containing your <strong>raw PIV images</strong>. Click the folder icon or paste the path directly.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-blue-700 text-sm">
                    <strong>Tip:</strong> You can add multiple source paths and switch between them using the dropdown selector.
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
                  Where <strong>processed results</strong> will be saved. PIVTools creates a structured directory hierarchy here.
                </p>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <p className="text-green-700 text-sm">
                    Results include: vector fields, statistics, videos, and calibration data.
                  </p>
                </div>
                <YamlDropdown
                  code={`paths:
  base_paths:
    - /data/experiment_01/results`}
                />
              </div>
            </div>
          </Section>

          {/* Image Type Selection - NEW GUI-FOCUSED SECTION */}
          <Section title="Image Type Selection" icon={<Database size={32} />} id="image-type">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Select the format that matches your image files. This determines how PIVTools reads your data and what options are available.
            </p>

            <ScreenshotPlaceholder
              alt="Image Type dropdown showing Standard, Phantom CINE, LaVision SET, and LaVision IM7 options"
              caption="Figure 2: Image Type selector with four format options"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  type: "Standard (TIFF/PNG/JPG)",
                  desc: "Individual image files, one frame per file",
                  color: "bg-green-100 text-green-700",
                  yaml: "standard"
                },
                {
                  type: "Phantom CINE",
                  desc: "High-speed camera container, all frames in one .cine file per camera",
                  color: "bg-orange-100 text-orange-700",
                  yaml: "cine"
                },
                {
                  type: "LaVision SET",
                  desc: "Single .set file containing all cameras and timesteps",
                  color: "bg-purple-100 text-purple-700",
                  yaml: "lavision_set"
                },
                {
                  type: "LaVision IM7",
                  desc: "One .im7 file per timestep, may contain multiple cameras",
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
  image_type: standard    # Options: standard, cine, lavision_set, lavision_im7`}
            />

            {/* Platform Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Platform Compatibility</h4>
              </div>
              <p className="text-yellow-700">
                <strong>LaVision formats</strong> (.im7, .set) are only available on <strong>Windows and Linux</strong> due to library requirements.
                The GUI will show a warning if you select these formats on macOS.
              </p>
            </div>
          </Section>

          {/* Camera Configuration Section */}
          <Section title="Camera Configuration" icon={<Camera size={32} />} id="cameras">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Configure how many cameras are in your setup and how their images are organized.
            </p>

            <ScreenshotPlaceholder
              alt="Camera count input and camera subfolder configuration fields"
              caption="Figure 3: Camera configuration section showing count and optional custom subfolder names"
            />

            <div className="space-y-6">
              {/* Single vs Multi Camera */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Single Camera</h4>
                  <p className="text-gray-600 mb-4">
                    Set <strong>Camera Count = 1</strong>. Images are expected directly in the source path.
                  </p>
                  <div className="text-sm text-gray-500 bg-white rounded p-3 font-mono">
                    source_path/<br />
                    ├── B00001_A.tif<br />
                    ├── B00001_B.tif<br />
                    └── ...
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Camera (Standard)</h4>
                  <p className="text-gray-600 mb-4">
                    Set <strong>Camera Count = 2+</strong>. Images are organized in camera subfolders.
                  </p>
                  <div className="text-sm text-gray-500 bg-white rounded p-3 font-mono">
                    source_path/<br />
                    ├── Cam1/<br />
                    │   └── B00001_A.tif ...<br />
                    └── Cam2/<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;└── B00001_A.tif ...
                  </div>
                </div>
              </div>

              {/* Custom Subfolders */}
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Custom Camera Subfolders</h4>
                <p className="text-blue-700 mb-4">
                  If your camera folders aren&apos;t named <code className="bg-blue-100 px-2 py-1 rounded">Cam1</code>, <code className="bg-blue-100 px-2 py-1 rounded">Cam2</code>, etc.,
                  enter custom names in the subfolder fields that appear when you have multiple cameras.
                </p>

                <ScreenshotPlaceholder
                  alt="Custom camera subfolder input fields showing View_Left and View_Right"
                  caption="Figure 4: Custom subfolder names for non-standard directory structures"
                />

                <YamlDropdown
                  title="YAML Reference - Custom Subfolders"
                  code={`paths:
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: ["View_Left", "View_Right"]

# Directory structure:
# source_path/
# ├── View_Left/
# │   └── ...
# └── View_Right/
#     └── ...`}
                />
              </div>

              {/* IM7 Camera Subfolders - NEW FEATURE */}
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-400">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="text-purple-600" size={20} />
                  <h4 className="text-lg font-semibold text-purple-800">IM7 Camera Subfolder Mode</h4>
                </div>
                <p className="text-purple-700 mb-4">
                  For LaVision IM7 files, you have two options for multi-camera setups:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">All cameras in one file</h5>
                    <p className="text-gray-600 text-sm mb-2">
                      Keep the toggle <strong>OFF</strong>. Each .im7 contains frames for all cameras.
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                      B00001.im7 → Cam1 A, Cam1 B, Cam2 A, Cam2 B
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">One camera per file</h5>
                    <p className="text-gray-600 text-sm mb-2">
                      Turn the toggle <strong>ON</strong>. Each camera&apos;s .im7 files are in separate subfolders.
                    </p>
                    <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                      Cam1/B00001.im7, Cam2/B00001.im7
                    </div>
                  </div>
                </div>

                <ScreenshotPlaceholder
                  alt="IM7 camera subfolders toggle switch and subfolder name inputs"
                  caption="Figure 5: IM7 camera subfolder toggle for one-camera-per-file setups"
                />

                <YamlDropdown
                  title="YAML Reference - IM7 Subfolders"
                  code={`images:
  image_type: lavision_im7
  use_camera_subfolders: true  # Each camera in its own subfolder

paths:
  camera_count: 2
  camera_subfolders: ["Cam1", "Cam2"]

# Directory structure:
# source_path/
# ├── Cam1/
# │   ├── B00001.im7
# │   └── ...
# └── Cam2/
#     ├── B00001.im7
#     └── ...`}
                />
              </div>
            </div>
          </Section>

          {/* Frame Pairing Modes Section */}
          <Section title="Frame Pairing Modes" icon={<Layers size={32} />} id="pairing">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Frame pairing determines how images are grouped for cross-correlation.
              The available options depend on your selected Image Type.
            </p>

            <ScreenshotPlaceholder
              alt="Frame pairing mode selector showing Time Resolved toggle and mode dropdown"
              caption="Figure 6: Frame pairing configuration with mode selector"
            />

            {/* A/B Pair Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Mode 1</div>
                <h4 className="text-xl font-semibold text-gray-900">A/B Pair Format</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Separate files for frame A and frame B with matching indices. Common for double-frame cameras.
                <br /><strong>In GUI:</strong> Keep &quot;Time Resolved&quot; OFF and use two filename patterns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-4">
                  <strong>Example files:</strong>
                  <div className="font-mono mt-2 text-xs">
                    B00001_A.tif + B00001_B.tif → Pair 1<br />
                    B00002_A.tif + B00002_B.tif → Pair 2
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800">
                    <strong>100 image indices → 100 frame pairs</strong>
                  </p>
                </div>
              </div>
              <YamlDropdown
                code={`images:
  num_images: 100
  time_resolved: false
  image_format:
    - B%05d_A.tif
    - B%05d_B.tif`}
              />
            </div>

            {/* Time-Resolved Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Mode 2</div>
                <h4 className="text-xl font-semibold text-gray-900">Time-Resolved (Overlapping)</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Sequential images with overlapping pairs. Each image serves as frame B for one pair and frame A for the next.
                <br /><strong>In GUI:</strong> Turn &quot;Time Resolved&quot; ON.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-4">
                  <strong>Example pairing:</strong>
                  <div className="font-mono mt-2 text-xs">
                    B00001.tif + B00002.tif → Pair 1<br />
                    B00002.tif + B00003.tif → Pair 2<br />
                    B00003.tif + B00004.tif → Pair 3
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800">
                    <strong>100 image files → 99 frame pairs</strong>
                    <br /><span className="text-sm">Formula: pairs = images - 1</span>
                  </p>
                </div>
              </div>
              <YamlDropdown
                code={`images:
  num_images: 100
  time_resolved: true
  image_format:
    - B%05d.tif`}
              />
            </div>

            {/* Skip Frames Mode */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">Mode 3</div>
                <h4 className="text-xl font-semibold text-gray-900">Skip Frames (Non-Overlapping)</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Non-overlapping pairs from a single file sequence.
                <br /><strong>In GUI:</strong> Keep &quot;Time Resolved&quot; OFF and select &quot;Skip Frames&quot; from the pairing mode dropdown.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-4">
                  <strong>Example pairing:</strong>
                  <div className="font-mono mt-2 text-xs">
                    B00001.tif + B00002.tif → Pair 1<br />
                    B00003.tif + B00004.tif → Pair 2<br />
                    B00005.tif + B00006.tif → Pair 3
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-purple-800">
                    <strong>100 image files → 50 frame pairs</strong>
                    <br /><span className="text-sm">Formula: pairs = images ÷ 2</span>
                  </p>
                </div>
              </div>
              <YamlDropdown
                code={`images:
  num_images: 100
  time_resolved: false
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
              <p className="text-gray-600">
                The GUI automatically calculates and displays the total number of frame pairs based on your configuration.
                Look for the <strong>&quot;X frame pairs&quot;</strong> indicator next to the Number of Images field.
              </p>
              <ScreenshotPlaceholder
                alt="Frame pair count indicator showing '499 frame pairs' next to the image count input"
                caption="Figure 7: The frame pair count is calculated automatically based on your pairing mode"
              />
            </div>
          </Section>

          {/* Image Format Patterns Section */}
          <Section title="Filename Patterns" icon={<FileText size={32} />} id="patterns">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Define how frame numbers appear in your filenames using format specifiers.
            </p>

            <ScreenshotPlaceholder
              alt="Raw image pattern and vector pattern input fields"
              caption="Figure 8: Filename pattern configuration for raw images and output vectors"
            />

            <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Format Specifiers</h3>
              <p className="text-gray-200 mb-6 text-lg">
                Use C-style format specifiers to define how frame numbers appear in filenames:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { spec: "%05d", example: "B00001.tif", desc: "5-digit, zero-padded" },
                  { spec: "%04d", example: "img0001.tif", desc: "4-digit, zero-padded" },
                  { spec: "%d", example: "frame1.tif", desc: "No padding" }
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
                { ext: ".tif", desc: "TIFF" },
                { ext: ".png", desc: "PNG" },
                { ext: ".jpg", desc: "JPEG" },
                { ext: ".cine", desc: "Phantom" },
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
                By default, files are expected to start at index 1 (B00001.tif).
                Enable <strong>Zero-based indexing</strong> if your files start at 0 (B00000.tif).
              </p>
              <YamlDropdown
                code={`images:
  zero_based_indexing: true  # Files start at 0: B00000.tif, B00001.tif, ...`}
              />
            </div>

            {/* Vector Output Pattern */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Vector Output Pattern</h4>
              <p className="text-gray-600 mb-4">
                Define the naming pattern for output vector files. These are saved in the base path under the appropriate subdirectory.
              </p>
              <YamlDropdown
                code={`images:
  vector_format:
    - '%05d.mat'  # Output: 00001.mat, 00002.mat, ...`}
              />
            </div>
          </Section>

          {/* Container Formats Detail Section */}
          <Section title="Container Format Details" icon={<Database size={32} />} id="containers">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Container formats store multiple frames in a single file. Here are the specifics for each format.
            </p>

            {/* CINE Format */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">Phantom</div>
                <h4 className="text-xl font-semibold text-gray-900">.cine Files</h4>
              </div>
              <p className="text-gray-600 mb-4">
                One <code className="bg-gray-100 px-1 rounded">.cine</code> file per camera containing all frames.
                The filename pattern uses <code className="bg-gray-100 px-1 rounded">%d</code> for the camera number.
              </p>

              <ScreenshotPlaceholder
                alt="CINE configuration showing Camera1.cine pattern and frame count"
                caption="Figure 9: Phantom CINE configuration with camera numbering in filename"
              />

              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <p className="text-orange-800">
                  <strong>Pairing modes:</strong>
                  <br />• Time-resolved ON: 0+1, 1+2, 2+3... (overlapping)
                  <br />• Time-resolved OFF: 0+1, 2+3, 4+5... (non-overlapping)
                </p>
              </div>
              <YamlDropdown
                code={`images:
  image_type: cine
  num_images: 1200  # Frames in the file
  time_resolved: true  # or false
  image_format:
    - Camera%d.cine  # %d = camera number (Camera1.cine, Camera2.cine)

paths:
  camera_count: 2`}
              />
            </div>

            {/* IM7 Format */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">LaVision</div>
                <h4 className="text-xl font-semibold text-gray-900">.im7 Files</h4>
              </div>
              <p className="text-gray-600 mb-4">
                One file per timestep. Each file may contain frames for multiple cameras.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Pre-Paired (Standard PIV)</h5>
                  <p className="text-gray-600 text-sm">
                    Each .im7 contains frame A and B for each camera (2 frames per camera).
                    <br /><strong>In GUI:</strong> Time-resolved OFF
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Time-Resolved</h5>
                  <p className="text-gray-600 text-sm">
                    Each .im7 contains one frame per camera. Pairs formed across files.
                    <br /><strong>In GUI:</strong> Time-resolved ON
                  </p>
                </div>
              </div>
              <YamlDropdown
                code={`# Pre-paired mode
images:
  image_type: lavision_im7
  num_images: 100
  time_resolved: false
  image_format:
    - B%05d.im7

# Time-resolved mode
images:
  image_type: lavision_im7
  num_images: 100
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
                Just enter the filename—no pattern needed.
              </p>
              <YamlDropdown
                code={`images:
  image_type: lavision_set
  num_images: 100
  time_resolved: false  # or true
  image_format:
    - experiment.set`}
              />
            </div>
          </Section>

          {/* File Validation Section */}
          <Section title="File Validation" icon={<FileCheck size={32} />} id="validation">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After configuring your settings, PIVTools validates that your files exist and are readable.
              The validation runs automatically when you save changes.
            </p>

            <ScreenshotPlaceholder
              alt="Validation status showing green checkmark with 'Files validated successfully' message"
              caption="Figure 10: Validation status indicator showing successful file detection"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">What&apos;s Checked</h4>
                <FeatureList items={[
                  "First frame exists and is readable",
                  "Last frame exists and is readable",
                  "File count matches expected number",
                  "Index range matches zero_based_indexing",
                  "Container files are accessible"
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
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Troubleshooting Validation Errors</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• <strong>Files not found:</strong> Check your source path and filename pattern</li>
                <li>• <strong>Wrong count:</strong> Verify the &quot;Number of Images&quot; matches your actual files</li>
                <li>• <strong>First file missing:</strong> Check if you need zero-based indexing enabled</li>
                <li>• <strong>LaVision error on Mac:</strong> These formats only work on Windows/Linux</li>
              </ul>
            </div>
          </Section>

          {/* Output Directory Structure Section */}
          <Section title="Output Directory Structure" icon={<HardDrive size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Processed PIV data is organized in a structured hierarchy under your base path.
            </p>

            <CodeBlock code={`base_path/
├── uncalibrated_piv/           # Raw PIV results
│   └── {num_frame_pairs}/
│       └── Cam1/
│           ├── instantaneous/
│           │   ├── 00001.mat
│           │   └── ...
│           └── ensemble/
│
├── calibrated_piv/             # After calibration
├── merged/                     # Multi-camera merged
├── statistics/                 # Statistical analysis
├── videos/                     # Generated videos
└── calibration/                # Calibration data`} title="Output Structure" />
          </Section>

          {/* Complete Configuration Example */}
          <Section title="Complete Configuration Reference" icon={<FileText size={32} />} id="example">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For power users who prefer direct YAML configuration, here&apos;s a complete reference with all available options.
            </p>

            <YamlDropdown
              title="Full YAML Configuration Example"
              defaultOpen={true}
              code={`# config.yaml - Complete image configuration example
paths:
  source_paths:
    - /data/experiment/raw_images
  base_paths:
    - /data/experiment/results
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: []  # Use default Cam1, Cam2

images:
  num_images: 500
  image_type: standard  # standard, cine, lavision_set, lavision_im7
  time_resolved: false
  zero_based_indexing: false
  use_camera_subfolders: false  # For IM7 one-camera-per-file mode
  image_format:
    - B%05d_A.tif
    - B%05d_B.tif
  vector_format:
    - '%05d.mat'
  dtype: float32

batches:
  size: 25  # Process 25 image pairs per batch

logging:
  file: pypiv.log
  level: INFO
  console: true`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Mapping</h4>
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
                      { gui: "Image Type", yaml: "images.image_type", desc: "Format: standard, cine, lavision_im7, lavision_set" },
                      { gui: "Number of Images/Frames", yaml: "images.num_images", desc: "Total image files or frames in container" },
                      { gui: "Camera Count", yaml: "paths.camera_count", desc: "Total cameras in setup" },
                      { gui: "Time Resolved toggle", yaml: "images.time_resolved", desc: "Enable overlapping pairs" },
                      { gui: "Pairing Mode dropdown", yaml: "(derived)", desc: "Affects image_format array length" },
                      { gui: "Zero-based Indexing", yaml: "images.zero_based_indexing", desc: "Files start at 0 vs 1" },
                      { gui: "IM7 Camera Subfolders", yaml: "images.use_camera_subfolders", desc: "One .im7 per camera in subfolders" },
                      { gui: "Raw Image Pattern(s)", yaml: "images.image_format", desc: "Filename pattern(s) with %d specifier" },
                      { gui: "Vector Pattern", yaml: "images.vector_format", desc: "Output filename pattern" },
                      { gui: "Custom Camera Subfolders", yaml: "paths.camera_subfolders", desc: "Override default CamN names" }
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
