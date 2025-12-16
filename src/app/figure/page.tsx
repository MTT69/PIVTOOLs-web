'use client';

import React from 'react';

const steps = [
	{
		title: 'Hardware',
		bg: '#DBEAFE',
		border: '#3B82F6',
		sub: [
			'Laptops',
			'Workstations',
			'HPC clusters',
		],
		notes: ["- Compatible with MacOS, Linux, Windows", "- Python Dask and Open MP parallelisation", "- React based full chain GUI", "- Yaml based configuration for CLI usage" ], 
	},
	{
		title: 'Image Loading',
		bg: '#EDE9FE',
		border: '#8B5CF6',
		sub: ['All Standard Formats','Proprietary SDKs'],
		notes: ["- Supports TIFF, PNG, JPEG, BMP, AVI", "- Custom readers for Phantom, LaVision, PCO", "- Any custom file naming conventions" ],
	},
	{
		title: 'Pre-processing',
		bg: '#FCE7F3',
		border: '#EC4899',
		sub: [
			'Masking',
			'Spatial filters',
			'Temporal filters',
		],
		notes: ["- GUI allows interactive masking", "- Multiple spatial and temporal filters available", "- GUI allows filter testing and comparison"],
	},
	{
		title: 'Processing',
		bg: '#FEF3C7',
		border: '#F59E0B',
		sub: [
			'Ensemble',
			'Frame-pair',
			'Stereoscopic'
		],
		notes: ["- Multi pass predictor corrector", "- Frame pair and ensemble Reynold stresses" , "- Benchmarked performance against JHTDB", ],
	},
	{
		title: 'Post-processing',
		bg: '#D1FAE5',
		border: '#10B981',
		sub: [
			'Validation',
			'Analysis',
			'Statistics',
		],
		notes: ["- Multiple validation schemes and infilling", "- Vector field multi camera stitching", "- FFMEG vector video generation" ],
	},
	{
		title: 'Calibration',
		bg: '#CCFBF1',
		border: '#14B8A6',
		sub: [
			'Stereo Pinhole',
			'Planar Pinhole',
			'Scale Factor',
		],
		notes: ["- Automated dotboard model generation", "- Stereo recitification and vector calibration", "- Interactive GUI for datum review"],
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
					viewBox={`0 0 900 1200`}
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
					{/* Group backgrounds - computed dynamically below */}
					{(() => {
						// Dynamic vertical layout
						const stepBoxHeight = 36;
						const noteLineHeight = 18;
						const noteCount = 3;
						const noteBlockHeight = noteCount * noteLineHeight;
						const subBoxHeight = 36;
						const groupHeaderPad = 24;
						const groupPadTop = 24;
						const groupPadBottom = 24;
						const betweenStepPad = 18;

						let currentY = 60;
						const groupPositions: {name: string, color: string, y: number, h: number}[] = [];
						const groupDefs = [
							{ name: 'Setup', color: '#E0F2FE', start: 0, end: 1 },
							{ name: 'Processing', color: '#FEFCE8', start: 2, end: 3 },
							{ name: 'Results', color: '#ECFDF5', start: 4, end: 5 }
						];

						// Precompute step positions and group backgrounds
						const stepYs: number[] = [];
						for (const grp of groupDefs) {
							const groupStartY = currentY;
							// Add group header, then a bit more space before first step
							currentY += groupHeaderPad + 8;
							for (let i = grp.start; i <= grp.end; ++i) {
								stepYs[i] = currentY;
								currentY += stepBoxHeight;
								currentY += 6; // small gap under box
								currentY += noteBlockHeight;
								// Add extra space only between steps, not after last in group
								if (i !== grp.end) {
									currentY += betweenStepPad;
								}
							}
							const groupEndY = currentY + groupPadBottom;
							groupPositions.push({
								name: grp.name,
								color: grp.color,
								y: groupStartY,
								h: groupEndY - groupStartY
							});
							currentY = groupEndY + groupPadTop;
						}

						return (
							<g>
								{/* Render group backgrounds and headers */}
								{groupPositions.map((grp, i) => (
									<g key={i}>
										<rect
											x={40}
											y={grp.y}
											width={820}
											height={grp.h}
											fill={grp.color}
											rx={10}
											stroke="#999"
											strokeWidth={2}
											strokeDasharray="8,4"
										/>
										<text
											x={50}
											y={grp.y + groupHeaderPad}
											fill="#555"
											fontSize="16.94"
											fontWeight="bold"
											fontFamily="sans-serif"
										>
											{grp.name}
										</text>
									</g>
								))}
								{/* Render steps */}
								{steps.map((step, idx) => {
									const y = stepYs[idx];
									const mainBoxWidth = 150;
									const mainBoxX = 100 - mainBoxWidth / 2;
									const mainBoxCenter = 100;
									const subCount = step.sub.length;
									const totalSubWidth = 350;
									const gap = 16;
									const subWidth = subCount > 0 ? (totalSubWidth - (subCount - 1) * gap) / subCount : 0;
									const subStartX = mainBoxX + mainBoxWidth + 40;

									// Move notes down slightly (e.g. +8 -> +16)
									const notesYOffset = 16;

									return (
										<g key={idx}>
											{/* Main box */}
											<rect
												x={mainBoxX}
												y={y}
												width={mainBoxWidth}
												height={stepBoxHeight}
												rx={6}
												fill={step.bg}
												stroke={step.border}
												strokeWidth={2}
											/>
											<text
												x={mainBoxCenter}
												y={y + stepBoxHeight / 2 + 5}
												textAnchor="middle"
												fontSize="14.52"
												fontWeight="bold"
												fill="#333"
												fontFamily="sans-serif"
												style={{ pointerEvents: 'none' }}
											>
												{step.title}
											</text>
											{/* Arrow and sub-boxes */}
											{step.sub.length > 0 && (() => {
												const xFirstSub = subStartX;
												return (
													<g>
														<line
															x1={mainBoxX + mainBoxWidth}
															y1={y + stepBoxHeight / 2}
															x2={xFirstSub}
															y2={y + stepBoxHeight / 2}
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
																		y={y}
																		width={subWidth}
																		height={subBoxHeight}
																		rx={6}
																		fill={step.bg}
																		stroke={step.border}
																		strokeWidth={2}
																	/>
																	<text
																		x={xSub + subWidth / 2}
																		y={y + subBoxHeight / 2 + 5}
																		textAnchor="middle"
																		fontSize="12.1"
																		fontWeight="bold"
																		fill="#333"
																		fontFamily="sans-serif"
																	>
																		{txt}
																	</text>
																</g>
															);
														})}
														{/* Notes under sub-boxes */}
														{step.notes && step.notes.length > 0 ? (
															step.notes.map((note, ni) => (
																<text
																	key={`note-${idx}-${ni}`}
																	x={subStartX}
																	y={y + subBoxHeight + notesYOffset + ni * noteLineHeight}
																	fontSize="15"
																	fill="#666"
																	fontFamily="sans-serif"
																>
																	{note}
																</text>
															))
														) : null}
													</g>
												);
											})()}
											{/* Notes for steps without sub-boxes */}
											{step.sub.length === 0 && (
												<g>
													{step.notes && step.notes.length > 0 ? (
														step.notes.map((note, ni) => (
															<text
																key={`note-${idx}-${ni}`}
																x={mainBoxX + mainBoxWidth + 40}
																y={y + stepBoxHeight + notesYOffset + ni * noteLineHeight}
																fontSize="15"
																fill="#666"
																fontFamily="sans-serif"
															>
																{note}
															</text>
														))
													) : null}
												</g>
											)}
										</g>
									);
								})}
							</g>
						);
					})()}
				</svg>
			</div>
		</div>
	);
}