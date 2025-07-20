'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, 
  Cpu, 
  Database, 
  BarChart3, 
  Settings, 
  Shield,
  Layers,
  Clock,
  Code
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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="text-soton-blue mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </motion.div>
  );
};

export default function Features() {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "C-MEX Acceleration",
      description: "Heavily optimized C-MEX extensions provide significant performance improvements over pure MATLAB implementations, reducing computation time dramatically."
    },
    {
      icon: <Layers size={32} />,
      title: "2D & Stereo PIV",
      description: "Comprehensive support for both 2D planar and stereo PIV processing with advanced calibration and reconstruction capabilities."
    },
    {
      icon: <Cpu size={32} />,
      title: "Parallel Processing",
      description: "Intelligent batching and parallel processing designed to maximize CPU utilization while managing memory efficiently across different hardware configurations."
    },
    {
      icon: <Database size={32} />,
      title: "Memory Efficient",
      description: "Advanced memory management with configurable batching allows processing large datasets on systems with varying RAM availability."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Advanced Statistics",
      description: "Built-in statistical analysis including mean flow fields, turbulence statistics, and comprehensive quality metrics for PIV validation."
    },
    {
      icon: <Settings size={32} />,
      title: "Highly Configurable",
      description: "Modular architecture allows extensive customization of processing pipelines, filters, and analysis methods to meet specific research needs."
    },
    {
      icon: <Shield size={32} />,
      title: "Validated Results",
      description: "Thoroughly validated against established datasets including Johns Hopkins Turbulence Database for reliable and accurate results."
    },
    {
      icon: <Clock size={32} />,
      title: "Time-Resolved PIV",
      description: "Support for both snapshot and time-resolved PIV analysis with ensemble averaging capabilities for enhanced mean flow analysis."
    },
    {
      icon: <Code size={32} />,
      title: "Cross-Platform",
      description: "Compatible across multiple operating systems with excellent scalability from desktop workstations to high-performance computing clusters."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Powerful Features
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            PIVTOOLS combines cutting-edge algorithms with optimized performance to deliver 
            the most comprehensive PIV processing solution available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
