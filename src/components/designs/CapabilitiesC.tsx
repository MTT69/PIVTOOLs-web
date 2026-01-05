'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ImageIcon,
  Zap,
  Target,
  BarChart3,
  ArrowDown
} from 'lucide-react';

interface StageProps {
  stage: number;
  title: string;
  icon: React.ReactNode;
  capabilities: { name: string; desc: string }[];
  isLast: boolean;
}

const Stage = ({ stage, title, icon, capabilities, isLast }: StageProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: stage * 0.1 }}
      className="relative"
    >
      {/* Stage header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-soton-blue text-white flex items-center justify-center font-mono font-bold text-lg">
          {stage}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-soton-blue">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Capabilities table */}
      <div className="ml-6 pl-10 border-l-2 border-gray-100">
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <table className="w-full">
            <tbody>
              {capabilities.map((cap, index) => (
                <tr
                  key={index}
                  className={`${index !== capabilities.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap w-1/3">
                    {cap.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {cap.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Connector arrow */}
        {!isLast && (
          <div className="flex justify-center py-6">
            <ArrowDown size={20} className="text-gray-300" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function CapabilitiesC() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stages = [
    {
      title: "Image Loading & Preprocessing",
      icon: <ImageIcon size={20} />,
      capabilities: [
        { name: "Multi-Format", desc: "TIFF, PNG, LaVision .im7/.set, Phantom .cine" },
        { name: "Spatial Filters", desc: "Gaussian smoothing, sliding minimum, local normalisation" },
        { name: "Temporal Filters", desc: "POD-based background removal, temporal minimum" },
        { name: "Masking", desc: "Interactive GUI-drawn polygon exclusion regions" }
      ]
    },
    {
      title: "PIV Processing",
      icon: <Zap size={20} />,
      capabilities: [
        { name: "Frame-Pair", desc: "Multi-pass with window deformation and sub-pixel fitting" },
        { name: "Stereo", desc: "3-component velocity from calibrated multi-camera setups" },
        { name: "Ensemble", desc: "Correlation averaging with single-pixel resolution" },
        { name: "Interfaces", desc: "GUI for configuration, CLI for batch/HPC execution" }
      ]
    },
    {
      title: "Calibration & Merging",
      icon: <Target size={20} />,
      capabilities: [
        { name: "Scale", desc: "Simple scale factor and timestep for planar PIV" },
        { name: "Camera", desc: "Full calibration with distortion correction (ChArUco/dots)" },
        { name: "Stereo", desc: "3D velocity field reconstruction from multiple views" },
        { name: "Merging", desc: "Hanning-window weighted multi-camera stitching" }
      ]
    },
    {
      title: "Analysis & Export",
      icon: <BarChart3 size={20} />,
      capabilities: [
        { name: "Statistics", desc: "Mean, RMS, vorticity, Reynolds stress computation" },
        { name: "Viewer", desc: "Interactive exploration with custom colourmaps" },
        { name: "Video", desc: "FFmpeg-powered publication-ready animations" },
        { name: "Transform", desc: "Convert to your conventions and coordinate systems" }
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-24 bg-white scroll-mt-20">
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
            <span className="font-mono text-sm text-soton-blue tracking-wider">PIPELINE</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Processing Pipeline
          </h2>

          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            From raw images to publication-ready results.
            Every stage integrated and accessible.
          </p>
        </motion.div>

        <div className="space-y-0">
          {stages.map((stage, index) => (
            <Stage
              key={index}
              stage={index + 1}
              title={stage.title}
              icon={stage.icon}
              capabilities={stage.capabilities}
              isLast={index === stages.length - 1}
            />
          ))}
        </div>

        {/* Summary box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-soton-lightblue rounded-xl p-6 border border-blue-100"
        >
          <div className="flex items-start gap-4">
            <div className="font-mono text-3xl font-bold text-soton-blue">4</div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">stages, one configuration</div>
              <p className="text-gray-600 text-sm">
                YAML-based configuration captures every parameter across all stages.
                Configure once in the GUI, run at scale via CLI.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
