const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(jsx)$/, use: 'babel-loader' },
      { test: /\.(css)$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif)$/i, use: [{ loader: 'file-loader' }] },
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ]
}