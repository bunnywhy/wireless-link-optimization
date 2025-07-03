/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages - update this with your repository name
  basePath:
    process.env.NODE_ENV === 'production' ? '/wireless-link-optimization' : '',
  assetPrefix:
    process.env.NODE_ENV === 'production' ? '/wireless-link-optimization/' : ''
}

module.exports = nextConfig
