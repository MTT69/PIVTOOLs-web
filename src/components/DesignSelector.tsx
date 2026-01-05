'use client';

import { useState, useEffect, useCallback } from 'react';
import { Palette, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type DesignVariant = 'A' | 'B' | 'C' | 'D';

interface DesignSelectorProps {
  currentDesign: DesignVariant;
  onDesignChange: (design: DesignVariant) => void;
}

const designs: { id: DesignVariant; name: string; description: string }[] = [
  { id: 'A', name: 'Original', description: 'Dark gradient hero, floating particles, card-based layout' },
  { id: 'B', name: 'Bold', description: 'Glassmorphism, dramatic typography, high contrast' },
  { id: 'C', name: 'Scientific', description: 'Clean, minimal, data-visualization aesthetic' },
  { id: 'D', name: 'Aerodynamic', description: 'Vector fields, streamlines, PIV colormap visualization' },
];

const designOrder: DesignVariant[] = ['A', 'B', 'C', 'D'];

export default function DesignSelector({ currentDesign, onDesignChange }: DesignSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cycleDesign = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = designOrder.indexOf(currentDesign);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % designOrder.length
      : (currentIndex - 1 + designOrder.length) % designOrder.length;
    onDesignChange(designOrder[newIndex]);
  }, [currentDesign, onDesignChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Number keys 1-4 to select designs directly
      if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        onDesignChange(designOrder[index]);
        return;
      }

      // D key to cycle forward
      if (e.key === 'd' || e.key === 'D') {
        cycleDesign('next');
        return;
      }

      // [ and ] to cycle backward/forward
      if (e.key === ']') {
        cycleDesign('next');
        return;
      }
      if (e.key === '[') {
        cycleDesign('prev');
        return;
      }

      // Escape to close modal
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // P to open/close palette
      if (e.key === 'p' || e.key === 'P') {
        setIsOpen(prev => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDesignChange, cycleDesign]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-soton-blue text-white p-4 rounded-full shadow-2xl hover:bg-soton-darkblue transition-colors duration-200 group"
        title="Switch Design"
      >
        <Palette size={24} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Design {currentDesign} <span className="text-gray-400 ml-1">Press D to cycle</span>
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-white rounded-t-3xl md:rounded-2xl shadow-2xl max-w-md w-full mx-auto max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue p-4 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Choose Design</h2>
                    <p className="text-blue-200 text-xs">Select a homepage design to preview</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Design options - scrollable */}
              <div className="p-4 space-y-2 overflow-y-auto flex-1">
                {designs.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => {
                      onDesignChange(design.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                      currentDesign === design.id
                        ? 'border-soton-blue bg-soton-lightblue'
                        : 'border-gray-200 hover:border-soton-blue/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                            currentDesign === design.id
                              ? 'bg-soton-blue text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {design.id}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm">{design.name}</h3>
                          <p className="text-xs text-gray-500 truncate">{design.description}</p>
                        </div>
                      </div>
                      {currentDesign === design.id && (
                        <Check size={18} className="text-soton-blue flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-4 pb-4 flex-shrink-0 space-y-2">
                <div className="flex justify-center gap-3 text-xs text-gray-400">
                  <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">1-4</kbd> select</span>
                  <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">D</kbd> cycle</span>
                  <span><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Esc</kbd> close</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Pick your favorite, then let me know to make it default
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
