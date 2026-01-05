'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import {
  ImageIcon,
  Zap,
  Target,
  BarChart3,
} from 'lucide-react';

interface StageProps {
  stage: number;
  title: string;
  icon: React.ReactNode;
  capabilities: { name: string; desc: string }[];
  color: string;
  isActive: boolean;
  onClick: () => void;
}

const Stage = ({ stage, title, icon, capabilities, color, isActive, onClick }: StageProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: stage * 0.1 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ${isActive ? 'scale-105' : 'hover:scale-102'}`}
    >
      <div
        className={`relative rounded-2xl p-6 border transition-all duration-300 ${
          isActive
            ? 'bg-gray-900 border-yellow-500/50'
            : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
        }`}
      >
        {/* Stage number with vector arrow */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg"
            style={{ backgroundColor: `${color}30`, color }}
          >
            {stage}
          </div>
          <svg width="24" height="12" viewBox="0 0 24 12" className="opacity-50">
            <defs>
              <marker id={`cap-arrow-${stage}`} markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill={color} />
              </marker>
            </defs>
            <line x1="0" y1="6" x2="18" y2="6" stroke={color} strokeWidth="2" markerEnd={`url(#cap-arrow-${stage})`} />
          </svg>
          <span style={{ color }} className="text-sm font-mono opacity-60">
            Stage {stage}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div style={{ color }}>{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        {/* Capabilities preview */}
        <div className="flex flex-wrap gap-2">
          {capabilities.slice(0, 3).map((cap, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400"
            >
              {cap.name}
            </span>
          ))}
          {capabilities.length > 3 && (
            <span className="text-xs px-2 py-1 text-gray-500">
              +{capabilities.length - 3} more
            </span>
          )}
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-px left-4 right-4 h-0.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default function CapabilitiesD() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeStage, setActiveStage] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stageColors = ['#9333ea', '#0ea5e9', '#f97316', '#22c55e'];

  const stages = [
    {
      title: "Image Loading",
      icon: <ImageIcon size={24} />,
      capabilities: [
        { name: "Multi-Format", desc: "TIFF, PNG, LaVision .im7/.set, Phantom .cine" },
        { name: "Spatial Filters", desc: "Gaussian, sliding minimum, local normalisation" },
        { name: "Temporal Filters", desc: "POD background removal, temporal minimum" },
        { name: "Masking", desc: "Interactive polygon exclusion regions" }
      ]
    },
    {
      title: "PIV Processing",
      icon: <Zap size={24} />,
      capabilities: [
        { name: "Frame-Pair", desc: "Multi-pass with window deformation" },
        { name: "Stereo PIV", desc: "3C velocity from multi-camera setups" },
        { name: "Ensemble", desc: "Correlation averaging, single-pixel resolution" },
        { name: "Dual Interface", desc: "GUI for config, CLI for execution" }
      ]
    },
    {
      title: "Calibration",
      icon: <Target size={24} />,
      capabilities: [
        { name: "Scale Factor", desc: "Simple planar PIV calibration" },
        { name: "Camera Model", desc: "Full distortion correction" },
        { name: "Stereo Recon", desc: "3D field from multiple views" },
        { name: "Field Merge", desc: "Hanning-weighted stitching" }
      ]
    },
    {
      title: "Analysis",
      icon: <BarChart3 size={24} />,
      capabilities: [
        { name: "Statistics", desc: "Mean, RMS, vorticity, Reynolds stress" },
        { name: "Viewer", desc: "Interactive exploration, custom colormaps" },
        { name: "Video Export", desc: "FFmpeg publication animations" },
        { name: "Transforms", desc: "Coordinate system conversion" }
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-24 bg-gray-950 relative overflow-hidden scroll-mt-20">
      {/* Background with flow lines */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Animated flow paths */}
            {[...Array(8)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${20 + i * 10} Q25,${15 + i * 10 + Math.sin(i) * 5} 50,${20 + i * 10} T100,${20 + i * 10}`}
                fill="none"
                stroke={stageColors[i % 4]}
                strokeWidth="0.5"
                strokeOpacity="0.1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatType: 'loop' }}
              />
            ))}
          </svg>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="font-mono text-yellow-500 text-sm tracking-wider">
              PIPELINE
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Processing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Pipeline
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From raw particle images to velocity field statistics.
          </p>
        </motion.div>

        {/* Stage selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stages.map((stage, index) => (
            <Stage
              key={index}
              stage={index + 1}
              title={stage.title}
              icon={stage.icon}
              capabilities={stage.capabilities}
              color={stageColors[index]}
              isActive={activeStage === index}
              onClick={() => setActiveStage(index)}
            />
          ))}
        </div>

        {/* Flow direction indicator */}
        <div className="hidden md:flex justify-center mb-8">
          <svg width="100%" height="40" viewBox="0 0 800 40" className="max-w-3xl">
            <defs>
              <marker id="flow-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#FFD700" />
              </marker>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="33%" stopColor="#0ea5e9" />
                <stop offset="66%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <line x1="50" y1="20" x2="750" y2="20" stroke="url(#flowGradient)" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#flow-arrow)" />
            <text x="400" y="35" textAnchor="middle" fill="#666" fontSize="10" fontFamily="monospace">data flow</text>
          </svg>
        </div>

        {/* Active stage details */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${stageColors[activeStage]}30` }}
            >
              <div style={{ color: stageColors[activeStage] }}>
                {stages[activeStage].icon}
              </div>
            </div>
            <div>
              <span className="text-sm font-mono" style={{ color: stageColors[activeStage] }}>
                Stage {activeStage + 1}
              </span>
              <h3 className="text-2xl font-bold text-white">{stages[activeStage].title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stages[activeStage].capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50"
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: stageColors[activeStage] }}
                />
                <div>
                  <h4 className="font-semibold text-white mb-1">{cap.name}</h4>
                  <p className="text-sm text-gray-400">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Velocity field visualization hint */}
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <defs>
                <marker id="mini-arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                  <polygon points="0 0, 6 2, 0 4" fill={stageColors[activeStage]} />
                </marker>
              </defs>
              <line x1="5" y1="10" x2="30" y2="10" stroke={stageColors[activeStage]} strokeWidth="2" markerEnd="url(#mini-arrow)" />
            </svg>
            <span className="font-mono text-xs">
              {activeStage === 0 && 'I(x,y,t)'}
              {activeStage === 1 && 'R(dx,dy)'}
              {activeStage === 2 && 'X,Y,Z'}
              {activeStage === 3 && 'u,v,w'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
