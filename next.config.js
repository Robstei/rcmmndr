/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.scdn.co" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
