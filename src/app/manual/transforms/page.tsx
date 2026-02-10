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
  Move,
  Terminal,
  Monitor,
  Info,
  ArrowRight,
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
              Rotate, flip, and scale PIV vector fields to correct camera orientations,
              align multi-camera setups, or convert between unit systems.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<RotateCw size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Transforms modify <code className="bg-gray-100 px-2 py-1 rounded text-sm">.mat</code> files directly.
              Original data is backed up with an <code className="bg-gray-100 px-2 py-1 rounded text-sm">_original</code> suffix
              for undo capability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                <FeatureList items={[
                  "Calibrated instantaneous or merged data",
                  "Not applicable to ensemble or statistics output",
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Behaviours</h4>
                <FeatureList items={[
                  "Coordinates file updated alongside vector data",
                  "Ensemble stresses (UU, VV, UV) handled correctly",
                  "Redundant operations automatically simplified",
                ]} />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Transforms are Permanent</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                Transforms write directly to your .mat files. Apply transforms <strong>before</strong> merging
                and statistics. After transforming, recalculate any existing statistics.
              </p>
            </div>
          </Section>

          {/* Operations */}
          <Section title="Operations" icon={<Move size={32} />} id="operations">
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Operation</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { op: 'flip_ud', desc: 'Flip vertically', effect: 'Spatial flip of all fields' },
                    { op: 'flip_lr', desc: 'Flip horizontally', effect: 'Spatial flip of all fields' },
                    { op: 'rotate_90_cw', desc: 'Rotate 90 degrees clockwise', effect: 'Spatial + coordinate rotation' },
                    { op: 'rotate_90_ccw', desc: 'Rotate 90 degrees counter-clockwise', effect: 'Spatial + coordinate rotation' },
                    { op: 'rotate_180', desc: 'Rotate 180 degrees', effect: 'Equivalent to flip_ud + flip_lr' },
                    { op: 'swap_ux_uy', desc: 'Swap ux and uy components', effect: 'UU_stress <-> VV_stress for ensemble' },
                    { op: 'invert_ux_uy', desc: 'Negate ux and uy', effect: 'Stresses unchanged (variance is sign-invariant)' },
                    { op: 'scale_velocity:<factor>', desc: 'Multiply velocities by factor', effect: 'Stresses scaled by factor squared' },
                    { op: 'scale_coords:<factor>', desc: 'Multiply coordinates by factor', effect: 'Only x, y grids affected' },
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

            {/* Simplification */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Automatic Simplification</h4>
              </div>
              <p className="text-blue-700 mb-4">
                Redundant operations are reduced using algebraic group properties:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { from: "flip_ud + flip_ud", to: "(no operation)" },
                  { from: "rotate_90_cw x 4", to: "(no operation)" },
                  { from: "flip_lr + flip_ud", to: "rotate_180" },
                  { from: "scale_velocity:1000 + scale_velocity:0.5", to: "scale_velocity:500" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-3">
                    <code className="text-gray-600 text-sm">{item.from}</code>
                    <ArrowRight className="inline mx-2 text-gray-400" size={16} />
                    <code className="text-green-600 text-sm">{item.to}</code>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* GUI Workflow */}
          <Section title="GUI Workflow" icon={<Monitor size={32} />} id="gui-workflow">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              In the Results Viewer, expand the Transforms panel to add, preview, and apply operations.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Step</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { step: "1", action: "Select calibrated instantaneous or merged data source." },
                    { step: "2", action: "Expand the Transforms panel and click operation buttons to build a queue." },
                    { step: "3", action: "The current frame preview updates immediately. Navigate frames to verify." },
                    { step: "4", action: "Click \"Apply to All Frames\" to write transforms to all .mat files." },
                    { step: "5", action: "Use \"Undo Frame\" to restore original data from _original backup." },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-bold text-soton-blue">{row.step}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* CLI Usage */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli-usage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The CLI processes all <code className="bg-gray-100 px-2 py-1 rounded text-sm">active_paths</code> without
              preview. Test your configuration in the GUI first.
            </p>

            <CodeBlock
              title="Transform CLI"
              code={`# Apply transforms from config.yaml
pivtools-cli transform

# Override operations via command line
pivtools-cli transform -o flip_ud,rotate_90_cw

# Transform specific camera
pivtools-cli transform --camera 1

# Transform merged data
pivtools-cli transform --source-endpoint merged -o flip_lr

# Process specific paths only
pivtools-cli transform -p 0,1`}
            />

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">No Preview in CLI</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                CLI transforms are applied immediately to all active paths.
                <strong> Always test on one dataset via the GUI first.</strong>
              </p>
            </div>
          </Section>

          {/* Config */}
          <Section title="Configuration" icon={<FileText size={32} />} id="config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Transform operations are configured per-camera in config.yaml.
            </p>

            <YamlDropdown
              title="Transforms Configuration"
              defaultOpen={true}
              code={`transforms:
  base_path_idx: 0          # Which base_path (GUI only)
  type_name: instantaneous  # "instantaneous" or "ensemble"
  source_endpoint: regular  # "regular", "merged", or "stereo"
  cameras:
    1:
      operations:
        - flip_ud
        - rotate_90_cw
    2:
      operations:
        - flip_lr
        - scale_velocity:1000
        - scale_coords:0.001`}
            />

            <div className="mt-8 overflow-x-auto">
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
                    { param: 'base_path_idx', type: 'int', desc: 'Index into base_paths (0-indexed, GUI only)' },
                    { param: 'type_name', type: 'string', desc: '"instantaneous" or "ensemble"' },
                    { param: 'source_endpoint', type: 'string', desc: '"regular" (per-camera), "merged", or "stereo"' },
                    { param: 'cameras.N.operations', type: 'list', desc: 'Ordered list of transforms for camera N' },
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
              Combine vector fields from multiple cameras into a single seamless field
              with Hanning window blending.
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
