const baseUrl = process.env.IS_DEVELOPMENT ? '' : '/pando'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: baseUrl,
  assetPrefix: '',
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  env: {
    API_URL: 'http://localhost:4200',
  },
  publicRuntimeConfig: {
    basePath: baseUrl,
  },
}

module.exports = nextConfig
