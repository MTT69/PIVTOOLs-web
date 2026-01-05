'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Monitor, FileText, Terminal } from 'lucide-react';

export default function WorkflowShowcaseD() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = [
    {
      icon: <Monitor size={28} />,
      title: "GUI",
      subtitle: "Configure",
      desc: "Interactive setup"
    },
    {
      icon: <FileText size={28} />,
      title: "YAML",
      subtitle: "Save",
      desc: "Portable config"
    },
    {
      icon: <Terminal size={28} />,
      title: "CLI",
      subtitle: "Execute",
      desc: "Scale to HPC"
    }
  ];

  return (
    <section id="workflow" className="py-24 bg-gray-950 relative overflow-hidden scroll-mt-20">
      {/* Background vector field pattern */}
      {isClient && (
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="wf-arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#FFD700" />
              </marker>
            </defs>
            {/* Vector grid */}
            {[...Array(10)].map((_, i) =>
              [...Array(10)].map((_, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={i * 10 + 5}
                  y1={j * 10 + 5}
                  x2={i * 10 + 8}
                  y2={j * 10 + 5 + Math.sin(i * 0.5 + j * 0.3) * 2}
                  stroke="#FFD700"
                  strokeWidth="0.3"
                  markerEnd="url(#wf-arrow)"
                />
              ))
            )}
          </svg>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="font-mono text-yellow-500 text-sm tracking-wider">WORKFLOW</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Flexible{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Execution
            </span>
          </h2>

          <p className="text-xl text-gray-400">
            One configuration. Multiple modes.
          </p>
        </motion.div>

        {/* Workflow visualization */}
        <div className="relative mb-16">
          {/* Connection flow line */}
          <svg className="absolute top-1/2 left-0 right-0 h-20 -translate-y-1/2 hidden md:block" viewBox="0 0 800 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <marker id="wf-flow-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
              </marker>
            </defs>
            {/* Streamline path */}
            <motion.path
              d="M100,40 C200,40 200,40 300,40 C400,40 400,40 500,40 C600,40 600,40 700,40"
              fill="none"
              stroke="url(#flowLine)"
              strokeWidth="3"
              strokeDasharray="10,5"
              markerEnd="url(#wf-flow-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />
            {/* Animated particles along path */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                r="4"
                fill="#FFD700"
                initial={{ cx: 100 }}
                animate={{ cx: 700 }}
                transition={{
                  duration: 3,
                  delay: i * 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                cy="40"
              />
            ))}
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="relative"
              >
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 text-center">
                  {/* Velocity magnitude indicator */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 rounded-full">
                    <span className="font-mono text-xs text-yellow-500">
                      v<sub>{index + 1}</sub>
                    </span>
                  </div>

                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-yellow-500 font-medium text-sm mb-2">{step.subtitle}</p>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal with flow-themed styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-yellow-500/30 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-yellow-500/30 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-yellow-500/30 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-yellow-500/30 rounded-br-lg" />

          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500 text-sm font-mono">pivtools-terminal</span>
              <div className="flex-1" />
              <span className="text-xs font-mono text-gray-600">v1.0.0</span>
            </div>

            <div className="p-6 font-mono text-sm">
              <div className="text-gray-600"># Install from PyPI</div>
              <div className="text-green-400 mb-4">
                <span className="text-yellow-500">$</span> pip install pivtools
              </div>

              <div className="text-gray-600"># Launch interactive GUI</div>
              <div className="text-green-400 mb-4">
                <span className="text-yellow-500">$</span> pivtools-gui
              </div>

              <div className="text-gray-600"># Or batch process via CLI</div>
              <div className="text-green-400 mb-2">
                <span className="text-yellow-500">$</span> pivtools-cli init
              </div>
              <div className="text-green-400">
                <span className="text-yellow-500">$</span> pivtools-cli instantaneous --parallel 8
              </div>

              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-yellow-500 ml-1"
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-gray-600 mt-6 text-sm font-mono"
        >
          config.yaml links all execution modes
        </motion.p>
      </div>
    </section>
  );
}
