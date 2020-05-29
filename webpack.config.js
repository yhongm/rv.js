const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const {
//   CleanWebpackPlugin
// } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/yrv/yrvMain.js',
  mode: "production",
  //mode: "development",
  //devtool: 'inline-source-map',
  plugins: [
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: '',
    //   template: 'home.html',
    //   filename: 'home.html'
    // })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'yrv.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
   
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }]
  }
};