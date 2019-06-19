const path = require('path');
const webpack = require('webpack');

const appDirectory = __dirname;

const babelLoaderConfiguration = {
  test: /\.js$/,

  include: [
    path.resolve(appDirectory, 'index.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
  ],
   exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['react-native-web', '@babel/transform-runtime'],
      presets: ['module:react-native','@babel/preset-env',
                '@babel/react',{ 'plugins': ['@babel/plugin-proposal-class-properties']}]
    }
  }
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

  

module.exports = {
  
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  entry: path.resolve(appDirectory, 'index.js'),
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV === 'production' || true
    })
  ],

  resolve: {
        alias: {
      'react-native': 'react-native-web'
    },
    // `.web.js`.
    extensions: [ '.web.js', '.js' ],
  }
}