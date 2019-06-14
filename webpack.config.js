const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
  entry: './src/rv.js',
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }
  ]
  }
};