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
  Activity,
  Target,
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

          {/* Overview */}
          <Section title="Overview" icon={<BarChart2 size={32} />} id="overview">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools computes two categories of statistics: <strong>mean (time-averaged)</strong> quantities
              across all frames, and <strong>instantaneous</strong> per-frame derived fields.
              Results are viewable in the Results Viewer using the <code className="bg-gray-100 px-1 rounded text-sm">mean:</code> and
              <code className="bg-gray-100 px-1 rounded text-sm ml-1">inst_stat:</code> variable prefixes.
            </p>

            <FeatureList items={[
              "Mean velocity, vorticity, divergence, TKE, Reynolds stresses",
              "Per-frame vorticity, divergence, stresses, and gamma vortex criteria",
              "Stereo-aware: additional ww, uw, vw stresses and 3D TKE when uz present",
              "Works on per-camera, merged, or stereo data sources",
            ]} />
          </Section>

          {/* Mean Statistics */}
          <Section title="Mean Statistics" icon={<Clock size={32} />} id="mean-stats">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Time-averaged quantities computed once across all frames. Each produces a single 2D field.
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
                    { stat: 'mean_velocity', fields: 'ux, uy', desc: 'Time-averaged velocity (+uz for stereo)' },
                    { stat: 'mean_vorticity', fields: 'vorticity', desc: 'Mean out-of-plane vorticity (dv/dx - du/dy)' },
                    { stat: 'mean_divergence', fields: 'divergence', desc: 'Mean velocity divergence (du/dx + dv/dy)' },
                    { stat: 'mean_tke', fields: 'tke', desc: "Turbulent kinetic energy: 0.5*(u'u' + v'v')" },
                    { stat: 'mean_stresses', fields: 'uu, vv, uv', desc: 'Reynolds stress tensor (+ww, uw, vw for stereo)' },
                    { stat: 'mean_peak_height', fields: 'peak_mag', desc: 'Mean correlation peak magnitude per grid cell' },
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

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Reynolds Stress Computation</h4>
              <p className="text-gray-600 text-sm">
                Stresses are computed from fluctuations: <code className="bg-gray-200 px-1 rounded">uu = mean(u&apos; * u&apos;)</code> where
                <code className="bg-gray-200 px-1 rounded ml-1">u&apos; = u - U</code> (instantaneous minus mean).
                TKE includes all available components (2D or 3D).
              </p>
            </div>
          </Section>

          {/* Instantaneous Statistics */}
          <Section title="Instantaneous Statistics" icon={<Activity size={32} />} id="inst-stats">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Per-frame derived fields. Results are time series viewable frame-by-frame in the Results Viewer.
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
                    { stat: 'inst_vorticity', fields: 'vorticity', desc: 'Per-frame out-of-plane vorticity' },
                    { stat: 'inst_divergence', fields: 'divergence', desc: 'Per-frame velocity divergence' },
                    { stat: 'inst_stresses', fields: "u_prime, v_prime, uu_inst, vv_inst, uv_inst", desc: 'Fluctuations and per-frame Reynolds stresses' },
                    { stat: 'inst_gamma', fields: 'gamma1, gamma2', desc: 'Gamma vortex detection criteria (Graftieaux et al.)' },
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
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-soton-blue" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Gamma Vortex Detection</h4>
              </div>
              <p className="text-gray-600 mb-4">
                The Gamma criteria detect vortex cores without relying on velocity gradients,
                making them robust for noisy PIV data. Both output values range from -1 to +1
                (sign indicates rotation direction).
              </p>

              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Field</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">gamma1</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">Local swirling strength. Values near |1| indicate strong vortex cores.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-mono text-soton-blue text-sm">gamma2</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">Corrects for local convection velocity. Better isolates true vortex cores.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="text-blue-600" size={18} />
                  <h5 className="font-semibold text-blue-800">gamma_radius</h5>
                </div>
                <p className="text-blue-700 text-sm">
                  Controls the neighbourhood size (default: 5 grid points). Larger values smooth
                  results but may miss small vortices. Typical range: 3-10.
                </p>
              </div>
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
                    { step: "1", action: "Open the Results Viewer and select calibrated instantaneous or merged data." },
                    { step: "2", action: "Expand the Statistics panel and check the statistics to compute." },
                    { step: "3", action: "Adjust gamma_radius if computing gamma criteria (default: 5)." },
                    { step: "4", action: "Choose data source: per-camera, merged, or both." },
                    { step: "5", action: "Click \"Calculate Statistics\". Progress is shown per camera." },
                    { step: "6", action: "The viewer automatically switches to the statistics data source upon completion. Mean statistics (mean:) also appear in the variable dropdown when viewing instantaneous data." },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-bold text-soton-blue">{row.step}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={20} />
                <h4 className="text-lg font-semibold text-yellow-800">Recalculate After Transforms</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                If you apply transforms to your vector data, statistics must be recalculated.
                The old statistics files are invalidated by any data transformation.
              </p>
            </div>
          </Section>

          {/* CLI Usage */}
          <Section title="CLI Usage" icon={<Terminal size={32} />} id="cli-usage">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The CLI processes all active paths using the statistic selections saved in config.yaml.
            </p>

            <CodeBlock
              title="Statistics CLI"
              code={`# Calculate statistics for all active paths
pivtools-cli statistics

# Compute for merged data
pivtools-cli statistics --source-endpoint merged

# Compute for stereo data
pivtools-cli statistics --source-endpoint stereo

# Compute for ensemble data
pivtools-cli statistics --type-name ensemble

# Process specific paths
pivtools-cli statistics -p 0,1`}
            />
          </Section>

          {/* Output */}
          <Section title="Output" icon={<FileText size={32} />} id="output">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Results are saved in a <code className="bg-gray-100 px-2 py-1 rounded text-sm">statistics/</code> subdirectory
              under each camera folder.
            </p>

            <CodeBlock
              title="Output Directory"
              code={`base_path/
  calibrated_piv/{num_frame_pairs}/
    Cam1/
      instantaneous/              # Original frame data
      statistics/
        mean_stats/
          mean_stats.mat          # All mean statistics in one file
        instantaneous_stats/
          00001.mat               # Frame 1 inst stats
          00002.mat               # Frame 2 inst stats
          ...
        figures/                  # PNG visualisations (if enabled)
          Run_1_Mean_Ux.png
          Run_1_TKE.png
          ...`}
            />

            <YamlDropdown
              title="Statistics Configuration"
              defaultOpen={true}
              code={`statistics:
  type_name: instantaneous      # "instantaneous" or "ensemble"
  source_endpoint: regular      # "regular", "merged", or "stereo"
  gamma_radius: 5               # Neighbourhood size for gamma (default: 5)
  save_figures: true            # Generate PNG visualisations

  enabled_methods:
    # Time-averaged (mean)
    mean_velocity: true         # Mean ux, uy (+uz for stereo)
    mean_vorticity: true        # Mean vorticity
    mean_divergence: true       # Mean divergence
    mean_tke: true              # Turbulent kinetic energy
    mean_stresses: true         # Reynolds stresses (uu, vv, uv; +ww, uw, vw)
    mean_peak_height: false     # Mean correlation peak magnitude

    # Instantaneous (per-frame)
    inst_vorticity: false       # Per-frame vorticity
    inst_divergence: false      # Per-frame divergence
    inst_stresses: false        # Per-frame fluctuations and stresses
    inst_gamma: false           # Gamma vortex criteria`}
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
              Animate your velocity fields and computed statistics as high-quality MP4 videos.
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
