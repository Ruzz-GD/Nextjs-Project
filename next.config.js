// next.config.js
module.exports = {
  images: {
    domains: ['i.pravatar.cc'], // Allow external image domain
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: false, // Temporary redirect
      },
    ];
  },
};
