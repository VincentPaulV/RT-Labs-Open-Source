/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
}

module.exports = nextConfig
module.exports = {
  async rewrites() {
    return [
      {
        source: '/expt1/run',
        destination: 'http://localhost:3001',
      },

      {
        source: '/expt2/run',
        destination: 'http://localhost:3002',
      },
      {
        source: '/expt3/run',
        destination: 'http://localhost:3003',
      },
      {
        source: '/expt4/run',
        destination: 'http://localhost:3004',
      },
      {
        source: '/expt5/run',
        destination: 'http://localhost:3005',
      },
    ]
  },
}