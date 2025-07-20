'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpen, 
  Download, 
  Code, 
  Settings, 
  BarChart3, 
  FileText,
  Terminal,
  Wrench
} from 'lucide-react';

interface DocCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const DocCard = ({ icon, title, description, link, delay }: DocCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-soton-blue group"
    >
      <div className="text-soton-blue mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <a
        href={link}
        className="inline-flex items-center text-soton-blue hover:text-soton-darkblue font-medium transition-colors duration-200"
      >
        View Documentation
        <BookOpen size={16} className="ml-2" />
      </a>
    </motion.div>
  );
};

export default function Documentation() {
  const docs = [
    {
      icon: <Download size={32} />,
      title: "Installation Guide",
      description: "Step-by-step installation instructions for MATLAB, required toolboxes, and C compiler setup across different operating systems.",
      link: "#installation"
    },
    {
      icon: <Settings size={32} />,
      title: "Configuration",
      description: "Comprehensive guide to configuring PIVTOOLS for your specific hardware and processing requirements.",
      link: "#configuration"
    },
    {
      icon: <Code size={32} />,
      title: "API Reference",
      description: "Complete function reference with parameters, return values, and usage examples for all PIVTOOLS functions.",
      link: "#api"
    },
    {
      icon: <Terminal size={32} />,
      title: "Quick Start",
      description: "Get up and running quickly with basic PIV processing examples and sample datasets.",
      link: "#quickstart"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Processing Modes",
      description: "Detailed explanation of instantaneous PIV, ensemble averaging, and advanced statistical analysis features.",
      link: "#modes"
    },
    {
      icon: <Wrench size={32} />,
      title: "Troubleshooting",
      description: "Common issues, solutions, and optimization tips for different hardware configurations.",
      link: "#troubleshooting"
    }
  ];

  const codeExample = `%% Basic PIVTOOLS Setup
setup.directory.code = pwd;
setup.imProperties.imageCount = 1000;
setup.imProperties.imageSize = [1024, 1024];
setup.pipeline.instantaneous = true;

% Run PIV processing
Perform_PIV(setup, masks, filters);`;

  return (
    <section id="documentation" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Documentation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete documentation, examples, and guides to help you get the most out of PIVTOOLS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {docs.map((doc, index) => (
            <DocCard
              key={index}
              icon={doc.icon}
              title={doc.title}
              description={doc.description}
              link={doc.link}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Start Example</h3>
              <p className="text-gray-600 mb-6">
                Get started with PIVTOOLS in just a few lines of code. This example shows 
                the basic setup for processing PIV image pairs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-soton-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center">
                  <Download size={20} />
                  Download Examples
                </button>
                <button className="border-2 border-soton-blue text-soton-blue px-6 py-3 rounded-lg font-semibold hover:bg-soton-blue hover:text-white transition-colors duration-200 flex items-center gap-2 justify-center">
                  <FileText size={20} />
                  View Full Manual
                </button>
              </div>
            </div>
            <div>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                  {codeExample}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
