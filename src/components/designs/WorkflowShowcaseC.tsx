'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, FileText, Terminal, ArrowRight } from 'lucide-react';

export default function WorkflowShowcaseC() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="workflow" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="font-mono text-sm text-soton-blue tracking-wider">WORKFLOW</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Flexible Execution
          </h2>

          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            One configuration file. Multiple execution modes.
            Configure visually, run at scale.
          </p>
        </motion.div>

        {/* Workflow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* GUI */}
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-soton-lightblue flex items-center justify-center">
                <Monitor size={28} className="text-soton-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">GUI</h3>
              <p className="text-sm text-gray-500">Interactive configuration</p>
            </div>

            <ArrowRight size={24} className="text-gray-300 hidden md:block" />

            {/* YAML */}
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-soton-gold/20 flex items-center justify-center">
                <FileText size={28} className="text-soton-gold" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">config.yaml</h3>
              <p className="text-sm text-gray-500">Shareable settings</p>
            </div>

            <ArrowRight size={24} className="text-gray-300 hidden md:block" />

            {/* CLI */}
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-soton-lightblue flex items-center justify-center">
                <Terminal size={28} className="text-soton-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">CLI / HPC</h3>
              <p className="text-sm text-gray-500">Batch execution</p>
            </div>
          </div>
        </motion.div>

        {/* Terminal example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm font-mono">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-gray-500"># Install from PyPI</div>
              <div className="text-green-400 mb-3">
                <span className="text-blue-400">$</span> pip install pivtools
              </div>
              <div className="text-gray-500"># Launch GUI or use CLI</div>
              <div className="text-green-400 mb-1">
                <span className="text-blue-400">$</span> pivtools-gui
              </div>
              <div className="text-green-400">
                <span className="text-blue-400">$</span> pivtools-cli init && pivtools-cli instantaneous
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-500 mt-6 text-sm"
        >
          GUI and CLI share the same configuration file. Changes are immediately available across both interfaces.
        </motion.p>
      </div>
    </section>
  );
}
