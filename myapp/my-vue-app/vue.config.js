const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, 'dist'),
  configureWebpack: {
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].filename = 'index.html';
      return args;
    });
  },
};
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vtk.js': path.resolve(__dirname, 'node_modules/@kitware/vtk.js'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'node_modules/@kitware/vtk.js'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  },
};
