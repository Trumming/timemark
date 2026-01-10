/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  output: 'export',
  basePath: '/timemark',
  assetPrefix: '/timemark/',
}

module.exports = nextConfig
