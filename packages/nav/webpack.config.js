const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = {
  output: {
    publicPath: 'http://localhost:3001/',
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    port: 3001,
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
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'nav',
      filename: 'remoteEntry.js',
      remotes: {
        // having a remote here and and in homeRecoil an exposes the atoms.js we have
        // created a bi- directional linkage between homeRecoil and nav
        // where the homeRecoil application consumes the Header from nav
        // and the nav application consumes atoms from home
        homeRecoil: 'homerecoil@http://localhost:8082/remoteEntry.js',
      },
      exposes: {
        './Header': './src/header',
        './HeaderRedux': './src/header-redux',
        './HeaderRecoil': './src/header-recoil',
        './library': './src/library',
      },
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
