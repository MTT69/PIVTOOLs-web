'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Monitor,
  Server,
  Layers,
  BarChart3,
  FileText,
  Check
} from 'lucide-react';

interface FeatureRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
  isReversed: boolean;
}

const FeatureRow = ({ icon, title, description, features, index, isReversed }: FeatureRowProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-start gap-8 ${isReversed ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-xl bg-soton-lightblue flex items-center justify-center text-soton-blue">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
            >
              <Check size={12} className="text-soton-blue" />
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function WhyPivtoolsC() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Code2 size={28} />,
      title: "Open Source",
      description: "BSD 3-Clause licensed with a fully transparent codebase. The community can extend, modify, and contribute.",
      features: ["BSD 3-Clause", "GitHub hosted", "Community driven"]
    },
    {
      icon: <Monitor size={28} />,
      title: "Intuitive Interface",
      description: "Full-featured GUI with real-time preview and interactive masking. No command line knowledge required to get started.",
      features: ["Real-time preview", "Interactive masking", "Parameter feedback"]
    },
    {
      icon: <Server size={28} />,
      title: "Scalable Processing",
      description: "Built on Dask for seamless parallelization. Process datasets from megabytes to terabytes without changing your workflow.",
      features: ["Dask-powered", "HPC ready", "Parallel execution"]
    },
    {
      icon: <Layers size={28} />,
      title: "Complete Methods",
      description: "Standard frame-pair, stereoscopic 3-component, and ensemble PIV all in one unified platform.",
      features: ["Planar PIV", "Stereo PIV", "Ensemble PIV"]
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Turbulence Statistics",
      description: "Direct Reynolds stress computation from correlation maps. Extract turbulence statistics with enhanced spatial resolution.",
      features: ["Reynolds stress", "Single-pixel resolution", "Statistical analysis"]
    },
    {
      icon: <FileText size={28} />,
      title: "Reproducible Workflows",
      description: "YAML configurations capture every parameter. Share, version, and reproduce analyses with a single file.",
      features: ["YAML config", "Version control", "Shareable"]
    }
  ];

  return (
    <section id="why-pivtools" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="font-mono text-sm text-soton-blue tracking-wider">FEATURES</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Why PIVTOOLS?
          </h2>

          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Professional PIV analysis tools designed by researchers, for researchers.
            Everything you need in one accessible platform.
          </p>
        </motion.div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <FeatureRow
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gray-50 rounded-xl px-6 py-4 border border-gray-100">
            <div className="text-left">
              <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">Developed at</div>
              <div className="font-semibold text-gray-900">University of Southampton</div>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-left">
              <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">Department</div>
              <div className="font-semibold text-gray-900">Aeronautics & Astronautics</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
