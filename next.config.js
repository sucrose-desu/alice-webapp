const { join } = require('path')

/**
 * @type {import('next').NextConfig}
 * https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig = {
  distDir: 'dist',

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  httpAgentOptions: {
    keepAlive: true
  },

  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, 'src/styles')]
  },

  async rewrites() {
    return [
      {
        source: '/services/:path*',
        destination: '/api/:path*'
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
