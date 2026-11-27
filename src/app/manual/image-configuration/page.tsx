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
  Database,
  FileCheck,
  HardDrive,
  ChevronDown,
  ChevronRight,
  Info,
  Wand2,
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
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">1.</span><span>Press <strong>Browse</strong> beside the source box and pick the folder, the LaVision recording or the run of images (or type the path and choose a suggestion). Pick the output folder the same way. These are <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">source_paths</code> and <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">base_paths</code>. On Windows keep output folders short: a path over 259 characters is refused unless long paths are enabled.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">2.</span><span>Read the line under the source box. PIVTOOLs has filled the image settings from the files (<a href="#silent-fill" className="underline">Silent Fill</a>) and says what it set, with <strong>Undo</strong>. In config.yaml these are <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">image_type</code> (<code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">standard</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">cine</code>, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">lavision_im7</code>, or <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">lavision_set</code>), <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">image_format</code> (e.g. <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">B%05d.tif</code>) and the keys below.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">3.</span><span>Set <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">num_images</code> to frame pairs <em>per acquisition loop</em> (not total files across loops).</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">4.</span><span>Check the <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">pairing_preset</code> the fill chose against the table below -- most users want <strong>A/B Format</strong> (separate <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">_A</code>/<code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">_B</code> files) or <strong>Time Resolved</strong> (overlapping consecutive frames).</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">5.</span><span>Save. Validation runs automatically: green = ready to process, yellow/red = check the filename pattern, <code className="bg-white/60 px-1.5 py-0.5 rounded text-sm">start_index</code>, and count.</span></li>
            </ol>
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

            <h3 className="text-xl font-bold text-gray-900 mb-4" id="picker">Picking a path</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each path box on this tab and on the calibration tabs suggests as you type: the folders and LaVision
              recordings that match, each with what it holds (for example <em>1,200 TIFF/PNG/JPG</em> or{' '}
              <em>2 camera folders</em>). <strong>↑ ↓</strong> move, <strong>Tab</strong> opens the highlighted folder,
              and <strong>Enter</strong> uses it, or the typed text when nothing is highlighted. A picked path is saved
              at once. A typed path is saved when you leave the box. <strong>Browse</strong> opens a folder browser:
            </p>
            <FeatureList
              items={[
                "The left rail lists each drive by its name (for example Desk SSD (D:)), Home, and Recent, the last six paths you picked in this browser.",
                "A folder's contents are grouped as Folders, LaVision recordings, Images and Other files. A run of numbered images is one row, showing its first and last file, its count and its pattern.",
                "The gold button names what you will use: Use this folder, Use this recording or Use these images. Double-click opens a folder.",
                "Files the box cannot take are greyed. An output folder box takes folders only.",
                "An empty box opens Browse at Home. A box holding a file opens its folder with the file's run or recording selected. A folder that cannot be listed says why in the pane.",
              ]}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-4" id="recordings">LaVision recordings in the picker</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              A recording is a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.set</code> file and the
              data folder of the same name beside it. The picker shows the two as one row, with the cameras (each
              tagged A/B or single, with its image size) and the entry count. Picking the data folder, or any file
              inside it, picks the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.set</code>; opening the
              data folder in Browse lands on the folder above it with the recording selected. A{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.set</code> without a data folder of image
              streams is not a recording (a DaVis project or result file). It is listed greyed under Other files
              with why, for example <em>DaVis project file: no data folder Properties/ beside it</em> or{' '}
              <em>DaVis project file: its folder camera1/ holds no frame streams (StreamSet.xml or *-0.ims)</em>,
              and cannot be picked. Typed into the box, it fills nothing and the line says why: &quot;The image
              settings were not changed: Properties.set is not a recording: no data folder Properties/ beside it. It
              is a DaVis project file, or a recording whose data folder was not copied with it.&quot;
            </p>

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

          {/* Silent Fill */}
          <Section title="Silent Fill" icon={<Wand2 size={32} />} id="silent-fill">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              When you pick a source, or type one and leave the box, PIVTOOLs reads what is on disk and fills the
              image settings: image type, filename pattern, pairing, camera count, cameras to process, camera folders,
              the .im7 one-folder-per-camera switch and the first frame number. It runs only when the source path
              changes. Opening the page, or leaving a box you did not change, never rewrites the settings. Picking the
              same path again detects it again.
            </p>
            <FeatureList
              items={[
                "One line under the box says what was set, for example \"Standard (TIFF/PNG/JPG), 1 camera, A/B image pairs, 500 pairs\" or \"LaVision recording (.set + .ims folder), 4 cameras, processing 1 and 2 (3 and 4 single-frame, left out), pre-paired A+B, 150 entries\".",
                "Undo puts every filled setting back as it was before the fill. The path you picked stays. The line and its Undo go once you edit any of the filled settings.",
                "A folder holding one recording takes it. A folder holding several shows \"N recordings here. Pick one:\" with the recordings listed under the box, and nothing changes until you pick one.",
                "A setting the files cannot tell is left as it was, and the line ends with \"not set:\" and the reason.",
                "When nothing usable is found (an empty folder, a .set that is not a recording, a folder whose images carry two extensions), the settings are left as they were, the line reads \"The image settings were not changed:\" and the reason (here and on the calibration tabs), and validation shows its message and fix buttons as before.",
                "A folder whose images carry two extensions fills nothing, however few files carry the second, because a filename pattern names one extension (.tif and .png are two, so are .tif and .tiff; letter case is not). The line gives each extension's count: \"The image settings were not changed: D:/data/run1 holds image files with 2 extensions (3 .im7 files, 1 .tif file), so which files to read cannot be told. Pick a folder whose images share one extension.\"",
                "Only the first source fills the settings, because every source shares them. A later source is only compared: if it differs, a warning names each difference, for example \"Source 2 differs from the image settings, which come from source 1: image type ... here, ... in Setup. Nothing was changed.\" The cameras to process are your choice, so they are not compared.",
                "A fill that cannot be saved shows why under the box, with no summary and no Undo.",
              ]}
            />
            <p className="text-gray-700 leading-relaxed mb-6">
              Every image setting is on one Image Settings card on Setup, directly under the source box, with
              Output Directories as its own card after it. The card holds image type, count and loops first, then
              the camera count and Cameras to process, then camera folders, pairing (with the first frame number),
              and the filename patterns. Shaded settings were filled from the source. A setting loses its shade when
              you change it, and gets it back if you set it back to the filled value.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">What the fill sets</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">On disk</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pairing</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cameras</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { disk: "Images named _A and _B (B00001_A.tif + B00001_B.tif)", pairing: "A/B Format", cams: "One, or one per camera folder (Cam1/, Cam2/, ...)" },
                    { disk: "A numbered image sequence without _A/_B", pairing: "Time Resolved", cams: "One, or one per camera folder" },
                    { disk: "A .set with at least one double-frame camera", pairing: "Pre-Paired", cams: "From the camera labels. Single-frame cameras are left out of the cameras to process" },
                    { disk: "A .set with only single-frame cameras", pairing: "Time Resolved", cams: "From the camera labels, all processed" },
                    { disk: "A .set without camera labels", pairing: "Pre-Paired or Time Resolved", cams: "Only when the streams split into cameras one way. Otherwise cameras and pairing are left for you, and the line says why" },
                    { disk: ".im7 files holding 2 frames each", pairing: "Pre-Paired", cams: "One, or one per camera folder" },
                    { disk: ".im7 files holding 1 frame each", pairing: "Time Resolved", cams: "One, or one per camera folder" },
                    { disk: ".im7 files holding another number of frames", pairing: "Left as it was", cams: "From the camera folders when each camera has its own. Otherwise left for you. The line says why" },
                    { disk: "Camera1.cine, Camera2.cine, ...", pairing: "Time Resolved", cams: "One per .cine file" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.disk}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.pairing}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.cams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Picking a run of images saves its folder, which the box then shows, and sets its filename pattern. Picking inside a camera folder takes
              the folder above it. The first frame number is read from the files. You can change any setting after the
              fill, and the pairing menu keeps every option for the image type, Custom included.
            </p>
          </Section>

          {/* Image Type Selection */}
          <Section title="Image Type Selection" icon={<Database size={32} />} id="image-type">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Select the format matching your image files. <code className="bg-gray-100 px-1 rounded">images.image_type</code> is
              required in config.yaml.
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
                    { type: "Standard", yaml: "standard", desc: "Individual image files (.tif, .png, .jpg). One image per file. Camera RAW (.raw, .cr2, .nef, .arw) is not read. Convert it to 16-bit TIFF." },
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

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Platform Compatibility</h4>
              </div>
              <p className="text-blue-700">
                <strong>LaVision formats</strong> (.im7, .set) use a pure-Python reader and work on macOS, Linux, and Windows with no extra dependency.
                <strong> Phantom CINE</strong> requires the cinereader library.
              </p>
              <p className="text-blue-700 mt-2">
                A .set carries a pixel encoding set at acquisition. Seven of the eight DaVis encodings are decoded; only
                RGB 24 is refused, by name. See <a href="#containers" className="underline font-semibold">Container Format Details</a>.
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
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Single camera always reads from the source root.</strong> When
                    <code className="bg-blue-100 px-1 rounded">camera_count</code> is 1, images resolve at the source
                    path itself and any <code className="bg-blue-100 px-1 rounded">camera_subfolders</code> entry is
                    ignored as leftover state from an earlier multi-camera session. This is a rule rather than a
                    convention, and it is what stops a stale <code className="bg-blue-100 px-1 rounded">Cam1</code>
                    entry from silently redirecting a one-camera dataset.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Camera</h4>
                <p className="text-gray-600 mb-4">
                  Images in camera subfolders (default: <code className="bg-gray-200 px-1 rounded">Cam1</code>, <code className="bg-gray-200 px-1 rounded">Cam2</code>, ...).
                  Override with <code className="bg-gray-200 px-1 rounded">camera_subfolders</code>.
                  The same rule applies to PIV and to calibration images. <code className="bg-gray-200 px-1 rounded">.set</code> and{' '}
                  <code className="bg-gray-200 px-1 rounded">.cine</code> containers never use subfolders.
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

            <div className="bg-gray-50 rounded-lg p-6 mb-6" id="cameras-to-process">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Cameras to process</h4>
              <p className="text-gray-600">
                Which cameras a run processes is set on Setup, under <strong>Cameras to process</strong> beside the
                camera count in the Image Settings card, and saved as{' '}
                <code className="bg-gray-200 px-1 rounded">paths.camera_numbers</code>. At least one must be ticked.
                With one camera there are no camera buttons, only a note that it is processed. The Instantaneous and
                Ensemble tabs show the saved selection read-only, at every camera count, with a{' '}
                <strong>Change in Setup</strong> link. Picking a recording fills the selection from the camera labels
                (<a href="#silent-fill" className="underline">Silent Fill</a>).
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Each camera keeps its own image size</h4>
              <p className="text-gray-600">
                Cameras of one job need not share a sensor size. Each camera is read, correlated and saved at its own
                size, so a mixed rig (a PIV camera beside a PLIF camera, or one camera turned by 90&deg;) runs in one
                job. Merging and stereo already work on each camera&apos;s own grid.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">IM7 Camera Subfolder Mode</h4>
              <p className="text-blue-700 mb-3">
                IM7 files can store multiple cameras in one file (<code className="bg-blue-100 px-1 rounded">use_camera_subfolders: false</code>, default)
                or one camera per file in subdirectories (<code className="bg-blue-100 px-1 rounded">use_camera_subfolders: true</code>).
                This switch applies to <code className="bg-blue-100 px-1 rounded">.im7</code> only. Standard formats use the camera-count rule above.
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
                    (num_images - 1 - fs) // ps + 1
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
              <p className="text-gray-600 text-sm mt-4">
                The formula holds for pre-paired entries too, so pre-paired with pair_stride 2 over 10 entries processes
                5 pairs. Impossible strides are refused by name. These are a negative frame_stride, a pair_stride below
                1, and frame_stride 0 on a .cine.
              </p>
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

            {/* Fixed frame (BOS) */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6" id="fixed-frame">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">A Fixed Frame (BOS)</h4>
              <p className="text-gray-600 mb-4">
                For standard image files with two patterns (A/B), one pattern may be a file name with no{' '}
                <code className="bg-gray-100 px-1 rounded">%</code>. That file is used as that frame of every pair, as
                background-oriented schlieren correlates each image with one reference image. The images are counted
                from the numbered pattern. The fixed file must exist in each camera folder and be the same size as the
                numbered images.
              </p>
              <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 mb-3 font-mono">
                B00001_A.tif + background.tif -- Pair 1<br />
                B00002_A.tif + background.tif -- Pair 2
              </div>
              <YamlDropdown
                code={`images:
  pairing_preset: ab_format
  frame_stride: 0
  pair_stride: 1
  image_format:
    - B%05d_A.tif     # Frame A: numbered
    - background.tif  # Frame B: the same file in every pair
# Frame A fixed instead: [background.tif, B%05d_B.tif]`}
              />
              <p className="text-gray-600 text-sm mt-4 mb-2">Refused before a run, by name:</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4">
                <li>Both patterns fixed: &quot;both frames name one fixed file: every pair would be the same image&quot;.</li>
                <li>A single pattern with no <code className="bg-gray-100 px-1 rounded">%</code>: &quot;names one fixed file for both frames, so there is no pair to form&quot;.</li>
                <li>A pattern with two <code className="bg-gray-100 px-1 rounded">%</code> fields: &quot;&apos;B%05d_%d.tif&apos; must hold exactly one frame-number field such as %05d&quot;.</li>
                <li>A missing fixed file: &quot;Camera 1: the fixed frame B file background.tif is missing in &lt;folder&gt;&quot;.</li>
                <li>A fixed file of another size: &quot;frames A and B have different shapes (1024, 1280) and (1080, 1280)&quot;.</li>
              </ul>
              <p className="text-gray-600 text-sm mb-2">
                The run check (under NOTES) and the Setup tab name each fixed frame, so a pattern that lost its{' '}
                <code className="bg-gray-100 px-1 rounded">%</code> to a typo shows up before a run:
                &quot;Frame B is the fixed file background.tif, read in every pair, because its images.image_format
                pattern has no frame-number field such as %05d.&quot;
              </p>
              <p className="text-gray-600 text-sm">
                In the GUI, the A/B pattern boxes say that A or B may be one fixed file name. The folder picker does not
                detect a BOS folder, so set the fixed frame by hand after picking the source. Picking the source again
                overwrites it.
              </p>
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
                <strong>Old pairing keys are refused.</strong> A config that still contains
                <code className="bg-yellow-100 px-1 rounded mx-1">images.time_resolved</code> or
                <code className="bg-yellow-100 px-1 rounded mx-1">images.pairing_mode</code> fails to load, and the error names
                the replacement keys
                <code className="bg-yellow-100 px-1 rounded mx-1">start_index</code>,
                <code className="bg-yellow-100 px-1 rounded mx-1">frame_stride</code>, and
                <code className="bg-yellow-100 px-1 rounded mx-1">pair_stride</code>.
                Remove the old keys, or regenerate the file with
                <code className="bg-yellow-100 px-1 rounded mx-1">pivtools-cli init</code>.
              </p>
            </div>
          </Section>

          {/* Image Format Patterns Section */}
          <Section title="Filename Patterns" icon={<FileText size={32} />} id="patterns">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              C-style format specifiers define how frame numbers appear in filenames.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong><code className="bg-blue-100 px-1 rounded">image_format</code> is always a list.</strong> Write
                <code className="bg-blue-100 px-1 rounded">image_format: [&quot;cine&quot;]</code>, not
                <code className="bg-blue-100 px-1 rounded">image_format: cine</code>. A bare string or an empty list is
                refused when the config is read.
              </p>
            </div>

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

            <p className="text-gray-700 leading-relaxed mb-8">
              A TIFF holds one image. A multi-page TIFF is refused with its page count, so save each image as its own
              file. A colour TIFF (contiguous or planar) is converted to grayscale with the BT.601 weights,
              0.299 R + 0.587 G + 0.114 B. A PNG or JPEG is read at its own bit depth, so a 16-bit colour PNG keeps its
              full depth, and colour is converted to grey with the same weights. A gray+alpha PNG is refused by name, so save it as gray without alpha. Camera RAW files (.raw, .cr2,
              .nef, .arw) are not read. Convert them to 16-bit TIFF.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Index</h4>
                <p className="text-gray-600 mb-3">
                  Set <code className="bg-gray-200 px-1 rounded">start_index: 0</code> if files begin at 0
                  (e.g. <code className="bg-gray-200 px-1 rounded">B00000.tif</code>). Default is 1.
                  Validation reads the first frame number from all the matching files. When it differs
                  from the start index it says so (&quot;Files start at 0 but the start index is 1 — switch
                  to 0-based indexing&quot;), and when that is why the first or last frame is missing, a{' '}
                  <strong>Switch to 0-based</strong> (or 1-based) button sets the start index for you.
                  A .set numbers its entries and a .cine its frames from 1, so start_index 0 is refused for them by name.
                  For these, start_index is the first entry or frame to process.
                </p>
                <YamlDropdown
                  code={`images:
  start_index: 0   # Files start at B00000.tif`}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Vector Output Pattern</h4>
                <p className="text-gray-600 mb-3">
                  Naming pattern for output .mat files. Images are always loaded as float32;
                  there is no setting for it.
                </p>
                <YamlDropdown
                  code={`images:
  vector_format:
    - '%05d.mat'   # Output: 00001.mat, 00002.mat, ...`}
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
                    <td className="px-4 py-3 text-sm text-gray-600">source_path points to the .set file itself (picking its data folder picks it). Copy its companion folder with it</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">.set recordings</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.set</code> is a small file plus a
              companion folder of the same name holding the image streams. <strong>Both must be copied together</strong>,
              because a .set on its own cannot be read. A DaVis <em>result</em> set (processed vectors) has no companion folder
              and holds no images.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The streams are found only through the folder&apos;s <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">StreamSet.xml</code>.
              They are never guessed from <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Frame0</code>,{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Frame1</code> ... file names, so a folder without
              StreamSet.xml is refused. Copy the complete folder. Zlib, LZ4 and IMX compressed streams are decoded, and
              DaVis 11.4 recordings that store a camera&apos;s A and B frames in one stream file are read. A stream&apos;s
              index header word 14 (planes per frame) must be 0, the only value real recordings carry, and any other
              value is refused by name. If the folder
              holds <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.im7</code> files rather than streams, the
              recording is in .im7 layout, and the message tells you to set{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">image_type: lavision_im7</code> and point the
              source path at that folder.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Cameras in a .set</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A recording names its own cameras. PIVTOOLs reads the three camera keys DaVis stores with the images
              (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Acq.Camera.Label</code>,{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Acq.Camera.ID</code> and{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">CameraName</code>) and takes the cameras, and
              which streams belong to each, from them. Validation lists each camera as DaVis names it, with model and
              serial, for example <em>Camera 3 (Imager sCMOS CLHS, Camera.ImagerSCMOS5MCLHS: 61008639, single frame)</em>,
              and every camera list in the GUI shows the same name.
            </p>
            <FeatureList
              items={[
                "Picking the recording fills the cameras from the labels: with any double-frame camera the pairing is pre-paired and the single-frame cameras are left out of the cameras to process; with none, every camera is processed time-resolved. You can change the selection. If the camera count is later changed away from the labels, validation offers the labels' count.",
                "A single-frame camera (a PLIF camera, say) can be processed time-resolved. It has no A/B pairs, so selecting it for A/B pairing is refused, naming the camera.",
                "DaVis 11.4 can write the labels on only the first part of a recording. Validation reports how many images carry them (for example 264 of 500 images), and every labelled image must agree.",
                "Without labels (older recordings), cameras are matched to streams by image shape. A count with exactly one fitting split is used; an ambiguous count is refused, listing the counts that fit.",
                "A recording DaVis flagged SetIsSuspicious gets an amber warning. DaVis does not record why, so check its images before processing.",
              ]}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-4">.set pixel encodings</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The folder records which pixel encoding the camera used. DaVis writes eight and PIVTOOLs decodes seven.
              RGB 24 is refused by name, and so is an encoding id outside DaVis&apos;s eight.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Encoding</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Shown in DaVis as</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Supported</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: "mono-10p", label: "Mono10p to 16 bit", ok: true },
                    { id: "mono-12p", label: "Mono12p to 16 bit", ok: true },
                    { id: "raw-16-bit", label: "Raw 16 bit", ok: true },
                    { id: "raw-8-bit", label: "8 to 16 bit", ok: true },
                    { id: "mono-10pmsb", label: "Mono10pmsb to 16 bit", ok: true },
                    { id: "mono-12packed", label: "Mono12packed to 16 bit", ok: true },
                    { id: "mono-12pmsb", label: "Mono12pmsb to 16 bit", ok: true },
                    { id: "rgb-24", label: "RGB 24", ok: false },
                  ].map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.label}</td>
                      <td className="px-4 py-3 text-sm">
                        {row.ok
                          ? <span className="text-green-700 font-semibold">Yes</span>
                          : <span className="text-gray-500">No, refused by name</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">If your recording is RGB 24</h4>
              </div>
              <p className="text-blue-700">
                Re-export it from DaVis as <strong>Raw 16 bit</strong>.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Declared corrections</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A recording can declare per-camera corrections that DaVis applies when it opens the images. PIVTOOLs
              applies the same ones in the same order, so the intensities and orientation you process match what DaVis
              shows. There is nothing to configure. A correction is applied only when the recording declares it, and
              recordings without one are read unchanged. Ten are applied, in LaVision&apos;s fixed order whatever order
              the recording lists them in:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
              <li><strong>Intensity correction 1</strong> (the sCMOS correction) subtracts its correction image and adds
                300 counts. These sCMOS images therefore carry a 300-count offset, as in DaVis.</li>
              <li><strong>Dark image subtraction</strong>, then <strong>Background subtraction</strong>. Each step is
                clipped to 0..65535 counts, so a pixel never goes negative.</li>
              <li>One geometry at most, from <strong>Rotation by 180</strong>, <strong>Vertical mirroring</strong>,{' '}
                <strong>Horizontal mirroring</strong>, <strong>Clockwise</strong> or <strong>Counterclockwise rotation
                by 90</strong>, or either 90&deg; rotation plus vertical mirror. A 90&deg; rotation swaps the frame&apos;s
                width and height, and the camera is processed at its rotated size.</li>
            </ol>
            <p className="text-gray-700 leading-relaxed mb-6">
              Copy the companion folder complete, because a declared correction image that is missing is an error, not
              a silent skip. A camera that declares two geometries, or one correction twice, is refused. So are{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">white-image-correction</code>,{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">add-offset</code> and{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">image-intensity-correction-2</code>, by name,
              when that camera is read, because their effect has not been measured. A transformer id PIVTOOLs does not
              know blocks only its camera when the recording carries camera labels, and the whole recording when it does
              not. Results produced
              before August 2026 did not apply dark subtraction, so re-run rather than compare against them.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">.im7 files</h3>
            <FeatureList
              items={[
                "Pack types 0 (uncompressed), 1 (DaVis token stream, multi-frame files included), 2 (zlib) and 20 (LZ4) are read. Header version 1, which DaVis writes for multi-frame LZ4 output such as Subtract sliding minimum, is read for pack type 20.",
                "A camera .im7 holds one plane per frame (header size_z 1). A file with more planes is DaVis processing output and is refused by name.",
                "Pack type 3 (fixed 12-bit packed) is refused. Re-export from DaVis uncompressed or with lossless compression.",
                "A version-1 file stores a DaVis mask per frame. PIVTOOLs does not apply it, and a file with any masked pixel is refused. Export the images from DaVis without the mask and use the PIVTOOLs mask (Masking page).",
                "A version-0 file can also carry a DaVis mask. It is not applied, and the full image is read.",
              ]}
            />

            <YamlDropdown
              title="YAML Reference - CINE"
              code={`images:
  image_type: cine
  num_images: 1200     # Total frames in the file
  pairing_preset: time_resolved  # or skip_frames (pair_stride 2)
  frame_stride: 1      # required; the preset alone leaves 0, which is refused
  pair_stride: 1
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
  pairing_preset: pre_paired   # time_resolved needs frame_stride: 1
  frame_stride: 0
  pair_stride: 1
  image_format:
    - experiment.set

paths:
  source_paths:
    - /data/experiment.set     # Full path to .set file`}
            />
          </Section>

          {/* Multi-Loop Acquisition Section */}
          <Section title="Multi-Loop Acquisition" icon={<Layers size={32} />} id="multi-loop">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Some experiments record data across multiple acquisition loops -- separate source
              folders that should be combined into a single dataset for processing. Set{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">num_loops</code> to tell
              PIVTools how many loops to stitch together. All loops must have the same number of
              frame pairs and use the same image format.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-gray-700 mb-4">
              PIVTools finds additional loop folders by incrementing the <strong>last number</strong> in
              the source path name. For example, if your source path
              is <code className="bg-gray-100 px-1 rounded text-sm">experiment_0/</code> and{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">num_loops: 3</code>, it will read from:
            </p>

            <div className="text-sm text-gray-600 font-mono bg-gray-50 rounded p-4 mb-6">
              experiment_0/&nbsp;&nbsp;&nbsp;# Loop 0 (the configured source_path)<br />
              experiment_1/&nbsp;&nbsp;&nbsp;# Loop 1 (auto-discovered)<br />
              experiment_2/&nbsp;&nbsp;&nbsp;# Loop 2 (auto-discovered)
            </div>

            <p className="text-gray-700 mb-6">
              Downstream code sees a single unified array. For example, 3 loops of 40 pairs each
              produces a 120-pair dask array. The GUI image viewer resolves global pair numbers back
              to the correct loop and local pair index automatically.
            </p>

            <p className="text-gray-700 mb-6">
              Validate Files, and the CLI check before every run, read each loop&apos;s first and last pair from that
              loop&apos;s own folder or file. An error names the loop that failed, for example{' '}
              <em>Loop 1 (experiment_1): last pair (40) could not be read.</em>
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Setting</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Key</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: "Number of Loops", yaml: "images.num_loops", desc: "How many acquisition loops to combine (default: 1 = single loop)" },
                    { setting: "Num Images", yaml: "images.num_images", desc: "Frame pairs per loop (not total). Total pairs = num_loops x per-loop pairs." },
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

            <h3 className="text-xl font-bold text-gray-900 mb-3">Works With Every Image Type</h3>
            <p className="text-gray-700 mb-4">
              Multi-loop works with standard files (separate folders), .set files (separate .set files),
              .cine (separate folders), and .im7 (separate folders).
              Batch size is automatically capped at the per-loop pair count to prevent cross-loop batches.
            </p>

            <YamlDropdown
              title="config.yaml - Multi-Loop Example"
              code={`images:
  num_images: 40       # 40 pairs per loop
  num_loops: 5         # 5 loops = 200 total pairs
  image_format:
    - B%05d_A.tif
    - B%05d_B.tif

paths:
  source_paths:
    - /data/experiment_0   # Loop 0 -- loops 1-4 auto-discovered
  base_paths:
    - /data/results`}
            />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mt-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="text-blue-600" size={18} />
                <strong className="text-blue-800">Naming Convention</strong>
              </div>
              <p className="text-blue-700 text-sm">
                The folder name must end with a number. PIVTools increments the <strong>last</strong> number
                in the path: <code className="bg-blue-100 px-1 rounded">run_0/</code> becomes{' '}
                <code className="bg-blue-100 px-1 rounded">run_1/</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">loop=0.set</code> becomes{' '}
                <code className="bg-blue-100 px-1 rounded">loop=1.set</code>. If your folders
                don&apos;t follow this convention, rename them or use separate source paths with{' '}
                <code className="bg-blue-100 px-1 rounded">active_paths</code> instead.
              </p>
            </div>
          </Section>

          {/* File Validation Section */}
          <Section title="File Validation" icon={<FileCheck size={32} />} id="validation">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Validation runs automatically when you save changes. It checks that first/last frames exist and are readable for each camera.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              A number box whose text is not a number turns red with the reason under it (for example{' '}
              <em>A number is required</em> or <em>&quot;1.5&quot; is not a whole number</em>), and nothing is saved until you fix
              it. A value is saved as typed, so 0 stays 0. A save that fails, or that the config rules refuse, shows
              its error and changes nothing (<a href="/manual/cli-reference#config-refused" className="underline">Config Refused</a>).
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The run itself checks more. Before processing starts, a CLI run or a Run PIV job checks every frame file
              of every active source path, camera and loop by name. If any are missing, it refuses and names the first
              missing files with their pair and camera, so a gap in the middle of a sequence cannot pass unnoticed.
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
                <li>-- <strong>Files not found:</strong> Check source path and filename pattern (capitalisation, padding, underscores). The &quot;Did you mean&quot; suggestion uses the number that changes between files as the frame number and copies its zero padding exactly. When it cannot tell which number that is, it gives no suggestion and says why.</li>
                <li>-- <strong>Wrong count:</strong> Verify num_images matches actual file count. Number of Image Files cannot be saved blank.</li>
                <li>-- <strong>CINE type with a non-cine file:</strong> the error names the mismatch between the image type and the file.</li>
                <li>-- <strong>First file missing:</strong> Check start_index (0 vs 1). The error adds the start-index hint and the switch button when the files start at the other value. After a successful validation the hint still shows, without the button.</li>
                <li>-- <strong>A refusal by name:</strong> the reader says what it will not read and why. Look it up in the table below.</li>
              </ul>
            </div>
          </Section>

          {/* Refusals */}
          <Section title="Refusals" icon={<Info size={32} />} id="refusals">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The readers refuse rather than guess. Each refusal names the file and what is wrong, so the fix is in the
              message. The table gives the gist of each message and its fix.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Case</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">The message says</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">What to do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { fmt: ".set", what: "No companion folder", msg: "has no companion data folder", fix: "Copy the folder of the same name with the .set. A DaVis result set (vectors) holds no images, so point at the recording." },
                    { fmt: ".set", what: "The folder holds .im7 files, not streams", msg: "This recording is in DaVis .im7 layout", fix: "Set image_type to lavision_im7 and point the source path at the folder." },
                    { fmt: ".set", what: "No StreamSet.xml, or it declares no image stream", msg: "the stream-to-camera mapping comes only from ... StreamSet.xml and is not guessed from file names", fix: "Copy the complete companion folder, or re-export from DaVis." },
                    { fmt: ".set", what: "The folder holds no image data", msg: "a DaVis project or calibration node, not an image recording", fix: "Point at the recording .set." },
                    { fmt: ".set", what: "A Photron MRAW or GRAW, or cine, stream", msg: "a Photron MRAW stream / a Vision Research cine stream", fix: "Export from DaVis as .im7 or TIFF. Read an original .cine with image_type cine." },
                    { fmt: ".set", what: "A stream file missing, truncated, split over several data files, or with a header value no real recording carries", msg: "names the file, the field and the value", fix: "Copy the complete folder. If it is complete, send us the recording." },
                    { fmt: ".set", what: "Index header word 14 (planes per frame) not 0", msg: "index header word 14 (planes per frame) is N; PIVTOOLs reads only 0", fix: "Point at the camera recording. If it is one, send it to us." },
                    { fmt: ".set", what: "Camera count differs from the camera labels", msg: "holds N cameras by its own camera labels", fix: "Set the camera count to N (validation offers it)." },
                    { fmt: ".set", what: "No labels, and no unique split of the streams by shape", msg: "cannot split into N cameras / the mapping is ambiguous. Camera counts that fit: ...", fix: "Set a camera count that fits." },
                    { fmt: ".set", what: "Camera labels on some streams only, or changing between images", msg: "Which camera those streams belong to is unknown", fix: "Send us the recording." },
                    { fmt: ".set", what: "A single-frame camera selected for A/B pairs", msg: "is a single-frame camera, so it has no A/B pairs", fix: "Untick it in Cameras to process on Setup, or process it time-resolved." },
                    { fmt: ".set", what: "Two geometries on one camera, or one correction declared twice", msg: "declares two geometric transformers / declares ... twice", fix: "Correct the camera's corrections in DaVis and export again." },
                    { fmt: ".set", what: "white-image-correction, add-offset or image-intensity-correction-2", msg: "a DaVis transformer whose effect PIVTOOLs has no measurement of", fix: "Deselect that camera; the others read. Send us a sample recording." },
                    { fmt: ".set", what: "A transformer id PIVTOOLs does not know", msg: "not one of the 13 DaVis transformer ids PIVTOOLs knows", fix: "With camera labels only that camera is blocked, so deselect it. Send us a sample recording." },
                    { fmt: ".set", what: "A declared correction image missing, or not the sensor's size", msg: "is missing from ... / does not belong to this recording", fix: "Copy the complete companion folder." },
                    { fmt: ".set", what: "RGB 24, or an unknown pixel encoding", msg: "is a recognised DaVis encoding but is not implemented / Unknown .set pixel encoding", fix: "Re-export from DaVis as Raw 16 bit." },
                    { fmt: ".set", what: "DaVis flagged the recording SetIsSuspicious (a warning, not a refusal)", msg: "DaVis marked this recording as suspicious", fix: "Check its images before processing." },
                    { fmt: ".im7", what: "Pack type 3", msg: "pack_type 3 (fixed 12-bit packed) is not read", fix: "Export uncompressed or with lossless compression (pack type 0, 1, 2 or 20)." },
                    { fmt: ".im7", what: "A header version other than 0 or 1, or version 1 without pack type 20", msg: ".im7 header version N is not read", fix: "Export again from DaVis, or send us the file." },
                    { fmt: ".im7", what: "More than one plane per frame (header size_z not 1)", msg: "header size_z (planes per frame) is N; a camera image has 1 plane per frame", fix: "Use the recorded images, not DaVis processing output such as dewarped float images." },
                    { fmt: ".im7", what: "A version-1 file with masked pixels", msg: "carries a DaVis mask with N of M pixels masked", fix: "Export without the DaVis mask and use the PIVTOOLs mask." },
                    { fmt: "TIFF", what: "More than one page", msg: "is a multi-page TIFF with N pages", fix: "Save each image as its own TIFF." },
                    { fmt: "TIFF", what: "A volumetric page", msg: "has TIFF page axes ...", fix: "Save 2-D images." },
                    { fmt: "PNG", what: "A gray+alpha PNG", msg: "is a gray+alpha PNG (colour type 4)", fix: "Save it as gray, without alpha." },
                    { fmt: "Mask", what: "A mask not its camera's image size", msg: "is H x W pixels (height x width), but camera N's images are H x W. A mask is never stretched to fit", fix: "Redraw the mask on this camera's images in the Masking tab. Swapped height and width mean the camera is now rotated." },
                    { fmt: "Mask", what: "Masking on, and the mask file missing or unreadable", msg: "has no mask file at ... / could not be read", fix: "Draw and save the mask in the Masking tab, or turn masking off." },
                    { fmt: "Mask", what: "Masking on, and masking.mode not file or rectangular", msg: "is not a masking mode", fix: "Set masking.mode to 'file' or 'rectangular', or turn masking off." },
                    { fmt: "Datasets", what: "A dataset index the config does not have, or not a whole number (Run PIV, --active-paths, paths.active_paths, calibration apply)", msg: "Dataset N in <the selection> is out of range: this config has M datasets (paths.source_paths), numbered 0 to M-1", fix: "Select datasets the config has. Indices count from 0." },
                    { fmt: "Datasets", what: "A selection with no dataset in it", msg: "selects no dataset ... Select at least one", fix: "Tick at least one dataset. In config.yaml, list at least one index in paths.active_paths, or write null to process every dataset." },
                    { fmt: "RAW", what: ".raw, .cr2, .nef or .arw", msg: "Camera RAW support was removed from PIVTOOLs", fix: "Convert to 16-bit TIFF and point image_format at those." },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono text-soton-blue whitespace-nowrap">{row.fmt}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.what}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">{row.msg}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
├── statistics/uncalibrated/{num_pairs}/...            # Correlation diagnostics
├── videos/{num_pairs}/...                             # Animations
└── videos/uncalibrated/{num_pairs}/...                # Uncalibrated animations

<calibration_source>/
└── calibration/...                                    # Calibration models + settings.yaml`} title="Output Directory Structure" />

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
