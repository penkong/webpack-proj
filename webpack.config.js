var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker',
  'lodash',
  'react',
  'react-dom',
  'react-input-range',
  'react-redux',
  'react-router',
  'redux',
  'redux-form',
  'redux-thunk'
];

module.exports = {
  entry: {
    bundle : './src/index.js',
    vendor : VENDOR_LIBS //it produce vendor.js
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' //means vendor and bundle //add hash for browser to understand changes
  },
  module : {
    rules : [
      {
        use : 'babel-loader',
        test : /\.js$/,
        exclude : /node_modules/
      },
      {
        use : ['style-loader','css-loader'],
        test : /\.css$/
      }
    ]
  },
  plugins : [
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor', 'manifest'] //cause of hashing add it for browser ustand vendor change or not by manifest
    }),    //pull out duplicate and erase them.
    new HtmlWebpackPlugin({ //we make new html in src and she use as template make new html in dist
      template : 'src/index.html'
    }),  //produce new html with all new vendor and stuff
    new webpack.DefinePlugin({ //this is for deploy
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }) //reactjs search for porcessenvnodeenv , dont do error checking so much in prod
    //DEFINEPLUGIN make it available on window scope > add script of node to package 
  ]
};
