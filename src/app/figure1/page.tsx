'use client';

import React, { useRef } from 'react';

// Colors - clean, professional
const COLORS = {
	black: '#1a1a1a',
	darkGray: '#1a1a1a',
	mediumGray: '#1a1a1a',
	lightGray: '#1a1a1a',
	veryLightGray: '#f3f4f6',
	// Stage colors - subtle but distinct
	setupBg: '#eff6ff',
	setupBorder: '#bfdbfe',
	processingBg: '#fefce8',
	processingBorder: '#fde68a',
	outputBg: '#ecfdf5',
	outputBorder: '#a7f3d0',
	// Box colors
	boxBg: '#ffffff',
	boxBorder: '#d1d5db',
};

export default function Figure1Page() {
	const svgRef = useRef<SVGSVGElement>(null);

	const downloadSVG = () => {
		if (!svgRef.current) return;
		const svgData = new XMLSerializer().serializeToString(svgRef.current);
		const blob = new Blob([svgData], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'pivtools-schematic.svg';
		a.click();
		URL.revokeObjectURL(url);
	};

	const downloadPNG = () => {
		if (!svgRef.current) return;
		const svgData = new XMLSerializer().serializeToString(svgRef.current);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();

		// A4 at 600 DPI
		const scale = 8;
		canvas.width = 595 * scale;  // A4 width in points
		canvas.height = 842 * scale; // A4 height in points

		img.onload = () => {
			if (ctx) {
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const pngUrl = canvas.toDataURL('image/png');
				const a = document.createElement('a');
				a.href = pngUrl;
				a.download = 'pivtools-schematic.png';
				a.click();
			}
		};
		img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
	};

	// Portrait A4 proportions: 210mm x 297mm ≈ 1:1.414
	// Using viewBox 595 x 842 (A4 in points at 72 DPI)
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-3xl mx-auto">
				<div className="mb-4 flex gap-4">
					<button
						onClick={downloadSVG}
						className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors font-medium"
					>
						Download SVG
					</button>
					<button
						onClick={downloadPNG}
						className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors font-medium"
					>
						Download PNG (600 DPI)
					</button>
				</div>

				<div className="bg-white shadow-lg overflow-hidden border border-gray-300" style={{ aspectRatio: '210/297' }}>
					<svg
						ref={svgRef}
						viewBox="0 0 595 842"
						xmlns="http://www.w3.org/2000/svg"
						style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
					>
						{/* Definitions */}
						<defs>
							<marker
								id="arrow"
								markerWidth="8"
								markerHeight="8"
								refX="7"
								refY="3"
								orient="auto"
							>
								<path d="M0,0 L0,6 L8,3 z" fill={COLORS.darkGray} />
							</marker>
						</defs>

						{/* Background */}
						<rect width="595" height="842" fill="white" />

						{/* ============ LEFT COLUMN: FLOWCHART (62%) ============ */}

						{/* === SETUP SECTION === */}
						<g transform="translate(18, 75)">
							<rect x="0" y="0" width="350" height="100" rx="6" fill={COLORS.setupBg} stroke={COLORS.setupBorder} strokeWidth="1" />
							<text x="12" y="18" fontSize="11" fontWeight="bold" fill={COLORS.darkGray}>SETUP</text>

							<g transform="translate(10, 28)">
								{/* Install */}
								<rect x="0" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="52" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Install</text>
								<text x="52" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>pip install pivtools</text>
								<text x="52" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Integrated GUI</text>
								<text x="52" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>CLI commands</text>

								{/* Images */}
								<rect x="115" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="167" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Load Images</text>
								<text x="167" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Any format</text>
								<text x="167" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>LaVision, Phantom</text>
								<text x="167" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>SDK support</text>

								{/* Config */}
								<rect x="230" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="282" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Configure</text>
								<text x="282" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Interactive GUI</text>
								<text x="282" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>or CLI scripts</text>
								<text x="282" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Reproducible YAML</text>
							</g>
						</g>

						{/* Arrow down */}
						<line x1="193" y1="180" x2="193" y2="198" stroke={COLORS.darkGray} strokeWidth="1.2" markerEnd="url(#arrow)" />

						{/* === PIV PROCESSING SECTION (with preprocessing integrated) === */}
						<g transform="translate(18, 208)">
							<rect x="0" y="0" width="350" height="195" rx="6" fill={COLORS.processingBg} stroke={COLORS.processingBorder} strokeWidth="1" />
							<text x="12" y="18" fontSize="11" fontWeight="bold" fill={COLORS.darkGray}>PROCESSING</text>

							{/* Preprocessing bar at top */}
							<g transform="translate(10, 28)">
								<rect x="0" y="0" width="330" height="32" rx="4" fill={COLORS.boxBg} stroke={COLORS.veryLightGray} strokeWidth="1" />
								<text x="165" y="12" textAnchor="middle" fontSize="8" fill={COLORS.darkGray}>
									Spatial &amp; temporal filters (min subtraction, POD)
								</text>
								<text x="165" y="25" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>
									Interactive polygon masking • Contrast normalisation
								</text>
							</g>

							{/* Three PIV method boxes */}
							<g transform="translate(10, 68)">
								{/* Frame-pair */}
								<rect x="0" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="52" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Frame-pair</text>
								<text x="52" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Time-resolved</text>
								<text x="52" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>velocity fields</text>
								<text x="52" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Multi-pass</text>

								{/* Ensemble */}
								<rect x="115" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="167" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Ensemble</text>
								<text x="167" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>High-fidelity mean</text>
								<text x="167" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Reynolds stress</text>
								<text x="167" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>from correlations</text>

								{/* Stereo */}
								<rect x="230" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="282" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Stereo</text>
								<text x="282" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>All 3 components</text>
								<text x="282" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>(u, v, w)</text>
								<text x="282" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Multi-camera</text>
							</g>

							{/* Bottom features bar */}
							<g transform="translate(10, 138)">
								<rect x="0" y="0" width="330" height="48" rx="4" fill={COLORS.boxBg} stroke={COLORS.veryLightGray} strokeWidth="1" />
								<text x="165" y="14" textAnchor="middle" fontSize="8" fill={COLORS.darkGray}>
									Scales from laptop to HPC cluster • Parallel processing
								</text>
								<text x="165" y="28" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>
									Automated validation and vector infilling
								</text>
								<text x="165" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>
									Multi-pass with window deformation
								</text>
							</g>
						</g>

						{/* Arrow down */}
						<line x1="193" y1="408" x2="193" y2="426" stroke={COLORS.darkGray} strokeWidth="1.2" markerEnd="url(#arrow)" />

						{/* === OUTPUT SECTION === */}
						<g transform="translate(18, 436)">
							<rect x="0" y="0" width="350" height="100" rx="6" fill={COLORS.outputBg} stroke={COLORS.outputBorder} strokeWidth="1" />
							<text x="12" y="18" fontSize="11" fontWeight="bold" fill={COLORS.darkGray}>OUTPUT</text>

							<g transform="translate(10, 28)">
								{/* Calibrate */}
								<rect x="0" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="52" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Calibrate</text>
								<text x="52" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>ChArUco</text>
								<text x="52" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Dotboard</text>
								<text x="52" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Stereo</text>

								{/* Statistics */}
								<rect x="115" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="167" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Statistics</text>
								<text x="167" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Reynolds stress</text>
								<text x="167" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>TKE, vorticity</text>
								<text x="167" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Divergence</text>

								{/* Visualise */}
								<rect x="230" y="0" width="105" height="62" rx="4" fill={COLORS.boxBg} stroke={COLORS.boxBorder} strokeWidth="1" />
								<text x="282" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill={COLORS.black}>Visualise</text>
								<text x="282" y="30" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>Interactive viewer</text>
								<text x="282" y="42" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>4K video</text>
								<text x="282" y="54" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>MAT, PNG export</text>
							</g>
						</g>

						{/* Key features bar */}
						<g transform="translate(18, 551)">
							<rect x="0" y="0" width="350" height="28" rx="4" fill={COLORS.veryLightGray} stroke="none" />
							<text x="175" y="11" textAnchor="middle" fontSize="8" fontWeight="bold" fill={COLORS.darkGray}>
								GUI + CLI • Cross-platform • HPC scalable
							</text>
							<text x="175" y="23" textAnchor="middle" fontSize="8" fill={COLORS.mediumGray}>
								BSD-3-Clause • University of Southampton
							</text>
						</g>

						{/* ============ RIGHT COLUMN: IMAGE PLACEHOLDERS (38%) ============ */}

						<g transform="translate(385, 75)">
							{/* Panel (a) - GUI */}
							<g transform="translate(0, 0)">
								<rect x="0" y="0" width="192" height="118" fill={COLORS.veryLightGray} stroke={COLORS.boxBorder} strokeWidth="1" rx="4" />
								<text x="10" y="18" fontSize="9" fontWeight="bold" fill={COLORS.darkGray}>(a) GUI</text>
							</g>

							{/* Panel (b) - Velocity */}
							<g transform="translate(0, 133)">
								<rect x="0" y="0" width="192" height="118" fill={COLORS.veryLightGray} stroke={COLORS.boxBorder} strokeWidth="1" rx="4" />
								<text x="10" y="18" fontSize="9" fontWeight="bold" fill={COLORS.darkGray}>(b) Velocity field</text>
							</g>

							{/* Panel (c) - Reynolds stress */}
							<g transform="translate(0, 266)">
								<rect x="0" y="0" width="192" height="118" fill={COLORS.veryLightGray} stroke={COLORS.boxBorder} strokeWidth="1" rx="4" />
								<text x="10" y="18" fontSize="9" fontWeight="bold" fill={COLORS.darkGray}>(c) Reynolds stress</text>
							</g>

							{/* Panel (d) - Stereo */}
							<g transform="translate(0, 399)">
								<rect x="0" y="0" width="192" height="118" fill={COLORS.veryLightGray} stroke={COLORS.boxBorder} strokeWidth="1" rx="4" />
								<text x="10" y="18" fontSize="9" fontWeight="bold" fill={COLORS.darkGray}>(d) Stereo 3C</text>
							</g>
						</g>

					</svg>
				</div>

				<div className="mt-4 text-sm text-gray-500">
					<p>Portrait A4 format (595 × 842 points, ~210 × 297mm)</p>
					<p>Left: Processing pipeline • Right: Image placeholders for your screenshots</p>
				</div>
			</div>
		</div>
	);
}
