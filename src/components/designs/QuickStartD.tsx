'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function QuickStartD() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Install",
      code: "pip install pivtools",
      velocity: 0.3,
      color: '#440154'
    },
    {
      number: 2,
      title: "Launch",
      code: "pivtools-gui",
      velocity: 0.6,
      color: '#21918c'
    },
    {
      number: 3,
      title: "Process",
      code: "pivtools-cli run",
      velocity: 1.0,
      color: '#fde725'
    }
  ];

  return (
    <section id="quick-start" className="py-24 bg-gray-950 relative overflow-hidden scroll-mt-20">
      {/* Background - subtle particle traces */}
      {isClient && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 5,
                repeat: Infinity,
              }}
            />
          ))}
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
            <span className="font-mono text-yellow-500 text-sm tracking-wider">QUICK START</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Start{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Measuring
            </span>
          </h2>

          <p className="text-xl text-gray-400">
            Three steps from install to velocity field.
          </p>
        </motion.div>

        {/* Steps as velocity vectors */}
        <div className="relative mb-16">
          {/* Connecting streamline */}
          <svg className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 hidden md:block" viewBox="0 0 800 20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="qs-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#440154" />
                <stop offset="50%" stopColor="#21918c" />
                <stop offset="100%" stopColor="#fde725" />
              </linearGradient>
            </defs>
            <motion.path
              d="M50,10 L750,10"
              fill="none"
              stroke="url(#qs-gradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                className="relative"
              >
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
                  {/* Vector arrow indicator */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold"
                      style={{ backgroundColor: `${step.color}30`, color: step.color }}
                    >
                      {step.number}
                    </div>
                    <svg width="40" height="16" viewBox="0 0 40 16">
                      <defs>
                        <marker id={`qs-arrow-${index}`} markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                          <polygon points="0 0, 6 2, 0 4" fill={step.color} />
                        </marker>
                      </defs>
                      <line
                        x1="0"
                        y1="8"
                        x2={10 + step.velocity * 24}
                        y2="8"
                        stroke={step.color}
                        strokeWidth="3"
                        markerEnd={`url(#qs-arrow-${index})`}
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

                  <code className="block bg-gray-800 text-green-400 px-4 py-3 rounded-lg font-mono text-sm mb-4">
                    {step.code}
                  </code>

                  {/* Velocity bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: step.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${step.velocity * 100}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-600">
                      |V|={step.velocity.toFixed(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-12"
        >
          <Link
            href="/manual/quick-start"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
          >
            <BookOpen size={20} />
            Full Quick Start Guide
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Documentation box with flow theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-yellow-500/10 p-4 rounded-xl">
              <BookOpen size={28} className="text-yellow-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-white mb-1">Complete Documentation</h4>
              <p className="text-gray-400 text-sm">
                Detailed guides covering calibration, preprocessing, all PIV methods, and post-processing.
              </p>
            </div>
            <Link
              href="/manual"
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
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
