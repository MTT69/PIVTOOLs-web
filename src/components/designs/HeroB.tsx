'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, Cpu, Gauge } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
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

export default function HeroB() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

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

    // Mouse tracking with smoothing - using refs to avoid state updates
    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const rawMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouse = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = e.clientY / window.innerHeight;
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    // Animation loop
    let frameId: number;
    let nextId = PARTICLE_COUNT;

    const animate = () => {
      // Smooth mouse position
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.08;

      // Update spotlight directly via DOM (no React re-render)
      if (spotlightRef.current) {
        spotlightRef.current.style.background =
          `radial-gradient(600px circle at ${rawMouse.x}px ${rawMouse.y}px, rgba(0,60,113,0.4), transparent 40%)`;
      }

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

  const stats = [
    { icon: <Sparkles size={20} />, value: "Open Source", label: "BSD 3-Clause License" },
    { icon: <Cpu size={20} />, value: "HPC Ready", label: "Scales to Clusters" },
    { icon: <Gauge size={20} />, value: "3 Methods", label: "Planar • Stereo • Ensemble" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-soton-darkblue via-black to-soton-darkblue" />

        {/* Animated gradient orbs - using CSS animations for better performance */}
        {isClient && (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-soton-blue/30 rounded-full blur-[120px] animate-float-slow"
              style={{
                animation: 'float-orb-1 20s ease-in-out infinite',
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-soton-gold/20 rounded-full blur-[100px]"
              style={{
                animation: 'float-orb-2 25s ease-in-out infinite',
              }}
            />
            <style jsx>{`
              @keyframes float-orb-1 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(100px, -50px) scale(1.2); }
              }
              @keyframes float-orb-2 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(-80px, 80px) scale(1.3); }
              }
            `}</style>
          </>
        )}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Interactive spotlight effect - updated via ref, no state */}
      {isClient && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 opacity-30 pointer-events-none"
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-300 text-sm font-medium">Now available on PyPI</span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter mb-4">
            <span className="text-white">PIV</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-soton-gold via-yellow-300 to-soton-gold">TOOLS</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-4xl text-gray-300 font-light mb-4 tracking-wide"
        >
          Particle Image Velocimetry
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12"
        >
          The complete open-source platform for professional flow analysis.
          From raw images to publication-ready results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/manual/quick-start"
            className="group relative bg-soton-gold text-black px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-soton-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <a
            href="#capabilities"
            className="group bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-soton-gold/30 transition-all duration-300"
            >
              <div className="text-soton-gold mb-3">{stat.icon}</div>
              <div className="text-white font-bold text-lg mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#why-pivtools" className="text-gray-500 hover:text-soton-gold transition-colors duration-300">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </a>
      </motion.div>

      {/* Vortex particles */}
      {isClient && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="particleGlowB" x="-50%" y="-50%" width="200%" height="200%">
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
              filter="url(#particleGlowB)"
            />
          ))}
        </svg>
      )}
    </section>
  );
}
