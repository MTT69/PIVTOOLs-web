'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ImageIcon,
  Zap,
  Target,
  BarChart3,
  CheckCircle
} from 'lucide-react';

interface WorkflowStageProps {
  stage: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  capabilities: { name: string; desc: string }[];
  delay: number;
}

const WorkflowStage = ({ stage, title, icon, color, capabilities, delay }: WorkflowStageProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="mb-12 last:mb-0"
    >
      {/* Stage header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`bg-gradient-to-br ${color} p-4 rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <span className="text-sm text-gray-500 font-medium">Stage {stage}</span>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Capability cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-20">
        {capabilities.map((cap, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.1 + index * 0.05 }}
            className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-soton-gold mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{cap.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Capabilities() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const workflowStages = [
    {
      stage: 1,
      title: "Image Loading & Preprocessing",
      icon: <ImageIcon size={28} />,
      color: "from-purple-500 to-pink-600",
      capabilities: [
        { name: "Multi-Format Support", desc: "TIFF, PNG, LaVision .im7/.set, Phantom .cine" },
        { name: "Spatial Filters", desc: "Gaussian smoothing, sliding minimum, local normalisation" },
        { name: "Temporal Filters", desc: "POD-based background removal, temporal minimum" },
        { name: "Polygon Masking", desc: "Interactive GUI-drawn exclusion regions" }
      ]
    },
    {
      stage: 2,
      title: "PIV Processing",
      icon: <Zap size={28} />,
      color: "from-soton-blue to-cyan-600",
      capabilities: [
        { name: "Frame-Pair PIV", desc: "Multi-pass with window deformation and sub-pixel fitting" },
        { name: "Stereo PIV", desc: "3-component velocity from calibrated multi-camera setups" },
        { name: "Ensemble PIV", desc: "Correlation averaging with single-pixel resolution capability" },
        { name: "GUI & CLI", desc: "Run from either interface — configure visually or execute headlessly" }
      ]
    },
    {
      stage: 3,
      title: "Calibration & Merging",
      icon: <Target size={28} />,
      color: "from-orange-500 to-red-600",
      capabilities: [
        { name: "Scale Calibration", desc: "Simple scale factor and timestep for planar PIV" },
        { name: "Camera Calibration", desc: "Full calibration with distortion correction using ChArUco boards or dot patterns" },
        { name: "Stereo Reconstruction", desc: "3D velocity field from multiple camera views" },
        { name: "Field Merging", desc: "Hanning-window weighted multi-camera stitching" }
      ]
    },
    {
      stage: 4,
      title: "Analysis & Export",
      icon: <BarChart3 size={28} />,
      color: "from-green-500 to-emerald-600",
      capabilities: [
        { name: "Statistics", desc: "Mean, RMS, vorticity, and Reynolds stress computation" },
        { name: "Interactive Viewer", desc: "Explore all quantities with custom colourmaps and playback" },
        { name: "Video Generation", desc: "FFmpeg-powered publication-ready animations" },
        { name: "Transform Data", desc: "Convert velocity fields to your conventions and coordinate systems" }
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Processing Pipeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From raw images to publication-ready results. Every stage of the PIV workflow, integrated and accessible.
          </p>
        </motion.div>

        <div className="space-y-8">
          {workflowStages.map((stage, index) => (
            <WorkflowStage
              key={index}
              {...stage}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
