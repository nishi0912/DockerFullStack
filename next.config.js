/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    minimumCacheTTL: 60,
  },
  amp: {
    validator: "./custom_validator.js",
  },
};

module.exports = nextConfig;
