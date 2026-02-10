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
  Terminal,
  Monitor,
  Info,
  XCircle,
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
              Combine vector fields from multiple cameras into a single seamless field
              using Hanning window blending for smooth overlap transitions.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Layers size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Merging creates a unified coordinate grid spanning all cameras and interpolates
              velocity data onto it. In overlap regions, a distance-based Hanning cosine window
              provides smooth, seam-free transitions.
            </p>

            <FeatureList items={[
              "Supports both instantaneous and ensemble data",
              "Automatic overlap detection and stacking direction",
              "Unified coordinate grid matching original data resolution",
              "Hanning cosine blending: weight = 0.5 * (1 + cos(pi * d))",
              "Output in standard piv_result .mat format",
            ]} />
          </Section>

          {/* Requirements */}
          <Section title="Requirements" icon={<AlertTriangle size={32} />} id="requirements">
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Requirement</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { req: "2+ cameras", detail: "At least two adjacent cameras must be selected as a continuous range" },
                    { req: "Calibrated data", detail: "Physical coordinates needed to align fields" },
                    { req: "Planar (2D) only", detail: "Stereo data with uz component is blocked" },
                    { req: "Same frame count", detail: "All cameras must have matching runs and frames" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.req}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="text-red-600" size={20} />
                <h4 className="text-lg font-semibold text-red-800">No Stereo (3D) Merging</h4>
              </div>
              <p className="text-red-700 text-sm">
                Stereo calibration already combines both camera views into one 3D velocity field.
                When <code className="bg-red-100 px-1 rounded">uz</code> is detected, the merge button is disabled.
              </p>
            </div>
          </Section>

          {/* Algorithm */}
          <Section title="Algorithm" icon={<Info size={32} />} id="algorithm">
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Step</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { step: "1. Detect direction", desc: "Determines horizontal or vertical camera arrangement from center coordinates." },
                    { step: "2. Create grid", desc: "Generates a unified coordinate grid spanning all cameras at original resolution." },
                    { step: "3. Interpolate", desc: "Each camera's velocity is interpolated onto the unified grid. Points outside a camera's domain are NaN." },
                    { step: "4. Hanning weights", desc: "In overlap regions, each camera receives a distance-based weight: w = 0.5 * (1 + cos(pi * d_normalised))." },
                    { step: "5. Combine", desc: "Weighted contributions are summed and normalised. Weights always sum to 1.0 in overlaps." },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{row.step}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* GUI Workflow */}
          <Section title="GUI Workflow" icon={<Monitor size={32} />} id="gui-workflow">
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
                    { step: "1", action: "Select a calibrated data source (Instantaneous or Ensemble) in the Results Viewer." },
                    { step: "2", action: "Expand the Merging panel (visible only for 2+ cameras, non-stereo)." },
                    { step: "3", action: "Select the camera range using the From and To dropdowns. At least 2 adjacent cameras must be included." },
                    { step: "4", action: "Click \"Merge Frame N\" to test on one frame (instantaneous only), or \"Merge All\" for the full dataset." },
                    { step: "5", action: "The viewer automatically switches to the merged data source after completion." },
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
              The CLI processes all <code className="bg-gray-100 px-2 py-1 rounded text-sm">active_paths</code> using
              the camera selection saved in config.yaml.
            </p>

            <CodeBlock
              title="Merge CLI"
              code={`# Merge all active paths
pivtools-cli merge

# Merge specific cameras
pivtools-cli merge --cameras 1,2,3

# Merge ensemble data
pivtools-cli merge --type-name ensemble

# Process specific paths
pivtools-cli merge -p 0,1`}
            />
          </Section>

          {/* Output */}
          <Section title="Output" icon={<FileText size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Merged data is saved in a <code className="bg-gray-100 px-2 py-1 rounded text-sm">merged/</code> subdirectory
              under calibrated_piv, alongside the per-camera directories.
            </p>

            <CodeBlock
              title="Output Directory"
              code={`base_path/
  calibrated_piv/{num_frame_pairs}/
    Cam1/instantaneous/       # Original camera 1
    Cam2/instantaneous/       # Original camera 2
    merged/
      Cam1/instantaneous/     # Single "virtual" camera
        00001.mat             # Merged frame 1
        00002.mat             # Merged frame 2
        ...
        coordinates.mat       # Unified grid`}
            />

            <YamlDropdown
              title="Merging Configuration"
              defaultOpen={true}
              code={`merging:
  base_path_idx: 0          # Which base_path (GUI only)
  type_name: instantaneous  # "instantaneous" or "ensemble"
  cameras: [1, 2]           # Camera numbers to merge`}
            />
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
              Compute mean velocities, Reynolds stresses, and turbulence quantities
              across your time series.
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
