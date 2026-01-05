'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BookOpen, Check } from 'lucide-react';
import Link from 'next/link';

export default function QuickStartC() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      number: 1,
      title: "Install",
      code: "pip install pivtools",
      note: "Install from PyPI with all dependencies"
    },
    {
      number: 2,
      title: "Launch GUI",
      code: "pivtools-gui",
      note: "Start the interactive configuration interface"
    },
    {
      number: 3,
      title: "Or Use CLI",
      code: "pivtools-cli init",
      note: "Initialize configuration, then run processing"
    }
  ];

  return (
    <section id="quick-start" className="py-24 bg-white scroll-mt-20">
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
            <span className="font-mono text-sm text-soton-blue tracking-wider">QUICK START</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Get Started
          </h2>

          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            From installation to your first PIV analysis in three steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-soton-blue text-white flex items-center justify-center font-mono font-bold text-sm">
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <code className="bg-gray-900 text-green-400 px-3 py-1 rounded-md text-sm font-mono">
                    {step.code}
                  </code>
                </div>
                <p className="text-sm text-gray-500">{step.note}</p>
              </div>
              <Check size={20} className="text-gray-300 flex-shrink-0 mt-1" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <Link
            href="/manual/quick-start"
            className="inline-flex items-center gap-2 bg-soton-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-soton-darkblue transition-colors duration-200"
          >
            <BookOpen size={18} />
            View Full Quick Start Guide
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Documentation link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-soton-lightblue rounded-xl p-6 border border-blue-100"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <BookOpen size={24} className="text-soton-blue" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Documentation</h4>
              <p className="text-gray-600 text-sm">
                Detailed guides on image configuration, masking, preprocessing,
                PIV processing, calibration, and analysis.
              </p>
            </div>
            <Link
              href="/manual"
              className="text-soton-blue hover:text-soton-darkblue font-medium flex items-center gap-1"
            >
              Browse Manual
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
