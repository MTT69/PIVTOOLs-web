'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const highlights = [
    { value: "100%", label: "Open Source", sublabel: "MIT Licensed" },
    { value: "3-in-1", label: "PIV Methods", sublabel: "Planar, Stereo, Ensemble" },
    { value: "GUI + CLI", label: "Interfaces", sublabel: "Flexible Workflows" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-soton-blue via-soton-darkblue to-gray-900 pt-32 md:pt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6">
            PIV<span className="text-soton-gold">TOOLS</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto mb-6 font-medium">
            The Complete Open-Source PIV Platform
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Unified planar, stereoscopic, and ensemble PIV processing with GUI, CLI, and HPC support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/manual/quick-start"
            className="bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors duration-200 flex items-center gap-2 justify-center"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
          <a
            href="#demo"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
          >
            <Play size={20} />
            Watch Demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-soton-gold mb-2">{item.value}</div>
              <div className="text-white font-medium mb-1">{item.label}</div>
              <div className="text-gray-400 text-sm">{item.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center"
        >
          <a href="#why-pivtools" className="text-white hover:text-soton-gold transition-colors duration-200">
            <ChevronDown size={32} className="animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Subtle floating particles animation */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-soton-gold rounded-full opacity-30"
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
