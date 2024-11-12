/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
