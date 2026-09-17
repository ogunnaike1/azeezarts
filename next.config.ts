import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile sits above this folder, so pin the trace root to the project
  // itself — otherwise Next walks up and warns about an ambiguous workspace.
  outputFileTracingRoot: path.join(__dirname),

  // Lets a build run against its own output folder (NEXT_DIST_DIR=.next-build)
  // so it never fights a dev server for .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // AVIF first: paintings are large, flat-ish fields that compress well.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the `sizes` props actually ask for.
    deviceSizes: [640, 828, 1080, 1200, 1600, 1920, 2560],
    imageSizes: [64, 96, 160, 256, 384],
    // A painting's colour is the product — don't let the optimiser flatten it.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Uncomment once artwork lives in Supabase Storage or Cloudinary.
    // remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
