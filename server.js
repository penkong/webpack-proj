const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig))); //for dev
app.listen(3050,()=> console.log('listening'));