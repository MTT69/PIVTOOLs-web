'use client';

import React from 'react';

const steps = [
	{
		title: 'Hardware',
		bg: '#DBEAFE',
		border: '#3B82F6',
		sub: [
			'Laptops', // Changed from 'Acquisition machines'
			'Workstations',
			'HPC clusters',
		],
		notes: [
			'macOS / Windows / Linux',
			'SPMD + OpenMP for hybrid parallelisation',
		],
	},
	{
		title: 'Image Loading',
		bg: '#EDE9FE',
		border: '#8B5CF6',
		sub: ['Time-resolved','Proprietary SDKs'],
		notes: ['Expansible with new formats'],
	},
	{
		title: 'Pre-processing',
		bg: '#FCE7F3',
		border: '#EC4899',
		sub: [
			'Interactive mask',
			'Spatial filters',
			'Temporal filters',
		],
		notes: [
			'Output for each filter shown & saved',
			'Heavily expandable & tailored',
		],
	},
	{
		title: 'Processing',
		bg: '#FEF3C7',
		border: '#F59E0B',
		sub: [
			'Ensemble PIV',
			'Frame-pair PIV',
		],
		notes: [
			'Released with benchmarking routines',
			'Supports multi-pass & multi-grid',
		],
	},
	{
		title: 'Post-processing',
		bg: '#D1FAE5',
		border: '#10B981',
		sub: [
			'Calibration',
			'Image Stitching',
			'Statistics', // Added statistics block
		],
		notes: [
			'Mean velocity & Reynolds stresses',
		],
	},
	{
		title: 'Output',
		bg: '#CCFBF1',
		border: '#14B8A6',
		sub: [
			'Resolvent',
			'SPOD',
			'PINNS',
		], // Added blocks for Resolvent, SPOD, PINNS
		notes: [
			'Ready for PINNs, Resolvent, POD, SPOD',
		],
	},
];

