'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Monitor,
  Server,
  Layers,
  BarChart3,
  FileText
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="text-soton-blue mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function WhyPivtools() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Code2 size={32} />,
      title: "Open Source",
      description: "BSD 3-Clause licensed with a fully transparent codebase. Extend, modify, and contribute to the community."
    },
    {
      icon: <Monitor size={32} />,
      title: "Powerful GUI",
      description: "Full-featured interface with real-time preview, interactive masking, and instant parameter feedback. No command line required."
    },
    {
      icon: <Server size={32} />,
      title: "Scalable Processing",
      description: "Built on Dask for seamless scaling from laptop to HPC cluster. Process terabyte-scale datasets with ease."
    },
    {
      icon: <Layers size={32} />,
      title: "Complete PIV Methods",
      description: "Standard frame-pair, stereoscopic 3-component, and ensemble PIV all in one unified platform."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Ensemble Statistics",
      description: "Direct Reynolds stress computation from correlation maps. Extract turbulence statistics with enhanced spatial resolution."
    },
    {
      icon: <FileText size={32} />,
      title: "Reproducible Workflows",
      description: "YAML configurations capture every parameter. Share, version, and reproduce analyses effortlessly."
    }
  ];

  return (
    <section id="why-pivtools" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="text-soton-gold">PIVTOOLS</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need for professional PIV analysis in one unified, accessible platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
