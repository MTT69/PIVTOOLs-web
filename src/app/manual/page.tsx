'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Home,
  Download,
  Image as ImageIcon,
  Layers,
  Filter,
  Zap,
  Target,
  Eye,
  Video,
  RotateCw,
  GitMerge,
  BarChart2,
  Code,
  Terminal,
  Monitor,
  ArrowRight,
  CheckCircle,
  FileText,
  Crosshair
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

// Feature card component
interface FeatureCardProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  capabilities: string[];
}

const FeatureCard = ({ title, href, icon, description, capabilities }: FeatureCardProps) => (
  <Link href={href} className="block group">
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-soton-blue transition-all duration-200 h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-soton-blue">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-soton-blue transition-colors">{title}</h3>
        </div>
        <ArrowRight className="text-gray-400 group-hover:text-soton-blue transition-colors" size={18} />
      </div>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <ul className="space-y-1 mb-4">
        {capabilities.slice(0, 3).map((cap, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle size={12} className="text-soton-gold flex-shrink-0" />
            <span>{cap}</span>
          </li>
        ))}
      </ul>
    </div>
  </Link>
);

// Pipeline step component
interface PipelineStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const PipelineStep = ({ number, title, description, isLast }: PipelineStepProps) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-soton-blue text-white flex items-center justify-center font-bold">
        {number}
      </div>
      {!isLast && <div className="w-0.5 h-12 bg-gray-300 mt-2" />}
    </div>
    <div className="pt-1">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default function ManualOverviewPage() {
  const features: FeatureCardProps[] = [
    {
      title: "Quick Start",
      href: "/manual/quick-start",
      icon: <Download size={20} />,
      description: "Install and run PIVTools in minutes.",
      capabilities: ["pip install pivtools", "Python 3.12 - 3.14 support", "Pre-compiled C extensions"],
    },
    {
      title: "CLI Reference",
      href: "/manual/cli-reference",
      icon: <Terminal size={20} />,
      description: "All CLI commands with options and examples.",
      capabilities: ["14 CLI commands", "Batch processing", "Workflow examples"],
    },
    {
      title: "Image Configuration",
      href: "/manual/image-configuration",
      icon: <ImageIcon size={20} />,
      description: "Set up input images, cameras, and file formats.",
      capabilities: ["Multiple image formats", "Multi-camera support", "Batch processing paths"],
    },
    {
      title: "Masking",
      href: "/manual/masking",
      icon: <Layers size={20} />,
      description: "Exclude regions from PIV processing.",
      capabilities: ["Polygon mask editor", "Pixel border mode", "Per-camera masks"],
    },
    {
      title: "Preprocessing",
      href: "/manual/preprocessing",
      icon: <Filter size={20} />,
      description: "Temporal and spatial filters for image enhancement.",
      capabilities: ["POD background removal", "Gaussian/median filters", "Live preview"],
    },
    {
      title: "PIV Processing",
      href: "/manual/piv-processing",
      icon: <Zap size={20} />,
      description: "Cross-correlation with multi-pass refinement.",
      capabilities: ["Multi-pass windowing", "Ensemble averaging", "Outlier detection & infilling"],
    },
    {
      title: "Planar Calibration",
      href: "/manual/planar-calibration",
      icon: <Target size={20} />,
      description: "Convert pixels to physical units.",
      capabilities: ["Scale factor method", "Dotboard/ChArUco patterns", "LaVision polynomial"],
    },
    {
      title: "Stereo Calibration",
      href: "/manual/stereo-calibration",
      icon: <Eye size={20} />,
      description: "3D velocity reconstruction from camera pairs.",
      capabilities: ["Intrinsic/extrinsic params", "3D reconstruction", "Stereo RMS validation"],
    },
    {
      title: "Global Coordinates",
      href: "/manual/global-coordinates",
      icon: <Crosshair size={20} />,
      description: "Align multi-camera coordinate systems.",
      capabilities: ["Chain topology alignment", "Auto invert detection", "CLI & GUI support"],
    },
    {
      title: "Video Maker",
      href: "/manual/video-maker",
      icon: <Video size={20} />,
      description: "Create MP4 animations of velocity fields.",
      capabilities: ["1080p/4K resolution", "Multiple variables", "Auto color scaling"],
    },
    {
      title: "Results Viewer",
      href: "/manual/results-viewer",
      icon: <Eye size={20} />,
      description: "Interactive vector field visualisation.",
      capabilities: ["Vector overlays", "Colormap controls", "Frame navigation"],
    },
    {
      title: "Transforms",
      href: "/manual/transforms",
      icon: <RotateCw size={20} />,
      description: "Geometric transformations on vector fields.",
      capabilities: ["Flip/rotate operations", "Batch processing", "Operation chaining"],
    },
    {
      title: "Merging",
      href: "/manual/merging",
      icon: <GitMerge size={20} />,
      description: "Combine multi-camera vector fields.",
      capabilities: ["Hanning window blend", "Overlap detection", "Multi-camera fields"],
    },
    {
      title: "Statistics",
      href: "/manual/statistics",
      icon: <BarChart2 size={20} />,
      description: "Mean velocities, Reynolds stresses, TKE, and more.",
      capabilities: ["Time-averaged stats", "Per-frame statistics", "TKE & vorticity"],
    },
    {
      title: "Developer Guide",
      href: "/manual/developer",
      icon: <Code size={20} />,
      description: "Build from source and contribute.",
      capabilities: ["Clone & build", "C extension compilation", "AI-assisted development"],
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      <ManualNavigation />

      <div className="pt-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              PIVTools <span className="text-soton-gold">Manual</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete PIV processing from raw images to publication-ready results.
              GUI and CLI interfaces share the same engine.
            </p>
          </motion.div>

          {/* Processing Pipeline */}
          <Section title="Processing Pipeline" icon={<Home size={32} />} id="pipeline">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <PipelineStep
                  number={1}
                  title="Setup & Configuration"
                  description="Configure image paths, camera setup, and file formats"
                />
                <PipelineStep
                  number={2}
                  title="Masking & Preprocessing"
                  description="Define exclusion regions and apply image filters"
                />
                <PipelineStep
                  number={3}
                  title="PIV Processing"
                  description="Run cross-correlation with multi-pass refinement"
                />
                <PipelineStep
                  number={4}
                  title="Calibration"
                  description="Convert pixels to physical units (planar or stereo)"
                  isLast
                />
              </div>
              <div className="space-y-2">
                <PipelineStep
                  number={5}
                  title="Post-Processing"
                  description="Apply transforms, merge cameras, compute statistics"
                />
                <PipelineStep
                  number={6}
                  title="Visualisation"
                  description="View results and create publication-ready videos"
                />
                <PipelineStep
                  number={7}
                  title="Export"
                  description="Save MAT files, videos, and statistical outputs"
                  isLast
                />
              </div>
            </div>
          </Section>

          {/* Feature Cards */}
          <Section title="Documentation" icon={<FileText size={32} />} id="sections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </Section>

          {/* CLI vs GUI Comparison */}
          <Section title="CLI vs GUI" icon={<Terminal size={32} />} id="comparison">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Both interfaces use the same processing engine and <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Terminal className="text-green-400" size={24} />
                  <h3 className="text-xl font-bold">CLI</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">Batch processing and scripted workflows.</p>
                <div className="space-y-2 text-sm font-mono">
                  {["instantaneous", "detect-planar", "apply-calibration", "statistics"].map((cmd, i) => (
                    <div key={i} className="bg-gray-800 rounded p-2">
                      <span className="text-gray-500">$</span> <span className="text-green-400">pivtools-cli</span> {cmd}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-soton-blue to-soton-darkblue rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Monitor className="text-soton-gold" size={24} />
                  <h3 className="text-xl font-bold">GUI</h3>
                </div>
                <p className="text-gray-200 text-sm mb-3">Interactive exploration and visual configuration.</p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Live image preprocessing preview",
                    "Interactive polygon mask drawing",
                    "Real-time vector field viewer",
                    "Point-and-click calibration",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-soton-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Where to Start */}
          <Section title="Where to Start" icon={<ArrowRight size={32} />} id="start">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "New user", links: [{ text: "Quick Start", href: "/manual/quick-start" }] },
                { label: "Run PIV", links: [{ text: "PIV Processing", href: "/manual/piv-processing" }] },
                { label: "Calibrate", links: [{ text: "Planar", href: "/manual/planar-calibration" }, { text: "Stereo", href: "/manual/stereo-calibration" }] },
                { label: "Statistics", links: [{ text: "Statistics", href: "/manual/statistics" }] },
                { label: "Create videos", links: [{ text: "Video Maker", href: "/manual/video-maker" }] },
                { label: "Automate", links: [{ text: "CLI Reference", href: "/manual/cli-reference" }] },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">{item.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="inline-flex items-center gap-1 text-sm text-soton-blue hover:text-soton-darkblue font-medium"
                      >
                        {link.text}
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Get Started CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Install PIVTools with pip and begin processing your data in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/manual/quick-start"
                className="inline-block bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
              >
                Quick Start Guide
              </Link>
              <Link
                href="/manual/piv-processing"
                className="inline-block bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
              >
                Jump to PIV Processing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
