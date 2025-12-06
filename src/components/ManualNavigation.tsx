'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Book, Download, Code, Image, Layers, Filter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ManualSection {
  title: string;
  href: string;
  icon: React.ReactNode;
  subsections?: { title: string; href: string }[];
}

const manualSections: ManualSection[] = [
  {
    title: 'Quick Start',
    href: '/manual/quick-start',
    icon: <Download size={18} />,
    subsections: [
      { title: 'Installation', href: '/manual/quick-start#installation' },
      { title: 'Launch GUI', href: '/manual/quick-start#gui' },
      { title: 'CLI Usage', href: '/manual/quick-start#cli' },
      { title: 'System Requirements', href: '/manual/quick-start#requirements' },
    ],
  },
  {
    title: 'Image Configuration',
    href: '/manual/image-configuration',
    icon: <Image size={18} />,
    subsections: [
      { title: 'Source & Base Directories', href: '/manual/image-configuration#directories' },
      { title: 'Image Type Selection', href: '/manual/image-configuration#image-type' },
      { title: 'Camera Configuration', href: '/manual/image-configuration#cameras' },
      { title: 'Frame Pairing Modes', href: '/manual/image-configuration#pairing' },
      { title: 'Filename Patterns', href: '/manual/image-configuration#patterns' },
      { title: 'Container Formats', href: '/manual/image-configuration#containers' },
      { title: 'File Validation', href: '/manual/image-configuration#validation' },
      { title: 'Output Structure', href: '/manual/image-configuration#output' },
    ],
  },
  {
    title: 'Masking',
    href: '/manual/masking',
    icon: <Layers size={18} />,
    subsections: [
      { title: 'Overview', href: '/manual/masking#overview' },
      { title: 'Polygon Mask Editor', href: '/manual/masking#polygon-editor' },
      { title: 'Pixel Border Mode', href: '/manual/masking#pixel-border' },
      { title: 'Mask Storage', href: '/manual/masking#storage' },
      { title: 'Saving Options', href: '/manual/masking#saving' },
      { title: 'YAML Configuration', href: '/manual/masking#yaml-config' },
    ],
  },
  {
    title: 'Pre-Processing',
    href: '/manual/preprocessing',
    icon: <Filter size={18} />,
    subsections: [
      { title: 'Overview', href: '/manual/preprocessing#overview' },
      { title: 'Temporal (Batch) Filters', href: '/manual/preprocessing#temporal' },
      { title: 'Spatial Filters', href: '/manual/preprocessing#spatial' },
      { title: 'Using Filters in GUI', href: '/manual/preprocessing#gui' },
      { title: 'YAML Configuration', href: '/manual/preprocessing#yaml-config' },
    ],
  },
  // Developer Installation kept at bottom
  {
    title: 'Developer Installation',
    href: '/manual/developer',
    icon: <Code size={18} />,
    subsections: [
      { title: 'Clone Repository', href: '/manual/developer#clone' },
      { title: 'macOS Setup', href: '/manual/developer#macos' },
      { title: 'Windows Setup', href: '/manual/developer#windows' },
      { title: 'Linux Setup', href: '/manual/developer#linux' },
      { title: 'GUI Development', href: '/manual/developer#gui-dev' },
      { title: 'Running the Code', href: '/manual/developer#running' },
    ],
  },
];

export default function ManualNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Expand section containing current page
  useEffect(() => {
    const currentSection = manualSections.find(
      (section) =>
        pathname === section.href ||
        section.subsections?.some((sub) => pathname + window.location.hash === sub.href)
    );
    if (currentSection && !expandedSections.includes(currentSection.title)) {
      setExpandedSections([...expandedSections, currentSection.title]);
    }
  }, [pathname]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActiveSection = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm mb-6" ref={navRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Navigation Dropdown Toggle */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Book className="text-soton-blue" size={20} />
            <span className="font-semibold text-gray-900">Manual Contents</span>
          </div>
          <ChevronDown
            className={`text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>

        {/* Navigation Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg">
                {manualSections.map((section, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    {/* Section Header */}
                    <div className="flex items-center">
                      <Link
                        href={section.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex-1 flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                          isActiveSection(section.href)
                            ? 'bg-soton-lightblue text-soton-blue'
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="text-soton-blue">{section.icon}</span>
                        <span className="font-medium">{section.title}</span>
                      </Link>
                      {section.subsections && section.subsections.length > 0 && (
                        <button
                          onClick={() => toggleSection(section.title)}
                          className="px-4 py-3 text-gray-400 hover:text-gray-600"
                        >
                          <ChevronRight
                            className={`transition-transform duration-200 ${
                              expandedSections.includes(section.title) ? 'rotate-90' : ''
                            }`}
                            size={18}
                          />
                        </button>
                      )}
                    </div>

                    {/* Subsections */}
                    <AnimatePresence>
                      {section.subsections &&
                        expandedSections.includes(section.title) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 overflow-hidden"
                          >
                            {section.subsections.map((sub, subIndex) => (
                              <Link
                                key={subIndex}
                                href={sub.href}
                                onClick={() => setIsDropdownOpen(false)}
                                className="block pl-12 pr-4 py-2 text-sm text-gray-600 hover:text-soton-blue hover:bg-gray-100 transition-colors"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