export default function FigurePage() {
	// Font used: SVG <text> uses the browser's default sans-serif unless specified. In Tailwind, this is 'font-sans' (ui-sans-serif, system-ui, ...).
	return (
		<div className="bg-white p-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				PIVTOOLS Workflow Diagram
			</h1>
			<div className="overflow-auto">
				<svg
					width="100%"
					viewBox={`0 0 900 ${steps.length * 120 + 250}`} // updated to match new spacing
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<marker
							id="arrow"
							markerWidth="10"
							markerHeight="10"
							refX="10"
							refY="5"
							orient="auto"
						>
							<path d="M0,0 L10,5 L0,10 Z" fill="#555" />
						</marker>
					</defs>
					{/* Group backgrounds */}
					{[
						{ name: 'Setup', color: '#E0F2FE', start: 0, end: 1 },
						{ name: 'Processing', color: '#FEFCE8', start: 2, end: 3 },
						{ name: 'Results', color: '#ECFDF5', start: 4, end: 5 }
					].map((grp, i) => {
						const y1 = 60 + grp.start * 120 - 50; // back to simpler positioning
						const h = (grp.end - grp.start + 1) * 120 + 40; // back to simpler height
						return (
							<g key={i}>
								<rect
									x={40}
									y={y1}
									width={820}
									height={h}
									fill={grp.color}
									rx={10}
									stroke="#999"
									strokeWidth={2}
									strokeDasharray="8,4"
								/>
								<text x={50} y={y1 + 20} fill="#555" fontSize="16.94" fontWeight="bold" fontFamily="sans-serif">
									{grp.name}
								</text>
							</g>
						);
					})}
					{/* Vertical spine - segmented to avoid group labels */}
					{(() => {
						// Calculate y ranges to avoid group label text
						const yStart = 60;
						const yEnd = steps.length * 120 + 60;
						const labelYs = [
							60 + 0 * 120 - 50 + 20, // Setup label y
							60 + 2 * 120 - 50 + 20, // Processing label y
							60 + 4 * 120 - 50 + 20, // Results label y
						];
						const labelHeight = 19.8; // approx text height
						const labelPad = 10; // padding around labels
						const segments = [
							{ y1: yStart, y2: labelYs[0] - labelPad },
							{ y1: labelYs[0] + labelHeight + labelPad, y2: labelYs[1] - labelPad },
							{ y1: labelYs[1] + labelHeight + labelPad, y2: labelYs[2] - labelPad },
							{ y1: labelYs[2] + labelHeight + labelPad, y2: yEnd },
						];
						return (
							<g>
								{segments.map((seg, i) =>
									seg.y2 > seg.y1 ? (
										<line
											key={i}
											x1={100}
											y1={seg.y1}
											x2={100}
											y2={seg.y2}
											stroke="#ccc"
											strokeWidth={2}
										/>
									) : null
								)}
							</g>
						);
					})()}
					{steps.map((step, idx) => {
						const y = 60 + idx * 120; // back to original positioning
						const mainBoxWidth = 150;
						const mainBoxX = 100 - mainBoxWidth / 2;
						const mainBoxCenter = 100;
						// Calculate sub-box positions
						const subCount = step.sub.length;
						const totalSubWidth = 350;
						const gap = 20;
						const subWidth = subCount > 0 ? (totalSubWidth - (subCount - 1) * gap) / subCount : 0;
						const subStartX = mainBoxX + mainBoxWidth + 40;

						return (
							<g key={idx}>
								{/* Main box centered on the line */}
								<rect
									x={mainBoxX}
									y={y - 20}
									width={mainBoxWidth}
									height={40}
									rx={6}
									fill={step.bg}
									stroke={step.border}
									strokeWidth={2}
								/>
								<text
									x={mainBoxCenter}
									y={y + 5}
									textAnchor="middle"
									fontSize="14.52"
									fontWeight="bold"
									fill="#333"
									fontFamily="sans-serif"
								>
									{step.title}
								</text>
								{/* Only one arrow from main box to first sub-box (if any) */}
								{step.sub.length > 0 && (() => {
									const xFirstSub = subStartX;
									// Arrow should stop at the edge of the sub-box, not before
									return (
										<g>
											<line
												x1={mainBoxX + mainBoxWidth}
												y1={y}
												x2={xFirstSub}
												y2={y}
												stroke={step.border}
												strokeWidth={2}
												markerEnd="url(#arrow)"
											/>
											{step.sub.map((txt, i) => {
												const xSub = subStartX + i * (subWidth + gap);
												return (
													<g key={i}>
														<rect
															x={xSub}
															y={y - 20}
															width={subWidth}
															height={40}
															rx={6}
															fill={step.bg}
															stroke={step.border}
															strokeWidth={2}
														/>
														<text
															x={xSub + subWidth / 2}
															y={y + 5}
															textAnchor="middle"
															fontSize="12.1"
															fill="#333"
															fontFamily="sans-serif"
														>
															{txt}
														</text>
													</g>
												);
											})}
											{/* Notes below sub-boxes, starting at first sub-box position */}
											{step.notes && step.notes.map((note, i) => (
												<text
													key={`note-${i}`}
													x={subStartX}
													y={y + 40 + (i * 18)}
													fontSize="10"
													fill="#666"
													fontFamily="sans-serif"
												>
													{note}
												</text>
											))}
										</g>
									);
								})()}
								{/* Notes for steps without sub-boxes */}
								{step.sub.length === 0 && step.notes && step.notes.map((note, i) => (
									<text
										key={`note-${i}`}
										x={mainBoxX + mainBoxWidth + 40}
										y={y + 40 + (i * 18)}
										fontSize="10"
										fill="#666"
										fontFamily="sans-serif"
									>
										{note}
									</text>
								))}
							</g>
						);
					})}
				</svg>
			</div>
		</div>
	);
}