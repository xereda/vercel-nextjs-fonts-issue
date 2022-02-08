const jsConfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/components/*': ['src/components/*'],
      '@/utils/*': ['src/utils/*'],
      '@/styles/*': ['src/styles/*'],
      '@/mocks/*': ['src/mocks/*'],
    },
  },
  exclude: ['node_modules'],
};

export default jsConfig;