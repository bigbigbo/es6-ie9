const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  polyfill: path.resolve(__dirname, './src/polyfill.js'),
  main: path.resolve(__dirname, './src/index.js'),
  appNodeModules: path.resolve(__dirname, './node_modules'),
  appBuild: path.resolve(__dirname, './build'),
  appSrc: path.resolve(__dirname, './src'),
  babelConf: path.resolve(__dirname, './.babelrc'),
  html: path.resolve(__dirname, './index.html')
};

module.exports = {
  mode: 'development',
  entry: {
    polyfill: paths.polyfill,
    main: paths.main
  },
  output: {
    publicPath: '/',
    libraryTarget: 'var',
    path: paths.appBuild,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].async.js'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: paths.appBuild
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [paths.appSrc],
        use: {
          loader: 'babel-loader',
          options: {
            configFile: paths.babelConf,
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.html,
      inject: true
    })
  ],
  resolve: {
    modules: [paths.appNodeModules, 'node_modules'],
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.json', '.jsx', '.ts', '.tsx']
  },
  resolveLoader: {
    modules: [paths.appNodeModules, 'node_modules'],
    moduleExtensions: ['-loader']
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty' //eslint-disable-line
  }
};
