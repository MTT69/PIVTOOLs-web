'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, ExternalLink, FileText, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AuthorCardProps {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  bio: string;
  links: {
    email?: string;
    github?: string;
  };
  index: number;
  color: string;
}

const AuthorCard = ({ name, role, affiliation, image, bio, links, index, color }: AuthorCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Vector indicator */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <svg width="40" height="20" viewBox="0 0 40 20">
          <defs>
            <marker id={`author-arrow-${index}`} markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill={color} />
            </marker>
          </defs>
          <line x1="5" y1="15" x2="35" y2="15" stroke={color} strokeWidth="2" markerEnd={`url(#author-arrow-${index})`} />
        </svg>
      </div>

      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 text-center h-full">
        <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden ring-2 ring-gray-800 group-hover:ring-yellow-500/30 transition-all duration-300">
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-sm font-medium mb-1" style={{ color }}>{role}</p>
        <p className="text-xs text-gray-500 mb-3">{affiliation}</p>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{bio}</p>

        {(links.email || links.github) && (
          <div className="flex justify-center gap-4">
            {links.email && (
              <a
                href={`mailto:${links.email}`}
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                className="text-gray-500 hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function ResearchD() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const authorColors = ['#9333ea', '#0ea5e9', '#fde725'];

  const authors = [
    {
      name: "Dr John Lawson",
      role: "Lecturer",
      affiliation: "Aeronautics & Astronautics",
      image: "/JL.jpeg",
      bio: "Experimental fluid mechanics, turbulence and particle laden flows.",
      links: {}
    },
    {
      name: "Prof. Bharath Ganapathisubramani",
      role: "Professor",
      affiliation: "Aeronautics & Astronautics",
      image: "/BG.jpg",
      bio: "Experimental approaches to aerodynamic and hydrodynamic phenomena.",
      links: {}
    },
    {
      name: "Morgan Taylor",
      role: "PhD Student",
      affiliation: "University of Southampton",
      image: "/MT.png",
      bio: "Optical flow methods and deep cavity resonance characterisation.",
      links: {
        email: "M.T.Taylor@soton.ac.uk",
        github: "https://github.com/MTT69"
      }
    }
  ];

  const bibtex = `@article{pivtools2024,
  title={PIVTOOLS: A Unified Open-Source Platform for PIV Analysis},
  author={Author, A. and Author, B. and Author, C.},
  journal={University of Southampton},
  year={2024},
  note={Paper coming soon}
}`;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="py-24 bg-gray-950 relative overflow-hidden scroll-mt-20">
      {/* Background streamlines */}
      {isClient && (
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <path
                key={i}
                d={`M0,${10 + i * 8} Q25,${5 + i * 8} 50,${10 + i * 8} T100,${10 + i * 8}`}
                fill="none"
                stroke="#FFD700"
                strokeWidth="0.2"
              />
            ))}
          </svg>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Citation */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-xl">
              <FileText size={24} className="text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Cite PIVTOOLS</h3>
              <p className="text-gray-400 text-sm mb-4">
                If you use PIVTOOLS in your research, please cite our work:
              </p>
              <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                <p className="text-white font-medium">
                  &ldquo;PIVTOOLS: A Unified Open-Source Platform for PIV Analysis&rdquo;
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  University of Southampton (2024) &mdash; Paper coming soon
                </p>
              </div>
              <details className="group">
                <summary className="cursor-pointer text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                  Show BibTeX
                </summary>
                <div className="mt-3 relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-gray-800">
                    {bibtex}
                  </pre>
                  <button
                    onClick={handleCopyBibtex}
                    className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </details>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="font-mono text-yellow-500 text-sm tracking-wider">TEAM</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Developers
            </span>
          </h2>

          <p className="text-gray-400">
            Researchers at the University of Southampton.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {authors.map((author, index) => (
            <AuthorCard
              key={index}
              {...author}
              index={index}
              color={authorColors[index]}
            />
          ))}
        </div>

        {/* University banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Flow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-soton-blue to-soton-darkblue">
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 50" preserveAspectRatio="none">
              <defs>
                <marker id="uni-arrow" markerWidth="4" markerHeight="3" refX="3" refY="1.5" orient="auto">
                  <polygon points="0 0, 4 1.5, 0 3" fill="#FFD700" />
                </marker>
              </defs>
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1={i * 15}
                  y1="25"
                  x2={i * 15 + 10}
                  y2="25"
                  stroke="#FFD700"
                  strokeWidth="0.5"
                  markerEnd="url(#uni-arrow)"
                />
              ))}
            </svg>
          </div>

          <div className="relative p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">University of Southampton</h3>
            <p className="text-blue-200 text-sm mb-6 max-w-xl mx-auto">
              Faculty of Engineering and Physical Sciences.
              Advancing flow measurement through open-source tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.southampton.ac.uk"
                className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={18} />
                University Website
              </a>
              <a
                href="https://github.com/MTT69/PIVTOOLS"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                GitHub Repository
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
