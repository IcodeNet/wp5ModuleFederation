const HtmlWebPackPlugin = require('html-webpack-plugin');

/** @type { import('webpack').Configuration} */
module.exports = {
  output: {
    publicPath: 'http://localhost:8084/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    port: 8084,
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
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
