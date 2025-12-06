'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function QuickStart() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      number: 1,
      title: "Install",
      code: "pip install pivtools",
      description: "Install from PyPI with all dependencies",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      number: 2,
      title: "Launch GUI",
      code: "pivtools-gui",
      description: "Start the interactive GUI",
      color: "from-soton-blue to-blue-600",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      number: 3,
      title: "Or Run CLI",
      code: "pivtools-cli run",
      description: "Execute headlessly with saved config",
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section id="quick-start" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From installation to your first PIV analysis in three simple steps.
          </p>
        </motion.div>

        {/* Three steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={`bg-gradient-to-br ${step.bgColor} rounded-xl p-6 border ${step.borderColor}`}
            >
              <div className={`bg-gradient-to-br ${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4 shadow-md`}>
                {step.number}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h4>
              {step.code ? (
                <code className="bg-gray-900 text-green-400 px-4 py-2 rounded-lg block text-sm font-mono mb-3">
                  {step.code}
                </code>
              ) : (
                <div className="h-[38px] flex items-center mb-3">
                  <span className="text-gray-500 text-sm italic">Use the GUI to configure</span>
                </div>
              )}
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/manual/quick-start"
            className="inline-flex items-center gap-2 bg-soton-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-soton-darkblue transition-colors duration-200 shadow-md"
          >
            <BookOpen size={20} />
            View Full Quick Start Guide
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="bg-soton-lightblue p-3 rounded-lg">
              <BookOpen size={24} className="text-soton-blue" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Comprehensive Manual</h4>
              <p className="text-gray-600 text-sm">
                Explore detailed guides on image configuration, masking, preprocessing, PIV processing modes,
                calibration, and more in the complete documentation.
              </p>
            </div>
            <Link
              href="/manual"
              className="text-soton-blue hover:text-soton-darkblue font-medium flex items-center gap-1 whitespace-nowrap"
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
