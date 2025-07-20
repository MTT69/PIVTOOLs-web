'use client';

import { Github, Mail, ExternalLink, BookOpen, Users, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Documentation', href: '#documentation' },
      { name: 'Downloads', href: '#github' },
      { name: 'Examples', href: '#documentation' }
    ],
    resources: [
      { name: 'GitHub Repository', href: 'https://github.com/MTT69/PIVTOOLS' },
      { name: 'Issue Tracker', href: 'https://github.com/MTT69/PIVTOOLS/issues' },
      { name: 'Releases', href: 'https://github.com/MTT69/PIVTOOLS/releases' },
      { name: 'Contributing', href: 'https://github.com/MTT69/PIVTOOLS/blob/main/CONTRIBUTING.md' }
    ],
    university: [
      { name: 'University of Southampton', href: 'https://www.southampton.ac.uk' },
      { name: 'Faculty of Engineering', href: 'https://www.southampton.ac.uk/engineering' },
      { name: 'Research Groups', href: 'https://www.southampton.ac.uk/engineering/research' },
      { name: 'Contact', href: 'mailto:contact@soton.ac.uk' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-soton-gold">PIVTOOLS</span>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              High-performance PIV processing for fluid dynamics research. 
              Developed at the University of Southampton.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/MTT69/PIVTOOLS"
                className="text-gray-400 hover:text-soton-gold transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:contact@soton.ac.uk"
                className="text-gray-400 hover:text-soton-gold transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.southampton.ac.uk"
                className="text-gray-400 hover:text-soton-gold transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap size={18} />
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-soton-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={18} />
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-soton-gold transition-colors duration-200 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* University Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users size={18} />
              University
            </h3>
            <ul className="space-y-2">
              {footerLinks.university.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-soton-gold transition-colors duration-200 text-sm"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} University of Southampton. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-soton-gold transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-soton-gold transition-colors duration-200">
                Terms of Use
              </a>
              <a href="#" className="hover:text-soton-gold transition-colors duration-200">
                MIT License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
