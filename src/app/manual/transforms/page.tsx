'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  RotateCw,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  FlipHorizontal,
  Move,
  Terminal,
  Monitor,
  Info,
  ArrowRight,
  Scale
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

export default function TransformsPage() {
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
              Vector <span className="text-soton-gold">Transforms</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rotate, flip, and scale your PIV vector fields to correct camera orientations,
              align multi-camera setups, and convert between unit systems.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">When to Use Transforms</h3>
            <p className="text-gray-200 mb-6 text-lg">
              Transforms are essential when your cameras have different orientations or when you need
              to align vector fields before merging. They&apos;re also useful for converting between
              unit systems (e.g., m/s to mm/s).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <RotateCw size={24} />, label: "Alignment", desc: "Match camera orientations" },
                { icon: <FlipHorizontal size={24} />, label: "Correction", desc: "Fix mirrored views" },
                { icon: <Scale size={24} />, label: "Conversion", desc: "Change units" }
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
          <Section title="Overview" icon={<RotateCw size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Vector transforms modify the spatial arrangement and/or values of your PIV data.
              They are applied directly to the .mat files containing your vector fields, making
              the changes permanent. This is intentional - transformed data can then be used by
              other operations like merging and statistics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                <FeatureList items={[
                  "Geometric transforms (rotate, flip)",
                  "Velocity component operations",
                  "Coordinate and velocity scaling",
                  "Automatic transform simplification",
                  "Backup of original data"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h4>
                <FeatureList items={[
                  "Calibrated vector data only",
                  "Instantaneous or merged data",
                  "Not applicable to ensemble results",
                  "Not applicable to statistics output"
                ]} />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Important: Transforms are Permanent</h4>
              </div>
              <p className="text-yellow-700">
                Transforms modify your .mat files directly. Original data is backed up with an
                <code className="bg-yellow-100 px-1 rounded mx-1">_original</code> suffix, but you
                should ensure you have backups before applying transforms to production data.
              </p>
            </div>
          </Section>

          {/* Available Operations Section */}
          <Section title="Available Operations" icon={<Move size={32} />} id="operations">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools provides a comprehensive set of transform operations. These can be combined
              in sequence, and redundant operations are automatically simplified.
            </p>

            {/* Geometric Transforms */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Geometric Transforms</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Operation</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Effect on Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { op: 'flip_ud', desc: 'Flip vertically (upside down)', effect: 'Spatial flip + velocity component adjustment' },
                    { op: 'flip_lr', desc: 'Flip horizontally (left-right)', effect: 'Spatial flip + velocity component adjustment' },
                    { op: 'rotate_90_cw', desc: 'Rotate 90 degrees clockwise', effect: 'Spatial rotation + velocity vector rotation' },
                    { op: 'rotate_90_ccw', desc: 'Rotate 90 degrees counter-clockwise', effect: 'Spatial rotation + velocity vector rotation' },
                    { op: 'rotate_180', desc: 'Rotate 180 degrees', effect: 'Equivalent to flip_ud + flip_lr' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.op}</td>
                      <td className="px-4 py-3 text-gray-700 text-sm">{row.desc}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Velocity Operations */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Velocity Component Operations</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Operation</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Effect on Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { op: 'swap_ux_uy', desc: 'Swap ux and uy components', effect: 'ux becomes uy, uy becomes ux' },
                    { op: 'invert_ux_uy', desc: 'Negate velocity components', effect: 'ux = -ux, uy = -uy' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.op}</td>
                      <td className="px-4 py-3 text-gray-700 text-sm">{row.desc}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scaling Operations */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Scaling Operations</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Operation</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Example Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { op: 'scale_velocity:factor', desc: 'Multiply all velocities by factor', example: 'scale_velocity:1000 converts m/s to mm/s' },
                    { op: 'scale_coords:factor', desc: 'Multiply all coordinates by factor', example: 'scale_coords:0.001 converts mm to m' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.op}</td>
                      <td className="px-4 py-3 text-gray-700 text-sm">{row.desc}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transform Simplification */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Automatic Simplification</h4>
              </div>
              <p className="text-blue-700 mb-4">
                PIVTools automatically simplifies redundant operations. For example:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <code className="text-gray-600 text-sm">flip_ud + flip_ud</code>
                  <ArrowRight className="inline mx-2 text-gray-400" size={16} />
                  <code className="text-green-600 text-sm">(no operation)</code>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <code className="text-gray-600 text-sm">rotate_90_cw x 4</code>
                  <ArrowRight className="inline mx-2 text-gray-400" size={16} />
                  <code className="text-green-600 text-sm">(no operation)</code>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <code className="text-gray-600 text-sm">flip_lr + flip_ud</code>
                  <ArrowRight className="inline mx-2 text-gray-400" size={16} />
                  <code className="text-green-600 text-sm">rotate_180</code>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <code className="text-gray-600 text-sm">scale_velocity:1000 + scale_velocity:0.5</code>
                  <ArrowRight className="inline mx-2 text-gray-400" size={16} />
                  <code className="text-green-600 text-sm">scale_velocity:500</code>
                </div>
              </div>
            </div>
          </Section>

          {/* GUI Workflow Section */}
          <Section title="GUI Workflow" icon={<Monitor size={32} />} id="gui-workflow">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The GUI provides an interactive way to preview and apply transforms to your data.
              Follow these steps to transform your vector fields:
            </p>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm mb-8">
              <GUIStep step={1} title="Open the Results Viewer">
                <p>
                  Navigate to the Results Viewer and select your calibrated instantaneous data source.
                  Ensure you have the correct base path and camera selected.
                </p>
              </GUIStep>

              <GUIStep step={2} title="Expand the Transforms Panel">
                <p>
                  Click the &quot;Transforms&quot; button to expand the transforms control panel.
                  This reveals all available transform operations and the current transform queue.
                </p>
              </GUIStep>

              <GUIStep step={3} title="Add Transform Operations">
                <p>
                  Click on transform buttons to add operations to the queue. Each click adds
                  the operation to the pending list. The current frame preview updates immediately
                  to show the effect.
                </p>
              </GUIStep>

              <GUIStep step={4} title="Preview the Result">
                <p>
                  Check the transformed view in the main display. Navigate through frames to
                  verify the transform looks correct across your dataset. Use &quot;Clear List&quot;
                  to reset if needed.
                </p>
              </GUIStep>

              <GUIStep step={5} title="Apply to All Frames">
                <p>
                  Once satisfied, click &quot;Apply to All Frames&quot; to permanently apply the
                  transforms to all frames in the dataset. A progress bar shows the operation status.
                </p>
              </GUIStep>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Preview Mode</h4>
                <p className="text-green-700 text-sm">
                  Adding transforms updates the current frame preview immediately. This lets you
                  verify the orientation before committing changes to all frames.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Undo Frame</h4>
                <p className="text-yellow-700 text-sm">
                  Use &quot;Undo Frame&quot; to restore the original data for the current frame.
                  This reverts to the backed-up data stored with <code className="bg-yellow-100 px-1 rounded">_original</code>.
                </p>
              </div>
            </div>
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli-usage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For batch processing across multiple datasets, use the command-line interface.
              The CLI processes all paths listed in <code className="bg-gray-100 px-2 py-1 rounded">active_paths</code>,
              making it ideal for production workflows.
            </p>

            <CodeBlock
              title="Transform CLI Command"
              code={`# Apply transforms configured in config.yaml
pivtools-cli transform

# Apply specific transforms via command line
pivtools-cli transform -o flip_ud,rotate_90_cw

# Transform specific camera only
pivtools-cli transform --camera 1

# Transform merged data
pivtools-cli transform --source-endpoint merged -o flip_lr

# Transform stereo 3D data
pivtools-cli transform --source-endpoint stereo -o flip_ud

# Process specific paths
pivtools-cli transform -p 0,1

# The CLI will:
# 1. Read transforms.cameras configuration (or use -o flag)
# 2. Process each camera's operations in order
# 3. Apply to ALL frames in selected paths
# 4. Show progress for each path/camera combination`}
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
                    <li>- Interactive preview before applying</li>
                    <li>- One base_path at a time</li>
                    <li>- Ideal for testing and setup</li>
                    <li>- Visual verification of results</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="text-green-600" size={18} />
                    <h5 className="font-semibold text-gray-900">CLI Mode</h5>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>- Batch processing all active_paths</li>
                    <li>- No interaction required</li>
                    <li>- Configure once, run on many datasets</li>
                    <li>- Suitable for automated pipelines</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Batch Processing Warning</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                CLI transforms are applied immediately to all active paths without preview.
                <strong> Test your transform configuration on one dataset using the GUI first</strong>,
                then use CLI for batch processing.
              </p>
            </div>
          </Section>

          {/* YAML Configuration Section */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Transform operations are configured per-camera in the <code className="bg-gray-100 px-2 py-1 rounded">transforms</code>
              section of config.yaml. Each camera can have its own list of operations.
            </p>

            <YamlDropdown
              title="Full Transforms Configuration"
              defaultOpen={true}
              code={`transforms:
  base_path_idx: 0          # Which base_path to use (GUI only)
  type_name: instantaneous  # Temporal type: "instantaneous" or "ensemble"
  source_endpoint: regular  # Data source: "regular", "merged", or "stereo"
  cameras:
    1:
      operations:
        - flip_ud           # First: flip vertically
        - rotate_90_cw      # Then: rotate 90 degrees
    2:
      operations:
        - flip_lr           # Camera 2: flip horizontally only
    3:
      operations:
        - scale_velocity:1000   # Convert m/s to mm/s
        - scale_coords:0.001    # Convert mm to m

# Note: Operations are applied in order, top to bottom
# Redundant operations are automatically simplified
# For stereo data, transforms are applied to the combined 3D field`}
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
                      { param: 'base_path_idx', type: 'integer', desc: 'Index into base_paths array (0-indexed)' },
                      { param: 'type_name', type: 'string', desc: 'Temporal type: "instantaneous" or "ensemble"' },
                      { param: 'source_endpoint', type: 'string', desc: 'Data source: "regular" (per-camera), "merged", or "stereo"' },
                      { param: 'cameras', type: 'dict', desc: 'Per-camera transform configuration' },
                      { param: 'cameras.N.operations', type: 'list', desc: 'List of transform operations for camera N' },
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

          {/* Important Notes Section */}
          <Section title="Important Notes" icon={<AlertTriangle size={32} />} id="warnings">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Keep these important considerations in mind when working with transforms:
            </p>

            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
                <h4 className="text-lg font-semibold text-red-800 mb-2">Statistics Must Be Recalculated</h4>
                <p className="text-red-700">
                  After applying transforms, any previously calculated statistics are no longer valid.
                  You must recalculate statistics using the Statistics panel to get correct results
                  with the transformed data.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Transforms Modify Files Permanently</h4>
                <p className="text-yellow-700">
                  Transform operations write directly to your .mat files. While original data is
                  backed up with <code className="bg-yellow-100 px-1 rounded">_original</code> suffix,
                  you should maintain your own backups of important data.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Transform Before Merging</h4>
                <p className="text-blue-700">
                  If you plan to merge multi-camera data, apply transforms <strong>before</strong> merging.
                  Ensure all cameras have the same orientation before running the merge operation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Coordinate Files Updated Automatically</h4>
                <p className="text-gray-700">
                  When you apply geometric transforms (rotate, flip), the associated
                  <code className="bg-gray-200 px-1 rounded mx-1">coordinates.mat</code> file is
                  also transformed to maintain consistency.
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
            <h3 className="text-3xl font-bold mb-4">Next: Merge Multi-Camera Data</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Now that your cameras are aligned, learn how to merge vector fields from multiple
              cameras into a single seamless field.
            </p>
            <Link
              href="/manual/merging"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Merging
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
