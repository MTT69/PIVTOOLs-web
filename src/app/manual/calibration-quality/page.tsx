'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Gauge,
  CheckCircle,
  Info,
  Camera,
  FileText,
  ClipboardCheck,
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

const captureRows = [
  {
    quantity: "Board tilt",
    meaning: "Angle between the board normal and the camera axis, per view",
    measured: "2.9 to 64 degrees, median 30 (13 to 18 views per camera)",
    why: "The only thing that separates focal length from standoff. A board that never tilts leaves fx undetermined at any RMS.",
  },
  {
    quantity: "Tilt direction",
    meaning: "Which way the board leans in the image, across the set",
    measured: "One hinge axis leaned both ways (anisotropy 0.06 to 0.08)",
    why: "Tilting about two axes constrains the principal point and the distortion centre along both image axes. One axis leaves the other weak.",
  },
  {
    quantity: "Standoff range",
    meaning: "How far the board moved towards and away from the camera",
    measured: "58 to 94 mm per camera, at 830 to 920 mm (7 to 11 %)",
    why: "Helps distortion and the released board. On its own it does not rescue an untilted set: each view then adds one unknown distance and one equation.",
  },
  {
    quantity: "Frame coverage",
    meaning: "Where the board appeared in the image",
    measured: "--",
    why: "Distortion coefficients act where the board went. Corners never covered are extrapolated.",
  },
  {
    quantity: "View count",
    meaning: "Number of board positions per camera",
    measured: "13 to 18",
    why: "Five to six is the floor. Beyond that, variety beats count: ten near-identical views add nothing a sixth different one would.",
  },
];

const judgingRows = [
  {
    field: "rms_px",
    where: "joint",
    meaning: "Root-mean-square reprojection error over every corner of every camera and view, in pixels",
    note: "Screening only. High means something is wrong. Low proves nothing about the parameters.",
  },
  {
    field: "per_camera_rms / cam_rms",
    where: "joint, stereo, mono",
    meaning: "The same, per camera",
    note: "A camera well above the others has a detection or focus problem, or its rig pose moved between views.",
  },
  {
    field: "per_view_rms",
    where: "mono, stereo",
    meaning: "Reprojection error per calibration image",
    note: "Read the spread, not the mean. One view far above the rest was shot before something settled.",
  },
  {
    field: "board_meta.converged",
    where: "joint",
    meaning: "The alternation between pose fit and board release met its tolerance",
    note: "Always 0 under board_release: none, because nothing alternates. That is not a failure.",
  },
  {
    field: "board_meta.n_board_dots",
    where: "joint",
    meaning: "Size of the shared board: every grid point any camera detected in any view",
    note: "Not the released count. Points seen by fewer than two rays cannot be triangulated and stay nominal; the CLI prints released rows out of this total.",
  },
  {
    field: "board_meta.cross_camera_board_agreement_mm",
    where: "joint",
    meaning: "Distance between the boards each camera reconstructed",
    note: "Exactly 0.0 by construction. Every camera references the one shared board, so there is no second board to disagree with. It is not a check.",
  },
  {
    field: "pose_diversity",
    where: "joint",
    meaning: "The determinacy diagnostic described below",
    note: "Read alongside rms_px. Absence of a flag is not a certificate of quality.",
  },
];

const diversityRows = [
  { field: "tilt_deg_min / median / max", meaning: "Board tilt per camera, degrees" },
  { field: "n_views_tilt_above_floor", meaning: "Views tilted more than tilt_floor_deg (1.0). Below two, the direction metrics are NaN and the report says why" },
  { field: "tilt_azimuth_spread_deg", meaning: "Arc of tilt axes, modulo 180. Leaning one hinge forward and back is one axis" },
  { field: "tilt_anisotropy", meaning: "0 means every tilt about one axis, 1 means all directions equally" },
  { field: "standoff_mm_min / median / max", meaning: "Median camera-frame depth of the board per view" },
  { field: "standoff_range_fraction", meaning: "(max minus min) over median standoff" },
  { field: "depth_ratio_max", meaning: "Depth spanned by one view over its standoff, roughly W sin(tilt) / Z. This is the conditioning the fit sees; it folds in the lens angle" },
  { field: "flag_low_tilt", meaning: "Fewer than two tilted views, median tilt below 5 degrees, or depth ratio below 0.02. Fires the DEGENERATE warning" },
  { field: "flag_single_azimuth", meaning: "Tilt axes within 30 degrees or anisotropy below 0.10. Printed as a re-shoot hint" },
  { field: "flag_constant_standoff", meaning: "Standoff range below 2 % of median. Printed as a re-shoot hint" },
  { field: "degenerate", meaning: "Rig-level: true when any camera has flag_low_tilt. Under a released board one untilted camera pulls every focal length" },
  { field: "view_rms_px / view_flagged", meaning: "Reprojection error per (camera, view) and a flag for views above twice their camera median" },
  { field: "board_planarity_rms_mm", meaning: "Out-of-plane rms of the released board. A flat board bowing by millimetres is absorbing a missing constraint" },
];

