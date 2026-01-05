'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, ExternalLink, FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface AuthorCardProps {
  name: string;
  role: string;
  affiliation: string;
  image: string;
  bio: string;
  links: {
    email?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  delay: number;
}

const AuthorCard = ({ name, role, affiliation, image, bio, links, delay }: AuthorCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-soton-gold/30 transition-all duration-500 h-full">
        <div className="text-center mb-6">
          <div className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden ring-4 ring-gray-700 group-hover:ring-soton-gold/30 transition-all duration-300">
            <Image
              src={image}
              alt={name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-soton-gold font-medium text-sm mb-1">{role}</p>
          <p className="text-gray-500 text-xs">{affiliation}</p>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center">{bio}</p>

        {(links.email || links.linkedin || links.github || links.website) && (
          <div className="flex justify-center space-x-4">
            {links.email && (
              <a
                href={`mailto:${links.email}`}
                className="text-gray-500 hover:text-soton-gold transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                className="text-gray-500 hover:text-soton-gold transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                className="text-gray-500 hover:text-soton-gold transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function ResearchB() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const authors = [
    {
      name: "Dr John Lawson",
      role: "Lecturer",
      affiliation: "Aeronautics and Astronautics",
      image: "/JL.jpeg",
      bio: "Specialises in experimental fluid mechanics, turbulence and particle laden flows.",
      links: {}
    },
    {
      name: "Prof. Bharath Ganapathisubramani",
      role: "Professor of Experimental Fluid Mechanics",
      affiliation: "Aeronautics and Astronautics",
      image: "/BG.jpg",
      bio: "Research takes an experimental approach to understanding aerodynamic and hydrodynamic phenomena.",
      links: {}
    },
    {
      name: "Morgan Taylor",
      role: "PhD Student",
      affiliation: "University of Southampton",
      image: "/MT.png",
      bio: "Specialising in optical flow methods and deep cavity resonance characterisation.",
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
    <section id="research" className="py-32 bg-black relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-soton-blue/10 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-soton-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Citation */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-soton-blue/20 to-soton-gold/20 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 mb-20"
        >
          <div className="flex items-start gap-6">
            <div className="bg-soton-gold/20 p-4 rounded-2xl">
              <FileText size={28} className="text-soton-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">Cite PIVTOOLS</h3>
              <p className="text-gray-400 mb-4">
                If you use PIVTOOLS in your research, please cite our work:
              </p>
              <div className="bg-gray-900/50 rounded-xl p-4 mb-4">
                <p className="text-white font-medium">
                  &ldquo;PIVTOOLS: A Unified Open-Source Platform for PIV Analysis&rdquo;
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  University of Southampton (2024) &mdash; Paper coming soon
                </p>
              </div>
              <details className="group">
                <summary className="cursor-pointer text-soton-gold hover:text-yellow-300 font-medium flex items-center gap-2">
                  Show BibTeX
                </summary>
                <div className="mt-4 relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
                    {bibtex}
                  </pre>
                  <button
                    onClick={handleCopyBibtex}
                    className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-soton-gold font-mono text-sm tracking-widest uppercase mb-4">
            The Team
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Meet the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-soton-gold to-yellow-300">
              Developers
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {authors.map((author, index) => (
            <AuthorCard
              key={index}
              {...author}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>

        {/* University banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-3xl p-10 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">University of Southampton</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Faculty of Engineering and Physical Sciences. Advancing computational methods
            for fluid dynamics through open-source tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.southampton.ac.uk"
              className="bg-soton-gold text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
              Visit University
            </a>
            <a
              href="https://github.com/MTT69/PIVTOOLS"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-soton-darkblue transition-all duration-300 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
