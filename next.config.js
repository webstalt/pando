const baseUrl = process.env.IS_DEVELOPMENT ? '' : '/pando'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: baseUrl,
  assetPrefix: '',
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: baseUrl,
  },
  env: {
    API_URL: 'http://localhost:4200',
  },
}

module.exports = nextConfig
