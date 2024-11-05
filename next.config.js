/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // i18n: {
  //   locales: ['it', 'en'],  // Lingue supportate
  //   defaultLocale: 'en',     // Lingua predefinita
  // },

  async headers() {
    return [
      {
        source: '/:all*(jpg|jpeg|png|gif|svg|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
