'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Github } from 'lucide-react';
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

export default function Hero() {
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
      opacity: 0.15 + Math.random() * 0.35,
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

  const highlights = [
    { value: "100%", label: "Open Source", sublabel: "BSD 3-Clause" },
    { value: "3-in-1", label: "PIV Methods", sublabel: "Planar • Stereo • Ensemble" },
    { value: "GUI+CLI", label: "Interfaces", sublabel: "Desktop to HPC" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-soton-blue via-soton-darkblue to-[#0a1628]" />

      {/* Animated grid */}
      {isClient && (
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="rgba(255,215,0,0.07)"
                  strokeWidth="1"
                />
              </pattern>
              {/* Radial fade for grid */}
              <radialGradient id="gridFade" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="gridMask">
                <rect width="100%" height="100%" fill="url(#gridFade)" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridMask)" />
          </svg>
        </div>
      )}

      {/* Flowing particles */}
      {isClient && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
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
              fill="#FFD700"
              opacity={p.opacity}
              filter="url(#particleGlow)"
            />
          ))}
        </svg>
      )}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">Open Source PIV Platform</span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight">
            PIV<span className="text-soton-gold">TOOLS</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4 font-light">
            The Complete Open-Source PIV Platform
          </p>

          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10">
            Unified planar, stereoscopic, and ensemble PIV processing.
            GUI for setup, CLI for scale.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/manual/quick-start"
            className="group bg-soton-gold hover:bg-yellow-400 text-soton-darkblue px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-2 justify-center shadow-lg shadow-soton-gold/20"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/MTT69/python-PIVTOOLs"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center gap-2 justify-center backdrop-blur-sm"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="group bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md rounded-2xl p-5 border border-white/[0.06] hover:border-soton-gold/20 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-soton-gold mb-1">{item.value}</div>
              <div className="text-white font-medium text-sm mb-0.5">{item.label}</div>
              <div className="text-gray-500 text-xs">{item.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#why-pivtools"
          className="text-white/40 hover:text-soton-gold transition-colors duration-200"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </a>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-20 left-0 w-32 h-32 border-l-2 border-t-2 border-soton-gold/10 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-soton-gold/10 rounded-br-3xl" />
    </section>
  );
}
