const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    phone: ["./build/index.js"],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js"
  },
  watchOptions: {
    poll: true
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
      '/auth': 'http://localhost:5000'
    }
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
