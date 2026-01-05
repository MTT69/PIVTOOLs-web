'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  ImageIcon,
  Zap,
  Target,
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  capabilities: { name: string; desc: string }[];
}

export default function CapabilitiesB() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeStage, setActiveStage] = useState(0);

  const stages: Stage[] = [
    {
      id: 1,
      title: "Load & Prep",
      subtitle: "Image Loading & Preprocessing",
      icon: <ImageIcon size={24} />,
      color: "from-purple-500 to-pink-500",
      capabilities: [
        { name: "Multi-Format Support", desc: "TIFF, PNG, LaVision .im7/.set, Phantom .cine" },
        { name: "Spatial Filters", desc: "Gaussian smoothing, sliding minimum, local normalisation" },
        { name: "Temporal Filters", desc: "POD-based background removal, temporal minimum" },
        { name: "Polygon Masking", desc: "Interactive GUI-drawn exclusion regions" }
      ]
    },
    {
      id: 2,
      title: "Process",
      subtitle: "PIV Processing",
      icon: <Zap size={24} />,
      color: "from-soton-blue to-cyan-500",
      capabilities: [
        { name: "Frame-Pair PIV", desc: "Multi-pass with window deformation and sub-pixel fitting" },
        { name: "Stereo PIV", desc: "3-component velocity from calibrated multi-camera setups" },
        { name: "Ensemble PIV", desc: "Correlation averaging with single-pixel resolution capability" },
        { name: "GUI & CLI", desc: "Run from either interface — configure visually or execute headlessly" }
      ]
    },
    {
      id: 3,
      title: "Calibrate",
      subtitle: "Calibration & Merging",
      icon: <Target size={24} />,
      color: "from-orange-500 to-red-500",
      capabilities: [
        { name: "Scale Calibration", desc: "Simple scale factor and timestep for planar PIV" },
        { name: "Camera Calibration", desc: "Full calibration with distortion correction" },
        { name: "Stereo Reconstruction", desc: "3D velocity field from multiple camera views" },
        { name: "Field Merging", desc: "Hanning-window weighted multi-camera stitching" }
      ]
    },
    {
      id: 4,
      title: "Analyze",
      subtitle: "Analysis & Export",
      icon: <BarChart3 size={24} />,
      color: "from-green-500 to-emerald-500",
      capabilities: [
        { name: "Statistics", desc: "Mean, RMS, vorticity, and Reynolds stress computation" },
        { name: "Interactive Viewer", desc: "Explore all quantities with custom colourmaps" },
        { name: "Video Generation", desc: "FFmpeg-powered publication-ready animations" },
        { name: "Transform Data", desc: "Convert to your conventions and coordinate systems" }
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-soton-gold font-mono text-sm tracking-widest uppercase mb-4">
            Complete Pipeline
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            From Images to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-soton-gold to-yellow-300"> Results</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every stage of the PIV workflow, unified and accessible.
          </p>
        </motion.div>

        {/* Stage selector - horizontal tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(index)}
              className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeStage === index
                  ? 'bg-white text-gray-900 shadow-2xl shadow-white/20'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-xl bg-gradient-to-br ${stage.color} ${
                activeStage === index ? 'text-white' : 'text-white/70'
              }`}>
                {stage.icon}
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider opacity-60">Stage {stage.id}</div>
                <div className="font-bold">{stage.title}</div>
              </div>
              {index < stages.length - 1 && (
                <ChevronRight size={20} className="text-gray-600 hidden md:block ml-2" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Active stage content */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stages[activeStage].color} opacity-5 rounded-3xl`} />

          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stages[activeStage].color}`}>
                <div className="text-white">{stages[activeStage].icon}</div>
              </div>
              <div>
                <div className="text-soton-gold font-mono text-sm">Stage {stages[activeStage].id}</div>
                <h3 className="text-3xl font-bold text-white">{stages[activeStage].subtitle}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stages[activeStage].capabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-soton-gold/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${stages[activeStage].color} mt-2 flex-shrink-0`} />
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2 group-hover:text-soton-gold transition-colors duration-300">
                        {cap.name}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {stages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStage === index
                  ? 'w-8 bg-soton-gold'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
