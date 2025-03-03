/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  images: {
    domains: ["res.cloudinary.com"], // 🔹 Permite imágenes desde Cloudinary
  },
};

module.exports = nextConfig;
