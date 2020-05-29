const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/yrv/yrvMain.js',
  mode: "production",
  plugins: [

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
          // presets: ['es2015']
          presets:["@babel/preset-env"]
        }
      }
    }]
  }
};