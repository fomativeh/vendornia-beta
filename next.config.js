/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com", "encrypted-tbn0.gstatic.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
