const path = require('path');

module.exports = {
  mode: 'development',
  //Entry - точка входа наших модулей, брать их из main.js
  entry: './src/main.js',
  //Output - Описываем куда мы хотим положить свой бандл и опции
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
  }
};