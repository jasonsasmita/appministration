/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/menus',
        destination: '/projects',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
