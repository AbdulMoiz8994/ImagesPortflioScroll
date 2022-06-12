const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

// next.js configuration

const nextConfig = {
  images: {
    domains: ["admin.sfkshop.gr", "sfkshop.gr", "nitrocdn.com", "myventema.gr"],
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // trailingSlash: true,
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
