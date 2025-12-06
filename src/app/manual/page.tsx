'use client';

import { motion } from 'framer-motion';
import { Download, Code, Image, ArrowRight, Layers, Filter, Zap } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
const sections = [
  {
    title: 'Quick Start',
    description: 'Get PIVTools up and running in minutes with pip install. No compiler required.',
    href: '/manual/quick-start',
    icon: <Download size={32} />,
    color: 'from-green-500 to-emerald-600',
    features: ['Python 3.12/3.13 virtual environment', 'pip install pivtools', 'Launch GUI or CLI']
  },
  {
    title: 'Image Configuration',
    description: 'Configure image paths, camera setups, file formats, and frame pairing.',
    href: '/manual/image-configuration',
    icon: <Image size={32} />,
    color: 'from-purple-500 to-pink-600',
    features: ['Source & base directories', 'Multi-camera setup', 'Frame pairing modes']
  },
  {
    title: 'Masking',
    description: 'Define regions to exclude from PIV processing using polygon masks or pixel borders.',
    href: '/manual/masking',
    icon: <Layers size={32} />,
    color: 'from-orange-500 to-red-600',
    features: ['Polygon mask editor', 'Pixel border mode', 'Auto-loading masks']
  },
  {
    title: 'Pre-Processing',
    description: 'Apply temporal and spatial filters to enhance PIV image quality before correlation.',
    href: '/manual/preprocessing',
    icon: <Filter size={32} />,
    color: 'from-cyan-500 to-blue-600',
    features: ['Time & POD filters', 'Gaussian, median, norm', 'Batch size control']
  },
  {
    title: 'PIV Processing',
    description: 'Configure instantaneous or ensemble PIV with multi-pass refinement, outlier detection, and infilling.',
    href: '/manual/piv-processing',
    icon: <Zap size={32} />,
    color: 'from-yellow-500 to-orange-600',
    features: ['Instantaneous & ensemble modes', 'Single-pixel accumulation', 'Outlier detection & infilling']
  },
  // Developer Installation kept at bottom
  {
    title: 'Developer Installation',
    description: 'Build from source for development, customization, or contribution.',
    href: '/manual/developer',
    icon: <Code size={32} />,
    color: 'from-blue-500 to-indigo-600',
    features: ['Clone repository', 'Platform-specific setup', 'C extension compilation']
  },
];

export default function ManualPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="pt-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              PIVTools <span className="text-soton-gold">Manual</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive documentation for installing, configuring, and using the high-performance PIV processing toolkit.
            </p>
          </motion.div>

          {/* Section Cards */}
          <div className="space-y-8 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={section.href} className="block group">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Icon Section */}
                      <div className={`bg-gradient-to-br ${section.color} p-8 flex items-center justify-center md:w-48`}>
                        <div className="text-white">{section.icon}</div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-soton-blue transition-colors">
                            {section.title}
                          </h2>
                          <ArrowRight
                            className="text-gray-400 group-hover:text-soton-blue group-hover:translate-x-1 transition-all"
                            size={24}
                          />
                        </div>
                        <p className="text-gray-600 mb-4">{section.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {section.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-xl p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Calibration Guide', desc: 'Scale factor, pinhole, and stereo calibration' },
                { title: 'Statistics & Analysis', desc: 'POD, SPOD, and ensemble statistics' },
                { title: 'Troubleshooting', desc: 'Common issues and solutions' }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Install PIVTools and start processing your PIV data with unprecedented speed and accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pypi.org/project/pivtools/"
                className="bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center gap-2 justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={20} />
                Install via pip
              </a>
              <a
                href="https://github.com/MTT69/python-PIVTOOLs"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code size={20} />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
