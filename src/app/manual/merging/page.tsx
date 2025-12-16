'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Layers,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Camera,
  Terminal,
  Monitor,
  Info,
  XCircle,
  GitMerge,
  Grid,
  Maximize
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ManualNavigation from '@/components/ManualNavigation';
import Link from 'next/link';

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

interface GUIStepProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const GUIStep = ({ step, title, children }: GUIStepProps) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold text-lg">
      {step}
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

export default function MergingPage() {
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
              Vector <span className="text-soton-gold">Merging</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Combine vector fields from multiple cameras into a single seamless field,
              extending your measurement domain with smooth overlap blending.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Extend Your Measurement Domain</h3>
            <p className="text-gray-200 mb-6 text-lg">
              Multi-camera PIV setups often capture overlapping regions to cover large experimental
              domains. Merging combines these fields into one unified vector field with smooth
              transitions in the overlap regions using Hanning window blending.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Camera size={24} />, label: "Multi-Camera", desc: "2 or more cameras" },
                { icon: <GitMerge size={24} />, label: "Hanning Blend", desc: "Smooth overlaps" },
                { icon: <Maximize size={24} />, label: "Extended FOV", desc: "Larger domain" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-soton-gold mb-2 flex justify-center">{item.icon}</div>
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <Section title="Overview" icon={<Layers size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Vector merging creates a unified coordinate grid spanning all cameras and interpolates
              velocity data onto this grid. In overlap regions where multiple cameras contribute,
              a distance-based Hanning window weighting ensures smooth transitions without visible seams.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                <FeatureList items={[
                  "Automatic overlap detection",
                  "Hanning cosine window blending",
                  "Unified coordinate grid generation",
                  "Support for any number of cameras",
                  "Parallel frame processing"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Output</h4>
                <FeatureList items={[
                  "Single merged .mat file per frame",
                  "Unified coordinates.mat file",
                  "Compatible with statistics calculation",
                  "Standard piv_result format"
                ]} />
              </div>
            </div>
          </Section>

          {/* Requirements Section */}
          <Section title="Requirements & Restrictions" icon={<AlertTriangle size={32} />} id="requirements">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Merging has specific requirements that must be met. Understanding these restrictions
              will help you plan your workflow correctly.
            </p>

            {/* Requirements */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <h4 className="text-lg font-semibold text-green-800">2+ Cameras</h4>
                </div>
                <p className="text-green-700 text-sm">
                  Merging requires at least two cameras. Single-camera setups have nothing to merge.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <h4 className="text-lg font-semibold text-green-800">Calibrated Data</h4>
                </div>
                <p className="text-green-700 text-sm">
                  Physical coordinates are required to align and merge fields. Run calibration first.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <h4 className="text-lg font-semibold text-green-800">Overlapping FOV</h4>
                </div>
                <p className="text-green-700 text-sm">
                  Cameras should have overlapping regions for smooth blending. Non-overlapping cameras are also supported.
                </p>
              </div>
            </div>

            {/* Critical Restriction */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Critical Restriction</h3>
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="text-red-600" size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800 mb-2">No Stereo (3D) Data</h4>
                  <p className="text-red-700 mb-4">
                    Merging is <strong>blocked</strong> for stereo PIV setups. When a
                    <code className="bg-red-100 px-2 py-1 rounded mx-1">uz</code> (out-of-plane velocity)
                    component is detected in your data, the merge button will be disabled.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <h5 className="font-semibold text-red-800 mb-2">Why?</h5>
                    <p className="text-red-700 text-sm">
                      Stereo calibration already combines both camera views into a single 3D velocity field.
                      The concept of &quot;merging&quot; doesn&apos;t apply because the cameras are not looking at
                      adjacent regions - they&apos;re looking at the same region from different angles to
                      reconstruct the third velocity component.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Restrictions */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Other Restrictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Instantaneous or Ensemble Only</h4>
                <p className="text-yellow-700 text-sm">
                  Merging works on calibrated_instantaneous or calibrated_ensemble data sources.
                  Statistics output cannot be merged (recalculate after merging instead).
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Same Run Structure</h4>
                <p className="text-yellow-700 text-sm">
                  All cameras must have the same number of runs and frames. Mismatched
                  datasets cannot be merged.
                </p>
              </div>
            </div>
          </Section>

          {/* Algorithm Section */}
          <Section title="Hanning Blend Algorithm" icon={<Grid size={32} />} id="algorithm">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The merging algorithm creates a smooth combined field by using distance-based
              Hanning window weighting in overlap regions. Here&apos;s how it works:
            </p>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Detect Stacking Direction</h4>
                    <p className="text-gray-600">
                      The algorithm determines if cameras are arranged horizontally or vertically
                      based on their center coordinates. This affects how overlap regions are blended.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Create Unified Grid</h4>
                    <p className="text-gray-600">
                      A new coordinate grid is generated that spans the full extent of all cameras.
                      Grid spacing matches the original data resolution.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Interpolate Each Camera</h4>
                    <p className="text-gray-600">
                      Each camera&apos;s velocity field is interpolated onto the unified grid.
                      Points outside a camera&apos;s domain are marked as NaN.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Apply Hanning Weights</h4>
                    <p className="text-gray-600">
                      In overlap regions, each camera receives a weight based on its distance from
                      the boundary. The Hanning cosine function provides smooth transitions:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mt-2">
                      <code className="text-soton-blue font-mono text-sm">
                        weight = 0.5 * (1 + cos(pi * normalised_distance))
                      </code>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Combine Fields</h4>
                    <p className="text-gray-600">
                      The weighted contributions from all cameras are summed and normalised.
                      The result is a seamless field with no visible boundaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Explanation */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Understanding Hanning Blending</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="font-semibold text-gray-900 mb-2">Camera 1 Region</p>
                  <p className="text-gray-600 text-sm">Weight = 1.0 (full contribution)</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-300">
                  <p className="font-semibold text-gray-900 mb-2">Overlap Region</p>
                  <p className="text-gray-600 text-sm">Weights blend from 1.0 to 0.0</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="font-semibold text-gray-900 mb-2">Camera 2 Region</p>
                  <p className="text-gray-600 text-sm">Weight = 1.0 (full contribution)</p>
                </div>
              </div>
              <p className="text-blue-700 mt-4 text-sm">
                The Hanning window ensures that at any point in the overlap, the weights sum to 1.0,
                preventing brightness discontinuities or velocity jumps.
              </p>
            </div>
          </Section>

          {/* GUI Workflow Section */}
          <Section title="GUI Workflow" icon={<Monitor size={32} />} id="gui-workflow">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The GUI provides a simple interface for merging your multi-camera data.
              Follow these steps to create merged vector fields:
            </p>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm mb-8">
              <GUIStep step={1} title="Open the Results Viewer">
                <p>
                  Navigate to the Results Viewer and select &quot;Calibrated Instantaneous&quot; as your
                  data source. The merge option only appears for calibrated, multi-camera, non-stereo data.
                </p>
              </GUIStep>

              <GUIStep step={2} title="Expand the Merging Panel">
                <p>
                  Click the &quot;Merging&quot; button to expand the merge controls. If this button is
                  not visible, check that you have 2+ cameras configured and are not using stereo data.
                </p>
              </GUIStep>

              <GUIStep step={3} title="Select Cameras to Merge">
                <p>
                  Check the boxes for each camera you want to include in the merge. At least 2 cameras
                  must be selected. The merge will only use the selected cameras.
                </p>
              </GUIStep>

              <GUIStep step={4} title="Merge Current Frame or All Frames">
                <p>
                  Use &quot;Merge Frame N&quot; to test on a single frame, or &quot;Merge All&quot; to
                  process the entire dataset. A progress bar shows completion status.
                </p>
              </GUIStep>

              <GUIStep step={5} title="View Merged Results">
                <p>
                  After merging completes, select &quot;Merged Instantaneous&quot; from the data source
                  dropdown to view the combined field. The merged data appears as a single camera view.
                </p>
              </GUIStep>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={20} />
                <h4 className="text-lg font-semibold text-green-800">Camera Selection Saved</h4>
              </div>
              <p className="text-green-700 text-sm">
                Your camera selection is saved to config.yaml automatically. This selection is
                used for both GUI merging and CLI batch processing.
              </p>
            </div>
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli-usage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For batch processing multiple datasets, use the CLI. It processes all paths
              listed in <code className="bg-gray-100 px-2 py-1 rounded">active_paths</code>.
            </p>

            <CodeBlock
              title="Merging CLI Command"
              code={`# Merge vectors for all active paths
pivtools-cli merge

# Merge specific cameras only
pivtools-cli merge --cameras 1,2,3

# Merge ensemble data
pivtools-cli merge --type-name ensemble

# Process specific paths
pivtools-cli merge -p 0,1

# The CLI will:
# 1. Read merging configuration from config.yaml
# 2. Process each active_path (or selected paths with -p)
# 3. Merge all frames for each path
# 4. Save results to merged/ subdirectory`}
            />

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-purple-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">GUI vs CLI Comparison</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="text-blue-600" size={18} />
                    <h5 className="font-semibold text-gray-900">GUI Mode</h5>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>- One base_path at a time</li>
                    <li>- Interactive camera selection</li>
                    <li>- Test single frames first</li>
                    <li>- Immediate visualisation</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="text-green-600" size={18} />
                    <h5 className="font-semibold text-gray-900">CLI Mode</h5>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>- All active_paths processed</li>
                    <li>- Uses saved camera selection</li>
                    <li>- Batch processing</li>
                    <li>- Suitable for automation</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* YAML Configuration Section */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Merging settings are stored in the <code className="bg-gray-100 px-2 py-1 rounded">merging</code>
              section of config.yaml.
            </p>

            <YamlDropdown
              title="Merging Configuration"
              defaultOpen={true}
              code={`merging:
  base_path_idx: 0          # Which base_path to use
  type_name: instantaneous  # instantaneous or ensemble
  cameras: [1, 2]           # Cameras to merge (saved from GUI selection)

paths:
  active_paths:
    - 0    # CLI processes all these
    - 1
    - 2
  camera_numbers: [1, 2, 3]  # Available cameras in setup

images:
  num_frame_pairs: 100      # Total frames to process
  vector_format:
    - '%05d.mat'            # Output filename pattern`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Configuration Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { param: 'merging.base_path_idx', type: 'integer', desc: 'Index into base_paths array (GUI only)' },
                      { param: 'merging.type_name', type: 'string', desc: 'Vector type: "instantaneous" or "ensemble"' },
                      { param: 'merging.cameras', type: 'list', desc: 'Camera numbers to merge (e.g., [1, 2])' },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.param}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{row.type}</td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* Output Structure Section */}
          <Section title="Output Structure" icon={<FileText size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Merged vector fields are saved in a <code className="bg-gray-100 px-2 py-1 rounded">merged</code>
              subdirectory under your calibrated_piv path.
            </p>

            <CodeBlock
              title="Output Directory Structure"
              code={`base_path/
├── calibrated_piv/
│   └── {num_frame_pairs}/
│       ├── Cam1/
│       │   └── instantaneous/      # Original camera 1 data
│       │       ├── 00001.mat
│       │       ├── 00002.mat
│       │       └── coordinates.mat
│       │
│       ├── Cam2/
│       │   └── instantaneous/      # Original camera 2 data
│       │       └── ...
│       │
│       └── merged/                 # MERGED OUTPUT
│           └── Cam1/               # Single "virtual" camera
│               └── instantaneous/
│                   ├── 00001.mat   # Merged frame 1
│                   ├── 00002.mat   # Merged frame 2
│                   ├── ...
│                   └── coordinates.mat  # Unified grid`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Merged Frame Files</h4>
                <p className="text-blue-700 text-sm">
                  Each merged .mat file contains the combined velocity field in standard
                  piv_result format. Compatible with all downstream operations.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Unified Coordinates</h4>
                <p className="text-green-700 text-sm">
                  A single coordinates.mat file defines the unified grid covering
                  the combined domain of all merged cameras.
                </p>
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
            <h3 className="text-3xl font-bold mb-4">Next: Calculate Statistics</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Now that your fields are merged, calculate mean velocities, Reynolds stresses,
              and turbulence quantities across your time series.
            </p>
            <Link
              href="/manual/statistics"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Statistics
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
