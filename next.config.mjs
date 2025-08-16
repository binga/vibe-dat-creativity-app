/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/vibe-dat-creativity-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vibe-dat-creativity-app/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;