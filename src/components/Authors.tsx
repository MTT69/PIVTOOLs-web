'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-sm">{image}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-soton-blue font-medium mb-1">{role}</p>
        <p className="text-gray-600 text-sm">{affiliation}</p>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{bio}</p>
      
      <div className="flex justify-center space-x-4">
        {links.email && (
          <a
            href={`mailto:${links.email}`}
            className="text-gray-400 hover:text-soton-blue transition-colors duration-200"
            title="Email"
          >
            <Mail size={20} />
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
            <Linkedin size={20} />
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
            <Github size={20} />
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
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function Authors() {
  const authors = [
    {
      name: "Dr. Principal Investigator",
      role: "Lead Developer",
      affiliation: "University of Southampton",
      image: "Photo Placeholder",
      bio: "Leading researcher in computational fluid dynamics with extensive experience in PIV methodology and high-performance computing applications.",
      links: {
        email: "pi@soton.ac.uk",
        linkedin: "https://linkedin.com/in/example",
        github: "https://github.com/example"
      }
    },
    {
      name: "Dr. Research Fellow",
      role: "Algorithm Developer",
      affiliation: "University of Southampton",
      image: "Photo Placeholder",
      bio: "Specialist in image processing algorithms and numerical methods for fluid dynamics analysis with focus on optimization and acceleration techniques.",
      links: {
        email: "rf@soton.ac.uk",
        website: "https://example.com"
      }
    },
    {
      name: "PhD Student",
      role: "Software Engineer",
      affiliation: "University of Southampton",
      image: "Photo Placeholder",
      bio: "Graduate student contributing to software development, testing, and validation of PIVTOOLS with focus on user experience and documentation.",
      links: {
        email: "phd@soton.ac.uk",
        github: "https://github.com/example"
      }
    }
  ];

  return (
    <section id="authors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Meet the Team
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            PIVTOOLS is developed by a dedicated team of researchers and engineers at the 
            University of Southampton, bringing together expertise in fluid dynamics, 
            image processing, and high-performance computing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {authors.map((author, index) => (
            <AuthorCard
              key={index}
              {...author}
              delay={index * 0.2}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">University of Southampton</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Part of the world-renowned Faculty of Engineering and Physical Sciences, 
            our research group focuses on advancing computational methods for fluid 
            dynamics and developing open-source tools for the research community.
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
              href="mailto:contact@soton.ac.uk"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
            >
              <Mail size={20} />
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
