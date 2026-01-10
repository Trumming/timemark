/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  output: 'export',
  // If your repo is not at the root, set basePath and assetPrefix:
  // basePath: '/timemark',
  // assetPrefix: '/timemark/',
}

module.exports = nextConfig
