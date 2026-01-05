'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, BookOpen, Terminal } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function HeroC() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  const PARTICLE_COUNT = 150;

  const createParticle = useCallback((id: number, startX?: number): Particle => {
    return {
      id,
      x: startX ?? Math.random() * 0.1,
      y: Math.random(),
      vx: 0.0008 + Math.random() * 0.0012,
      vy: (Math.random() - 0.5) * 0.0002,
      size: 1.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.2,
    };
  }, []);

  useEffect(() => {
    setIsClient(true);

    // Initialize particles spread across screen
    const initial: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle(i, Math.random());
      initial.push(p);
    }
    setParticles(initial);

    // Mouse tracking with smoothing
    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const handleMouse = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouse);

    // Animation loop
    let frameId: number;
    let nextId = PARTICLE_COUNT;

    const animate = () => {
      // Smooth mouse position
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.08;

      setParticles(prev => {
        return prev
          .map(p => {
            // Vector from particle to mouse
            const dx = smoothMouse.x - p.x;
            const dy = smoothMouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Vortex effect - add tangential velocity (perpendicular to radial)
            let vortexVx = 0;
            let vortexVy = 0;

            const vortexRadius = 0.2;
            if (dist < vortexRadius && dist > 0.01) {
              // Strength increases as you get closer, but falls off at very center
              const strength = (1 - dist / vortexRadius) * (dist / 0.05);
              const clampedStrength = Math.min(strength, 1) * 0.00088;

              // Tangential direction (perpendicular to radial, clockwise)
              vortexVx = -dy / dist * clampedStrength;
              vortexVy = dx / dist * clampedStrength;
            }

            return {
              ...p,
              x: p.x + p.vx + vortexVx,
              y: p.y + p.vy + vortexVy,
              vy: p.vy * 0.995 + (Math.random() - 0.5) * 0.00003,
            };
          })
          .filter(p => p.x < 1.1 && p.y > -0.1 && p.y < 1.1)
          .concat(
            // Add new particles as needed
            Array.from({ length: Math.max(0, PARTICLE_COUNT - prev.filter(p => p.x < 1.1).length) }, () =>
              createParticle(nextId++)
            )
          );
      });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [createParticle]);

  // Generate grid lines for the scientific background
  const gridLines = [];
  for (let i = 0; i <= 20; i++) {
    gridLines.push(i * 5);
  }

  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20 overflow-hidden">
      {/* Scientific grid background */}
      <div className="absolute inset-0">
        {/* Horizontal lines */}
        {isClient && gridLines.map((pos) => (
          <div
            key={`h-${pos}`}
            className="absolute left-0 right-0 border-t border-gray-100"
            style={{ top: `${pos}%` }}
          />
        ))}
        {/* Vertical lines */}
        {isClient && gridLines.map((pos) => (
          <div
            key={`v-${pos}`}
            className="absolute top-0 bottom-0 border-l border-gray-100"
            style={{ left: `${pos}%` }}
          />
        ))}

        {/* Accent lines */}
        <div className="absolute top-1/4 left-0 right-0 border-t-2 border-soton-lightblue" />
        <div className="absolute bottom-1/3 left-0 right-0 border-t-2 border-soton-lightblue" />
      </div>

      {/* Vortex particles - scientific aesthetic */}
      {isClient && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="particleGlowC" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {particles.map(p => (
            <circle
              key={p.id}
              cx={`${p.x * 100}%`}
              cy={`${p.y * 100}%`}
              r={p.size}
              fill="#003C71"
              opacity={p.opacity}
              filter="url(#particleGlowC)"
            />
          ))}
        </svg>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="font-mono text-sm text-soton-blue tracking-wider">
                OPEN-SOURCE PIV PLATFORM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              PIV
              <span className="text-soton-blue">TOOLS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Unified planar, stereoscopic, and ensemble PIV processing.
              GUI for configuration, CLI for execution, HPC for scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/manual/quick-start"
                className="inline-flex items-center gap-2 bg-soton-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-soton-darkblue transition-colors duration-200"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://github.com/MTT69/PIVTOOLS"
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-soton-blue hover:text-soton-blue transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                View Source
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-8 text-sm"
            >
              <div>
                <div className="font-mono text-2xl font-bold text-gray-900">BSD-3</div>
                <div className="text-gray-500">License</div>
              </div>
              <div className="border-l border-gray-200 pl-8">
                <div className="font-mono text-2xl font-bold text-gray-900">3</div>
                <div className="text-gray-500">PIV Methods</div>
              </div>
              <div className="border-l border-gray-200 pl-8">
                <div className="font-mono text-2xl font-bold text-gray-900">GUI+CLI</div>
                <div className="text-gray-500">Interfaces</div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Terminal preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono ml-2">terminal</span>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm">
                <div className="text-gray-500 mb-2"># Install from PyPI</div>
                <div className="text-green-400 mb-4">
                  <span className="text-blue-400">$</span> pip install pivtools
                </div>

                <div className="text-gray-500 mb-2"># Launch interactive GUI</div>
                <div className="text-green-400 mb-4">
                  <span className="text-blue-400">$</span> pivtools-gui
                </div>

                <div className="text-gray-500 mb-2"># Or run via CLI</div>
                <div className="text-green-400 mb-1">
                  <span className="text-blue-400">$</span> pivtools-cli init
                </div>
                <div className="text-green-400">
                  <span className="text-blue-400">$</span> pivtools-cli instantaneous
                </div>

                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-green-400 ml-1 mt-4"
                />
              </div>
            </div>

            {/* Links below terminal */}
            <div className="flex gap-4 mt-6 justify-center">
              <Link
                href="/manual"
                className="flex items-center gap-2 text-gray-600 hover:text-soton-blue transition-colors duration-200 text-sm"
              >
                <BookOpen size={16} />
                <span>Documentation</span>
              </Link>
              <span className="text-gray-300">|</span>
              <a
                href="https://pypi.org/project/pivtools/"
                className="flex items-center gap-2 text-gray-600 hover:text-soton-blue transition-colors duration-200 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal size={16} />
                <span>PyPI Package</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-soton-blue to-transparent" />
    </section>
  );
}