const modelFileRows = {
  camera: [
    { field: "camera_matrix", meaning: "3x3 K: fx, fy, cx, cy in pixels" },
    { field: "dist_coeffs", meaning: "OpenCV distortion vector k1 k2 p1 p2 k3; the standard model fixes k3 at 0" },
    { field: "R, t, rvec", meaning: "World to camera. X_cam = R X_world + t. The camera centre is minus R transpose t, not t" },
    { field: "image_width, image_height", meaning: "Sensor size the model was fitted at, pixels" },
    { field: "rms", meaning: "This camera's reprojection RMS, pixels" },
  ],
  stereo: [
    { field: "cam1, cam2, model1, model2", meaning: "Camera numbers and their camera blocks as above" },
    { field: "R_stereo, T_stereo", meaning: "Camera 1 frame to camera 2 frame: X_cam2 = R_stereo X_cam1 + T_stereo. The norm of T_stereo is the baseline" },
    { field: "per_view_rms1, per_view_rms2", meaning: "Reprojection error per view, per camera" },
    { field: "self_cal", meaning: "Self-calibration block when it has run. The fitted sheet is fitted_z_offset (mm), fitted_tilt_x and fitted_tilt_y (radians); the correction is baked into the stored models, so z_offset, tilt_x and tilt_y read 0 with baked = 1" },
  ],
  joint: [
    { field: "cameras, camera_models", meaning: "Camera numbers and one camera block per camera (the rig pose in the datum board frame)" },
    { field: "board_index, board_xyz", meaning: "Global grid index and released position of every board point, mm" },
    { field: "board_release, spacing_mm", meaning: "Which board coordinates were freed (full3d, z_only, none) and the nominal pitch" },
    { field: "per_camera_rms, rms_px", meaning: "Reprojection RMS per camera and overall" },
    { field: "pose_diversity", meaning: "The diagnostic block. Parallel arrays ordered by its own cameras field; empty when the record predates it" },
    { field: "world_frame, board_meta, contract_version", meaning: "The clicked origin and axes; the solve inputs plus converged, n_board_dots and cross_camera_board_agreement_mm; and the file-format version (1)" },
  ],
};

