import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Emit /places/1/index.html so S3 static hosting can resolve direct requests
  // to dynamic, pre-rendered routes such as /places/1/.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
