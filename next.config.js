module.exports = {
  env: {
    HEIMDALL_CLIENT: process.env.HEIMDALL_CLIENT,
    AUTHENTICATION_PATH: process.env.AUTHENTICATION_PATH,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};
