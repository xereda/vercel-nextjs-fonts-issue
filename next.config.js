const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  modifyVars: { '@primary-color': '#ff053f' },
  cssLoaderOptions: {
    // ... 
    mode: "local",
    localIdentName: "[path][name]__[local]--[hash:base64:5]",
    exportLocalsConvention: "camelCase",
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "whatever_random_class_name";
    },
  },

  webpack(config) {
    return config;
  },
});
