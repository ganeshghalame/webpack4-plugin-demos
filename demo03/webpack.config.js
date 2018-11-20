var path = require('path');

module.exports = {
  entry: {
    bundle1: './src/main1.js',
    bundle2: './src/main2.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};