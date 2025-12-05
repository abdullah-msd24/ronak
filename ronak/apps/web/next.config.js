module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Allow images from Cloudinary
  },
  env: {
    API_URL: process.env.API_URL, // API URL for backend
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};