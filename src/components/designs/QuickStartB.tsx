'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BookOpen, Download, Play, Settings } from 'lucide-react';
import Link from 'next/link';

export default function QuickStartB() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      icon: <Download size={24} />,
      number: "01",
      title: "Install",
      code: "pip install pivtools",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Play size={24} />,
      number: "02",
      title: "Launch",
      code: "pivtools-gui",
      color: "from-soton-blue to-cyan-500"
    },
    {
      icon: <Settings size={24} />,
      number: "03",
      title: "Configure & Run",
      code: "pivtools-cli init",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="quick-start" className="py-32 bg-gradient-to-b from-black to-gray-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-soton-gold font-mono text-sm tracking-widest uppercase mb-4">
            Get Started
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Up and Running
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-soton-gold to-yellow-300">
              in Minutes
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-soton-gold/30 transition-all duration-500 h-full">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 text-6xl font-black text-gray-800 group-hover:text-gray-700 transition-colors duration-300">
                  {step.number}
                </div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6`}>
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>

                  <code className="block bg-gray-900 text-green-400 px-4 py-3 rounded-xl font-mono text-sm">
                    {step.code}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/manual/quick-start"
            className="group inline-flex items-center gap-3 bg-soton-gold text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300"
          >
            <BookOpen size={22} />
            View Full Guide
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Documentation card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-soton-blue/20 to-soton-gold/20 rounded-3xl p-8 border border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-soton-blue/20 p-4 rounded-2xl">
              <BookOpen size={32} className="text-soton-gold" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-2">Comprehensive Documentation</h4>
              <p className="text-gray-400">
                Detailed guides covering image configuration, masking, preprocessing, calibration, and all processing modes.
              </p>
            </div>
            <Link
              href="/manual"
              className="text-soton-gold hover:text-yellow-300 font-medium flex items-center gap-2 transition-colors duration-200"
            >
              Browse Manual
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
