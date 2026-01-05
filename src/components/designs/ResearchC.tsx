'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, ExternalLink, FileText, Copy, Check } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl p-6 border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-soton-blue text-sm font-medium">{role}</p>
          <p className="text-gray-500 text-xs mb-2">{affiliation}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>

          {(links.email || links.github) && (
            <div className="flex gap-3 mt-3">
              {links.email && (
                <a
                  href={`mailto:${links.email}`}
                  className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
                >
                  <Mail size={16} />
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ResearchC() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const authors = [
    {
      name: "Dr John Lawson",
      role: "Lecturer",
      affiliation: "Department of Aeronautics and Astronautics",
      image: "/JL.jpeg",
      bio: "Specialises in experimental fluid mechanics, turbulence and particle laden flows.",
      links: {}
    },
    {
      name: "Prof. Bharath Ganapathisubramani",
      role: "Professor of Experimental Fluid Mechanics",
      affiliation: "Department of Aeronautics and Astronautics",
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
    <section id="research" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Citation */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-soton-lightblue rounded-xl p-6 border border-blue-100 mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="bg-soton-blue p-3 rounded-lg">
              <FileText size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-soton-blue mb-2">Cite PIVTOOLS</h3>
              <p className="text-gray-600 text-sm mb-3">
                If you use PIVTOOLS in your research, please cite our work:
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="text-gray-900 font-medium text-sm">
                  &ldquo;PIVTOOLS: A Unified Open-Source Platform for PIV Analysis&rdquo;
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  University of Southampton (2024) &mdash; Paper coming soon
                </p>
              </div>
              <details className="group">
                <summary className="cursor-pointer text-soton-blue hover:text-soton-darkblue text-sm font-medium">
                  Show BibTeX
                </summary>
                <div className="mt-3 relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                    {bibtex}
                  </pre>
                  <button
                    onClick={handleCopyBibtex}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors duration-200"
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
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="font-mono text-sm text-soton-blue tracking-wider">TEAM</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Developers
          </h2>

          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Developed by researchers at the University of Southampton.
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {authors.map((author, index) => (
            <AuthorCard
              key={index}
              {...author}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        {/* University links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-soton-blue rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-xl font-semibold mb-2">University of Southampton</h3>
          <p className="text-blue-200 text-sm mb-6">
            Faculty of Engineering and Physical Sciences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.southampton.ac.uk"
              className="inline-flex items-center gap-2 bg-soton-gold text-soton-darkblue px-5 py-2.5 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              University Website
            </a>
            <a
              href="https://github.com/MTT69/PIVTOOLS"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              GitHub Repository
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
