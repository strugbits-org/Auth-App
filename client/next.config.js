/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:8000",
  },
};

module.exports = nextConfig;
