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
  ArrowUpRight
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700/50 hover:border-soton-gold/50 transition-all duration-500 overflow-hidden">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-soton-blue/10 to-soton-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Number badge */}
        <div className="absolute top-6 right-6 text-7xl font-black text-gray-800 group-hover:text-gray-700 transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10">
          <div className="bg-gradient-to-br from-soton-blue to-soton-darkblue p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
            <div className="text-white">{icon}</div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            {title}
            <ArrowUpRight size={20} className="text-soton-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h3>

          <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-soton-blue via-soton-gold to-soton-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
};

export default function WhyPivtoolsB() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Code2 size={28} />,
      title: "100% Open Source",
      description: "BSD 3-Clause licensed. Fork it, extend it, make it yours. Full transparency with a community-driven development model."
    },
    {
      icon: <Monitor size={28} />,
      title: "Powerful GUI",
      description: "Real-time preview, interactive masking, instant parameter feedback. Professional-grade interface with zero command line required."
    },
    {
      icon: <Server size={28} />,
      title: "Infinite Scale",
      description: "Built on Dask for seamless parallelization. Process terabytes on your laptop or scale to HPC clusters without code changes."
    },
    {
      icon: <Layers size={28} />,
      title: "Unified Methods",
      description: "Standard PIV, stereoscopic 3C, and ensemble correlation averaging. One platform, every technique you need."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Ensemble Statistics",
      description: "Direct Reynolds stress from correlation maps. Extract turbulence statistics with single-pixel spatial resolution."
    },
    {
      icon: <FileText size={28} />,
      title: "Reproducible Science",
      description: "YAML configurations capture every parameter. Version control your analyses. Share complete workflows with one file."
    }
  ];

  return (
    <section id="why-pivtools" className="py-32 bg-black relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-soton-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-soton-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-soton-gold font-mono text-sm tracking-widest uppercase mb-4"
          >
            Why Choose Us
          </motion.span>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
            Built for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-soton-gold to-yellow-300">
              Researchers
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need for professional PIV analysis. No compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
