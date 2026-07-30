'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Box,
  FileText,
  Grid3X3,
  Terminal,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Crosshair,
  MousePointer,
  Eye,
  Wrench,
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

export default function SteppedCalibrationPage() {
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
              Stepped Board <span className="text-soton-gold">Calibration</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calibrate stereo or single-camera setups using a stepped board -- a physical
              target with two Z-levels that provides genuine depth information for robust 3D camera models.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Box size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A stepped calibration board is a physical target with dots printed on two faces at
              different Z heights. The &ldquo;peak&rdquo; face and &ldquo;trough&rdquo; face are separated by a known step
              height (typically 1&ndash;5 mm). When a camera images this board, it sees dots at two
              distinct depths in a single frame -- giving genuine 3D point correspondences that
              break the focal-length / translation ambiguity that plagues single-plane calibration
              at PIV magnification.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools supports two stepped calibration modes:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Config Active Value</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Stereo Stepped</td>
                    <td className="px-6 py-4 text-sm font-mono text-soton-blue">stereo_stepped</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Two-camera 3D velocity (transmission or same-side)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Stereo model + per-camera pinhole</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Metrics</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Metric</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { metric: "Per-camera RMS", desc: "Reprojection error per camera (pixels). The two cameras are fitted separately and the stereo pose is composed from them, so these are the only reprojection numbers this method produces.", target: "< 0.5 px" },
                    { metric: "Detected points per level", desc: "How many dots the walk-first separation recovered on each of the two levels, per camera", target: "Both levels well populated" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.metric}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-purple-600" size={18} />
                <strong className="text-purple-800">Why Stepped Boards?</strong>
              </div>
              <p className="text-purple-700 text-sm">
                At PIV magnification, a standard single-plane calibration board provides very weak
                depth information -- the camera sees an almost perfectly flat field. This creates a
                mathematical ambiguity between focal length (fx) and Z-translation (tz) that can cause
                calibration errors of 3% or more. The stepped board solves this by presenting dots at
                two known Z-levels in every frame, providing real depth variation that constrains
                all camera parameters simultaneously.
              </p>
            </div>
          </Section>

          {/* Board Geometry */}
          <Section title="Board Geometry" icon={<Grid3X3 size={32} />} id="board-geometry">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Three physical measurements define the board. Enter these in the GUI or{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">config.yaml</code> before
              running detection.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Key</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { param: "Dot Spacing", yaml: "dot_spacing_mm", desc: "Centre-to-centre distance between adjacent dots (mm)", example: "15" },
                    { param: "Step Height", yaml: "step_height_mm", desc: "Height difference between peak and trough faces (mm)", example: "3" },
                    { param: "Board Thickness", yaml: "board_thickness_mm", desc: "Total board thickness including both faces (mm)", example: "14.8" },
                    { param: "dt", yaml: "dt", desc: "Time between laser pulses (seconds)", example: "5.0e-06" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.param}</td>
                      <td className="px-6 py-4 text-sm font-mono text-soton-blue">{row.yaml}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={18} />
                <strong className="text-blue-800">Measurement Precision</strong>
              </div>
              <p className="text-blue-700 text-sm">
                The step height is critical for accuracy. Measure it with a micrometer, not calipers.
                A 0.1 mm error in <code className="bg-blue-100 px-1 rounded">step_height_mm</code> will
                propagate into all Z-depth estimates and affect stereo reconstruction quality.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">How Z-Levels Are Computed</h3>
            <p className="text-gray-700 mb-4">
              The backend computes world Z coordinates from the board geometry, anchored on camera 1.
              Z = 0 is whichever level you clicked on camera 1, not the peak by definition. In a{' '}
              <strong>same-side</strong> setup the other level sits one step away, so clicking the trough
              gives peak = +step_height_mm. In a <strong>transmission</strong> setup camera 2 views the
              opposite face, so its levels are offset through the board thickness rather than simply swapped.
              PIVTools reads the configuration from the chirality of your fiducial clicks on the two cameras,
              a single deterministic geometric test.
            </p>

            <YamlDropdown
              title="<source>/calibration/settings.yaml - board geometry"
              code={`rig:
  dt: 5.0e-06                   # REQUIRED before generating a model
  camera_pair: [1, 2]
  datum_frame: 1                # 1-based

image:
  n_views: 11

methods:
  stepped:
    dot_spacing_mm: 5.0
    step_height_mm: 3.0
    board_thickness_mm: 14.8
    level_offset_mm: null       # null derives dot_spacing_mm / 2
  stepped_stereo:
    stereo_config: transmission # auto | same_side | transmission`}
            />
          </Section>

          {/* Fiducial Setup */}
          <Section title="Fiducial Setup" icon={<Crosshair size={32} />} id="fiducials">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Fiducials tell PIVTools how your board&apos;s physical axes map onto the image. You click
              three points per camera on the <strong>datum frame</strong> (the reference pose):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
                <h5 className="font-semibold text-gray-900 mb-1">Origin</h5>
                <p className="text-gray-600 text-sm">Click any dot to define the (0, 0) grid position</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                <h5 className="font-semibold text-gray-900 mb-1">X-Axis Point</h5>
                <p className="text-gray-600 text-sm">Click a dot in the positive X direction from origin</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                <h5 className="font-semibold text-gray-900 mb-1">Y-Axis Point</h5>
                <p className="text-gray-600 text-sm">Click a dot in the positive Y direction from origin</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Each click snaps to the nearest detected blob, so you don&apos;t need pixel-perfect accuracy.
              The origin click also determines which face (peak or trough) you clicked on -- this is
              stored as the <code className="bg-gray-100 px-1 rounded text-sm">clicked_level</code> and
              establishes the reference convention for all subsequent pose labelling.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Getting Fiducials Right</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Fiducials define the world coordinate system. Origin = (0,0), X-axis point = positive
                X direction, Y-axis point = positive Y direction. If these are wrong, grid indices
                will be mirrored or rotated, causing grid stitching to fail. The detection overlay
                shows indexed dots after fiducials are set -- verify the indices increase in the
                expected directions.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Fiducials in the GUI</h3>
            <p className="text-gray-700 mb-4">
              In the stepped calibration panel, navigate to the datum frame and use the fiducial
              click tool. Three clicks per camera: origin, X-axis, Y-axis. The detection overlay
              updates immediately to show the assigned grid indices. Fiducials persist
              to <code className="bg-gray-100 px-1 rounded text-sm">config.yaml</code> automatically.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Fiducials for the CLI</h3>
            <p className="text-gray-700 mb-4">
              The CLI commands require a <code className="bg-gray-100 px-1 rounded text-sm">--fiducials</code> JSON
              file. You can either export this from the GUI or write it manually:
            </p>
            <CodeBlock
              title="fiducials.json (stereo example)"
              code={`{
  "1": {
    "origin": [3311.5, 751.3],
    "x_axis": [3904.2, 751.1],
    "y_axis": [3307.1, 542.4],
    "clicked_level": "peak"
  },
  "2": {
    "origin": [1985.9, 638.5],
    "x_axis": [1684.9, 638.5],
    "y_axis": [1990.9, 435.2],
    "clicked_level": "trough"
  }
}`}
            />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mt-4">
              <p className="text-blue-700 text-sm">
                <strong>Where the clicks go.</strong> Fiducial positions and the clicked level are stored in the
                model&apos;s <code className="bg-blue-100 px-1 rounded">inputs.mat</code> sidecar, not in{' '}
                <code className="bg-blue-100 px-1 rounded">config.yaml</code>. Clicks snap to the nearest detected dot,
                and the origin click also records which level you picked, which is what anchors Z = 0.
              </p>
            </div>
          </Section>

          {/* Click-to-Label */}
          <Section title="Click-to-Label" icon={<MousePointer size={32} />} id="click-to-label">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After setting fiducials on the datum frame, each <strong>non-datum pose</strong> must
              be labelled to tell the backend whether dots on that pose are on the peak or trough face.
              This is the most user-intensive step -- but you only need to click one dot per pose
              per camera.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
            <ol className="space-y-3 mb-6">
              {[
                "The datum frame is already labelled from the fiducial setup -- no action needed",
                "Navigate to a non-datum pose in the calibration image viewer",
                "Click any dot you can identify as being on the peak face (or trough -- whichever you recognise)",
                "The backend snaps to the nearest detected blob and reports which level (A or B) it belongs to",
                "The frontend maps A/B to peak/trough using the datum convention, and stores the label",
                "Repeat for every non-datum pose, for every camera",
                "Once all poses are verified, the \"Generate Model\" button becomes enabled",
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="text-green-600" size={18} />
                <strong className="text-green-800">Tip: Approximate Clicks Are Fine</strong>
              </div>
              <p className="text-green-700 text-sm">
                You don&apos;t need to be precise -- click anywhere on a dot you recognise. The system
                snaps to the nearest detected blob automatically. The detection overlay helps:
                blue dots = peak, red dots = trough. Colours swap in real time when you set a label.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Detection Overlay</h3>
            <p className="text-gray-700 mb-4">
              The calibration image viewer shows detected dots overlaid on every frame. Dots are
              colour-coded by level: <strong>blue = peak</strong>, <strong>red = trough</strong>.
              On the datum frame, fiducial markers (origin, X, Y) are also shown. When you set a
              pose label, the overlay colours update in real time to confirm the assignment.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What Gets Stored</h3>
            <p className="text-gray-700 mb-4">
              Labels persist to the model&apos;s <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code> sidecar,
              alongside your fiducial clicks. A pose with no entry is considered unverified, and the
              &ldquo;Generate Model&rdquo; button stays disabled until every pose has an entry for every camera.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mt-4">
              <p className="text-blue-700 text-sm">
                <strong>Where the labels go.</strong> Pose labels are not config values. They are written to an{' '}
                <code className="bg-blue-100 px-1 rounded">inputs.mat</code> sidecar beside the saved model, together
                with your fiducial clicks, so reopening the tab restores them. Generating a model is blocked until
                every non-datum pose on both cameras is labelled.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mt-4">
              <p className="text-blue-700 text-sm">
                <strong>CLI note:</strong> The CLI reads pose labels directly
                from <code className="bg-blue-100 px-1 rounded">config.yaml</code> and fails with
                a clear error if any frame in the sequence is missing its label. Set up labels
                in the GUI first, then the CLI can process headlessly.
              </p>
            </div>
          </Section>

          {/* Stereo Workflow */}
          <Section title="Stereo Stepped Workflow" icon={<Eye size={32} />} id="stereo-workflow">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Stepped stereo calibration builds a complete stereo model from two cameras viewing a
              stepped board at multiple poses. It works with both <strong>same-side</strong> (cameras
              on the same side) and <strong>transmission</strong> (cameras on opposite sides) setups.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">GUI Workflow</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Set board parameters: dot spacing, step height, board thickness, dt",
                "Configure calibration images: format, count, source path, camera subfolders",
                "Set camera pair (e.g. Camera 1 and Camera 2)",
                "Browse to the datum frame and click three fiducial points per camera (origin, X-axis, Y-axis)",
                "Navigate to each non-datum pose and click-to-label one dot per camera",
                "Once all poses show verified labels, click \"Generate Model\"",
                "Review per-camera RMS error, stereo RMS, relative angle, and baseline distance",
                "Click \"Calibrate Vectors\" to apply stereo calibration to PIV data",
                "Click \"Set as Active\" to make stereo_stepped the active calibration method",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Stereo Configuration Auto-Detect</h3>
            <p className="text-gray-700 mb-4">
              PIVTools works out whether your cameras are same-side or transmission from the handedness of
              the three fiducial clicks on each camera. Because the two cameras view opposite faces in a
              transmission rig, that handedness flips, and reading it is one deterministic comparison rather
              than a fit-and-compare search. If either camera&apos;s three clicks are too close to collinear to
              give a reliable sign, calibration stops and tells you rather than guessing. You can also force a
              configuration with <code className="bg-gray-100 px-1 rounded text-sm">stereo_config: same_side</code> or{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">stereo_config: transmission</code>.
            </p>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-purple-600" size={18} />
                <strong className="text-purple-800">Why Not cv2.stereoCalibrate?</strong>
              </div>
              <p className="text-purple-700 text-sm">
                In a transmission setup, each camera sees a different face of the board at a different
                Z-plane -- there are no common 3D points visible to both cameras. OpenCV&apos;s{' '}
                <code className="bg-purple-100 px-1 rounded">stereoCalibrate</code> requires common
                points. Instead, PIVTools derives the stereo pose from individual{' '}
                <code className="bg-purple-100 px-1 rounded">cv2.solvePnP</code> results per camera
                and computes R_stereo = R2 @ R1.T, T_stereo = t2 - R_stereo @ t1.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Output Directory</h3>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded p-3 mb-4">
&lt;calibration_source&gt;/calibration/stereo_cam1_cam2/<br />
              ├── model/stereo_model_pinhole.mat<br />
              ├── model/inputs.mat&nbsp;&nbsp;&nbsp;&nbsp;# your fiducial clicks and pose labels<br />
              └── figures/<br />
              <br />
              &lt;calibration_source&gt;/calibration/Cam1/stepped_planar/<br />
              └── model/model_pinhole.mat&nbsp;&nbsp;&nbsp;&nbsp;# the per-camera fit feeding the stereo pose
            </div>
          </Section>


          {/* CLI */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Stepped-board detection has no command-line equivalent.</strong> Building the model needs you
                to click fiducials and label which level each pose sits on, and there is no way to supply that
                headlessly. Calibrate on the Stereo Stepped tab in the GUI. Once a model is saved, the CLI can apply
                it like any other.
              </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              After the model exists, the rest of the pipeline is ordinary CLI work:
            </p>

            <CodeBlock
              title="End-to-End Stepped Stereo"
              code={`# 1. Calibrate on the Stereo Stepped tab in the GUI, then:
pivtools-cli instantaneous                              # PIV for both cameras
pivtools-cli apply-stereo --board stepped --all-paths   # 3D reconstruction
pivtools-cli statistics --source-endpoint stereo`}
            />

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 text-sm">
                The flag is <code className="bg-blue-100 px-1 rounded">--board</code>, and the stepped value is
                <code className="bg-blue-100 px-1 rounded">stepped</code>. Note also that
                <code className="bg-blue-100 px-1 rounded">apply-stereo</code> exits with an error unless you give it
                <code className="bg-blue-100 px-1 rounded">--all-paths</code> or an explicit directory set.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Self-calibration is available for stepped models on the GUI tab, but{' '}
              <code className="bg-gray-100 px-1 rounded">pivtools-cli self-calibrate</code> accepts only{' '}
              <code className="bg-gray-100 px-1 rounded">charuco</code> and{' '}
              <code className="bg-gray-100 px-1 rounded">dotboard</code>, so there is no headless route to it here either.
            </p>
          </Section>


          {/* YAML Reference */}
          <Section title="Configuration Reference" icon={<FileText size={32} />} id="yaml">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Almost nothing lives in config.yaml.</strong> The <code className="bg-yellow-100 px-1 rounded">calibration:</code> block
                is a four-key pointer, and anything else written under it is stripped out the next time the config is
                saved. Board geometry, the rig <code className="bg-yellow-100 px-1 rounded">dt</code>, and the image
                settings all live in a per-source sidecar at <code className="bg-yellow-100 px-1 rounded">&lt;source&gt;/calibration/settings.yaml</code>.
                Create one with <code className="bg-yellow-100 px-1 rounded">pivtools-cli init-settings --source &lt;dir&gt;</code> or
                by filling in the calibration tab in the GUI.
              </p>
            </div>

            <YamlDropdown
              title="config.yaml - the pointer block"
              defaultOpen={true}
              code={`calibration:
  calibration_sources:
    - /data/experiment/calibration
  source: ''            # '' means use calibration_sources[source_idx]
  source_idx: 0
  active: stereo_stepped`}
            />

            <YamlDropdown
              title="<source>/calibration/settings.yaml - stepped stereo"
              defaultOpen={true}
              code={`image:
  image_format: calib%05d.tif   # REQUIRED, no default
  image_type: standard          # REQUIRED
  n_views: 19
  start_index: 1

rig:
  camera_pair: [1, 2]
  dt: 0.0006                    # REQUIRED before generating a model
  datum_frame: 1                # 1-based
  interpolator: lanczos

methods:
  stepped:
    dot_spacing_mm: 5.0
    step_height_mm: 3.0
    board_thickness_mm: 14.8
    level_offset_mm: null       # null derives dot_spacing_mm / 2
  stepped_stereo:
    stereo_config: auto         # auto reads it from your clicks
    model_type: pinhole`}
            />

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
              <p className="text-blue-800 text-sm">
                <strong>Your clicks are not stored in YAML.</strong> Fiducial positions, the clicked level, and the
                per-frame pose labels are written to an <code className="bg-blue-100 px-1 rounded">inputs.mat</code> sidecar
                next to the saved model, so reopening the tab restores exactly what you picked.
              </p>
            </div>
          </Section>


          {/* Troubleshooting */}
          <Section title="Troubleshooting" icon={<Wrench size={32} />} id="troubleshooting">
            <div className="space-y-4">
              {[
                {
                  problem: "Grid detection fails on some poses",
                  solution: "Check dot spacing parameter matches the actual board. Verify illumination is even across both faces. Try cleaning the board surface. Poses with strong foreshortening (> 18 degrees rotation) may lose dots at the edges."
                },
                {
                  problem: "One level recovers far fewer dots than the other",
                  solution: "This usually means the fiducial axis clicks are inconsistent between the two faces. Verify that the detection overlay shows grid indices increasing in the expected directions. Re-click fiducials if needed."
                },
                {
                  problem: "\"Generate Model\" button stays disabled",
                  solution: "Not all poses have been click-to-labelled. Check the pose list panel -- any pose without a label prevents model generation. You need one label per pose per camera."
                },
                {
                  problem: "Stereo RMS error > 1.0 px",
                  solution: "Step height measurement may be wrong -- verify with a micrometer. Also check that both cameras can resolve individual dots clearly. Blurred or underexposed images increase RMS."
                },
                {
                  problem: "Focal length (fx) error is large",
                  solution: "Too few poses. Use at least 5-6 different target positions with varied angles. The multi-image Zhang initialization needs multiple homographies to robustly estimate intrinsics."
                },
                {
                  problem: "Generate Model stays disabled",
                  solution: "Some pose is still unlabelled. Every non-datum pose needs a level label on both cameras before a model can be built. Work through the click-to-label step until no pose is left unverified."
                },
                {
                  problem: "Transmission auto-detect picks wrong config",
                  solution: "First check your fiducial clicks: the configuration is read from their handedness, so a mis-ordered origin/x/y pick on either camera flips the answer. If the clicks are right, force it with methods.stepped_stereo.stereo_config: transmission (or same_side) in the settings sidecar."
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.problem}</h4>
                  <p className="text-gray-600 text-sm">{item.solution}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Next: View Your Results</h3>
            <p className="text-gray-300 mb-6 text-lg">
              After calibration, visualise your velocity fields and compute statistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/manual/stereo-calibration#reconstruction"
                className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
              >
                3D Reconstruction
              </a>
              <a
                href="/manual/results-viewer"
                className="inline-block bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
              >
                Results Viewer
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
