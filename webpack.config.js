var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var data = require('./site/data');

module.exports = {
  entry: "./site/entry.js",
  output: {
    filename: "bundle.js",
    path: __dirname,
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.css/,
        loader: 'css-loader!cssnext-loader'
      }
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
  ],
  cssnext: {
    compress: true,
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false
    }
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map'
};
