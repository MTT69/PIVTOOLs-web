'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Crosshair,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Terminal,
  Monitor,
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

export default function GlobalCoordinatesPage() {
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
              Global <span className="text-soton-gold">Coordinates</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Align multi-camera coordinate systems into a unified physical reference frame
              after calibration.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Crosshair size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After calibrating each camera independently, their coordinate systems may not share
              a common origin or orientation. Global coordinate alignment shifts and optionally
              flips each camera{"'"}s coordinates so all fields share the same physical reference frame.
            </p>

            <FeatureList items={[
              "Chain topology: cameras linked N to N+1 via shared feature points",
              "Datum point defines the physical origin on Camera 1",
              "Overlap features identify the same physical location across adjacent cameras",
              "Automatic x-direction detection with manual override",
              "Applied automatically after calibration in the GUI, or standalone via CLI",
            ]} />
          </Section>

          {/* Concepts */}
          <Section title="Concepts" icon={<Info size={32} />} id="concepts">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chain Topology</h3>
            <p className="text-gray-700 mb-4">
              Cameras are linked in a chain: Camera 1 connects to Camera 2, Camera 2 connects
              to Camera 3, and so on. For N cameras, you need N-1 overlap pairs. Each pair
              identifies a single physical feature visible from both cameras.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 font-mono text-center">
                Cam 1 -- feature -- Cam 2 -- feature -- Cam 3 -- feature -- Cam 4
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Datum Point</h3>
            <p className="text-gray-700 mb-4">
              The datum is a point on Camera 1{"'"}s calibration image that defines where the
              physical origin (0, 0) is located. You click the image to select it. The datum
              has physical coordinates (in mm) that default to (0, 0) but can be set to any
              value if your origin is offset from the datum feature.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Overlap Pairs</h3>
            <p className="text-gray-700 mb-4">
              Each adjacent camera pair requires one shared feature. For each pair, you pick
              the same physical point on both cameras{"'"} images. The alignment algorithm uses
              these matched points to compute the coordinate shift between cameras.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Term</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { term: "Origin (O)", desc: "The datum pixel on Camera 1. Defines physical (0,0) or a specified offset." },
                    { term: "Feature (F)", desc: "A matched point shared by two adjacent cameras. Each camera in a pair has one feature." },
                    { term: "Overlap pair", desc: "Two cameras (A, B) linked by a shared feature. pixel_on_a and pixel_on_b identify the same physical location." },
                    { term: "Invert Ux", desc: "Negate x-velocities and reflect x-coordinates when the physical x-direction runs opposite to the image x-direction." },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.term}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Invert Ux</h3>
            <p className="text-gray-700 mb-4">
              When the first overlap feature is to the left of the datum on Camera 1, the
              physical x-direction runs opposite to the image x-direction. The GUI auto-detects
              this from the relative positions of the origin and first feature, toggling the
              {' '}<strong>Flip X</strong> switch automatically. You can override this manually if needed.
            </p>
            <p className="text-gray-700 mb-4">
              When Invert Ux is active, the alignment process negates{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">ux</code> and{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">UV_stress</code> in all
              cameras{"'"} vector files, and reflects x-coordinates around the datum physical x-position
              in the coordinates file.
            </p>
          </Section>

          {/* GUI Workflow */}
          <Section title="GUI Workflow" icon={<Monitor size={32} />} id="gui-workflow">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Global Coordinates controls appear inline in the Calibration Image Viewer settings bar.
              Enable the toggle and use the inline buttons to pick points on calibration images.
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
                    { step: "1", action: "Open any calibration method tab (Dotboard, ChArUco, etc.) to access the Calibration Image Viewer." },
                    { step: "2", action: "Enable the \"Global Coords\" toggle in the settings bar." },
                    { step: "3", action: "On Camera 1, click \"Set Origin\" then click the datum point on the image. A green crosshair marks the origin." },
                    { step: "4", action: "Optionally adjust the physical X and Y coordinates (in mm) if your origin is offset from (0, 0)." },
                    { step: "5", action: "Still on Camera 1, click \"Pick F1\" to select the feature shared with Camera 2. Click the overlap point on the image." },
                    { step: "6", action: "Navigate to Camera 2 using the camera arrows. Click \"Pick F1\" to select the same physical feature as seen by Camera 2." },
                    { step: "7", action: "For additional cameras, Camera 2 also needs \"Pick F2\" for the feature shared with Camera 3, and so on." },
                    { step: "8", action: "The Flip X toggle auto-detects based on the origin and first feature positions. Override manually if needed." },
                    { step: "9", action: "Run calibration (\"Calibrate Vectors\"). Global alignment is applied automatically." },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-bold text-soton-blue">{row.step}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Camera Participation</h3>
            <p className="text-gray-700 mb-4">
              Each camera picks features for the pairs it participates in:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Camera</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Features to Pick</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { cam: "Camera 1 (datum)", features: "Origin + F1", role: "Origin point, side A of pair 1-2" },
                    { cam: "Middle cameras", features: "F1 + F2", role: "Side B of left pair, side A of right pair" },
                    { cam: "Last camera", features: "F1", role: "Side B of final pair" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.cam}</td>
                      <td className="px-4 py-3 text-sm font-mono text-soton-blue">{row.features}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Auto-applied:</strong> When global coordinates are enabled and configured,
                alignment is applied automatically after calibration completes in the GUI.
                No separate step is needed.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Marker Labels</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Feature markers are labelled <code className="bg-yellow-100 px-1 rounded">C&#123;cam&#125;F&#123;n&#125;</code> (e.g.,
                C2F1 for Camera 2{"'"}s first feature). The origin on Camera 1 is marked with a green
                {"\""}O{"\""}. Blue markers show overlap features.
              </p>
            </div>
          </Section>

          {/* CLI */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Two ways to apply global coordinate alignment via CLI:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Standalone Command</h3>
            <CodeBlock
              title="align-coordinates"
              code={`# Apply alignment to instantaneous data
pivtools-cli align-coordinates

# Apply to ensemble data
pivtools-cli align-coordinates -t ensemble

# Process specific paths
pivtools-cli align-coordinates -p 0,1

# Force re-alignment (skip idempotency guard)
pivtools-cli align-coordinates --force`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-3">Combined with Calibration</h3>
            <CodeBlock
              title="apply-calibration --align-coordinates"
              code={`# Calibrate and align in one step
pivtools-cli apply-calibration --align-coordinates

# With specific method
pivtools-cli apply-calibration --method dotboard --align-coordinates`}
            />

            <h3 className="text-xl font-bold text-gray-900 mb-4">align-coordinates Options</h3>
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
                    { flag: "--type-name, -t", desc: "Data type: instantaneous or ensemble", def: "instantaneous" },
                    { flag: "--active-paths, -p", desc: "Comma-separated path indices", def: "From config" },
                    { flag: "--force, -f", desc: "Force alignment even if already applied (will double shifts)", def: "false" },
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

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Idempotency guard:</strong> Running{' '}
                <code className="bg-blue-100 px-1 rounded">align-coordinates</code> twice without
                re-calibrating will be blocked to prevent doubling coordinate shifts. A sidecar
                marker file (<code className="bg-blue-100 px-1 rounded">alignment_applied.json</code>)
                tracks whether alignment has already been applied. Fresh calibration automatically
                clears this marker. Use <code className="bg-blue-100 px-1 rounded">--force</code> to
                override if needed.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Prerequisite</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Global coordinates must be configured in{' '}
                <code className="bg-yellow-100 px-1 rounded">config.yaml</code> before running
                the CLI command. Use the GUI to set up datum and overlap points, or edit the
                YAML directly.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Workflow</h3>
            <CodeBlock
              title="Full Multi-Camera Workflow"
              code={`# 1. Detect calibration targets
pivtools-cli detect-planar

# 2. Run PIV processing
pivtools-cli instantaneous

# 3. Calibrate vectors and align coordinates in one step
pivtools-cli apply-calibration --align-coordinates

# 4. Merge cameras
pivtools-cli merge

# 5. Compute statistics
pivtools-cli statistics`}
            />
          </Section>

          {/* YAML */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="yaml">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Global coordinate settings are stored under{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">calibration.global_coordinates</code> in
              config.yaml.
            </p>

            <YamlDropdown
              title="Global Coordinates Configuration"
              defaultOpen={true}
              code={`calibration:
  global_coordinates:
    enabled: true
    datum_camera: 1
    datum_pixel: [512.0, 384.0]       # Pixel position of origin on Camera 1
    datum_physical: [0.0, 0.0]        # Physical coordinates (mm) at datum
    datum_frame: 1                    # Calibration frame for datum selection
    invert_ux: false                  # Negate ux + reflect x-coords
    overlap_pairs:
      - camera_a: 1
        camera_b: 2
        pixel_on_a: [950.0, 400.0]    # Feature pixel on Camera 1
        pixel_on_b: [120.0, 400.0]    # Same feature pixel on Camera 2
        frame_a: 1
        frame_b: 1
      - camera_a: 2
        camera_b: 3
        pixel_on_a: [930.0, 410.0]
        pixel_on_b: [100.0, 405.0]
        frame_a: 1
        frame_b: 1`}
            />

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Configuration Fields</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Field</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { field: "enabled", type: "bool", desc: "Enable global coordinate alignment" },
                      { field: "datum_camera", type: "int", desc: "Camera that holds the origin (always 1)" },
                      { field: "datum_pixel", type: "[x, y]", desc: "Pixel position of origin on datum camera image" },
                      { field: "datum_physical", type: "[x, y]", desc: "Physical coordinates (mm) at datum point" },
                      { field: "datum_frame", type: "int", desc: "Frame index used for datum selection" },
                      { field: "invert_ux", type: "bool", desc: "Negate ux, UV_stress, and reflect x-coordinates" },
                      { field: "overlap_pairs", type: "list", desc: "List of adjacent camera pair feature points" },
                      { field: "overlap_pairs[].camera_a", type: "int", desc: "First camera in the pair" },
                      { field: "overlap_pairs[].camera_b", type: "int", desc: "Second camera in the pair" },
                      { field: "overlap_pairs[].pixel_on_a", type: "[x, y]", desc: "Feature pixel on camera_a image" },
                      { field: "overlap_pairs[].pixel_on_b", type: "[x, y]", desc: "Same feature pixel on camera_b image" },
                      { field: "overlap_pairs[].frame_a", type: "int", desc: "Calibration frame for camera_a" },
                      { field: "overlap_pairs[].frame_b", type: "int", desc: "Calibration frame for camera_b" },
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-mono text-soton-blue">{row.field}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{row.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.desc}</td>
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
            <h3 className="text-3xl font-bold mb-4">Next: Create Videos</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Visualise your aligned, calibrated velocity fields with animated videos.
            </p>
            <Link
              href="/manual/video-maker"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Video Maker
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
