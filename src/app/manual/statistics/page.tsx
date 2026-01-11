'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  BarChart2,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Terminal,
  Monitor,
  Info,
  Zap,
  Activity,
  Target
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

export default function StatisticsPage() {
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
              Vector <span className="text-soton-gold">Statistics</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calculate mean velocities, Reynolds stresses, turbulent kinetic energy, and
              vortex detection metrics from your PIV time series.
            </p>
          </motion.div>

          {/* Quick Overview */}
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-16">
            <h3 className="text-2xl font-bold mb-4">Turbulence Analysis Made Simple</h3>
            <p className="text-gray-200 mb-6 text-lg">
              The statistics module processes your instantaneous velocity frames to compute
              time-averaged quantities and per-frame derived fields. Results can be viewed
              directly in the Results Viewer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: <Clock size={24} />, label: "Mean", desc: "Time-averaged fields" },
                { icon: <Activity size={24} />, label: "Stresses", desc: "Reynolds tensor" },
                { icon: <Zap size={24} />, label: "TKE", desc: "Turbulent energy" },
                { icon: <Target size={24} />, label: "Vortices", desc: "Gamma detection" }
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
          <Section title="Overview" icon={<BarChart2 size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools computes two categories of statistics: <strong>mean (time-averaged)</strong> quantities
              that summarise your entire time series, and <strong>instantaneous</strong> per-frame quantities
              that require calculation at each timestep.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Mean Statistics</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Computed once across all frames. Results are single fields representing
                  time-averaged quantities.
                </p>
                <FeatureList items={[
                  "Mean velocity components",
                  "Reynolds stress tensor",
                  "Turbulent kinetic energy",
                  "Mean vorticity & divergence"
                ]} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="text-soton-blue" size={24} />
                  <h4 className="text-xl font-semibold text-gray-900">Instantaneous Statistics</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Computed for each frame. Results are time series of derived fields
                  that can be viewed frame-by-frame.
                </p>
                <FeatureList items={[
                  "Per-frame stress tensor",
                  "Instantaneous vorticity",
                  "Instantaneous divergence",
                  "Gamma vortex criteria"
                ]} />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-600" size={20} />
                <h4 className="text-lg font-semibold text-blue-800">Data Sources</h4>
              </div>
              <p className="text-blue-700">
                Statistics can be calculated from either per-camera data or merged data. Choose
                your source in the Statistics panel based on your workflow needs.
              </p>
            </div>
          </Section>

          {/* Mean Statistics Section */}
          <Section title="Mean Statistics" icon={<Clock size={32} />} id="mean-stats">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Mean statistics are time-averaged quantities computed across all frames in your dataset.
              These are the fundamental outputs for characterising steady-state flow behaviour.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Statistic</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Output Fields</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { stat: 'mean_velocity', fields: 'ux, uy', desc: 'Time-averaged velocity components (add uz for stereo)' },
                    { stat: 'mean_vorticity', fields: 'vorticity', desc: 'Mean out-of-plane vorticity (dv/dx - du/dy)' },
                    { stat: 'mean_divergence', fields: 'divergence', desc: 'Mean velocity divergence (du/dx + dv/dy)' },
                    { stat: 'mean_tke', fields: 'tke', desc: 'Turbulent kinetic energy: 0.5*(u\'u\' + v\'v\')' },
                    { stat: 'mean_stresses', fields: 'uu, vv, uv', desc: 'Reynolds stress tensor components (add ww, uw, vw for stereo)' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.stat}</td>
                      <td className="px-4 py-3 text-gray-700 text-sm font-mono">{row.fields}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reynolds Stress Explanation */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Reynolds Stress Tensor</h4>
              <p className="text-gray-600 mb-4">
                The Reynolds stress tensor quantifies turbulent momentum transport. Components are computed as:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <code className="text-soton-blue font-mono">uu = mean(u&apos; * u&apos;)</code>
                  <p className="text-gray-500 text-sm mt-2">Streamwise normal stress</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <code className="text-soton-blue font-mono">vv = mean(v&apos; * v&apos;)</code>
                  <p className="text-gray-500 text-sm mt-2">Cross-stream normal stress</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <code className="text-soton-blue font-mono">uv = mean(u&apos; * v&apos;)</code>
                  <p className="text-gray-500 text-sm mt-2">Shear stress</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Where u&apos; = u - U (fluctuation = instantaneous - mean)
              </p>
            </div>

            {/* Stereo Note */}
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
              <h4 className="text-lg font-semibold text-purple-800 mb-2">Stereo (3D) Statistics</h4>
              <p className="text-purple-700 text-sm">
                For stereo PIV data with a uz component, additional stress terms are computed:
                <code className="bg-purple-100 px-1 rounded mx-1">ww</code>,
                <code className="bg-purple-100 px-1 rounded mx-1">uw</code>, and
                <code className="bg-purple-100 px-1 rounded mx-1">vw</code>.
                TKE includes all three components: 0.5*(u&apos;u&apos; + v&apos;v&apos; + w&apos;w&apos;).
              </p>
            </div>
          </Section>

          {/* Instantaneous Statistics Section */}
          <Section title="Instantaneous Statistics" icon={<Activity size={32} />} id="inst-stats">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Instantaneous statistics are computed for each frame, creating time series of derived
              quantities. These can be viewed frame-by-frame in the Results Viewer.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Statistic</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Output Fields</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { stat: 'inst_velocity', fields: 'ux, uy', desc: 'Per-frame velocity (preserved from input)' },
                    { stat: 'inst_stresses', fields: 'uu_inst, vv_inst, uv_inst', desc: 'Per-frame Reynolds stress tensor' },
                    { stat: 'inst_vorticity', fields: 'vorticity', desc: 'Per-frame out-of-plane vorticity' },
                    { stat: 'inst_divergence', fields: 'divergence', desc: 'Per-frame velocity divergence' },
                    { stat: 'inst_gamma', fields: 'gamma1, gamma2', desc: 'Gamma vortex detection criteria' },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">{row.stat}</td>
                      <td className="px-4 py-3 text-gray-700 text-sm font-mono">{row.fields}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gamma Criteria */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Gamma Vortex Detection</h4>
              </div>
              <p className="text-gray-600 mb-4">
                The Gamma criteria (Graftieaux et al.) detect vortex cores without relying on
                velocity gradients, making them robust for noisy PIV data.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Gamma 1 (gamma1)</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Measures local swirling strength. Values near |1| indicate strong vortex cores.
                  </p>
                  <div className="bg-white rounded p-2 text-sm">
                    <code className="text-gray-600">Range: -1 to +1 (sign = rotation direction)</code>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Gamma 2 (gamma2)</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Corrects for local convection velocity. Better isolates true vortex cores.
                  </p>
                  <div className="bg-white rounded p-2 text-sm">
                    <code className="text-gray-600">Range: -1 to +1 (sign = rotation direction)</code>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="text-blue-600" size={18} />
                  <h5 className="font-semibold text-blue-800">Gamma Radius Parameter</h5>
                </div>
                <p className="text-blue-700 text-sm">
                  The <code className="bg-blue-100 px-1 rounded">gamma_radius</code> parameter (default: 5)
                  controls the size of the neighbourhood used for calculation. Larger values smooth
                  results but may miss small vortices. Typical range: 3-10 grid points.
                </p>
              </div>
            </div>
          </Section>

          {/* GUI Workflow Section */}
          <Section title="GUI Workflow" icon={<Monitor size={32} />} id="gui-workflow">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Statistics panel in the Results Viewer provides an intuitive interface for
              selecting and calculating statistics from your PIV data.
            </p>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm mb-8">
              <GUIStep step={1} title="Open the Results Viewer">
                <p>
                  Navigate to the Results Viewer and select calibrated instantaneous or
                  merged instantaneous data as your source.
                </p>
              </GUIStep>

              <GUIStep step={2} title="Expand the Statistics Panel">
                <p>
                  Click the &quot;Statistics&quot; button to expand the statistics controls.
                  This panel only appears for eligible data sources.
                </p>
              </GUIStep>

              <GUIStep step={3} title="Select Statistics to Calculate">
                <p>
                  Check the boxes for each statistic you want to compute. Statistics are grouped
                  into &quot;Time-Averaged&quot; and &quot;Instantaneous&quot; categories.
                </p>
              </GUIStep>

              <GUIStep step={4} title="Configure Gamma Radius (Optional)">
                <p>
                  If calculating gamma criteria, adjust the gamma_radius parameter. Default is 5
                  grid points. Larger values smooth results.
                </p>
              </GUIStep>

              <GUIStep step={5} title="Choose Data Source">
                <p>
                  Select whether to process per-camera data, merged data, or both. The toggle
                  shows available options based on your dataset.
                </p>
              </GUIStep>

              <GUIStep step={6} title="Start Calculation">
                <p>
                  Click &quot;Calculate Statistics&quot; to begin processing. A progress bar shows
                  completion status for each camera and statistic type.
                </p>
              </GUIStep>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <h4 className="text-lg font-semibold text-green-800 mb-2">View Mean Statistics</h4>
                <p className="text-green-700 text-sm">
                  After calculation, select variables with the <code className="bg-green-100 px-1 rounded">mean:</code>
                  prefix in the variable dropdown to view time-averaged results.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">View Instantaneous Statistics</h4>
                <p className="text-blue-700 text-sm">
                  Select variables with the <code className="bg-blue-100 px-1 rounded">inst_stat:</code>
                  prefix to view per-frame calculated quantities with full frame navigation.
                </p>
              </div>
            </div>
          </Section>

          {/* CLI Usage Section */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli-usage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For batch processing, use the CLI to calculate statistics across all active paths.
            </p>

            <CodeBlock
              title="Statistics CLI Command"
              code={`# Calculate statistics for all active paths
pivtools-cli statistics

# Compute for specific camera only
pivtools-cli statistics --camera 1

# Compute for merged data (modern flag)
pivtools-cli statistics --source-endpoint merged

# Compute for stereo data with stereo workflow
pivtools-cli statistics --source-endpoint stereo --workflow stereo

# Specify workflow: per_camera, after_merge, both, or stereo
pivtools-cli statistics --source-endpoint merged --workflow after_merge

# Compute for ensemble data
pivtools-cli statistics --type-name ensemble

# Process specific paths
pivtools-cli statistics -p 0,1

# Legacy flags (deprecated but still supported)
# pivtools-cli statistics --merged    # use --source-endpoint merged
# pivtools-cli statistics --stereo    # use --source-endpoint stereo

# The CLI will:
# 1. Read statistics configuration from config.yaml
# 2. Process each active_path (or selected paths with -p)
# 3. Calculate selected statistics for each camera
# 4. Save results to statistics/ subdirectory`}
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
                    <li>- Interactive statistic selection</li>
                    <li>- Real-time progress display</li>
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
                    <li>- Uses config.yaml settings</li>
                    <li>- Batch processing</li>
                    <li>- Suitable for automation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Recalculation After Transforms</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                If you apply transforms to your vector data, you must recalculate statistics.
                The old statistics files are no longer valid after data transformation.
              </p>
            </div>
          </Section>

          {/* YAML Configuration Section */}
          <Section title="YAML Configuration" icon={<FileText size={32} />} id="config">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Statistics settings are stored in the <code className="bg-gray-100 px-2 py-1 rounded">statistics</code>
              section of config.yaml.
            </p>

            <YamlDropdown
              title="Statistics Configuration"
              defaultOpen={true}
              code={`statistics:
  type_name: instantaneous    # Temporal type: "instantaneous" or "ensemble"
  source_endpoint: regular    # Data source: "regular", "merged", or "stereo"
  workflow: per_camera        # Workflow: "per_camera", "after_merge", "both", or "stereo"
  gamma_radius: 5             # Neighbourhood size for gamma calculation
  save_figures: true          # Generate PNG visualisations

  # Enable/disable individual statistics
  enabled_methods:
    # Time-averaged (mean) statistics
    mean_velocity: true       # Mean ux, uy (and uz for stereo)
    mean_vorticity: true      # Mean omega
    mean_divergence: true     # Mean div(u)
    mean_tke: true            # Turbulent kinetic energy
    mean_stresses: true       # Reynolds stress tensor (uu, vv, uv; uw, vw, ww for stereo)

    # Instantaneous (per-frame) statistics
    inst_velocity: false      # Keep original velocity
    inst_stresses: false      # Per-frame stress tensor
    inst_vorticity: false     # Per-frame vorticity
    inst_divergence: false    # Per-frame divergence
    inst_gamma: false         # Gamma vortex criteria

# Note: Legacy names are also supported:
# - reynolds_stress -> mean_stresses
# - normal_stress -> mean_stresses
# - inst_fluctuations -> inst_stresses
# - tke -> mean_tke`}
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
                      { param: 'type_name', type: 'string', desc: 'Temporal type: "instantaneous" or "ensemble"' },
                      { param: 'source_endpoint', type: 'string', desc: 'Data source: "regular" (per-camera), "merged", or "stereo"' },
                      { param: 'workflow', type: 'string', desc: 'Workflow: "per_camera", "after_merge", "both", or "stereo"' },
                      { param: 'gamma_radius', type: 'integer', desc: 'Grid points for gamma calculation (default: 5)' },
                      { param: 'save_figures', type: 'boolean', desc: 'Generate PNG visualisations of results' },
                      { param: 'enabled_methods', type: 'dict', desc: 'Enable/disable individual statistics' },
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

          {/* Output Files Section */}
          <Section title="Output Files" icon={<FileText size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Statistics results are saved in a <code className="bg-gray-100 px-2 py-1 rounded">statistics</code>
              subdirectory under each camera folder.
            </p>

            <CodeBlock
              title="Output Directory Structure"
              code={`base_path/
├── calibrated_piv/
│   └── {num_frame_pairs}/
│       └── Cam1/
│           ├── instantaneous/        # Original frame data
│           │   ├── 00001.mat
│           │   └── ...
│           │
│           └── statistics/           # STATISTICS OUTPUT
│               ├── mean_stats/
│               │   └── mean_stats.mat    # All mean statistics
│               │
│               ├── instantaneous_stats/  # Per-frame statistics
│               │   ├── 00001.mat         # Frame 1 inst stats
│               │   ├── 00002.mat         # Frame 2 inst stats
│               │   └── ...
│               │
│               └── figures/              # PNG visualisations
│                   ├── Run_1_Mean_Ux.png
│                   ├── Run_1_Mean_Uy.png
│                   ├── Run_1_TKE.png
│                   ├── Run_1_uu_stress.png
│                   └── ...`}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">mean_stats.mat</h4>
                <p className="text-blue-700 text-sm">
                  Single file containing all time-averaged statistics. Each field is a 2D array
                  matching your vector grid dimensions.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                <h4 className="text-lg font-semibold text-green-800 mb-2">instantaneous_stats/</h4>
                <p className="text-green-700 text-sm">
                  One file per frame containing per-frame calculated quantities. Same format
                  as your original vector files.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">figures/</h4>
                <p className="text-purple-700 text-sm">
                  PNG visualisations of each statistic, organised by run number. Useful for
                  quick inspection without loading the viewer.
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
            <h3 className="text-3xl font-bold mb-4">Back to Results Viewer</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Return to the main Results Viewer page to explore all viewing and post-processing
              options, or check the data type compatibility table.
            </p>
            <Link
              href="/manual/results-viewer"
              className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Back to Results Viewer
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
