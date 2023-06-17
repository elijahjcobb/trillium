/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "property-media.realgeeks.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
