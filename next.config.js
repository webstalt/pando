const baseUrl = process.env.IS_DEVELOPMENT ? '' : '/pando'
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  assetPrefix: '',
  basePath: baseUrl,
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    loader: 'akamai',
    basePath: '',
  },
  env: {
    API_URL: 'http://localhost:4200',
  },
})

module.exports = nextConfig
