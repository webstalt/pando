/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/pipe',
  assetPrefix: '/pipe',
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:4200',
  },
}

module.exports = nextConfig
