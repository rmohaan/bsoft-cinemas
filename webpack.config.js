var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client/');

var config = {
  entry: {
    bundle: APP_DIR + '/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  output: {
    path: path.join(BUILD_DIR, '/build/js'),
    filename: '[name].js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }, {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, APP_DIR)]
  },
  devtool: 'inline-source-map'
};

module.exports = config;