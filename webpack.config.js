const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    phone: ["./lib/example.js"],
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
    compress: true,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public/index.html'),
      template: path.resolve(__dirname, 'index.html'),
    }),
    new DynamicCdnWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ]
}
