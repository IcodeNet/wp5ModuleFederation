const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// use the following directive to have intellisense
/** @type {import('webpack').Configuration} */
module.exports = {
  output: {
    publicPath: 'http://localhost:3002/',
  },
  devtool: 'source-map',

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'logic',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './analyticsFunc': './src/analyticsFunc',
        './arrayValue': './src/arrayValue',
        './classExport': './src/classExport',
        './objectValue': './src/objectValue',
        './singleValue': './src/singleValue',
      },
      shared: [],
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
