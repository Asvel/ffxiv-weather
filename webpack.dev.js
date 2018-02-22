const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
            plugins: [
              ["transform-object-rest-spread", { "useBuiltIns": true }],
            ],
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './favicon.png',
    }),
  ],
  devtool: '#cheap-source-map',
  devServer: {
    contentBase: './dist',
    hot: false,
    noInfo: true,
    inline: false,
  },
};
