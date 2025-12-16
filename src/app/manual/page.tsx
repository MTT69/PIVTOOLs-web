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
  HelpCircle
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
  cli?: string | null;
  gui?: boolean;
}

const FeatureCard = ({ title, href, icon, description, capabilities, cli, gui }: FeatureCardProps) => (
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
      description: "Get PIVTools installed and running in minutes with pip install.",
      capabilities: ["pip install pivtools", "Python 3.12/3.13 support", "Pre-compiled C extensions"],
      cli: "pivtools-cli",
      gui: true,
    },
    {
      title: "CLI Reference",
      href: "/manual/cli-reference",
      icon: <Terminal size={20} />,
      description: "Complete command-line reference with all 12 commands and options.",
      capabilities: ["12 CLI commands", "Batch processing", "Workflow examples"],
      cli: "pivtools-cli",
      gui: false,
    },
    {
      title: "Image Configuration",
      href: "/manual/image-configuration",
      icon: <ImageIcon size={20} />,
      description: "Configure input images, camera setups, and file formats for your experiments.",
      capabilities: ["Multiple image formats", "Multi-camera support", "Batch processing paths"],
      cli: null,
      gui: true,
    },
    {
      title: "Masking",
      href: "/manual/masking",
      icon: <Layers size={20} />,
      description: "Define regions to exclude from PIV processing with interactive tools.",
      capabilities: ["Polygon mask editor", "Pixel border mode", "Per-camera masks"],
      cli: null,
      gui: true,
    },
    {
      title: "Preprocessing",
      href: "/manual/preprocessing",
      icon: <Filter size={20} />,
      description: "Apply temporal and spatial filters to enhance image quality before PIV.",
      capabilities: ["POD background removal", "Gaussian/median filters", "Live preview"],
      cli: null,
      gui: true,
    },
    {
      title: "PIV Processing",
      href: "/manual/piv-processing",
      icon: <Zap size={20} />,
      description: "Run cross-correlation analysis with multi-pass refinement and outlier detection.",
      capabilities: ["Multi-pass windowing", "Ensemble averaging", "Outlier detection & infilling"],
      cli: "instantaneous / ensemble",
      gui: true,
    },
    {
      title: "Planar Calibration",
      href: "/manual/planar-calibration",
      icon: <Target size={20} />,
      description: "Convert pixel displacements to physical units using calibration targets.",
      capabilities: ["Scale factor method", "Dotboard/ChArUco patterns", "LaVision polynomial"],
      cli: "detect-* / apply-calibration",
      gui: true,
    },
    {
      title: "Stereo Calibration",
      href: "/manual/stereo-calibration",
      icon: <Eye size={20} />,
      description: "Set up stereo PIV for 3D velocity reconstruction from camera pairs.",
      capabilities: ["Intrinsic/extrinsic params", "3D reconstruction", "Stereo RMS validation"],
      cli: "detect-stereo-*",
      gui: true,
    },
    {
      title: "Video Maker",
      href: "/manual/video-maker",
      icon: <Video size={20} />,
      description: "Create MP4 animations of velocity fields with customisable colormaps.",
      capabilities: ["1080p/4K resolution", "Multiple variables", "Auto color scaling"],
      cli: "pivtools-cli video",
      gui: true,
    },
    {
      title: "Results Viewer",
      href: "/manual/results-viewer",
      icon: <Eye size={20} />,
      description: "Interactively visualise PIV vector fields and derived quantities.",
      capabilities: ["Vector overlays", "Colormap controls", "Frame navigation"],
      cli: null,
      gui: true,
    },
    {
      title: "Transforms",
      href: "/manual/transforms",
      icon: <RotateCw size={20} />,
      description: "Apply geometric transformations like rotation and flipping to vector fields.",
      capabilities: ["Flip/rotate operations", "Batch processing", "Operation chaining"],
      cli: "pivtools-cli transform",
      gui: true,
    },
    {
      title: "Merging",
      href: "/manual/merging",
      icon: <GitMerge size={20} />,
      description: "Combine vector fields from multiple cameras with smooth blending.",
      capabilities: ["Hanning window blend", "Overlap detection", "Multi-camera fields"],
      cli: "pivtools-cli merge",
      gui: true,
    },
    {
      title: "Statistics",
      href: "/manual/statistics",
      icon: <BarChart2 size={20} />,
      description: "Compute mean velocities, Reynolds stresses, vorticity, and more.",
      capabilities: ["Time-averaged stats", "Per-frame statistics", "TKE & vorticity"],
      cli: "pivtools-cli statistics",
      gui: true,
    },
    {
      title: "Developer Installation",
      href: "/manual/developer",
      icon: <Code size={20} />,
      description: "Build PIVTools from source for development and contribution.",
      capabilities: ["Clone & build", "C extension compilation", "Development setup"],
      cli: null,
      gui: false,
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
              A complete Particle Image Velocimetry processing solution with GUI and CLI interfaces.
              From raw images to publication-ready visualisations.
            </p>
          </motion.div>

          {/* Processing Pipeline */}
          <Section title="Processing Pipeline" icon={<Home size={32} />} id="pipeline">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              PIVTools guides you through the complete PIV workflow, from loading raw images to generating
              statistical analysis and visualisations. Each step is documented with both GUI instructions
              and CLI commands where available.
            </p>

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
          <Section title="Documentation Sections" icon={<FileText size={32} />} id="sections">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Click any card below to access detailed documentation for each feature.
            </p>

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
          <Section title="CLI vs GUI Comparison" icon={<Terminal size={32} />} id="comparison">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              PIVTools offers two interfaces: a command-line interface for scripting and batch processing,
              and a graphical interface for interactive work. Both use the same underlying processing engine.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* CLI Panel */}
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="text-green-400" size={24} />
                  <h3 className="text-xl font-bold">Command Line Interface</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Best for batch processing, automation, and scripted workflows.
                </p>
                <div className="space-y-2 text-sm font-mono">
                  <div className="bg-gray-800 rounded p-2">
                    <span className="text-gray-500">$</span> <span className="text-green-400">pivtools-cli</span> instantaneous
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <span className="text-gray-500">$</span> <span className="text-green-400">pivtools-cli</span> detect-planar
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <span className="text-gray-500">$</span> <span className="text-green-400">pivtools-cli</span> apply-calibration
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <span className="text-gray-500">$</span> <span className="text-green-400">pivtools-cli</span> statistics
                  </div>
                </div>
              </div>

              {/* GUI Panel */}
              <div className="bg-gradient-to-br from-soton-blue to-soton-darkblue rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="text-soton-gold" size={24} />
                  <h3 className="text-xl font-bold">Graphical Interface</h3>
                </div>
                <p className="text-gray-200 text-sm mb-4">
                  Best for interactive exploration, visualisation, and configuration.
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Visual image preprocessing with live preview",
                    "Interactive polygon mask drawing",
                    "Real-time vector field visualisation",
                    "Point-and-click calibration workflows",
                    "Drag-and-drop configuration",
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
          <Section title="Where to Start" icon={<HelpCircle size={32} />} id="start">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Not sure where to begin? Use this guide to find the right documentation for your task.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  question: "I'm new to PIVTools",
                  answer: "Start with Quick Start for installation, then Image Configuration to set up your data.",
                  links: [
                    { text: "Quick Start", href: "/manual/quick-start" },
                    { text: "Image Configuration", href: "/manual/image-configuration" },
                  ],
                },
                {
                  question: "I want to run PIV analysis",
                  answer: "Head to PIV Processing for cross-correlation settings and multi-pass configuration.",
                  links: [
                    { text: "PIV Processing", href: "/manual/piv-processing" },
                  ],
                },
                {
                  question: "I need to calibrate my data",
                  answer: "Choose Planar Calibration for 2D PIV or Stereo Calibration for 3D reconstruction.",
                  links: [
                    { text: "Planar Calibration", href: "/manual/planar-calibration" },
                    { text: "Stereo Calibration", href: "/manual/stereo-calibration" },
                  ],
                },
                {
                  question: "I want to compute statistics",
                  answer: "The Statistics page covers mean velocities, Reynolds stresses, vorticity, and more.",
                  links: [
                    { text: "Statistics", href: "/manual/statistics" },
                  ],
                },
                {
                  question: "I want to create videos",
                  answer: "Video Maker explains how to generate MP4 animations with custom colormaps.",
                  links: [
                    { text: "Video Maker", href: "/manual/video-maker" },
                  ],
                },
                {
                  question: "I want to automate processing",
                  answer: "Use the CLI commands for batch processing. See the CLI Reference for all 12 commands.",
                  links: [
                    { text: "CLI Reference", href: "/manual/cli-reference" },
                    { text: "Quick Start (CLI)", href: "/manual/quick-start#cli" },
                  ],
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                  <p className="text-gray-600 text-sm mb-3">{item.answer}</p>
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
              Install PIVTools with pip and begin processing your PIV data in minutes.
              Full documentation is available for every feature.
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
