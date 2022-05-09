const baseUrl = process.env.IS_DEVELOPMENT ? '' : '/pando'
const withImages = require('next-images')
require("dotenv").config()

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  assetPrefix: '',
  basePath: baseUrl,
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  env: {
    API_URL: 'http://localhost:4200',
  },
})

module.exports ={
  env:{
    key: process.env.REACT_APP_PINATA_KEY,
    secret: process.env.REACT_APP_PINATA_SECRET
  },
};


module.exports = nextConfig