export default function CalibrationQualityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <ManualNavigation />

      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <Gauge className="text-soton-blue" size={48} />
              <h1 className="text-5xl font-bold text-gray-900">Calibration Quality</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              What to shoot, how to read the numbers, and what the model file means.
              This page covers the three questions the method pages do not.
            </p>
          </motion.div>

          {/* Overview */}
          <Section title="Overview" icon={<Info size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Each calibration page tells you how to run its method. None of them answers
              these questions, so they live here:
            </p>
            <FeatureList items={[
              "Did I shoot the right set of board positions? Count is not the measure; variety is.",
              "Does a low RMS mean the model is right? No. It means the model fits the corners it was shown. Whether the parameters are determined is a separate question, and the joint solve now reports on it.",
              "What do R, t, and the other fields in the .mat file mean, and which way do they point? The file does not say. This page is the reference.",
            ]} />
          </Section>

          {/* Capture */}
          <Section title="Capturing a pose set" icon={<Camera size={32} />} id="capture">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A pinhole calibration recovers focal length, principal point, distortion and the
              camera pose from where the board corners land in the image. A board facing the
              camera squarely, at one distance, gives a scale and nothing else: a longer lens
              further away produces the same picture. Tilting the board is what breaks that tie
              (the{' '}
              <a href="/manual/stepped-calibration#overview" className="text-soton-blue hover:underline">
                stepped board page
              </a>{' '}
              explains the same fx / tz ambiguity for its own method). The table lists what
              matters and what a healthy reference set measured.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Meaning</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Reference 3-camera set</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Why it matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {captureRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.meaning}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.measured}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Reference set: three cameras, 15 mm ChArUco, 4064 x 3040 px, about 850 mm standoff,
              0.048 mm per pixel. The tilt-direction row shows that even a good set can be
              one-sided; the diagnostic below reports it so you can decide whether it matters
              for your lens.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                <strong>Long lenses need more tilt, not more views.</strong> The conditioning
                the fit sees is the depth a tilted board spans divided by its standoff, roughly
                W sin(tilt) / Z. A 16 degree field of view at 850 mm gets a quarter of what a
                60 degree lens gets from the same 30 degree tilt. The diagnostic reports this
                as <code className="bg-yellow-100 px-1 rounded">depth_ratio_max</code>.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Recipe</h3>
            <ol className="space-y-2 mb-6">
              {[
                "Fix the cameras and let the rig settle. Nothing on the rig moves again until the last calibration image is taken.",
                "Fill the frame with the board in one view, then move it so that over the set every corner of every camera's image has seen the board.",
                "Tilt the board 20 to 45 degrees towards the camera, then away, then left, then right. Tilts about two different axes are the goal.",
                "Move the board towards and away from the camera by 10 to 20 % of the standoff, tilted as you go.",
                "Keep every camera that shares a view in focus on the board; a blurred camera raises its RMS and hides a real pose problem.",
                "Shoot the datum view last, or at least after the rig has settled. Its pose defines the world plane, and a datum shot while a camera was still creeping puts the world plane where that camera was, not where it is.",
                "Aim for 12 to 20 views per camera. If two views look alike, one of them is wasted.",
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-soton-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>The datum view.</strong> On the dotboard path it carries the clicked
                origin, +X and +Y, and on every joint path its board plane is the world
                z = 0. Make it the cleanest, most settled frame. It does not have to be seen
                by every camera: the joint solve needs only a connected chain of shared views
                across the rig, so a traverse where no single view is common to all cameras
                still solves.
              </p>
            </div>
          </Section>

          {/* Judging */}
          <Section title="Judging a calibration" icon={<Gauge size={32} />} id="judging">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700 text-base">
                <strong>RMS measures whether the model fits the corners. It does not prove the
                parameters are determined.</strong> A board that never tilted gives the same
                0.4 px RMS as a good set while the focal length is off by a factor of ten. High
                RMS means something is definitely wrong. Low RMS means nothing has been proven
                yet.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">What the reported numbers are</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Field</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Where</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Meaning</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">How to read it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {judgingRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.field}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.where}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.meaning}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Checks you can run today</h3>
            <FeatureList items={[
              "Read boards_3d.png. The released boards from every view should stack into one consistent scene; a board that floats away from the rest was shot after something moved.",
              "Compare the solved baseline and standoff against a tape measure. The joint solve constrains camera positions over every view, so a 5 mm disagreement on a 300 mm baseline is a real finding, not noise.",
              "Re-fit with two views dropped and watch fx. A determined focal length moves by a fraction of a percent; an undetermined one moves by whatever the dropped views were holding in place.",
              "Read the per-view RMS spread, not its mean. The joint report flags views above twice their camera's median.",
              "Distrust distortion coefficients acting where the board never went. Coverage is in the detection overlay figures.",
              "Under full3d, read board_planarity_rms_mm. A flat board that bowed by millimetres has absorbed a constraint the poses did not supply.",
            ]} />

            <h3 className="text-xl font-bold text-gray-900 mb-3">The pose-diversity report</h3>
            <p className="text-gray-700 mb-4">
              After a joint pinhole solve the CLI prints a pose-diversity block and the record
              stores it under <code className="bg-gray-100 px-1 rounded text-sm">pose_diversity</code>.
              It is computed from the converged poses, changes no fit result, and is a detector
              rather than a grade: the flags fire only on the unambiguous corner, and there is no
              GOOD verdict because a wrong GOOD would be as misleading as the zero agreement
              number above.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Field (per camera unless stated)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {diversityRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.field}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                <strong>When it prints DEGENERATE.</strong> The report says which cameras never
                tilted the board and that the RMS above is not evidence the intrinsics are
                identifiable. Re-shoot those cameras&apos; views with the board tilted 15 degrees or
                more in several directions. Do not lower the bar by switching to{' '}
                <code className="bg-yellow-100 px-1 rounded">board_release: none</code>: a
                converging rig can rescue one untilted camera under a fixed board, but the
                pose set is still wrong and the next rig will not be so lucky.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Two things that look wrong and are not</h3>
            <FeatureList items={[
              "The final rms_px is above the rms after alternation, which the CLI prints on its stages line (it is not stored in the record). The alternation fits a free pose per camera and view; the final bundle holds every camera on one rigid rig, and a rigid rig cannot follow a camera that crept between views. The rise is the price of a physical model, and the per-view flags show where it landed.",
              "converged is 0 under board_release: none. Nothing alternates when the board is fixed, so the flag has nothing to report.",
            ]} />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Reported baselines changed in this release.</strong> Camera positions
                and baselines from the joint solve are now constrained over every view rather
                than read from one, so they are worth checking against the rig. Joint models
                saved before this release used a free pose per view and must be re-run; the
                stored file has no <code className="bg-blue-100 px-1 rounded">pose_diversity</code>{' '}
                block, which is how you can tell.
              </p>
            </div>
          </Section>

          {/* Model file */}
          <Section title="Reading the model file" icon={<FileText size={32} />} id="model-file">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Models are MATLAB v5 <code className="bg-gray-100 px-1 rounded text-sm">.mat</code>{' '}
              files under the calibration source: <code className="bg-gray-100 px-1 rounded text-sm">model_*.mat</code>{' '}
              per camera, <code className="bg-gray-100 px-1 rounded text-sm">stereo_model_*.mat</code>{' '}
              per pair, <code className="bg-gray-100 px-1 rounded text-sm">joint_model_*.mat</code>{' '}
              per rig. The convention is the same in all three and is documented only here.
            </p>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700 text-sm leading-relaxed">
                <strong>Convention.</strong> <code className="bg-red-100 px-1 rounded">R</code> and{' '}
                <code className="bg-red-100 px-1 rounded">t</code> map world to camera:{' '}
                <code className="bg-red-100 px-1 rounded">X_cam = R * X_world + t</code>. The camera
                centre in world coordinates is{' '}
                <code className="bg-red-100 px-1 rounded">C = -R&apos; * t</code>; it is not{' '}
                <code className="bg-red-100 px-1 rounded">t</code>. The stereo pose maps camera 1 to
                camera 2: <code className="bg-red-100 px-1 rounded">X_cam2 = R_stereo * X_cam1 + T_stereo</code>.
                Pixels are 0-based, origin top-left, +y down. Lengths are mm; self-calibration
                tilts are radians. The one exception:{' '}
                <code className="bg-red-100 px-1 rounded">coordinates.mat</code> stores 1-based pixel
                positions, so subtract 1 before feeding them to a model.
              </p>
            </div>

            {(["camera", "stereo", "joint"] as const).map((kind) => (
              <div key={kind} className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {kind === "camera" ? "Camera block (mono record, and inside stereo and joint)" : kind === "stereo" ? "Stereo record" : "Joint record"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Field</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {modelFileRows[kind].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.field}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{row.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <CodeBlock
              title="MATLAB"
              code={`m = load('joint_model_pinhole.mat');
cam = m.camera_models(1);          % first camera in m.cameras
K = cam.camera_matrix;             % 3x3, pixels
R = cam.R;  t = cam.t(:);          % world -> camera
C = -R' * t                        % camera centre, world mm`}
            />
            <CodeBlock
              title="Python"
              code={`from scipy.io import loadmat
m = loadmat("joint_model_pinhole.mat", squeeze_me=True, struct_as_record=False)
import numpy as np
cam = np.atleast_1d(m["camera_models"])[0]   # first camera in m["cameras"]; atleast_1d survives a one-camera file
K, R, t = cam.camera_matrix, cam.R, cam.t.reshape(3)
C = -R.T @ t                       # camera centre, world mm`}
            />

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>The file does not record any of this.</strong> There is no convention
                field, and none is planned this release; this page is the reference. What the
                file does carry is <code className="bg-blue-100 px-1 rounded">contract_version</code>{' '}
                (currently 1), stamped into every record.
              </p>
            </div>
          </Section>

          {/* Checklist */}
          <Section title="Checklist" icon={<ClipboardCheck size={32} />} id="checklist">
            <FeatureList items={[
              "Rig settled before the first image; datum view shot after it settled",
              "Tilts of 20 to 45 degrees about two different axes, and 10 to 20 % standoff change",
              "Every image corner of every camera has seen the board",
              "RMS read as screening: high is wrong, low is not yet right",
              "Pose-diversity report read: no DEGENERATE line, flagged views explained or re-shot",
              "Baseline and standoff checked against a tape measure",
              "Model file consumed with X_cam = R X_world + t and C = -R' t, pixels 0-based, coordinates.mat minus 1",
            ]} />
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Next: Global Coordinates</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Put every camera in one shared world frame with the joint multi-camera model.
            </p>
            <Link
              href="/manual/global-coordinates"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Continue to Global Coordinates
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
