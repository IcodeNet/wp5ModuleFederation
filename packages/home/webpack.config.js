const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

/** @type {import('webpack').Configuration} */
module.exports = {
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
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
  resolve: {
    //the order of extensions in webpack.config.js indicates priority
    extensions: ['esm.js', '.mjs', '.js', '.jsx', '.scss', '.ts', '.tsx', '.json'],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      remotes: {
        nav: 'nav@http://localhost:3001/remoteEntry.js',
      },
      exposes: {},
      shared: {
        ...deps,
        'react': {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),

    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
