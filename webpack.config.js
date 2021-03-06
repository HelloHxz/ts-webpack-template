/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const utils = require('./scripts/utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = function start(env) {
  const nodeEnv = env.env || 'dev';
  const distOutPutPath = path.resolve(__dirname, `dist/${nodeEnv}`);
  const action = env.action || 'start';
  const routerType = env.routertype || 'hash'; // hash || history
  const isBuild = action === 'build';

  let plugins = [new HtmlWebpackPlugin({
    filename: `index.html`,
    template: `./index.html`,
    inject: 'body',
    chunks: ['index'],
    hash: true,
  })];

  if (isBuild) {
    utils.rmdirSync(distOutPutPath);
  } else {
    const openurl = env.openurl || '';
    if (openurl.length > 0) {
      plugins.push(new OpenBrowserPlugin({ url: openurl }));
    }
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    context: path.resolve(__dirname, 'demo'),
    mode: ['development', 'production', 'none'].indexOf(nodeEnv) < 0 ? 'development' : nodeEnv,
    entry: {
      index: ['babel-polyfill', './index.ts'],
    },
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: !isBuild ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
      path: distOutPutPath,
      publicPath: routerType === 'history' ? '/' : './',
    },

    performance: {
      hints: !isBuild ? false : 'warning'
    },

    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
    devtool: isBuild ? 'cheap-module-source-map' : '#source-map',
    devServer: {
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
    },
    resolve: {
      // DefinePlugin的一种开发变量注入的替代方案 编译时不同环境加在不同代码文件的方案
      extensions: [`.${nodeEnv}.ts`, `.${routerType}.ts`, '.ts','.js'],
      alias: {
        "star-web": path.resolve(__dirname, './'),
      },
    },
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({
                }),
              ],
            },
          }],
      },
      {
        test: require.resolve('jquery'),
        use: [{
           loader: 'expose-loader',
           options: 'jQuery'
        },{
           loader: 'expose-loader',
           options: '$'
        }]
     },
      {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader?limit=6144&name=imgs/[path][name].[ext]',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: loader => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('autoprefixer')({
              }),
            ],
          },
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        }],
      }],
    },

    plugins,
  };
};