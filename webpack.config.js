const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './client/src/app.jsx',
  devtool: 'inline-source-map',
  // devServer: {
  //   proxy: {
  //     '/': 'http://localhost:3001',
  //   },
  //   contentBase: './client/dist',
  //   hot: true,
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Development',
    template: './public/index.html',
  })],
  // plugins: [new MiniCssExtractPlugin()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
    clean: true,
  },
};