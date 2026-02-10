'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Video,
  FileText,
  Palette,
  Settings,
  ChevronDown,
  ChevronRight,
  Info,
  Terminal,
  FolderOpen,
  CheckCircle,
  Layers,
  Monitor,
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

export default function VideoMakerPage() {
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
              Video <span className="text-soton-gold">Maker</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Create MP4 videos from instantaneous PIV data with customisable colormaps,
              resolution, and encoding quality.
            </p>
          </motion.div>

          {/* GUI Usage */}
          <Section title="GUI Usage" icon={<Monitor size={32} />} id="gui">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Video Maker tab provides controls for data selection, colour limits,
              and encoding settings. A test mode renders the first 50 frames for quick preview.
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
                    { step: "1", action: "Select base path, camera, data source, and variable." },
                    { step: "2", action: "Set colour limits (leave blank for auto 5th-95th percentile scaling)." },
                    { step: "3", action: "Choose colormap, resolution (1080p / 4K), and FPS." },
                    { step: "4", action: "Click \"Test Video\" (50 frames) to preview, or \"Create Video\" for all frames." },
                    { step: "5", action: "Use the Browse Videos tab to play back or manage existing videos." },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-bold text-soton-blue">{row.step}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Browse Videos</h4>
              </div>
              <p className="text-blue-700 text-sm">
                The Browse tab lists all MP4/AVI/MOV/MKV files in the base path&apos;s
                <code className="bg-blue-100 px-1 rounded mx-1">videos/</code> directory,
                sorted newest-first with in-browser playback.
              </p>
            </div>
          </Section>

          {/* CLI Usage */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Command-line flags override values from config.yaml.
            </p>

            <CodeBlock
              title="Video CLI"
              code={`# Create video with config.yaml defaults
pivtools-cli video

# Specify variable and data source
pivtools-cli video --variable mag --data-source calibrated

# Custom resolution, quality, and colormap
pivtools-cli video --resolution 4k --crf 10 --cmap viridis

# Set colour limits
pivtools-cli video --variable vorticity --lower -100 --upper 100

# Test mode (50 frames)
pivtools-cli video --test

# Process specific paths
pivtools-cli video -p 0,1`}
            />

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Flag</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { flag: '--camera, -c', desc: 'Camera number (1-based)' },
                    { flag: '--variable, -v', desc: 'ux, uy, uz, mag, vorticity, etc.' },
                    { flag: '--run, -r', desc: 'Pass number (default: 1)' },
                    { flag: '--data-source, -d', desc: 'calibrated, uncalibrated, merged, stereo, inst_stats' },
                    { flag: '--fps', desc: 'Frame rate 1-120 (default: 30)' },
                    { flag: '--crf', desc: 'Quality 0-51 (default: 15, lower = better)' },
                    { flag: '--resolution', desc: '1080p or 4k' },
                    { flag: '--cmap', desc: 'Colormap name (default: bwr)' },
                    { flag: '--lower / --upper', desc: 'Colour limits (blank = auto)' },
                    { flag: '--test', desc: 'Render first 50 frames only' },
                    { flag: '--active-paths, -p', desc: 'Comma-separated path indices' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.flag}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Data Sources */}
          <Section title="Data Sources" icon={<Layers size={32} />} id="data-sources">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Only instantaneous (per-frame) data can be used for videos. Ensemble data
              produces a single field with no temporal sequence.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Path</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { source: 'calibrated', desc: 'Physical-unit velocity fields', path: 'calibrated_piv/{n}/Cam{c}/instantaneous/' },
                    { source: 'uncalibrated', desc: 'Raw pixel displacements', path: 'uncalibrated_piv/{n}/Cam{c}/instantaneous/' },
                    { source: 'merged', desc: 'Multi-camera Hanning-blended fields', path: 'calibrated_piv/{n}/merged/Cam1/instantaneous/' },
                    { source: 'stereo', desc: '3D velocity (ux, uy, uz)', path: 'stereo_calibrated/{n}/Cam1_Cam2/instantaneous/' },
                    { source: 'inst_stats', desc: 'Per-frame computed statistics', path: 'statistics/{n}/Cam{c}/.../instantaneous_stats/' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.source}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.desc}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs font-mono">{row.path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Variables */}
          <Section title="Available Variables" icon={<Palette size={32} />} id="variables">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Variables are auto-detected from the first frame file. Statistics variables
              (vorticity, stresses, gamma) require the statistics module to have been run first.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Variable</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { var: 'ux', desc: 'Velocity in x', source: 'PIV' },
                    { var: 'uy', desc: 'Velocity in y', source: 'PIV' },
                    { var: 'uz', desc: 'Velocity in z (stereo only)', source: 'PIV' },
                    { var: 'mag', desc: 'Velocity magnitude sqrt(ux^2 + uy^2 [+ uz^2])', source: 'Computed' },
                    { var: 'u_prime', desc: 'Fluctuating velocity in x', source: 'Statistics' },
                    { var: 'v_prime', desc: 'Fluctuating velocity in y', source: 'Statistics' },
                    { var: 'uu_inst', desc: 'Reynolds normal stress (x)', source: 'Statistics' },
                    { var: 'vv_inst', desc: 'Reynolds normal stress (y)', source: 'Statistics' },
                    { var: 'uv_inst', desc: 'Reynolds shear stress', source: 'Statistics' },
                    { var: 'vorticity', desc: 'Out-of-plane vorticity', source: 'Statistics' },
                    { var: 'divergence', desc: 'Velocity divergence', source: 'Statistics' },
                    { var: 'gamma1', desc: 'Swirling strength criterion', source: 'Statistics' },
                    { var: 'gamma2', desc: 'Vortex core identification', source: 'Statistics' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.var}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.desc}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          row.source === 'PIV' ? 'bg-blue-100 text-blue-700' :
                          row.source === 'Statistics' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>{row.source}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Colormaps */}
          <Section title="Colormaps" icon={<Palette size={32} />} id="colormaps">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Default colormap is <code className="bg-gray-100 px-1 rounded text-sm">bwr</code> (blue-white-red),
              which auto-adjusts: symmetric around zero for diverging data, half-map for
              all-positive or all-negative ranges.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Colormap</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Style</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'default (bwr)', style: 'Diverging blue-white-red (auto)' },
                    { name: 'viridis', style: 'Perceptually uniform' },
                    { name: 'plasma', style: 'Warm perceptually uniform' },
                    { name: 'inferno', style: 'Dark perceptually uniform' },
                    { name: 'cividis', style: 'Colourblind-friendly' },
                    { name: 'jet', style: 'Classic rainbow' },
                    { name: 'hot', style: 'Black-red-yellow-white' },
                    { name: 'twilight', style: 'Cyclic' },
                    { name: 'gray', style: 'Greyscale' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.name}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.style}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* YAML Configuration */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="yaml">
            <YamlDropdown
              title="Video Configuration"
              defaultOpen={true}
              code={`video:
  base_path_idx: 0             # Index into paths.base_paths
  camera: 1                    # Camera number (1-based)
  data_source: calibrated      # calibrated, uncalibrated, merged, stereo, inst_stats
  variable: ux                 # Variable to visualise
  run: 1                       # Pass number (1-based)
  piv_type: instantaneous      # Must be instantaneous

  cmap: default                # Colormap name or "default"
  lower: ""                    # Lower colour limit ("" for auto)
  upper: ""                    # Upper colour limit ("" for auto)

  fps: 30                      # Frame rate (1-120)
  crf: 15                      # Quality 0-51 (lower = better)
  resolution: 1080p            # "1080p" or "4k"`}
            />
          </Section>

          {/* Output */}
          <Section title="Output" icon={<FolderOpen size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Videos are saved under <code className="bg-gray-100 px-1 rounded text-sm">videos/</code> with
              filenames encoding the pass, camera, variable, and data source.
            </p>

            <CodeBlock
              title="Output Directory"
              code={`base_path/
  videos/{num_frame_pairs}/
    Cam1/
      run1_Cam1_ux.mp4
      run1_Cam1_mag.mp4
      run1_Cam1_ux_test.mp4         # Test video (50 frames)
      stats/
        run1_Cam1_vorticity_inst_stats.mp4
    merged/
      run1_Cam1_ux_merged.mp4
    stereo/
      run1_Cam1_Cam2_uz_stereo.mp4`}
            />

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Filename Pattern</h4>
              <p className="text-gray-600 text-sm">
                <code className="bg-gray-200 px-1 rounded">run{'{pass}'}_Cam{'{camera}'}_{'{variable}'}[_{'{source}'}][_test].mp4</code>
                &mdash; suffixes added for uncalibrated, merged, stereo, inst_stats, and test mode.
              </p>
            </div>
          </Section>

          {/* Video Quality */}
          <Section title="Video Quality" icon={<Settings size={32} />} id="quality">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              H.264 encoding with FFmpeg, optimised for scientific visualisation.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Setting</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { setting: 'Codec', value: 'libx264' },
                    { setting: 'Pixel format', value: 'yuv420p' },
                    { setting: 'Preset', value: 'slow' },
                    { setting: 'Tune', value: 'stillimage (optimised for smooth gradients)' },
                    { setting: 'Default CRF', value: '15 (near-lossless)' },
                    { setting: 'LUT resolution', value: '4096 levels (reduces colour banding)' },
                    { setting: 'Faststart', value: 'Enabled (streaming playback)' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.setting}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">CRF Range</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { range: '0-15', quality: 'Near-lossless (large files)' },
                    { range: '15-23', quality: 'High quality (recommended)' },
                    { range: '23-28', quality: 'Medium quality' },
                    { range: '28+', quality: 'Lower quality (small files)' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.range}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.quality}</td>
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
            <h3 className="text-3xl font-bold mb-4">Back to Results Viewer</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Return to the Results Viewer to explore all viewing and post-processing options.
            </p>
            <a
              href="/manual/results-viewer"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Results Viewer
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
