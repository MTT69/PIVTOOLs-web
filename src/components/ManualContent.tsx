'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Settings, 
  Download, 
  Code, 
  Layers, 
  BarChart3, 
  FileText,
  Terminal,
  Wrench,
  Database,
  Play,
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
}

const Section = ({ title, children, icon, id }: SectionProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-16 scroll-mt-24"
    >
      <div className="flex items-center gap-4 mb-8">
        {icon && <div className="text-soton-blue">{icon}</div>}
        <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code }: CodeBlockProps) => (
  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
    <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">
      {code}
    </code>
  </div>
);

interface FeatureListProps {
  items: string[];
}

const FeatureList = ({ items }: FeatureListProps) => (
  <ul className="space-y-3 mb-6">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <CheckCircle className="text-soton-gold mt-1 flex-shrink-0" size={20} />
        <span className="text-gray-700 leading-relaxed text-lg">{item}</span>
      </li>
    ))}
  </ul>
);

export default function ManualContent() {
  return (
    <div className="pt-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            PIVTOOLS <span className="text-soton-gold">Manual</span>
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive guide to installation, configuration, and usage of the high-performance PIV processing toolkit.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <Section title="Table of Contents" icon={<FileText size={32} />} id="table-of-contents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Installation & Prerequisites", href: "#installation" },
              { title: "Compilation & First Run", href: "#compilation" },
              { title: "Core Functionality", href: "#functionality" },
              { title: "Environment Setup", href: "#environment" },
              { title: "Pre-processing Functions", href: "#preprocessing" },
              { title: "PIV Processing Modes", href: "#processing" },
              { title: "Calibration", href: "#calibration" },
              { title: "Statistics & Analysis", href: "#statistics" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-soton-lightblue transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight className="text-soton-blue" size={20} />
                <span className="text-gray-800 font-medium">{item.title}</span>
              </a>
            ))}
          </div>
        </Section>

        {/* Installation Section */}
        <Section title="Installation & Prerequisites" icon={<Download size={32} />} id="installation">
          <div className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-soton-gold">Required</h4>
                <FeatureList items={[
                  "MATLAB 2022b or later",
                  "Image Processing Toolbox",
                  "Signal Processing Toolbox",
                  "Statistics and Machine Learning Toolbox",
                  "C compiler (Visual Studio recommended)"
                ]} />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-soton-gold">Optional</h4>
                <FeatureList items={[
                  "Python (for .im7/.ims support)",
                  "Phantom Camera SDK",
                  "GSL Library",
                  "libfftw3"
                ]} />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="text-yellow-600" size={20} />
              <h4 className="text-lg font-semibold text-yellow-800">Library Installation</h4>
            </div>
            <p className="text-yellow-700 mb-4">On Ubuntu systems, install required libraries:</p>
            <CodeBlock code="sudo apt-get install libfftw3-dev libgsl-dev" language="bash" />
          </div>
        </Section>

        {/* Compilation Section */}
        <Section title="Compilation & First Run" icon={<Terminal size={32} />} id="compilation">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Start Steps</h3>
              <div className="space-y-4">
                {[
                  "Set setup.directory.code to the base location of PIVTOOLS root",
                  "Ensure MATLAB has access to a C compiler (type 'mex -setup')",
                  "Configure GSL and FFTW library paths in SOURCE_FILES",
                  "Set setup.pipeline.compile to true on first use only",
                  "Run the base.m file"
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-soton-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Library Path Configuration</h3>
              <CodeBlock code={`% Default library paths
GSL_INCLUDE_PATH = fullfile(setup.directory.code, 'SOURCE_FILES', 'gsl', 'gsl', 'include');
GSL_LIBRARY_PATH = fullfile(setup.directory.code, 'SOURCE_FILES', 'gsl', 'gsl', 'lib');
FFTW_INCLUDE_PATH = fullfile(setup.directory.code,'SOURCE_FILES', 'fftw-3.3.5-dll64');
FFTW_LIBRARY_PATH = fullfile(setup.directory.code,'SOURCE_FILES', 'fftw-3.3.5-dll64');

% For cluster environments, set:
setup.environment.local = false;
setup.directory.gslCluster = '/path/to/gsl';
setup.directory.fftwCluster = '/path/to/fftw';`} />
            </div>
          </div>
        </Section>

        {/* Core Functionality Section */}
        <Section title="Core Functionality" icon={<Settings size={32} />} id="functionality">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Setup Configuration</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                PIVTOOLS uses a comprehensive setup structure to configure all aspects of the PIV processing pipeline:
              </p>
              <FeatureList items={[
                "Directory structure configuration",
                "Environment and parallel processing settings",
                "Image properties and formats",
                "Pipeline stage control"
              ]} />
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">Key Configuration Areas</h4>
              <div className="space-y-3">
                {[
                  { icon: <Database size={20} />, title: "Directory Structure", desc: "Configure paths for data and libraries" },
                  { icon: <Settings size={20} />, title: "Environment", desc: "Local/cluster and parallel settings" },
                  { icon: <Layers size={20} />, title: "Image Properties", desc: "Dimensions, formats, and naming" },
                  { icon: <Play size={20} />, title: "Pipeline Options", desc: "Enable/disable processing stages" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-soton-blue mt-1">{item.icon}</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{item.title}</h5>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Environment Setup Section */}
        <Section title="Environment Setup" icon={<Code size={32} />} id="environment">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">Memory Management</h3>
            <p className="text-blue-800 text-lg leading-relaxed mb-4">
              PIVTOOLS uses intelligent batching to optimize memory usage across different hardware configurations:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { param: "parforbatch", desc: "Batch size for parallel processing" },
                { param: "batchSize", desc: "Images loaded into RAM" },
                { param: "imageLoadCores", desc: "Cores for image loading" },
                { param: "numTasks", desc: "Cores for computation" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <div className="font-mono text-sm text-blue-700 mb-1">{item.param}</div>
                  <div className="text-xs text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock code={`setup.environment = struct( ...
    'local', true, ...                    % Local or cluster execution
    'numTasks', 8, ...                    % Parallel workers for heavy tasks
    'restartParpool', true, ...           % Reinitialize parallel pool
    'imageLoadCores', 8, ...              % Workers for image loading
    'maxCores', 8 ...                     % Maximum workers for light tasks
);`} />
        </Section>

        {/* Pre-processing Functions Section */}
        <Section title="Pre-processing Functions" icon={<Layers size={32} />} id="preprocessing">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Image Filters & Enhancement</h3>
              <FeatureList items={[
                "Gaussian blur and sharpening filters",
                "Contrast enhancement and normalization",
                "Background subtraction algorithms",
                "Noise reduction and denoising"
              ]} />
              <CodeBlock code={`% Apply Gaussian filter
filtered_images = Filter_images(raw_images, 'gaussian', sigma);

% Background subtraction
bg_subtracted = Masking(images, background_ref);

% Custom filter application
result = filter_custom(images, custom_kernel);`} />
            </div>
          </div>
        </Section>

        {/* Calibration Section */}
        <Section title="Calibration" icon={<Wrench size={32} />} id="calibration">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Stereo PIV Calibration</h3>
              <FeatureList items={[
                "Automatic calibration plate detection",
                "Self-calibration algorithms",
                "Camera intrinsic parameter estimation",
                "Stereo reconstruction accuracy validation"
              ]} />
              <CodeBlock code={`% Perform stereo calibration
[cal_data, accuracy] = spiv_calibration(left_images, right_images);

% Self-calibration refinement
refined_cal = spiv_selfcal(cal_data, validation_images);

% Reconstruct 3D coordinates
[X, Y, Z] = spiv_reconstruct(u, v, cal_data);`} />
            </div>
          </div>
        </Section>

        {/* Statistics & Analysis Section */}
        <Section title="Statistics & Analysis" icon={<BarChart3 size={32} />} id="statistics">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advanced Statistical Analysis</h3>
              <FeatureList items={[
                "Proper Orthogonal Decomposition (POD)",
                "Spectral POD (SPOD) analysis",
                "Reynolds stress tensor computation",
                "Turbulence statistics and correlations"
              ]} />
              <CodeBlock code={`% Compute ensemble statistics
[mean_field, rms_field, corr] = SumStatistics(velocity_fields);

% Perform POD analysis
[modes, coeffs, energy] = POST_POD_UV(velocity_data);

% SPOD analysis
[spod_modes, frequencies] = SPOD_stats(time_series_data);`} />
            </div>
          </div>
        </Section>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-soton-blue to-soton-darkblue rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-300 mb-6 text-lg">
            Download PIVTOOLS and start processing your PIV data with unprecedented speed and accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/MTT69/PIVTOOLS"
              className="bg-soton-gold text-soton-darkblue px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={20} />
              Download Now
            </a>
            <a
              href="https://github.com/MTT69/PIVTOOLS/issues"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-soton-darkblue transition-colors duration-200 flex items-center gap-2 justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
              Get Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
