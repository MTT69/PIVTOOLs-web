'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

export default function Motivation() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const motivations = [
    {
      icon: <TrendingUp size={40} />,
      title: "Performance Critical",
      description: "Traditional PIV processing is computationally expensive. Our C-MEX acceleration provides up to 10x performance improvements, making real-time analysis feasible."
    },
    {
      icon: <Users size={40} />,
      title: "Research Community",
      description: "Built by researchers for researchers. PIVTOOLS addresses real-world challenges in fluid dynamics research with tools that work in both laboratory and field conditions."
    },
    {
      icon: <Award size={40} />,
      title: "Academic Excellence",
      description: "Developed at the University of Southampton with rigorous validation against established databases and peer-reviewed methodologies."
    },
    {
      icon: <Target size={40} />,
      title: "Precision & Accuracy",
      description: "Advanced algorithms ensure sub-pixel accuracy while maintaining computational efficiency. Comprehensive quality metrics help validate results."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-soton-blue to-soton-darkblue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Why PIVTOOLS?
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Addressing the critical need for high-performance, accurate, and accessible 
            PIV processing in modern fluid dynamics research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {motivations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 text-soton-gold">
                {item.icon}
              </div>
              <div>
                <h3 className="text-3xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
        >
          <h3 className="text-3xl font-bold mb-6 text-center">The Challenge</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-soton-gold mb-2">Hours</div>
              <div className="text-gray-300">Traditional processing time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-soton-gold mb-2">Minutes</div>
              <div className="text-gray-300">With PIVTOOLS acceleration</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-soton-gold mb-2">Same</div>
              <div className="text-gray-300">Accuracy and precision</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
