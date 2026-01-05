'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import {
  Code2,
  Monitor,
  Server,
  Layers,
  BarChart3,
  FileText,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  velocityColor: string;
}

const FeatureCard = ({ icon, title, description, index, velocityColor }: FeatureCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Vector arrow indicator */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-40 group-hover:opacity-80 transition-opacity">
          <defs>
            <marker id={`arrow-${index}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={velocityColor} />
            </marker>
          </defs>
          <line x1="0" y1="12" x2="18" y2="12" stroke={velocityColor} strokeWidth="2" markerEnd={`url(#arrow-${index})`} />
        </svg>
      </div>

      <div
        className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300"
        style={{ boxShadow: `inset 0 1px 0 0 ${velocityColor}22` }}
      >
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${velocityColor}20` }}
          >
            <div style={{ color: velocityColor }}>{icon}</div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Velocity magnitude indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${60 + index * 8}%` } : {}}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              className="h-full rounded-full"
              style={{ backgroundColor: velocityColor }}
            />
          </div>
          <span className="text-xs font-mono text-gray-600">|V|</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function WhyPivtoolsD() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Viridis-like colors for each feature (low to high velocity)
  const velocityColors = [
    '#440154', // purple (low)
    '#3b528b', // blue
    '#21918c', // teal
    '#5ec962', // green
    '#b5de2b', // yellow-green
    '#fde725', // yellow (high)
  ];

  const features = [
    {
      icon: <Code2 size={24} />,
      title: "Open Source",
      description: "BSD 3-Clause licensed. Fork, extend, and contribute to the community."
    },
    {
      icon: <Monitor size={24} />,
      title: "Powerful GUI",
      description: "Real-time preview, interactive masking, instant parameter feedback."
    },
    {
      icon: <Server size={24} />,
      title: "Scalable Processing",
      description: "Dask-powered parallelization from laptop to HPC cluster."
    },
    {
      icon: <Layers size={24} />,
      title: "Complete Methods",
      description: "Planar, stereoscopic 3C, and ensemble PIV in one platform."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Ensemble Statistics",
      description: "Direct Reynolds stress from correlation maps at single-pixel resolution."
    },
    {
      icon: <FileText size={24} />,
      title: "Reproducible Workflows",
      description: "YAML configurations capture every parameter for version control."
    }
  ];

  return (
    <section id="why-pivtools" className="py-24 bg-gray-950 relative overflow-hidden scroll-mt-20">
      {/* Background streamlines */}
      {isClient && (
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <pattern id="streamlinePattern" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0,50 Q50,30 100,50 T200,50"
                fill="none"
                stroke="#FFD700"
                strokeWidth="0.5"
              />
              <path
                d="M0,70 Q50,50 100,70 T200,70"
                fill="none"
                stroke="#FFD700"
                strokeWidth="0.5"
              />
              <path
                d="M0,30 Q50,10 100,30 T200,30"
                fill="none"
                stroke="#FFD700"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#streamlinePattern)" />
        </svg>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Section label with velocity notation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="font-mono text-yellow-500 text-sm tracking-wider">
              u(x,y) = ?
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              PIVTOOLS
            </span>
            ?
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Complete flow analysis capabilities for professional research.
          </p>

          {/* Mini colorbar legend */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="text-xs font-mono text-gray-600">0</span>
            <div className="w-32 h-2 rounded-full bg-gradient-to-r from-[#440154] via-[#21918c] to-[#fde725]" />
            <span className="text-xs font-mono text-gray-600">|V|<sub>max</sub></span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              velocityColor={velocityColors[index]}
            />
          ))}
        </div>

        {/* Bottom equation decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-900/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-800">
            <code className="text-yellow-500/60 font-mono text-sm">
              V(x,y,t) = u(x,y,t)i + v(x,y,t)j + w(x,y,t)k
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
