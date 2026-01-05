'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, FileText, Terminal, Sparkles } from 'lucide-react';

export default function WorkflowShowcaseB() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      icon: <Monitor size={32} />,
      title: "GUI",
      description: "Configure interactively",
      detail: "Real-time preview"
    },
    {
      icon: <FileText size={32} />,
      title: "YAML",
      description: "Save configuration",
      detail: "Version controlled"
    },
    {
      icon: <Terminal size={32} />,
      title: "CLI",
      description: "Execute at scale",
      detail: "HPC compatible"
    }
  ];

  return (
    <section id="workflow" className="py-32 bg-black relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-soton-blue/10 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-soton-gold font-mono text-sm tracking-widest uppercase mb-4">
            Workflow
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            One Config,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-soton-gold to-yellow-300">
              Multiple Modes
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Configure visually, execute anywhere.
          </p>
        </motion.div>

        {/* Workflow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="relative group"
              >
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-soton-gold/30 transition-all duration-500 text-center">
                  {/* Icon */}
                  <div className="relative mx-auto w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-soton-blue to-soton-darkblue rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative w-full h-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 mb-2">{step.description}</p>
                  <p className="text-soton-gold text-sm font-medium">{step.detail}</p>
                </div>

                {/* Connector dot */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-soton-gold rounded-full hidden md:flex items-center justify-center z-10">
                    <Sparkles size={14} className="text-black" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50"
        >
          <div className="bg-gray-800/50 px-6 py-4 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm font-mono">terminal</span>
          </div>
          <div className="p-8 font-mono text-base">
            <div className="text-gray-500 mb-2"># Install PIVTOOLS</div>
            <div className="text-green-400 mb-6">
              <span className="text-soton-gold">$</span> pip install pivtools
            </div>
            <div className="text-gray-500 mb-2"># Launch GUI for interactive configuration</div>
            <div className="text-green-400 mb-6">
              <span className="text-soton-gold">$</span> pivtools-gui
            </div>
            <div className="text-gray-500 mb-2"># Or use CLI: initialize and run</div>
            <div className="text-green-400">
              <span className="text-soton-gold">$</span> pivtools-cli init && pivtools-cli instantaneous
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
