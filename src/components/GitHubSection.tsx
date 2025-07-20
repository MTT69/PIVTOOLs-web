'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Star, 
  GitFork, 
  Download, 
  Code, 
  FileText,
  Users,
  Activity,
  ExternalLink
} from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatCard = ({ icon, value, label, delay }: StatCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100"
    >
      <div className="text-soton-blue mb-3 flex justify-center">{icon}</div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </motion.div>
  );
};

export default function GitHubSection() {
  const stats = [
    { icon: <Star size={24} />, value: "2.1k", label: "Stars" },
    { icon: <GitFork size={24} />, value: "456", label: "Forks" },
    { icon: <Download size={24} />, value: "12.5k", label: "Downloads" },
    { icon: <Users size={24} />, value: "89", label: "Contributors" },
    { icon: <Activity size={24} />, value: "Active", label: "Development" },
    { icon: <Code size={24} />, value: "MIT", label: "License" }
  ];

  const features = [
    {
      title: "Open Source",
      description: "Fully open source under MIT license, encouraging collaboration and transparency in research."
    },
    {
      title: "Active Development",
      description: "Continuously updated with new features, bug fixes, and performance improvements."
    },
    {
      title: "Community Driven",
      description: "Built with and for the research community, incorporating feedback and contributions."
    },
    {
      title: "Comprehensive Documentation",
      description: "Detailed README, examples, and documentation to help you get started quickly."
    }
  ];

  return (
    <section id="github" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Github size={64} className="text-soton-gold" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Open Source on GitHub
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            PIVTOOLS is proudly open source, fostering collaboration and innovation 
            in the fluid dynamics research community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6">Why Open Source?</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-soton-gold rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-6">Quick Start</h3>
            <div className="space-y-4">
              <div className="bg-black rounded-lg p-4">
                <code className="text-green-400 font-mono text-sm">
                  git clone https://github.com/MTT69/PIVTOOLS.git
                </code>
              </div>
              <div className="bg-black rounded-lg p-4">
                <code className="text-green-400 font-mono text-sm">
                  cd PIVTOOLS
                </code>
              </div>
              <div className="bg-black rounded-lg p-4">
                <code className="text-green-400 font-mono text-sm">
                  matlab -r &quot;run(&apos;base.m&apos;)&quot;
                </code>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/MTT69/PIVTOOLS"
                className="bg-soton-gold text-soton-darkblue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center gap-2 justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                View on GitHub
              </a>
              <a
                href="https://github.com/MTT69/PIVTOOLS/releases"
                className="border-2 border-soton-gold text-soton-gold px-6 py-3 rounded-lg font-semibold hover:bg-soton-gold hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={20} />
                Download
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Contribute to PIVTOOLS</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our growing community of developers and researchers. Whether you&apos;re 
            reporting bugs, suggesting features, or contributing code, your input helps 
            make PIVTOOLS better for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/MTT69/PIVTOOLS/issues"
              className="bg-white text-soton-darkblue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={20} />
              Report Issues
            </a>
            <a
              href="https://github.com/MTT69/PIVTOOLS/pulls"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
              Pull Requests
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
