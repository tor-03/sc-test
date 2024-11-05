/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Static Export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

module.exports = nextConfig;
