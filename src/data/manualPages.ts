/**
 * Search metadata for each manual page: the <title> ("<title> - PIVtools"), the description shown under it in search
 * results, and the path the sitemap lists.
 *
 * Its own file, not ManualNavigation.tsx: that is a client module, and a plain
 * value exported from one arrives in a server module as a proxy, not the value.
 * A new manual page needs an entry here and a layout.tsx calling manualMetadata.
 */
import type { Metadata } from "next";
import { OPEN_GRAPH_BASE } from "./site";

export interface ManualPage {
  /** Route segment under /manual; "" is the manual's overview page. */
  slug: string;
  title: string;
  description: string;
}

export const MANUAL_PAGES: ManualPage[] = [
  {
    slug: "",
    title: "Manual",
    description:
      "The PIVtools manual: complete PIV processing from raw images to publication-ready results. GUI and CLI interfaces share the same engine.",
  },
  {
    slug: "quick-start",
    title: "Quick Start",
    description: "From pip install to your first PIV velocity field in four steps. No compiler required.",
  },
  {
    slug: "cli-reference",
    title: "CLI Reference",
    description:
      "Complete command-line reference for pivtools-cli: every command, common workflows, transform operations and environment variables.",
  },
  {
    slug: "image-configuration",
    title: "Image Configuration",
    description:
      "Configure image paths, file formats, camera setup and frame pairing for PIV processing in PIVtools.",
  },
  {
    slug: "masking",
    title: "PIV Image Masking",
    description:
      "Define regions to exclude from PIV processing. Masked regions produce zero-valued vectors in output fields.",
  },
  {
    slug: "preprocessing",
    title: "PIV Image Pre-Processing",
    description:
      "Build PIV image filter stacks to improve correlation quality, with a side-by-side raw vs. processed comparison.",
  },
  {
    slug: "piv-processing",
    title: "PIV Processing",
    description: "Configure multi-pass cross-correlation for instantaneous or ensemble PIV analysis.",
  },
  {
    slug: "planar-calibration",
    title: "Planar PIV Calibration",
    description:
      "Convert PIV pixel displacements to velocity in m/s with a scale factor, dotboard or ChArUco target and a pinhole or polynomial camera model.",
  },
  {
    slug: "stereo-calibration",
    title: "Stereo PIV Calibration",
    description:
      "Calibrate stereo camera pairs for three-component (3C) PIV velocity measurements with a dotboard, ChArUco or stepped board.",
  },
  {
    slug: "stepped-calibration",
    title: "Stepped Board Calibration",
    description:
      "Calibrate stereo or single-camera PIV setups with a stepped board, a target with two Z-levels that gives genuine depth information.",
  },
  {
    slug: "calibration-quality",
    title: "Calibration Quality",
    description:
      "What calibration images to shoot, how to read the RMS and parameter numbers, and what the PIVtools camera model file means.",
  },
  {
    slug: "global-coordinates",
    title: "Global Coordinates",
    description: "Express every PIV camera in one shared physical reference frame, for each calibration board type.",
  },
  {
    slug: "results-viewer",
    title: "Results Viewer",
    description:
      "Visualise PIV vector fields interactively: inspect data, apply transforms, merge cameras and compute statistics.",
  },
  {
    slug: "transforms",
    title: "Vector Transforms",
    description:
      "Rotate, flip and scale PIV vector fields to correct camera orientations, align multi-camera setups or convert units.",
  },
  {
    slug: "merging",
    title: "Vector Merging",
    description:
      "Combine PIV vector fields from multiple cameras into one seamless field with smooth transitions across the overlap.",
  },
  {
    slug: "statistics",
    title: "Vector Statistics",
    description:
      "Calculate mean velocities, Reynolds stresses, turbulent kinetic energy and vortex detection metrics from PIV time series.",
  },
  {
    slug: "video-maker",
    title: "Video Maker",
    description:
      "Create MP4 videos from instantaneous PIV data with custom colormaps, resolution and encoding quality.",
  },
  {
    slug: "developer",
    title: "Developer Guide",
    description: "Build PIVtools from source, modify the GUI, and contribute to the project.",
  },
];

/** Metadata for one manual page; throws on an unknown slug so a missing entry fails the build. */
export function manualMetadata(slug: string): Metadata {
  const page = MANUAL_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`No MANUAL_PAGES entry for /manual/${slug}`);
  const path = slug ? `/manual/${slug}` : "/manual";
  return {
    // Absolute: the manual layout sets a plain-string title, and that stops the
    // root "%s - PIVtools" template reaching the pages nested under it.
    title: { absolute: `${page.title} - PIVtools` },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      title: `${page.title} - PIVtools`,
      description: page.description,
      url: path,
    },
  };
}
