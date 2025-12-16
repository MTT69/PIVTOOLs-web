'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, FileText, Terminal, ArrowRight } from 'lucide-react';

export default function WorkflowShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      icon: <Monitor size={40} />,
      title: "Modern GUI",
      description: "Configure interactively with real-time preview",
      color: "from-soton-blue to-blue-600"
    },
    {
      icon: <FileText size={40} />,
      title: "YAML Config",
      description: "Shareable and reproducible settings",
      color: "from-soton-gold to-yellow-500"
    },
    {
      icon: <Terminal size={40} />,
      title: "CLI / HPC",
      description: "Scale to clusters without modification",
      color: "from-soton-blue to-cyan-600"
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Flexible Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Configure visually in the GUI, run at scale via CLI. One configuration, multiple execution modes.
          </p>
        </motion.div>

        {/* Three-step visual workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12"
        >
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="text-center"
              >
                <div className={`bg-gradient-to-br ${step.color} p-6 rounded-2xl text-white shadow-lg mb-4 mx-auto w-fit`}>
                  {step.icon}
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h4>
                <p className="text-gray-600 text-sm max-w-[160px]">{step.description}</p>
              </motion.div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                  className="hidden md:block text-gray-300 mx-4"
                >
                  <ArrowRight size={28} />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm ml-2 font-mono">terminal</span>
          </div>
          <div className="p-6">
            <code className="text-green-400 font-mono text-sm block">
              <span className="text-gray-500"># Install PIVTOOLS</span>
              {'\n'}
              <span className="text-blue-400">$</span> pip install pivtools
              {'\n\n'}
              <span className="text-gray-500"># Launch GUI for interactive configuration</span>
              {'\n'}
              <span className="text-blue-400">$</span> pivtools-gui
              {'\n\n'}
              <span className="text-gray-500"># Or use CLI: init config, then run</span>
              {'\n'}
              <span className="text-blue-400">$</span> pivtools-cli init && pivtools-cli instantaneous
            </code>
          </div>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-gray-500 mt-6 text-sm"
        >
          The GUI and CLI share the same configuration file. Changes made in the GUI are immediately available for CLI execution.
        </motion.p>
      </div>
    </section>
  );
}
