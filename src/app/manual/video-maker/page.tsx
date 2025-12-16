'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Video,
  FileText,
  Palette,
  Play,
  Settings,
  ChevronDown,
  ChevronRight,
  Info,
  Terminal,
  Sliders,
  FolderOpen,
  CheckCircle,
  Layers,
  Clock
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
              Create high-quality MP4 videos from your PIV data. Visualise velocity fields,
              derived statistics, and merged stereo data with customisable colormaps and resolution.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The Video Maker creates animated visualisations of your PIV velocity fields. It supports
              instantaneous PIV data, computed statistics (vorticity, Reynolds stresses), and merged stereo fields.
              Videos are encoded using FFmpeg with H.264 for maximum compatibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "1. Select Data", desc: "Camera, source, variable" },
                { label: "2. Configure", desc: "Limits, colormap, resolution" },
                { label: "3. Create", desc: "Test or full video" },
                { label: "4. Browse", desc: "View and manage videos" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-soton-gold">{item.label}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GUI Usage Section */}
          <Section title="GUI Usage" icon={<Video size={32} />} id="gui">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Video Maker panel in the GUI provides a streamlined interface for creating PIV visualisation videos.
              It automatically detects available data sources and variables, making it easy to create professional-quality
              animations of your experimental data.
            </p>

            {/* Data Selection */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FolderOpen className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Data Selection</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Base Path</h5>
                    <p className="text-gray-600 text-sm">
                      Select the experiment directory from the dropdown if multiple paths are configured,
                      or browse to a directory manually. The Video Maker looks for processed PIV data
                      in the standard output structure.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Camera</h5>
                    <p className="text-gray-600 text-sm">
                      Select which camera&apos;s data to visualise. For single-camera setups, this defaults to Camera 1.
                      For stereo setups, you can create videos from individual cameras or use merged data.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <h5 className="font-semibold text-blue-800 mb-2">Data Source</h5>
                    <p className="text-blue-700 text-sm mb-2">
                      The Video Maker automatically detects which data types are available:
                    </p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li><strong>Calibrated:</strong> Physical units (mm, m/s)</li>
                      <li><strong>Uncalibrated:</strong> Pixel displacements</li>
                      <li><strong>Merged:</strong> Stereo-reconstructed 3D fields</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                    <p className="text-green-700 text-sm">
                      <strong>Tip:</strong> The GUI shows frame counts for each available data source,
                      helping you verify the correct dataset is selected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Variable Selection */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Variable Selection</h4>
              </div>

              <p className="text-gray-600 mb-4">
                Variables are organised into groups based on their source. The dropdown automatically
                shows only variables available in your processed data.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Instantaneous Variables</h5>
                  <p className="text-gray-600 text-sm mb-2">Direct PIV output from frame correlation:</p>
                  <div className="flex flex-wrap gap-2">
                    {['ux', 'uy', 'uz', 'mag'].map(v => (
                      <span key={v} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">{v}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Calculated Per-Frame</h5>
                  <p className="text-gray-600 text-sm mb-2">Computed statistics (requires statistics processing):</p>
                  <div className="flex flex-wrap gap-2">
                    {["u'", "v'", "u'u'", "v'v'", "u'v'", 'vorticity', 'divergence'].map(v => (
                      <span key={v} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">{v}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> The <code className="bg-yellow-100 px-1 rounded">mag</code> (velocity magnitude)
                  variable is always available and computed as <code className="bg-yellow-100 px-1 rounded">sqrt(ux&sup2; + uy&sup2;)</code>.
                  For stereo data, <code className="bg-yellow-100 px-1 rounded">uz</code> is included in the magnitude calculation.
                </p>
              </div>
            </div>

            {/* Video Settings */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Sliders className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Video Settings</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Run Selection</h5>
                  <p className="text-gray-600 text-sm">
                    If your PIV was processed with multiple runs (passes), select which run to visualise.
                    The highest run number typically contains the most refined results.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Color Limits</h5>
                  <p className="text-gray-600 text-sm">
                    Set lower and upper bounds for the colormap. Leave blank for auto-detection using
                    5th-95th percentiles across all frames for consistent scaling.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Colormap</h5>
                  <p className="text-gray-600 text-sm">
                    Choose from matplotlib colormaps. &quot;Default&quot; uses <code className="bg-gray-200 px-1 rounded">bwr</code> (blue-white-red)
                    for diverging data, automatically adjusting for positive/negative ranges.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Resolution</h5>
                  <p className="text-gray-600 text-sm mb-2">Output video resolution:</p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li><strong>1080p:</strong> 1920&times;1080 (Full HD)</li>
                    <li><strong>4K:</strong> 3840&times;2160 (Ultra HD)</li>
                  </ul>
                  <p className="text-gray-500 text-xs mt-2">
                    Aspect ratio is preserved; the video fits within the selected resolution.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Frame Rate (FPS)</h5>
                  <p className="text-gray-600 text-sm">
                    Set the playback speed. Default is 30 FPS. Higher values create smoother playback;
                    lower values extend video duration. Range: 1-120 FPS.
                  </p>
                </div>
              </div>
            </div>

            {/* Creating Videos */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Play className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Creating Videos</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h5 className="font-semibold text-green-800 mb-2">Test Video (50 frames)</h5>
                  <p className="text-green-700 text-sm mb-2">
                    Creates a short preview using the first 50 frames. Use this to:
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>Verify color limits are appropriate</li>
                    <li>Check the colormap looks correct</li>
                    <li>Confirm the correct variable/run is selected</li>
                    <li>Preview output quality before full render</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h5 className="font-semibold text-blue-800 mb-2">Create Full Video</h5>
                  <p className="text-blue-700 text-sm mb-2">
                    Renders all frames into a complete video. Processing time depends on:
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>Number of frames (shown in data source info)</li>
                    <li>Output resolution (4K takes longer)</li>
                    <li>CPU performance and available memory</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Progress Tracking</h5>
                <p className="text-gray-600 text-sm">
                  A progress bar shows the current frame being processed. You can cancel video creation
                  at any time using the Cancel button. Completed videos appear in the result panel with
                  inline playback controls.
                </p>
              </div>
            </div>

            {/* Browse Videos Tab */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FolderOpen className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Browse Videos Tab</h4>
              </div>

              <p className="text-gray-600 mb-4">
                The Browse Videos tab lists all existing videos in the current base path&apos;s <code className="bg-gray-100 px-1 rounded">videos/</code> directory.
                Select any video from the dropdown to preview it directly in the browser.
              </p>

              <FeatureList items={[
                "Automatic detection of MP4, AVI, MOV, and MKV files",
                "Videos sorted by modification time (newest first)",
                "In-browser playback with standard video controls",
                "Refresh button to update the list after creating new videos"
              ]} />
            </div>
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Video Maker can be run from the command line for batch processing or integration
              into automated workflows. It reads default parameters from <code className="bg-gray-100 px-1 rounded">config.yaml</code>
              with command-line overrides available for all options.
            </p>

            {/* Running from Command Line */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Running from Command Line</h4>
              </div>

              <CodeBlock
                title="Basic Usage"
                code={`# Create video with settings from config.yaml
pivtools-cli video

# Specify variable to visualise
pivtools-cli video --variable mag

# Override camera and run
pivtools-cli video --camera 1 --run 2

# Set data source
pivtools-cli video --data-source merged

# Custom resolution and quality
pivtools-cli video --resolution 4k --crf 10

# Custom color limits
pivtools-cli video --variable vorticity --lower -100 --upper 100

# Use specific colormap
pivtools-cli video --cmap viridis

# Test mode (50 frames only)
pivtools-cli video --test

# Process specific paths
pivtools-cli video -p 0,1`}
              />

              <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-3">CLI Options</h5>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Flag</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr><td className="px-4 py-2 font-mono text-soton-blue">--camera, -c</td><td className="px-4 py-2 text-gray-600">Camera number</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2 font-mono text-soton-blue">--variable, -v</td><td className="px-4 py-2 text-gray-600">ux, uy, mag, vorticity, etc.</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-soton-blue">--run, -r</td><td className="px-4 py-2 text-gray-600">Run number (default: 1)</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2 font-mono text-soton-blue">--data-source, -d</td><td className="px-4 py-2 text-gray-600">calibrated, uncalibrated, merged, inst_stats</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-soton-blue">--fps</td><td className="px-4 py-2 text-gray-600">Frame rate (default: 30)</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2 font-mono text-soton-blue">--crf</td><td className="px-4 py-2 text-gray-600">Quality 0-51 (default: 15, lower=better)</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-soton-blue">--resolution</td><td className="px-4 py-2 text-gray-600">e.g., 1920x1080 or 4k</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2 font-mono text-soton-blue">--cmap</td><td className="px-4 py-2 text-gray-600">Colormap name</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-soton-blue">--lower</td><td className="px-4 py-2 text-gray-600">Lower color limit</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2 font-mono text-soton-blue">--upper</td><td className="px-4 py-2 text-gray-600">Upper color limit</td></tr>
                    <tr><td className="px-4 py-2 font-mono text-soton-blue">--test</td><td className="px-4 py-2 text-gray-600">Test mode: 50 frames only</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2 font-mono text-soton-blue">--active-paths, -p</td><td className="px-4 py-2 text-gray-600">Comma-separated path indices</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
                <h5 className="font-semibold text-blue-800 mb-2">Config File Defaults</h5>
                <p className="text-blue-700 text-sm">
                  All options default to values in <code className="bg-blue-100 px-1 rounded">config.yaml</code> under the
                  <code className="bg-blue-100 px-1 rounded">video</code> section. Command-line flags override config settings.
                </p>
              </div>

              <YamlDropdown
                title="Hardcoded Settings Reference"
                code={`# At the bottom of video_maker.py:
_BASE_DIR = "/path/to/your/experiment/results"
_CAMERA_NUMS = [1]           # List of camera numbers to process
_VARIABLE = "ux"             # ux, uy, uz, mag, u_prime, vorticity, etc.
_RUN = 1                     # Run number (1-based)
_DATA_SOURCE = "calibrated"  # calibrated, uncalibrated, merged, inst_stats
_FPS = 30                    # Frame rate
_CRF = 15                    # Quality (lower = better, 15 is near-lossless)
_RESOLUTION = (1080, 1920)   # (height, width) or None for native
_CMAP = None                 # Colormap name or None for auto
_LOWER_LIMIT = None          # Lower color limit or None for auto
_UPPER_LIMIT = None          # Upper color limit or None for auto
_TEST_MODE = False           # Set True for 50-frame test video
_TEST_FRAMES = 50            # Frames for test mode`}
              />
            </div>

            {/* VideoMaker Class */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">VideoMaker Class</h4>
              </div>

              <p className="text-gray-600 mb-4">
                For programmatic use, import and instantiate the <code className="bg-gray-100 px-1 rounded">VideoMaker</code> class:
              </p>

              <CodeBlock
                title="Python API Usage"
                code={`from pathlib import Path
from pivtools_gui.video_maker.video_maker import VideoMaker
from pivtools_core.config import get_config

# Load configuration
config = get_config()

# Create VideoMaker instance
maker = VideoMaker(
    base_dir=Path("/path/to/results"),
    camera=1,
    config=config,
)

# Create a video
result = maker.process_video(
    variable="ux",           # Variable to visualise
    run=1,                   # Run number (1-based)
    data_source="calibrated",# calibrated, uncalibrated, merged, inst_stats
    fps=30,                  # Frame rate
    crf=15,                  # Quality factor
    resolution=(1080, 1920), # Output resolution (H, W)
    cmap="viridis",          # Colormap (None for auto)
    lower_limit=None,        # Color limits (None for auto)
    upper_limit=None,
    test_mode=False,         # Quick test with 50 frames
    test_frames=50,
)

if result["success"]:
    print(f"Video created: {result['out_path']}")
    print(f"Color limits: {result['vmin']:.3f} to {result['vmax']:.3f}")
    print(f"Frames: {result['frames']}, Time: {result['elapsed_sec']:.1f}s")
else:
    print(f"Error: {result['error']}")`}
              />

              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Return Value</h5>
                <p className="text-gray-600 text-sm mb-2">The <code className="bg-gray-200 px-1 rounded">process_video()</code> method returns a dictionary containing:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><code className="bg-gray-200 px-1 rounded">success</code>: bool</div>
                  <div><code className="bg-gray-200 px-1 rounded">out_path</code>: str (video file path)</div>
                  <div><code className="bg-gray-200 px-1 rounded">vmin</code>, <code className="bg-gray-200 px-1 rounded">vmax</code>: float</div>
                  <div><code className="bg-gray-200 px-1 rounded">actual_min</code>, <code className="bg-gray-200 px-1 rounded">actual_max</code>: float</div>
                  <div><code className="bg-gray-200 px-1 rounded">effective_run</code>: int</div>
                  <div><code className="bg-gray-200 px-1 rounded">frames</code>: int</div>
                  <div><code className="bg-gray-200 px-1 rounded">elapsed_sec</code>: float</div>
                  <div><code className="bg-gray-200 px-1 rounded">error</code>: str (if failed)</div>
                </div>
              </div>
            </div>

            {/* Progress Callback */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Progress Callbacks &amp; Cancellation</h4>
              </div>

              <p className="text-gray-600 mb-4">
                For long-running video creation, you can provide a progress callback and cancellation event:
              </p>

              <CodeBlock
                title="Progress Tracking"
                code={`import threading

# Create a cancellation event
cancel_event = threading.Event()

def progress_callback(current_frame, total_frames, message=""):
    percent = int(current_frame / total_frames * 100)
    print(f"Progress: {percent}% ({current_frame}/{total_frames}) {message}")

result = maker.process_video(
    variable="mag",
    run=1,
    data_source="calibrated",
    fps=30,
    progress_callback=progress_callback,
    cancel_event=cancel_event,  # Set this event to cancel
)

# To cancel from another thread:
# cancel_event.set()`}
              />
            </div>
          </Section>

          {/* Data Sources Section */}
          <Section title="Data Sources" icon={<Layers size={32} />} id="data-sources">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Video Maker supports multiple data sources, each stored in a specific location
              within the output directory structure. Understanding these sources helps you choose
              the right data for visualisation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">calibrated</span>
                  <h4 className="font-semibold text-gray-900">Calibrated PIV</h4>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Velocity fields in physical units (mm/s or m/s) after applying spatial calibration.
                  This is typically the preferred source for final visualisation.
                </p>
                <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  base_path/calibrated_piv/{'{n}'}/Cam{'{c}'}/instantaneous/
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">uncalibrated</span>
                  <h4 className="font-semibold text-gray-900">Uncalibrated PIV</h4>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Raw pixel displacements before calibration. Useful for debugging or when
                  calibration is not available.
                </p>
                <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  base_path/uncalibrated_piv/{'{n}'}/Cam{'{c}'}/instantaneous/
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">merged</span>
                  <h4 className="font-semibold text-gray-900">Merged Stereo</h4>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Combined 3D velocity fields from stereo PIV reconstruction. Includes all three
                  velocity components (ux, uy, uz).
                </p>
                <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  base_path/merged/{'{n}'}/instantaneous/
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">inst_stats</span>
                  <h4 className="font-semibold text-gray-900">Instantaneous Statistics</h4>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Per-frame computed statistics including fluctuations, Reynolds stresses,
                  vorticity, and divergence. Requires statistics processing to be run first.
                </p>
                <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  base_path/statistics/{'{n}'}/Cam{'{c}'}/instantaneous/instantaneous_stats/
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-yellow-600" size={20} />
                <h4 className="font-semibold text-yellow-800">Important: Ensemble Data</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                <strong>Ensemble-averaged data cannot be used for video creation.</strong> Ensemble averaging
                produces a single mean field with no temporal sequence. To create a video, you must use
                instantaneous or merged data which contains per-frame information.
              </p>
            </div>
          </Section>

          {/* Available Variables Section */}
          <Section title="Available Variables" icon={<Palette size={32} />} id="variables">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Video Maker can visualise any 2D field stored in your PIV data files. Variables
              are automatically detected from the first frame file and grouped by source type.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Variable</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Display Label</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { var: "ux", label: "ux", desc: "Velocity component in x-direction", source: "PIV" },
                    { var: "uy", label: "uy", desc: "Velocity component in y-direction", source: "PIV" },
                    { var: "uz", label: "uz", desc: "Velocity component in z-direction (stereo)", source: "PIV" },
                    { var: "mag", label: "Velocity Magnitude", desc: "sqrt(ux² + uy² [+ uz²])", source: "Computed" },
                    { var: "u_prime", label: "u'", desc: "Fluctuating velocity in x", source: "Statistics" },
                    { var: "v_prime", label: "v'", desc: "Fluctuating velocity in y", source: "Statistics" },
                    { var: "uu_inst", label: "u'u'", desc: "Reynolds normal stress (x)", source: "Statistics" },
                    { var: "vv_inst", label: "v'v'", desc: "Reynolds normal stress (y)", source: "Statistics" },
                    { var: "uv_inst", label: "u'v'", desc: "Reynolds shear stress", source: "Statistics" },
                    { var: "vorticity", label: "ω (Vorticity)", desc: "Out-of-plane vorticity component", source: "Statistics" },
                    { var: "divergence", label: "∇·u (Divergence)", desc: "Velocity divergence", source: "Statistics" },
                    { var: "gamma1", label: "γ₁", desc: "Swirling strength criterion", source: "Statistics" },
                    { var: "gamma2", label: "γ₂", desc: "Vortex core identification", source: "Statistics" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-mono text-soton-blue">{row.var}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{row.label}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{row.desc}</td>
                      <td className="px-6 py-3 text-sm">
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

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-700 text-sm">
                <strong>Auto-switching:</strong> When you select a statistics variable (like <code className="bg-blue-100 px-1 rounded">vorticity</code>),
                the Video Maker automatically switches to the <code className="bg-blue-100 px-1 rounded">inst_stats</code> data source.
                This ensures the correct files are loaded without manual intervention.
              </p>
            </div>
          </Section>

          {/* Colormaps Section */}
          <Section title="Colormaps" icon={<Palette size={32} />} id="colormaps">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Choose from a variety of matplotlib colormaps to best represent your data.
              The default colormap (<code className="bg-gray-100 px-1 rounded">bwr</code>) is designed for diverging data
              like velocity components that can be positive or negative.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { name: "default", desc: "Auto (bwr for diverging)" },
                { name: "viridis", desc: "Perceptually uniform" },
                { name: "plasma", desc: "Warm perceptually uniform" },
                { name: "inferno", desc: "Dark perceptually uniform" },
                { name: "magma", desc: "Dark-to-bright" },
                { name: "cividis", desc: "Colorblind-friendly" },
                { name: "jet", desc: "Classic rainbow" },
                { name: "hot", desc: "Black-red-yellow-white" },
                { name: "cool", desc: "Cyan-magenta" },
                { name: "twilight", desc: "Cyclic colormap" },
                { name: "gray", desc: "Grayscale" },
                { name: "bone", desc: "Blue-tinted grayscale" },
              ].map((cmap, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <code className="text-soton-blue font-mono text-sm">{cmap.name}</code>
                  <p className="text-gray-600 text-xs mt-1">{cmap.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Default Colormap Behavior</h4>
              <p className="text-gray-600 text-sm">
                When set to &quot;default&quot;, the colormap is selected automatically:
              </p>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li><strong>Diverging data (min &lt; 0 &lt; max):</strong> Uses <code className="bg-gray-200 px-1 rounded">bwr</code> (blue-white-red), symmetric around zero</li>
                <li><strong>All positive:</strong> Uses the upper half of <code className="bg-gray-200 px-1 rounded">bwr</code> (white-to-red)</li>
                <li><strong>All negative:</strong> Uses the lower half of <code className="bg-gray-200 px-1 rounded">bwr</code> (blue-to-white)</li>
              </ul>
            </div>
          </Section>

          {/* YAML Configuration Section */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="yaml">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Video settings can be configured in <code className="bg-gray-100 px-1 rounded">config.yaml</code> under the <code className="bg-gray-100 px-1 rounded">video</code> block.
              The GUI automatically updates these settings when you make changes.
            </p>

            <YamlDropdown
              title="Full YAML Configuration Reference"
              defaultOpen={true}
              code={`video:
  # Data selection
  base_path_idx: 0           # Index into paths.base_paths array
  camera: 1                  # Camera number (1-based)
  data_source: calibrated    # calibrated, uncalibrated, merged, inst_stats
  variable: ux               # Variable to visualise
  run: 1                     # Run number (1-based)
  piv_type: instantaneous    # Must be instantaneous for videos

  # Visual settings
  cmap: default              # Colormap name or "default" for auto
  lower: ""                  # Lower color limit ("" for auto)
  upper: ""                  # Upper color limit ("" for auto)

  # Output settings
  fps: 30                    # Frame rate (1-120)
  crf: 15                    # Quality factor (0-51, lower = better)
  resolution: 1080p          # "1080p" or "4k"

  # Batch processing (optional)
  active_paths: [0]          # Which path indices to process
  cameras: [1, 2]            # Cameras for batch processing
  include_merged: false      # Include merged data in batch`}
            />

            <div className="mt-6 overflow-x-auto">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">GUI to YAML Field Mapping</h4>
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">GUI Control</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">YAML Field</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { gui: "Base Path dropdown", yaml: "video.base_path_idx", type: "int" },
                    { gui: "Camera selector", yaml: "video.camera", type: "int" },
                    { gui: "Data Source dropdown", yaml: "video.data_source", type: "string" },
                    { gui: "Variable dropdown", yaml: "video.variable", type: "string" },
                    { gui: "Run selector", yaml: "video.run", type: "int" },
                    { gui: "Colormap dropdown", yaml: "video.cmap", type: "string" },
                    { gui: "Lower limit input", yaml: "video.lower", type: "string" },
                    { gui: "Upper limit input", yaml: "video.upper", type: "string" },
                    { gui: "FPS input", yaml: "video.fps", type: "int" },
                    { gui: "Resolution dropdown", yaml: "video.resolution", type: "string" },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm text-gray-900">{row.gui}</td>
                      <td className="px-6 py-3 text-sm font-mono text-soton-blue">{row.yaml}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Output Structure Section */}
          <Section title="Output Structure" icon={<FolderOpen size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Videos are saved in a structured directory hierarchy under your base path.
              The filename includes the run number, camera, variable, and data source for easy identification.
            </p>

            <CodeBlock
              title="Video Output Directory Structure"
              code={`base_path/
└── videos/
    └── {num_frame_pairs}/
        ├── Cam1/
        │   ├── run1_Cam1_ux.mp4
        │   ├── run1_Cam1_ux_test.mp4      # Test videos
        │   ├── run1_Cam1_mag.mp4
        │   ├── run1_Cam1_uy_uncalibrated.mp4
        │   └── stats/                      # Statistics videos
        │       ├── run1_Cam1_vorticity_inst_stats.mp4
        │       └── run1_Cam1_uv_inst_inst_stats.mp4
        ├── Cam2/
        │   └── ...
        └── merged/
            ├── run1_Cam1_ux_merged.mp4
            └── run1_Cam1_uz_merged.mp4`}
            />

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Filename Convention</h4>
              <p className="text-gray-600 text-sm mb-2">
                Video filenames follow the pattern:
              </p>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                run{'{run}'}_Cam{'{camera}'}_{'{variable}'}[_{'{source}'}][_test].mp4
              </code>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li><strong>_test:</strong> Added for test videos (50 frames)</li>
                <li><strong>_uncalibrated:</strong> Added for uncalibrated data</li>
                <li><strong>_merged:</strong> Added for merged stereo data</li>
                <li><strong>_inst_stats:</strong> Added for instantaneous statistics</li>
              </ul>
            </div>
          </Section>

          {/* Video Quality Section */}
          <Section title="Video Quality Settings" icon={<Settings size={32} />} id="quality">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Video Maker uses FFmpeg with H.264 encoding optimised for scientific visualisation.
              These settings ensure sharp, artifact-free videos suitable for publication.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Encoding Settings</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Codec:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">libx264</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pixel format:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">yuv420p</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Default CRF:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">15</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preset:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">slow</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tune:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">stillimage</code>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Quality (CRF) Guide</h4>
                <p className="text-gray-600 text-sm mb-3">
                  CRF (Constant Rate Factor) controls quality vs file size. Lower values = higher quality.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">0-15</span>
                    <span className="text-gray-600">Near-lossless (large files)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">15-23</span>
                    <span className="text-gray-600">High quality (recommended)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">23-28</span>
                    <span className="text-gray-600">Medium quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded">28+</span>
                    <span className="text-gray-600">Lower quality</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">Optimisations for Scientific Data</h4>
              <p className="text-blue-700 text-sm">
                The Video Maker includes special optimisations for smooth gradient visualisation:
              </p>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li><strong>High LUT resolution (4096 levels):</strong> Reduces color banding</li>
                <li><strong>Adaptive quantization:</strong> Preserves smooth gradients</li>
                <li><strong>stillimage tuning:</strong> Optimised for slow-changing content</li>
                <li><strong>faststart flag:</strong> Enables streaming playback</li>
              </ul>
            </div>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Visualise Your Data</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Create compelling visualisations of your PIV experiments. Start with a test video
              to verify your settings, then generate the full animation.
            </p>
            <a
              href="/manual/statistics"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Learn About Statistics Processing
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
