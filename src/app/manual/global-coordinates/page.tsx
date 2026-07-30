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
  Layers,
  Wand2,
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
              Express every camera in one shared physical reference frame. How this is done
              depends on which calibration board you use.
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
              <span className="text-sm text-gray-500 italic sm:ml-auto">opinionated defaults &mdash; full reference below</span>
            </div>
            <ol className="space-y-2 text-gray-700">
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">1.</span><span>Open any calibration method tab to reveal the Calibration Image Viewer, then toggle <strong>Global Coords</strong> on in the settings bar.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">2.</span><span>On <strong>Camera 1</strong>: click <strong>Set Origin</strong> and click your physical (0,0) reference point. Enter the physical X/Y in mm if it&apos;s not literally at (0,0).</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">3.</span><span>Still on Camera 1: click <strong>Pick F1</strong> and click a feature visible in both Camera 1 and Camera 2. Navigate to Camera 2 and click the same physical point with Pick F1.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">4.</span><span>For more cameras, each middle camera picks F1 (shared with the previous camera) and F2 (shared with the next). The last camera only needs F1.</span></li>
              <li className="flex gap-3"><span className="font-bold text-soton-gold flex-shrink-0 w-5">5.</span><span>Flip X auto-detects from the origin/feature geometry &mdash; override manually if it chooses wrong. Click <strong>Calibrate Vectors</strong>; alignment is applied automatically.</span></li>
            </ol>
          </motion.div>

          {/* Overview */}
          <Section title="Two paths, split by board type" icon={<Crosshair size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              When you process more than one camera, the fields only line up if every camera reports
              its vectors in a single common frame. PIVTOOLs reaches that frame in two different ways,
              and which one applies is decided entirely by the calibration board.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Board type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mechanism</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">How the shared frame arises</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      board: "Dotboard / ChArUco",
                      mech: "Joint multi-camera calibration",
                      how: "One shared board solved jointly. The shared frame is intrinsic to the solve — nothing is baked separately.",
                    },
                    {
                      board: "Scale factor",
                      mech: "Multi-camera global frame",
                      how: "Cameras calibrated independently, then a datum + overlap-pair chain bakes a world_offset_mm into each model.",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.board}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-soton-blue">{row.mech}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Which one do I get?</strong> You do not choose between them. If you calibrate
                with a dotboard or ChArUco board, you get the joint solve. If you calibrate with a
                scale factor, you get the global-frame chain. The rest of this
                page documents each in turn.
              </p>
            </div>
          </Section>

          {/* Joint multi-camera model */}
          <Section title="Joint multi-camera model (dotboard / ChArUco)" icon={<Layers size={32} />} id="joint">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              When every camera observes the same physical board, the calibration solves all cameras
              together into one shared world frame. This is the system-aware model. A single solve
              recovers per-camera intrinsics, per-(camera, view) poses, and one released board that
              every camera agrees on. Because the world frame is part of the solve itself, the
              cameras are in the same frame by construction — cross-camera agreement is zero, the
              DaVis-equivalent result.
            </p>

            <FeatureList items={[
              "One shared board with a global dot index — every camera looks at the same physical target",
              "Per-camera intrinsics plus per-(camera, view) poses solved in a single joint optimisation",
              "The shared world frame is intrinsic to the solve, not baked on afterwards",
              "No world_offset_mm and no separate alignment step — there is nothing to align",
              "Cross-camera agreement is 0 by construction (DaVis-matching)",
            ]} />

            <h3 className="text-xl font-bold text-gray-900 mb-3">In the GUI</h3>
            <p className="text-gray-700 mb-4">
              This is automatic. Put two or more cameras into the Dotboard or ChArUco calibration tab
              and the solve is always joint — there is no toggle to enable (a single camera is a mono
              solve in the same tab). The result is a{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">JointRecord</code>. Dotboard joint
              calibration is driven from the GUI because it needs the interactive datum and
              cross-camera picks of the guided wizard (next section), which are saved to a sidecar{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">inputs.mat</code> beside the model.
            </p>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-6">
              <p className="text-green-700 text-sm">
                <strong>Tolerant detection + caching.</strong> A view that fails detection is dropped
                and reported, never fatal — a camera only fails if <em>no</em> image detects.
                Detections are cached in memory and persisted in the{' '}
                <code className="bg-green-100 px-1 rounded">inputs.mat</code> sidecar, so previews
                reuse them; the <strong>Re-detect</strong> button forces a refresh after the images
                change.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">No headless dotboard-joint path</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Dotboard joint calibration requires the interactive clicks above, so it runs from the
                GUI only. The CLI <code className="bg-yellow-100 px-1 rounded">detect-joint</code>{' '}
                command is ChArUco-only.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">On the CLI (ChArUco only)</h3>
            <CodeBlock
              title="detect-joint"
              code={`# Joint ChArUco solve across cameras into one shared world frame
pivtools-cli detect-joint --cameras 1,2,3 \\
    --model-type pinhole \\
    --board-release full3d`}
            />

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Flag</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { flag: "--cameras", desc: "Cameras to include in the joint solve", def: "—" },
                    { flag: "--source", desc: "Calibration source (ChArUco)", def: "—" },
                    { flag: "--model-type", desc: "pinhole | polynomial", def: "pinhole" },
                    { flag: "--board-release", desc: "full3d | z_only | none — how much of the board geometry is freed", def: "full3d" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-4 text-sm font-mono text-soton-blue">{row.flag}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">--model-type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { mt: "pinhole", out: "One JointRecord at <root>/joint_<board>/model/joint_model_pinhole.mat" },
                    { mt: "polynomial", out: "Per-camera polynomial records" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono text-soton-blue">{row.mt}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{row.out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>No YAML to configure.</strong> The joint path does not use the{' '}
                <code className="bg-blue-100 px-1 rounded">global_coordinates</code> datum +
                overlap-pair block below — its datum and cross-camera ties come from the guided
                wizard and persist in <code className="bg-blue-100 px-1 rounded">inputs.mat</code>,
                and the shared frame is part of the solve itself.
              </p>
            </div>
          </Section>

          {/* Guided wizard */}
          <Section title="Guided wizard — Set Global Coordinates" icon={<Wand2 size={32} />} id="wizard">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              On the dotboard joint path, all interactive picking runs through one auto-advancing
              wizard. Press <strong>Set Global Coordinates</strong> and follow the banner — there
              are no separate origin, link, or rescue buttons.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">The sequence</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Datum world frame first — click Origin, +X, +Y on the datum camera's datum view (each click snaps to the nearest detected dot); type the origin mm in the wizard panel",
                "Then, per calibration frame: click the origin dot in camera 1",
                "Click 2 shared dots in camera 1",
                "Click the same 2 dots in camera 2 — the bridge auto-commits once enough pairs are picked",
              ].map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-soton-blue text-white text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <FeatureList items={[
              "The viewer auto-navigates to the awaited camera and frame; if you browse elsewhere mid-walk, picking pauses with a hint until you return — a click is never attributed to the wrong image",
              "Markers are persistent and colour-coded: the origin is green, shared dots are coloured by pick order with the same colour in both cameras (dot 1 in camera 1 matches dot 1 in camera 2)",
              "Bridges walk outward from the datum camera to each adjacent camera (2 from 1, 3 from 2, ...), matching a linear rig's real overlap chain",
              "Skip a step if a dot is not visible in a view; re-running the wizard skips views that are already anchored",
            ]} />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>ChArUco joint needs no wizard.</strong> Corner ids resolve the global grid
                with zero clicks. The origin of the shared frame is the corner-id default — picking
                a chosen corner as the origin is not yet available on the joint ChArUco path.
              </p>
            </div>
          </Section>

          {/* Global frame */}
          <Section title="Global frame (scale factor)" icon={<Info size={32} />} id="global-frame">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Scale-factor calibration produces one model per camera, each in its own
              local frame. The <code className="bg-gray-100 px-1 rounded text-sm">global-frame</code>{' '}
              step ties them together. It takes a datum camera and a chain of overlap pairs, computes
              the per-camera shift needed to put them all in one frame, and bakes a{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">world_offset_mm</code> into each model.
            </p>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-6">
              <p className="text-green-700 text-sm">
                <strong>Coordinates only.</strong> The offset is applied at apply-calibration time as a
                pure constant translation of the coordinate grid. Because it is constant, velocities
                and Reynolds stresses are unaffected — only where each field sits in space changes.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Regenerating clears the offset</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                Regenerating any camera&apos;s model builds a fresh world frame, so its baked{' '}
                <code className="bg-yellow-100 px-1 rounded">world_offset_mm</code> is cleared.
                Re-save the global frame after recalibrating any camera.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Datum point</h3>
            <p className="text-gray-700 mb-4">
              The datum is a pixel on the datum camera that defines where the physical origin sits. It
              carries physical coordinates (in mm), so you can place the origin on the datum feature or
              offset it from there.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Overlap pairs</h3>
            <p className="text-gray-700 mb-4">
              Each overlap pair names the same physical feature as seen by two cameras:{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">pixel_on_a</code> on{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">camera_a</code> and{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">pixel_on_b</code> on{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">camera_b</code>. Chaining pairs from the
              datum camera outward fixes every camera&apos;s shift relative to the shared origin.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">In the GUI</h3>
            <p className="text-gray-700 mb-6">
              This is a deliberate step on the Scale Factor tab (shown when more than one camera is
              configured). After calibrating the cameras, pick the datum and overlap points on the
              image and use <strong>Compute + Save Global Frame</strong> to write the datum/overlap
              configuration and bake the offsets into the models. The saved per-camera offsets in mm
              are listed on the tab.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">On the CLI</h3>
            <p className="text-gray-700 mb-6">
              The <code className="bg-gray-100 px-1 rounded text-sm">global-frame</code> command requires
              the datum/overlap configuration under{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">calibration.global_coordinates</code>{' '}
              (normally set in the GUI). The example below shows the multi-camera scale-factor sequence end to end.
            </p>

            <CodeBlock
              title="Multi-camera scale-factor sequence"
              code={`# 1. Calibrate each camera independently
pivtools-cli scale-factor --px-per-mm <v> --origin <x> <y>

# 2. Bake the shared frame into every model (needs global_coordinates config)
pivtools-cli global-frame --board scale_factor

# 3. Emit coordinates in the shared frame
pivtools-cli apply-calibration --board scale_factor`}
            />

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">global-frame flag</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { flag: "--source", desc: "Calibration source to operate on" },
                    { flag: "--board", desc: "charuco | dotboard | scale_factor" },
                    { flag: "--model-type", desc: "Camera model type" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono text-soton-blue">{row.flag}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="text-yellow-600" size={18} />
                <strong className="text-yellow-800">Prerequisite</strong>
              </div>
              <p className="text-yellow-700 text-sm">
                The datum and overlap pairs must exist under{' '}
                <code className="bg-yellow-100 px-1 rounded">calibration.global_coordinates</code>{' '}
                before <code className="bg-yellow-100 px-1 rounded">global-frame</code> runs. Set them in
                the GUI, or edit the YAML directly using the block below.
              </p>
            </div>
          </Section>

          {/* YAML */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="yaml">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The datum/overlap configuration lives under{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">calibration.global_coordinates</code>.
              It applies to the global-frame (scale factor) path only — the joint path has no
              such block.
            </p>

            <YamlDropdown
              title="Global Frame Configuration"
              defaultOpen={true}
              code={`calibration:
  global_coordinates:
    enabled: true
    datum_camera: 1                   # Camera holding the origin
    datum_pixel: [512.0, 384.0]       # Pixel position of origin on datum camera
    datum_physical: [0.0, 0.0]        # Physical coordinates (mm) at datum
    datum_frame: 1                    # Calibration frame used for the datum
    overlap_pairs:
      - camera_a: 1
        camera_b: 2
        pixel_on_a: [950.0, 400.0]    # Shared feature pixel on camera_a
        pixel_on_b: [120.0, 400.0]    # Same feature pixel on camera_b
      - camera_a: 2
        camera_b: 3
        pixel_on_a: [930.0, 410.0]
        pixel_on_b: [100.0, 405.0]`}
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
                      { field: "enabled", type: "bool", desc: "Enable the global-frame chain" },
                      { field: "datum_camera", type: "int", desc: "Camera that holds the origin" },
                      { field: "datum_pixel", type: "[x, y]", desc: "Pixel position of the origin on the datum camera image" },
                      { field: "datum_physical", type: "[x, y]", desc: "Physical coordinates (mm) at the datum point" },
                      { field: "datum_frame", type: "int", desc: "Calibration frame used for the datum pixel-to-physical conversion" },
                      { field: "overlap_pairs", type: "list", desc: "Chain of shared-feature pairs linking the cameras" },
                      { field: "overlap_pairs[].camera_a", type: "int", desc: "First camera in the pair" },
                      { field: "overlap_pairs[].camera_b", type: "int", desc: "Second camera in the pair" },
                      { field: "overlap_pairs[].pixel_on_a", type: "[x, y]", desc: "Shared feature pixel on camera_a" },
                      { field: "overlap_pairs[].pixel_on_b", type: "[x, y]", desc: "Same feature pixel on camera_b" },
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

          {/* CLI quick reference */}
          <Section title="CLI quick reference" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Pick the path by board type. Dotboard and ChArUco get the joint solve; scale factor
              gets the global-frame chain.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Dotboard / ChArUco (joint)</h3>
            <p className="text-gray-700 mb-4">
              In the GUI, two or more cameras in the calibration tab is always a joint solve — no extra
              command. On the CLI, ChArUco joint calibration uses{' '}
              <code className="bg-gray-100 px-1 rounded text-sm">detect-joint</code> (see the joint
              section above). Dotboard joint has no headless path.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Scale factor (global frame)</h3>
            <CodeBlock
              title="Scale-factor multi-camera workflow"
              code={`# Per camera
pivtools-cli scale-factor --px-per-mm <v> --origin <x> <y>

# Bake shared frame into models
pivtools-cli global-frame --board scale_factor

# Emit coordinates in the shared frame
pivtools-cli apply-calibration --board scale_factor`}
            />
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
