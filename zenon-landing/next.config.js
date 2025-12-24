/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/zenon-wtf' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/zenon-wtf/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
