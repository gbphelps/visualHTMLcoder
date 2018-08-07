const path = require('path');

module.exports = {
  context: __dirname,
  entry: './javascripts/entry.js',
  output: {
    path: path.resolve(__dirname, 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    rules: [
      exclude: /(node_modules)/,
    ]
  }
  devtool: 'source-map'
};
