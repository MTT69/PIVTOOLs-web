'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
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

export default function HeroD() {
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
      opacity: 0.2 + Math.random() * 0.3,
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

  // Viridis-ish color based on velocity
  const getColor = (vx: number): string => {
    const t = (vx - 0.001) / 0.0015;
    const r = Math.round(68 + t * 180);
    const g = Math.round(50 + t * 150);
    const b = Math.round(120 - t * 80);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Flow visualization - vortex particles with velocity-colored glow */}
      {isClient && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="particleGlowD" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {particles.map(p => {
            const color = getColor(p.vx);
            return (
              <circle
                key={p.id}
                cx={`${p.x * 100}%`}
                cy={`${p.y * 100}%`}
                r={p.size}
                fill={color}
                opacity={p.opacity}
                filter="url(#particleGlowD)"
              />
            );
          })}
        </svg>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-300/70 text-sm">Open Source PIV Platform</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6"
          >
            <span className="text-white">PIV</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">TOOLS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-3 font-light"
          >
            Particle Image Velocimetry
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 mb-10 max-w-lg mx-auto"
          >
            Complete 2D/3D velocity field analysis. From raw images to turbulence statistics.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <Link
              href="/manual/quick-start"
              className="group bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#capabilities"
              className="border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors"
            >
              View Capabilities
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-10 text-sm"
          >
            <div className="text-center">
              <div className="text-yellow-400 font-mono font-semibold">BSD-3</div>
              <div className="text-gray-600">License</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-mono font-semibold">Planar + Stereo + Ensemble</div>
              <div className="text-gray-600">Methods</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-mono font-semibold">GUI + CLI</div>
              <div className="text-gray-600">Interface</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#why-pivtools" className="text-gray-600 hover:text-yellow-500 transition-colors">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={24} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
