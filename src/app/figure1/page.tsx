'use client';

import React, { useRef } from 'react';

// ── Palette ─────────────────────────────────────────────────────
// Muted, print-safe, greyscale-distinguishable by luminance
const C = {
	fg1: '#1C2B3A', // headings
	fg2: '#2E3F50', // box titles
	fg3: '#64748B', // body / muted

	setup: { bg: '#EDF2F7', accent: '#4878AA' },
	processing: { bg: '#FDF7ED', accent: '#B07D22' },
	calibration: { bg: '#EBF4F1', accent: '#2A8A7A' },
	analysis: { bg: '#F0ECF6', accent: '#6D4FA0' },

	box: '#FFFFFF',
	boxStroke: '#CBD5E0',
	arrow: '#94A3B4',
	bar: '#F7F9FB',
	barStroke: '#E2E8F0',
	footerBg: '#F1F5F9',
};

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ── Layout constants ────────────────────────────────────────────
const LX = 24;
const LW = 346;
const BOX_W = 98;
const BOX_H = 56;
const BX = [12, 124, 236]; // box x-offsets within section
const BAR_PAD = 12;
const BAR_W = LW - BAR_PAD * 2;

// ── Section vertical positions ──────────────────────────────────
const S = {
	setup: { y: 50, h: 90 },
	processing: { y: 158, h: 164 },
	calibration: { y: 340, h: 90 },
	analysis: { y: 448, h: 90 },
	footer: { y: 554, h: 22 },
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
		a.download = 'pivtools-figure.svg';
		a.click();
		URL.revokeObjectURL(url);
	};

	const downloadPNG = () => {
		if (!svgRef.current) return;
		const svgData = new XMLSerializer().serializeToString(svgRef.current);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		// ~600 DPI for A4 (210×297 mm)
		canvas.width = 4961;
		canvas.height = 7016;
		img.onload = () => {
			if (ctx) {
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const pngUrl = canvas.toDataURL('image/png');
				const a = document.createElement('a');
				a.href = pngUrl;
				a.download = 'pivtools-figure.png';
				a.click();
			}
		};
		img.src =
			'data:image/svg+xml;base64,' +
			btoa(unescape(encodeURIComponent(svgData)));
	};

	// ── SVG helpers ─────────────────────────────────────────────

	/** Section background with rounded rect */
	const SectionBg = ({
		y,
		h,
		colors,
	}: {
		y: number;
		h: number;
		colors: { bg: string; accent: string };
	}) => <rect x={LX} y={y} width={LW} height={h} rx="5" fill={colors.bg} />;

	/** Section label — tracked uppercase */
	const SectionLabel = ({
		y,
		text,
		accent,
	}: {
		y: number;
		text: string;
		accent: string;
	}) => (
		<text
			x={LX + 14}
			y={y + 17}
			fontSize="9.5"
			fontWeight="700"
			fill={accent}
			fontFamily={FONT}
			letterSpacing="1.2"
		>
			{text}
		</text>
	);

	/** White box with title, separator, and detail lines */
	const Box = ({
		sx,
		sy,
		bx,
		title,
		lines,
	}: {
		sx: number;
		sy: number;
		bx: number;
		title: string;
		lines: string[];
	}) => {
		const x = sx + bx;
		const y = sy;
		return (
			<g>
				<rect
					x={x}
					y={y}
					width={BOX_W}
					height={BOX_H}
					rx="3"
					fill={C.box}
					stroke={C.boxStroke}
					strokeWidth="0.75"
				/>
				<text
					x={x + BOX_W / 2}
					y={y + 17}
					textAnchor="middle"
					fontSize="9"
					fontWeight="700"
					fill={C.fg2}
					fontFamily={FONT}
				>
					{title}
				</text>
				<line
					x1={x + 10}
					y1={y + 22}
					x2={x + BOX_W - 10}
					y2={y + 22}
					stroke="#E8ECF0"
					strokeWidth="0.5"
				/>
				{lines.map((line, i) => (
					<text
						key={i}
						x={x + BOX_W / 2}
						y={y + 35 + i * 11}
						textAnchor="middle"
						fontSize="7.5"
						fill={C.fg3}
						fontFamily={FONT}
					>
						{line}
					</text>
				))}
			</g>
		);
	};

	/** Horizontal feature bar */
	const FeatureBar = ({
		x,
		y,
		w,
		h,
		lines,
	}: {
		x: number;
		y: number;
		w: number;
		h: number;
		lines: string[];
	}) => (
		<g>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				rx="3"
				fill={C.bar}
				stroke={C.barStroke}
				strokeWidth="0.5"
			/>
			{lines.map((line, i) => (
				<text
					key={i}
					x={x + w / 2}
					y={y + 12 + i * 11}
					textAnchor="middle"
					fontSize="7"
					fill={C.fg3}
					fontFamily={FONT}
				>
					{line}
				</text>
			))}
		</g>
	);

	/** Connecting arrow between sections */
	const Arrow = ({ y1, y2 }: { y1: number; y2: number }) => (
		<line
			x1={LX + LW / 2}
			y1={y1}
			x2={LX + LW / 2}
			y2={y2}
			stroke={C.arrow}
			strokeWidth="1"
			markerEnd="url(#arrowhead)"
		/>
	);


	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-3xl mx-auto">
				<div className="mb-4 flex gap-3">
					<button
						onClick={downloadSVG}
						className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
					>
						Download SVG
					</button>
					<button
						onClick={downloadPNG}
						className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
					>
						Download PNG (600 DPI)
					</button>
				</div>

				<div
					className="bg-white shadow-lg overflow-hidden border border-gray-300"
					style={{ aspectRatio: '395/600' }}
				>
					<svg
						ref={svgRef}
						viewBox="0 0 395 600"
						xmlns="http://www.w3.org/2000/svg"
						style={{ fontFamily: FONT }}
						textRendering="geometricPrecision"
					>
						<defs>
							<marker
								id="arrowhead"
								markerWidth="7"
								markerHeight="7"
								refX="6"
								refY="3"
								orient="auto"
							>
								<path d="M0,0.5 L0,5.5 L6.5,3 z" fill={C.arrow} />
							</marker>
						</defs>

						{/* White page background */}
						<rect width="395" height="600" fill="white" />

						{/* ═══════════════════════════════════════════════════
						    LEFT COLUMN — Processing Pipeline
						    ═══════════════════════════════════════════════════ */}

						{/* ── SETUP ──────────────────────────────────────── */}
						<SectionBg
							y={S.setup.y}
							h={S.setup.h}
							colors={C.setup}
						/>
						<SectionLabel
							y={S.setup.y}
							text="SETUP"
							accent={C.setup.accent}
						/>
						<Box
							sx={LX}
							sy={S.setup.y + 28}
							bx={BX[0]}
							title="Install"
							lines={[
								'pip install pivtools',
								'GUI + CLI · Cross-platform',
							]}
						/>
						<Box
							sx={LX}
							sy={S.setup.y + 28}
							bx={BX[1]}
							title="Load Images"
							lines={[
								'Standard & proprietary',
								'LaVision, Phantom SDK',
							]}
						/>
						<Box
							sx={LX}
							sy={S.setup.y + 28}
							bx={BX[2]}
							title="Configure"
							lines={[
								'Interactive GUI or CLI',
								'Reproducible YAML',
							]}
						/>

						<Arrow
							y1={S.setup.y + S.setup.h}
							y2={S.processing.y}
						/>

						{/* ── PROCESSING ─────────────────────────────────── */}
						<SectionBg
							y={S.processing.y}
							h={S.processing.h}
							colors={C.processing}
						/>
						<SectionLabel
							y={S.processing.y}
							text="PROCESSING"
							accent={C.processing.accent}
						/>

						{/* Pre-processing feature bar */}
						<FeatureBar
							x={LX + BAR_PAD}
							y={S.processing.y + 28}
							w={BAR_W}
							h={22}
							lines={[
								'Spatial & temporal filtering · Interactive masking · Background removal',
							]}
						/>

						{/* PIV method boxes */}
						<Box
							sx={LX}
							sy={S.processing.y + 56}
							bx={BX[0]}
							title="Planar"
							lines={[
								'Time-resolved velocity',
								'Multi-pass, deformation',
							]}
						/>
						<Box
							sx={LX}
							sy={S.processing.y + 56}
							bx={BX[1]}
							title="Ensemble"
							lines={[
								'Mean + Reynolds stresses',
								'Direct from correlations',
							]}
						/>
						<Box
							sx={LX}
							sy={S.processing.y + 56}
							bx={BX[2]}
							title="Stereo"
							lines={[
								'3-component (u, v, w)',
								'Multi-camera setup',
							]}
						/>

						{/* Engine / performance bar */}
						<FeatureBar
							x={LX + BAR_PAD}
							y={S.processing.y + 120}
							w={BAR_W}
							h={34}
							lines={[
								'Dask distributed · C / FFTW / OpenMP acceleration',
								'Laptop to HPC cluster · Automated validation & infilling',
							]}
						/>

						<Arrow
							y1={S.processing.y + S.processing.h}
							y2={S.calibration.y}
						/>

						{/* ── CALIBRATION & ALIGNMENT ────────────────────── */}
						<SectionBg
							y={S.calibration.y}
							h={S.calibration.h}
							colors={C.calibration}
						/>
						<SectionLabel
							y={S.calibration.y}
							text="CALIBRATION & ALIGNMENT"
							accent={C.calibration.accent}
						/>
						<Box
							sx={LX}
							sy={S.calibration.y + 28}
							bx={BX[0]}
							title="Target Detection"
							lines={[
								'ChArUco & dotboard',
								'Polynomial & pinhole',
							]}
						/>
						<Box
							sx={LX}
							sy={S.calibration.y + 28}
							bx={BX[1]}
							title="Scale & Stereo"
							lines={[
								'Scale factor · Stereo',
								'Self-calibration',
							]}
						/>
						<Box
							sx={LX}
							sy={S.calibration.y + 28}
							bx={BX[2]}
							title="Multi-camera"
							lines={[
								'Global coordinates',
								'Vector field stitching',
							]}
						/>

						<Arrow
							y1={S.calibration.y + S.calibration.h}
							y2={S.analysis.y}
						/>

						{/* ── ANALYSIS & OUTPUT ──────────────────────────── */}
						<SectionBg
							y={S.analysis.y}
							h={S.analysis.h}
							colors={C.analysis}
						/>
						<SectionLabel
							y={S.analysis.y}
							text="ANALYSIS & OUTPUT"
							accent={C.analysis.accent}
						/>
						<Box
							sx={LX}
							sy={S.analysis.y + 28}
							bx={BX[0]}
							title="Statistics"
							lines={[
								'TKE, vorticity, stresses',
								'Divergence, \u0393 criterion',
							]}
						/>
						<Box
							sx={LX}
							sy={S.analysis.y + 28}
							bx={BX[1]}
							title="Visualise"
							lines={[
								'Interactive vector viewer',
								'Animated 4K video',
							]}
						/>
						<Box
							sx={LX}
							sy={S.analysis.y + 28}
							bx={BX[2]}
							title="Export"
							lines={[
								'MATLAB (.mat) files',
								'PNG exports',
							]}
						/>

						{/* ── FOOTER BAR ─────────────────────────────────── */}
						<rect
							x={LX}
							y={S.footer.y}
							width={LW}
							height={S.footer.h}
							rx="3"
							fill={C.footerBg}
						/>
						<text
							x={LX + LW / 2}
							y={S.footer.y + 14}
							textAnchor="middle"
							fontSize="7"
							fontWeight="600"
							fill={C.fg3}
							fontFamily={FONT}
						>
							PIVtools · Open source (BSD-3-Clause) · University
							of Southampton · DNS validated
						</text>

					</svg>
				</div>

				<div className="mt-3 text-sm text-gray-500">
					<p>
						Processing pipeline (395 x 600 pt)
					</p>
				</div>
			</div>
		</div>
	);
}
