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
              Configure image paths, file formats, camera setup, and frame pairing.
              Found on the <strong>Setup</strong> tab in the GUI.
            </p>
          </motion.div>

          {/* Source & Base Directories Section */}
          <Section title="Source & Base Directories" icon={<FolderOpen size={32} />} id="directories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <FolderOpen className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Source Path</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Directory containing raw PIV images. Multiple source paths can be added for batch processing.
                </p>
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
                  Where processed results are saved (vector fields, statistics, videos, calibration).
                  Each source path is paired with the base path at the same array index.
                </p>
                <YamlDropdown
                  code={`paths:
  base_paths:
    - /data/experiment_01/results
    - /data/experiment_02/results`}
                />
              </div>
            </div>

            {/* Batch Processing */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Batch Processing</h4>
              <p className="text-blue-700 mb-3">
                Process multiple datasets sequentially by adding multiple source/base path pairs.
                Use <code className="bg-blue-100 px-1 rounded">active_paths</code> to select which indices to process.
                All datasets in a batch must share the same image format, camera count, and PIV settings.
              </p>
              <YamlDropdown
                title="YAML Reference - Batch Paths"
                code={`paths:
  source_paths:
    - /data/run_001/raw    # Index 0
    - /data/run_002/raw    # Index 1
    - /data/run_003/raw    # Index 2
  base_paths:
    - /data/run_001/results
    - /data/run_002/results
    - /data/run_003/results
  active_paths:
    - 0    # Process run_001
    - 2    # Process run_003 (skip index 1)`}
              />
            </div>
          </Section>

          {/* Image Type Selection */}
          <Section title="Image Type Selection" icon={<Database size={32} />} id="image-type">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Select the format matching your image files. Auto-detected from file extension if not set explicitly.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML value</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: "Standard", yaml: "standard", desc: "Individual image files (.tif, .png, .jpg). One frame per file." },
                    { type: "Phantom CINE", yaml: "cine", desc: "High-speed camera container. One .cine file per camera, all frames inside." },
                    { type: "LaVision SET", yaml: "lavision_set", desc: "Single .set file with all cameras and timesteps." },
                    { type: "LaVision IM7", yaml: "lavision_im7", desc: "One .im7 file per timestep. May contain multiple cameras." },
                  ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{item.type}</td>
                      <td className="px-6 py-3 text-sm font-mono text-soton-blue">{item.yaml}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <YamlDropdown
              title="YAML Reference - Image Type"
              code={`images:
  image_type: standard    # standard | cine | lavision_set | lavision_im7`}
            />

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Platform Compatibility</h4>
              </div>
              <p className="text-yellow-700">
                <strong>LaVision formats</strong> (.im7, .set) require Windows or Linux.
                <strong> Phantom CINE</strong> requires the pycine library.
              </p>
            </div>
          </Section>

          {/* Camera Configuration Section */}
          <Section title="Camera Configuration" icon={<Camera size={32} />} id="cameras">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Single Camera</h4>
                <p className="text-gray-600 mb-4">
                  Images directly in source path, no camera subdirectory.
                </p>
                <div className="text-sm text-gray-500 bg-white rounded p-3 font-mono">
                  source_path/<br />
                  ├── B00001_A.tif<br />
                  ├── B00001_B.tif<br />
                  └── ...
                </div>
                <YamlDropdown
                  code={`paths:
  camera_count: 1
  camera_numbers: [1]
  camera_subfolders: []`}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Camera</h4>
                <p className="text-gray-600 mb-4">
                  Images in camera subfolders (default: <code className="bg-gray-200 px-1 rounded">Cam1</code>, <code className="bg-gray-200 px-1 rounded">Cam2</code>, ...).
                  Override with <code className="bg-gray-200 px-1 rounded">camera_subfolders</code>.
                </p>
                <div className="text-sm text-gray-500 bg-white rounded p-3 font-mono">
                  source_path/<br />
                  ├── Cam1/B00001_A.tif ...<br />
                  └── Cam2/B00001_A.tif ...
                </div>
                <YamlDropdown
                  code={`paths:
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: []         # Default: Cam1, Cam2
  # camera_subfolders: ["View_Left", "View_Right"]  # Custom names`}
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">IM7 Camera Subfolder Mode</h4>
              <p className="text-blue-700 mb-3">
                IM7 files can store multiple cameras in one file (<code className="bg-blue-100 px-1 rounded">use_camera_subfolders: false</code>, default)
                or one camera per file in subdirectories (<code className="bg-blue-100 px-1 rounded">use_camera_subfolders: true</code>).
              </p>
              <YamlDropdown
                title="YAML Reference - IM7 Subfolders"
                code={`images:
  image_type: lavision_im7
  use_camera_subfolders: true   # Each camera in its own subfolder`}
              />
            </div>
          </Section>

          {/* Frame Pairing Modes Section */}
          <Section title="Frame Pairing Modes" icon={<Layers size={32} />} id="pairing">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Frame pairing determines how images are grouped for cross-correlation.
              The GUI uses a <strong>Pairing Preset</strong> dropdown. The underlying config keys are
              <code className="bg-gray-100 px-2 py-1 rounded text-sm mx-1">start_index</code>,
              <code className="bg-gray-100 px-2 py-1 rounded text-sm mx-1">frame_stride</code>, and
              <code className="bg-gray-100 px-2 py-1 rounded text-sm mx-1">pair_stride</code>.
            </p>

            {/* Preset reference table */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Preset</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">frame_stride</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">pair_stride</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pairing</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">100 images =</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { preset: "A/B Format", fs: "0", ps: "1", pairing: "Separate A + B files per index", pairs: "100 pairs" },
                    { preset: "Pre-Paired", fs: "0", ps: "1", pairing: "Container with A+B in one entry", pairs: "100 pairs" },
                    { preset: "Time Resolved", fs: "1", ps: "1", pairing: "Overlapping: 1+2, 2+3, 3+4 ...", pairs: "99 pairs" },
                    { preset: "Skip Frames", fs: "1", ps: "2", pairing: "Non-overlapping: 1+2, 3+4, 5+6 ...", pairs: "50 pairs" },
                    { preset: "Custom", fs: "N", ps: "M", pairing: "User-defined stride values", pairs: "varies" },
                  ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.preset}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{item.fs}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{item.ps}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.pairing}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.pairs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-soton-blue" size={20} />
                <h4 className="text-lg font-semibold text-gray-900">Frame Pair Formula</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-medium text-gray-900 mb-1">Pair count:</p>
                  <p className="font-mono text-gray-600">
                    fs == 0: num_images<br />
                    fs &gt; 0: (num_images - 1 - fs) / ps + 1
                  </p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-medium text-gray-900 mb-1">Pair indices (1-based pair_number):</p>
                  <p className="font-mono text-gray-600">
                    frame_a = start_index + (n-1) * pair_stride<br />
                    frame_b = frame_a + frame_stride
                  </p>
                </div>
              </div>
            </div>

            {/* A/B Format example */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">A/B Format (Double-Frame)</h4>
              <p className="text-gray-600 mb-4">
                Separate files for frame A and frame B with matching indices. Two filename patterns required.
              </p>
              <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 mb-3 font-mono">
                B00001_A.tif + B00001_B.tif -- Pair 1<br />
                B00002_A.tif + B00002_B.tif -- Pair 2
              </div>
              <YamlDropdown
                code={`images:
  pairing_preset: ab_format
  start_index: 1
  frame_stride: 0
  pair_stride: 1
  image_format:
    - B%05d_A.tif    # Frame A pattern
    - B%05d_B.tif    # Frame B pattern`}
              />
            </div>

            {/* Time-Resolved example */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Time-Resolved (Overlapping Pairs)</h4>
              <p className="text-gray-600 mb-4">
                Sequential single-frame images. Each image serves as B for one pair and A for the next.
              </p>
              <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 mb-3 font-mono">
                B00001.tif + B00002.tif -- Pair 1<br />
                B00002.tif + B00003.tif -- Pair 2
              </div>
              <YamlDropdown
                code={`images:
  pairing_preset: time_resolved
  start_index: 1
  frame_stride: 1
  pair_stride: 1
  image_format:
    - B%05d.tif    # Single pattern`}
              />
            </div>

            {/* Skip Frames example */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Skip Frames (Non-Overlapping Pairs)</h4>
              <p className="text-gray-600 mb-4">
                Consecutive pairs from a single sequence, but each image used only once.
              </p>
              <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 mb-3 font-mono">
                B00001.tif + B00002.tif -- Pair 1<br />
                B00003.tif + B00004.tif -- Pair 2
              </div>
              <YamlDropdown
                code={`images:
  pairing_preset: skip_frames
  start_index: 1
  frame_stride: 1
  pair_stride: 2
  image_format:
    - B%05d.tif`}
              />
            </div>

            {/* Backward compat note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Backward compatibility:</strong> Old config keys (<code className="bg-yellow-100 px-1 rounded">time_resolved</code>,
                <code className="bg-yellow-100 px-1 rounded mx-1">pairing_mode</code>,
                <code className="bg-yellow-100 px-1 rounded">zero_based_indexing</code>) are automatically migrated
                to the new stride-based model on load. New configs should use
                <code className="bg-yellow-100 px-1 rounded mx-1">pairing_preset</code>,
                <code className="bg-yellow-100 px-1 rounded mx-1">start_index</code>,
                <code className="bg-yellow-100 px-1 rounded mx-1">frame_stride</code>, and
                <code className="bg-yellow-100 px-1 rounded mx-1">pair_stride</code>.
              </p>
            </div>
          </Section>

          {/* Image Format Patterns Section */}
          <Section title="Filename Patterns" icon={<FileText size={32} />} id="patterns">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              C-style format specifiers define how frame numbers appear in filenames.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Specifier</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Example output</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { spec: "%05d", example: "B00001.tif, B00042.tif", desc: "5-digit, zero-padded" },
                    { spec: "%04d", example: "img0001.tif, img0042.tif", desc: "4-digit, zero-padded" },
                    { spec: "%d", example: "frame1.tif, frame42.tif", desc: "No padding" },
                  ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-mono text-soton-blue">{item.spec}</td>
                      <td className="px-6 py-3 text-sm font-mono text-gray-600">{item.example}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Supported File Formats</h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Index</h4>
                <p className="text-gray-600 mb-3">
                  Set <code className="bg-gray-200 px-1 rounded">start_index: 0</code> if files begin at 0
                  (e.g. <code className="bg-gray-200 px-1 rounded">B00000.tif</code>). Default is 1.
                </p>
                <YamlDropdown
                  code={`images:
  start_index: 0   # Files start at B00000.tif`}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Vector Output Pattern</h4>
                <p className="text-gray-600 mb-3">
                  Naming pattern for output .mat files.
                </p>
                <YamlDropdown
                  code={`images:
  vector_format:
    - '%05d.mat'   # Output: 00001.mat, 00002.mat, ...
  dtype: float32   # uint8 | uint16 | float32 | float64`}
                />
              </div>
            </div>
          </Section>

          {/* Container Formats Detail Section */}
          <Section title="Container Format Details" icon={<Database size={32} />} id="containers">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Container formats store multiple frames in a single file.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Structure</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pattern</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">.cine</td>
                    <td className="px-4 py-3 text-sm text-gray-600">One file per camera, all frames inside</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">Camera%d.cine</td>
                    <td className="px-4 py-3 text-sm text-gray-600">%d = camera number, not frame</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">.im7</td>
                    <td className="px-4 py-3 text-sm text-gray-600">One file per timestep, may contain multiple cameras</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">B%05d.im7</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Pre-paired: A+B in each file. TR: pair across files.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">.set</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Single file with all cameras and timesteps</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">experiment.set</td>
                    <td className="px-4 py-3 text-sm text-gray-600">source_path points to the .set file itself</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <YamlDropdown
              title="YAML Reference - CINE"
              code={`images:
  image_type: cine
  num_images: 1200     # Total frames in the file
  pairing_preset: time_resolved  # or skip_frames
  image_format:
    - Camera%d.cine    # %d = camera number

paths:
  camera_count: 2
  camera_numbers: [1, 2]`}
            />

            <YamlDropdown
              title="YAML Reference - IM7 (Pre-Paired)"
              code={`images:
  image_type: lavision_im7
  num_images: 100
  pairing_preset: pre_paired
  image_format:
    - B%05d.im7`}
            />

            <YamlDropdown
              title="YAML Reference - SET"
              code={`images:
  image_type: lavision_set
  num_images: 100
  pairing_preset: pre_paired   # or time_resolved
  image_format:
    - experiment.set

paths:
  source_paths:
    - /data/experiment.set     # Full path to .set file`}
            />
          </Section>

          {/* File Validation Section */}
          <Section title="File Validation" icon={<FileCheck size={32} />} id="validation">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Validation runs automatically when you save changes. It checks that first/last frames exist and are readable for each camera.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { status: "Valid", color: "bg-green-500", desc: "All files found and readable" },
                { status: "Warning", color: "bg-yellow-500", desc: "Processing subset of available files" },
                { status: "Error", color: "bg-red-500", desc: "Missing files or configuration issue" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                  <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`}></div>
                  <div>
                    <span className="font-semibold text-gray-900">{item.status}</span>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Common Issues</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>-- <strong>Files not found:</strong> Check source path and filename pattern (capitalisation, padding, underscores).</li>
                <li>-- <strong>Wrong count:</strong> Verify num_images matches actual file count.</li>
                <li>-- <strong>First file missing:</strong> Check start_index (0 vs 1).</li>
                <li>-- <strong>LaVision on Mac:</strong> IM7/SET require Windows or Linux.</li>
              </ul>
            </div>
          </Section>

          {/* Output Directory Structure Section */}
          <Section title="Output Directory Structure" icon={<HardDrive size={32} />} id="output">
            <CodeBlock code={`base_path/
├── uncalibrated_piv/{num_pairs}/Cam1/instantaneous/   # Raw vectors (px)
├── calibrated_piv/{num_pairs}/Cam1/instantaneous/     # Physical units (m/s)
├── calibrated_piv/{num_pairs}/Merged/instantaneous/   # Merged cameras
├── stereo_calibrated/{num_pairs}/Cam1_Cam2/           # Stereo 3D
├── statistics/{num_pairs}/...                         # Mean, TKE, etc.
├── videos/{num_pairs}/...                             # Animations
└── calibration/...                                    # Calibration models`} title="Output Directory Structure" />

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-600 text-sm">
                The <code className="bg-gray-200 px-1 rounded">{'{num_pairs}'}</code> subdirectory
                ensures processing different subsets does not overwrite previous results.
              </p>
            </div>
          </Section>

          {/* Complete Configuration Reference */}
          <Section title="Complete Configuration Reference" icon={<FileText size={32} />} id="example">
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">GUI Control</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Field</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { gui: "Source Path", yaml: "paths.source_paths[]", desc: "Input directories" },
                    { gui: "Base Path", yaml: "paths.base_paths[]", desc: "Output directories" },
                    { gui: "Active Paths", yaml: "paths.active_paths[]", desc: "Indices to process (0-based)" },
                    { gui: "Image Type", yaml: "images.image_type", desc: "standard | cine | lavision_im7 | lavision_set" },
                    { gui: "Number of Images", yaml: "images.num_images", desc: "Total image files or container entries" },
                    { gui: "Camera Count", yaml: "paths.camera_count", desc: "Total cameras" },
                    { gui: "Pairing Preset", yaml: "images.pairing_preset", desc: "ab_format | pre_paired | time_resolved | skip_frames | custom" },
                    { gui: "Start Index", yaml: "images.start_index", desc: "First file number (0 or 1)" },
                    { gui: "Frame Stride", yaml: "images.frame_stride", desc: "Gap between A and B in a pair" },
                    { gui: "Pair Stride", yaml: "images.pair_stride", desc: "Gap between starts of consecutive pairs" },
                    { gui: "Filename Pattern(s)", yaml: "images.image_format[]", desc: "Filename with %d specifier" },
                    { gui: "Vector Pattern", yaml: "images.vector_format[]", desc: "Output .mat filename pattern" },
                    { gui: "IM7 Camera Subfolders", yaml: "images.use_camera_subfolders", desc: "IM7: one file per camera in subfolders" },
                    { gui: "Camera Subfolders", yaml: "paths.camera_subfolders[]", desc: "Override default CamN names" },
                    { gui: "Batch Size", yaml: "batches.size", desc: "Image pairs per batch" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm text-gray-900">{row.gui}</td>
                      <td className="px-6 py-3 text-sm font-mono text-soton-blue">{row.yaml}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <YamlDropdown
              title="Full YAML Configuration Example"
              defaultOpen={true}
              code={`paths:
  source_paths:
    - /data/experiment_01/raw_images
  base_paths:
    - /data/experiment_01/results
  active_paths: [0]
  camera_count: 2
  camera_numbers: [1, 2]
  camera_subfolders: []        # Empty = default Cam1, Cam2

images:
  num_images: 500
  image_type: standard
  pairing_preset: ab_format    # ab_format | pre_paired | time_resolved | skip_frames | custom
  start_index: 1               # 0 if files start at B00000
  frame_stride: 0              # 0 = pre-paired, 1 = consecutive
  pair_stride: 1               # 1 = overlapping, 2 = non-overlapping
  image_format:
    - B%05d_A.tif
    - B%05d_B.tif
  vector_format:
    - '%05d.mat'
  dtype: float32

batches:
  size: 25

logging:
  file: pypiv.log
  level: INFO
  console: true`}
            />
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
              Define regions to exclude from PIV processing.
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
