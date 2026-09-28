import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A second dev server or a build can use its own folder, so it never
  // overwrites the .next folder of a dev server that is already running.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  eslint: {
    ignoreDuringBuilds: true,
},
};

export default nextConfig;
