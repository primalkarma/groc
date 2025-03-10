import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { // Add the images section
    remotePatterns: [ // Add remotePatterns
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
