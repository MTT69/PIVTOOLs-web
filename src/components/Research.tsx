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
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="text-center mb-4">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-soton-blue font-medium text-sm mb-1">{role}</p>
        <p className="text-gray-500 text-xs">{affiliation}</p>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">{bio}</p>

      {(links.email || links.linkedin || links.github || links.website) && (
        <div className="flex justify-center space-x-3">
          {links.email && (
            <a
              href={`mailto:${links.email}`}
              className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
              title="Email"
            >
              <Mail size={18} />
            </a>
          )}
          {links.linkedin && (
            <a
              href={links.linkedin}
              className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} />
            </a>
          )}
          {links.website && (
            <a
              href={links.website}
              className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
              title="Website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default function Research() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const authors = [
    {
      name: "Dr John Lawson",
      role: "Lecturer",
      affiliation: "Department of Aeronautics and Astronautics",
      image: "/JL.jpeg",
      bio: "Lecturer in the Aeronautics and Astronautics Department within the Faculty of Engineering and Physical Sciences. Specialises in experimental fluid mechanics, turbulence and particle laden flows.",
      links: {}
    },
    {
      name: "Prof. Bharath Ganapathisubramani",
      role: "Professor of Experimental Fluid Mechanics",
      affiliation: "Department of Aeronautics and Astronautics",
      image: "/BG.jpg",
      bio: "Professor of Experimental Fluid Mechanics at the University of Southampton. His team's research takes an experimental approach to understanding aerodynamic and hydrodynamic phenomena.",
      links: {}
    },
    {
      name: "Morgan Taylor",
      role: "PhD Student",
      affiliation: "University of Southampton",
      image: "/MT.png",
      bio: "PhD student in experimental fluid mechanics specialising in optical flow methods and deep cavity resonance characterisation, supervised by John and Bharath.",
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
    <section id="research" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Citation Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-soton-lightblue rounded-xl p-6 border border-blue-200 mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="bg-soton-blue p-3 rounded-lg">
              <FileText size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-soton-blue mb-2">Cite PIVTOOLS</h3>
              <p className="text-gray-700 mb-4">
                If you use PIVTOOLS in your research, please cite our work:
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-gray-800 font-medium">
                  &ldquo;PIVTOOLS: A Unified Open-Source Platform for PIV Analysis&rdquo;
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  University of Southampton (2024) &mdash; Paper coming soon
                </p>
              </div>
              <details className="group">
                <summary className="cursor-pointer text-soton-blue hover:text-soton-darkblue font-medium flex items-center gap-2">
                  <span>Show BibTeX</span>
                </summary>
                <div className="mt-3 relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                    {bibtex}
                  </pre>
                  <button
                    onClick={handleCopyBibtex}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors duration-200"
                    title="Copy BibTeX"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </details>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PIVTOOLS is developed by researchers at the University of Southampton, combining expertise
            in fluid dynamics, image processing, and scientific software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {authors.map((author, index) => (
            <AuthorCard
              key={index}
              {...author}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>

        {/* University + GitHub Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">University of Southampton</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Part of the Faculty of Engineering and Physical Sciences, our research group focuses on
            advancing computational methods for fluid dynamics and developing open-source tools for
            the research community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.southampton.ac.uk"
              className="bg-soton-gold text-soton-darkblue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
              Visit University
            </a>
            <a
              href="https://github.com/MTT69/python-PIVTOOLs"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
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
