'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Terminal,
  Play,
  RotateCw,
  Settings,
  Copy,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ManualNavigation from '@/components/ManualNavigation';
import { useState } from 'react';

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
      <div className="flex items-center gap-4 mb-6">
        {icon && <div className="text-soton-blue">{icon}</div>}
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
};

interface CodeBlockProps {
  children: React.ReactNode;
  title?: string;
}

const CodeBlock = ({ children, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const text = typeof children === 'string' ? children : '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-gray-400 text-sm font-medium">{title}</span>
          <button
            onClick={copyCode}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          </button>
        </div>
      )}
      <pre className="p-4 text-green-400 text-sm font-mono overflow-x-auto">
        {children}
      </pre>
    </div>
  );
};

interface CommandCardProps {
  command: string;
  description: string;
  options?: { flag: string; short?: string; description: string }[];
  examples?: string[];
  link?: string;
}

const CommandCard = ({ command, description, options, examples, link }: CommandCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <code className="text-lg font-mono font-semibold text-gray-900">{command}</code>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {options && options.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Options</h4>
              <div className="space-y-2">
                {options.map((opt, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <code className="text-green-700 font-mono whitespace-nowrap">
                      {opt.flag}{opt.short ? `, ${opt.short}` : ''}
                    </code>
                    <span className="text-gray-600">{opt.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {examples && examples.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Examples</h4>
              <div className="space-y-2">
                {examples.map((ex, i) => (
                  <CodeBlock key={i}>{ex}</CodeBlock>
                ))}
              </div>
            </div>
          )}

          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1 text-sm text-soton-blue hover:text-soton-darkblue font-medium"
            >
              Full documentation <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default function CLIReferencePage() {
  const commands: CommandCardProps[] = [
    {
      command: 'pivtools-cli init',
      description: 'Create default config.yaml in current directory',
      options: [
        { flag: '--force', short: '-f', description: 'Overwrite existing config.yaml' },
      ],
      examples: [
        'pivtools-cli init',
        'pivtools-cli init --force',
      ],
      link: '/manual/quick-start#cli',
    },
    {
      command: 'pivtools-cli instantaneous',
      description: 'Run instantaneous (per-frame) PIV processing',
      options: [
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices (e.g., "0,1,2")' },
      ],
      examples: [
        'pivtools-cli instantaneous',
        'pivtools-cli instantaneous -p 0,1',
      ],
      link: '/manual/piv-processing#cli',
    },
    {
      command: 'pivtools-cli ensemble',
      description: 'Run ensemble PIV (time-averaged correlation)',
      options: [
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli ensemble',
        'pivtools-cli ensemble -p 0',
      ],
      link: '/manual/piv-processing#cli',
    },
    {
      command: 'pivtools-cli detect-planar',
      description: 'Detect dot/circle grid, generate planar camera model',
      options: [
        { flag: '--camera', short: '-c', description: 'Camera number (default: all)' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
        { flag: '--calibration-source', short: '-cs', description: 'Direct path to calibration images (overrides config)' },
      ],
      examples: [
        'pivtools-cli detect-planar',
        'pivtools-cli detect-planar -c 1',
      ],
      link: '/manual/planar-calibration#cli',
    },
    {
      command: 'pivtools-cli detect-charuco',
      description: 'Detect ChArUco board, generate planar camera model',
      options: [
        { flag: '--camera', short: '-c', description: 'Camera number (default: all)' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
        { flag: '--calibration-source', short: '-cs', description: 'Direct path to calibration images (overrides config)' },
      ],
      examples: [
        'pivtools-cli detect-charuco',
        'pivtools-cli detect-charuco -c 1',
      ],
      link: '/manual/planar-calibration#cli',
    },
    {
      command: 'pivtools-cli detect-stereo-planar',
      description: 'Detect dot/circle grid, generate stereo camera model',
      options: [
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
        { flag: '--calibration-source', short: '-cs', description: 'Direct path to calibration images (overrides config)' },
      ],
      examples: [
        'pivtools-cli detect-stereo-planar',
      ],
      link: '/manual/stereo-calibration#cli',
    },
    {
      command: 'pivtools-cli detect-stereo-charuco',
      description: 'Detect ChArUco board, generate stereo camera model',
      options: [
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
        { flag: '--calibration-source', short: '-cs', description: 'Direct path to calibration images (overrides config)' },
      ],
      examples: [
        'pivtools-cli detect-stereo-charuco',
      ],
      link: '/manual/stereo-calibration#cli',
    },
    {
      command: 'pivtools-cli apply-calibration',
      description: 'Apply calibration to vectors (pixels to m/s)',
      options: [
        { flag: '--method', short: '-m', description: 'dotboard | charuco | scale_factor (default: from config)' },
        { flag: '--camera', short: '-c', description: 'Camera number (default: all)' },
        { flag: '--type-name', short: '-t', description: 'instantaneous | ensemble' },
        { flag: '--runs', short: '-r', description: 'Comma-separated run numbers' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
        { flag: '--align-coordinates', description: 'Apply global coordinate alignment after calibration' },
      ],
      examples: [
        'pivtools-cli apply-calibration',
        'pivtools-cli apply-calibration --method scale_factor',
        'pivtools-cli apply-calibration -t ensemble -c 1',
        'pivtools-cli apply-calibration --align-coordinates',
      ],
      link: '/manual/planar-calibration#cli',
    },
    {
      command: 'pivtools-cli apply-stereo',
      description: 'Stereo 3D reconstruction (ux, uy, uz)',
      options: [
        { flag: '--method', short: '-m', description: 'dotboard | charuco' },
        { flag: '--camera-pair', short: '-c', description: 'Camera pair as "1,2" (default: from config)' },
        { flag: '--type-name', short: '-t', description: 'instantaneous | ensemble' },
        { flag: '--runs', short: '-r', description: 'Comma-separated run numbers' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli apply-stereo',
        'pivtools-cli apply-stereo --camera-pair 1,2',
      ],
      link: '/manual/stereo-calibration#cli',
    },
    {
      command: 'pivtools-cli transform',
      description: 'Apply geometric transforms to vector fields',
      options: [
        { flag: '--camera', short: '-c', description: 'Camera number (default: all)' },
        { flag: '--type-name', short: '-t', description: 'instantaneous | ensemble' },
        { flag: '--operations', short: '-o', description: 'Comma-separated transforms (see Transform Operations)' },
        { flag: '--source-endpoint', short: '-s', description: 'regular | merged | stereo' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli transform -o flip_ud,rotate_90_cw',
        'pivtools-cli transform --source-endpoint merged -o flip_lr',
      ],
      link: '/manual/transforms#cli-usage',
    },
    {
      command: 'pivtools-cli merge',
      description: 'Merge multi-camera vector fields (Hanning blend)',
      options: [
        { flag: '--cameras', short: '-c', description: 'Comma-separated camera numbers' },
        { flag: '--type-name', short: '-t', description: 'instantaneous | ensemble' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli merge',
        'pivtools-cli merge -c 1,2,3 -t ensemble',
      ],
      link: '/manual/merging#cli-usage',
    },
    {
      command: 'pivtools-cli statistics',
      description: 'Compute statistics (mean, Reynolds stresses, TKE, vorticity)',
      options: [
        { flag: '--camera', short: '-c', description: 'Camera number (default: all)' },
        { flag: '--type-name', short: '-t', description: 'instantaneous | ensemble' },
        { flag: '--source-endpoint', short: '-s', description: 'regular | merged | stereo' },
        { flag: '--workflow', short: '-w', description: 'per_camera | after_merge | both | stereo' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli statistics',
        'pivtools-cli statistics --source-endpoint merged',
        'pivtools-cli statistics --source-endpoint stereo -w stereo',
      ],
      link: '/manual/statistics#cli-usage',
    },
    {
      command: 'pivtools-cli video',
      description: 'Create visualisation videos from PIV data',
      options: [
        { flag: '--camera', short: '-c', description: 'Camera number' },
        { flag: '--variable', short: '-v', description: 'ux | uy | uz | mag | vorticity | divergence | u_prime | ...' },
        { flag: '--run', short: '-r', description: 'Run number (default: 1)' },
        { flag: '--data-source', short: '-d', description: 'calibrated | uncalibrated | merged | stereo | inst_stats' },
        { flag: '--fps', description: 'Frame rate (default: 30)' },
        { flag: '--crf', description: 'Quality 0-51, lower=better (default: 15)' },
        { flag: '--resolution', description: 'WIDTHxHEIGHT or "4k" (default: 1920x1080)' },
        { flag: '--cmap', description: 'Colormap name' },
        { flag: '--lower', description: 'Lower color limit' },
        { flag: '--upper', description: 'Upper color limit' },
        { flag: '--test', description: 'Test mode: only 50 frames' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli video -v mag',
        'pivtools-cli video --data-source stereo -v uz',
        'pivtools-cli video --resolution 4k --crf 10',
        'pivtools-cli video -v vorticity --lower -100 --upper 100',
      ],
      link: '/manual/video-maker#cli',
    },
    {
      command: 'pivtools-cli align-coordinates',
      description: 'Apply global coordinate alignment to calibrated vectors',
      options: [
        { flag: '--type-name', short: '-t', description: 'instantaneous | ensemble (default: instantaneous)' },
        { flag: '--active-paths', short: '-p', description: 'Comma-separated path indices' },
      ],
      examples: [
        'pivtools-cli align-coordinates',
        'pivtools-cli align-coordinates -t ensemble',
        'pivtools-cli align-coordinates -p 0,1',
      ],
      link: '/manual/global-coordinates#cli',
    },
  ];

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
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Terminal className="text-soton-blue" size={40} />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                CLI <span className="text-soton-gold">Reference</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete command-line reference for <code className="text-green-700 bg-green-50 px-2 py-0.5 rounded">pivtools-cli</code>.
              All commands read from <code className="text-green-700 bg-green-50 px-2 py-0.5 rounded">config.yaml</code> in
              the current directory.
            </p>
          </motion.div>

          {/* Quick Reference */}
          <Section title="Quick Reference" icon={<Terminal size={28} />} id="quick-reference">
            <div className="bg-gray-900 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <div className="text-gray-500 mb-2"># Init and Process</div>
                  <div className="text-green-400">pivtools-cli init</div>
                  <div className="text-green-400">pivtools-cli instantaneous</div>
                  <div className="text-green-400">pivtools-cli ensemble</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-2"># Calibration Detection</div>
                  <div className="text-green-400">pivtools-cli detect-planar</div>
                  <div className="text-green-400">pivtools-cli detect-charuco</div>
                  <div className="text-green-400">pivtools-cli detect-stereo-planar</div>
                  <div className="text-green-400">pivtools-cli detect-stereo-charuco</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-2"># Post-Processing</div>
                  <div className="text-green-400">pivtools-cli apply-calibration</div>
                  <div className="text-green-400">pivtools-cli apply-stereo</div>
                  <div className="text-green-400">pivtools-cli align-coordinates</div>
                  <div className="text-green-400">pivtools-cli transform</div>
                  <div className="text-green-400">pivtools-cli merge</div>
                  <div className="text-green-400">pivtools-cli statistics</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-2"># Visualisation</div>
                  <div className="text-green-400">pivtools-cli video</div>
                </div>
              </div>
            </div>
          </Section>

          {/* Common Workflows */}
          <Section title="Common Workflows" icon={<Play size={28} />} id="workflows">
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">2D PIV (Single or Multi-Camera)</h3>
                <CodeBlock>{`pivtools-cli init                          # Create config.yaml
# Edit config.yaml with your settings
pivtools-cli detect-planar                  # Generate camera model
pivtools-cli instantaneous                  # Run PIV
pivtools-cli apply-calibration              # Pixels to m/s
pivtools-cli transform -o flip_ud           # Geometric transform (optional)
pivtools-cli merge                          # Merge cameras (if multi-camera)
pivtools-cli statistics                     # Mean, TKE, vorticity, etc.
pivtools-cli video -v mag                   # Create video`}</CodeBlock>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Stereo PIV</h3>
                <CodeBlock>{`pivtools-cli detect-stereo-charuco           # Stereo camera model
pivtools-cli instantaneous                   # PIV for both cameras
pivtools-cli apply-stereo --camera-pair 1,2  # 3D reconstruction (ux, uy, uz)
pivtools-cli statistics --source-endpoint stereo
pivtools-cli video --data-source stereo -v uz`}</CodeBlock>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Batch Processing</h3>
                <CodeBlock>{`# Process specific path indices
pivtools-cli instantaneous -p 0,1,2
pivtools-cli apply-calibration -p 0,1,2
pivtools-cli statistics -p 0,1,2`}</CodeBlock>
              </div>
            </div>
          </Section>

          {/* All Commands */}
          <Section title="All Commands" icon={<Terminal size={28} />} id="commands">
            <p className="text-gray-700 mb-6">
              Click any command to expand options and examples.
              All processing commands support <code className="text-green-700 bg-green-50 px-2 py-0.5 rounded">--active-paths / -p</code> for
              batch path selection.
            </p>

            <div className="space-y-3">
              {commands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <CommandCard {...cmd} />
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Transform Operations */}
          <Section title="Transform Operations" icon={<RotateCw size={28} />} id="transforms">
            <p className="text-gray-700 mb-4">
              Available for <code className="text-green-700 bg-green-50 px-2 py-0.5 rounded">pivtools-cli transform -o</code>.
              Comma-separate multiple operations.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Operation</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { op: 'flip_ud', desc: 'Flip vertically (up-down)' },
                    { op: 'flip_lr', desc: 'Flip horizontally (left-right)' },
                    { op: 'rotate_90_cw', desc: 'Rotate 90 degrees clockwise' },
                    { op: 'rotate_90_ccw', desc: 'Rotate 90 degrees counter-clockwise' },
                    { op: 'rotate_180', desc: 'Rotate 180 degrees' },
                    { op: 'swap_ux_uy', desc: 'Swap velocity components' },
                    { op: 'invert_ux', desc: 'Negate ux only (also negates UV stress)' },
                    { op: 'invert_uy', desc: 'Negate uy only (also negates UV stress)' },
                    { op: 'invert_ux_uy', desc: 'Negate ux and uy' },
                    { op: 'scale_velocity:N', desc: 'Scale velocities by factor N' },
                    { op: 'scale_coords:N', desc: 'Scale coordinates by factor N' },
                  ].map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-mono text-green-700">{item.op}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Environment Variables */}
          <Section title="Environment Variables" icon={<Settings size={28} />} id="environment">
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Variable</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { var: 'PIV_ACTIVE_PATHS', desc: 'Override active paths (comma-separated indices)' },
                    { var: 'MALLOC_TRIM_THRESHOLD_', desc: 'Set to "0" for better memory management on Linux' },
                    { var: 'OMP_NUM_THREADS', desc: 'Control OpenMP thread count for C extensions' },
                  ].map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm font-mono text-green-700">{item.var}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CodeBlock title="Example">{`PIV_ACTIVE_PATHS=0,1 pivtools-cli instantaneous
OMP_NUM_THREADS=4 pivtools-cli instantaneous`}</CodeBlock>
          </Section>

          {/* Help */}
          <Section title="Getting Help" icon={<Terminal size={28} />} id="help">
            <CodeBlock>{`pivtools-cli --help                    # All commands
pivtools-cli instantaneous --help      # Command-specific help
pivtools-cli video --help`}</CodeBlock>
          </Section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Need More Detail?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Each command has detailed documentation in its respective manual section.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/manual/quick-start"
                className="inline-block bg-soton-gold text-soton-darkblue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Quick Start Guide
              </Link>
              <Link
                href="/manual/piv-processing#cli"
                className="inline-block bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                PIV Processing CLI
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
