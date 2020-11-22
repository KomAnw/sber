const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const publicPath = '/';
const distFolderName = 'dist';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main-[contenthash].js',
    path: path.resolve(__dirname, distFolderName),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      inject: 'body'
    }),
    new MiniCssExtractPlugin(),
    // Copy images (Html ones)
    new CopyWebpackPlugin({
      patterns: [
        { from: 'images', to: 'images' },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.handlebars$/, loader: "handlebars-loader" },
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath
          }
        }, {
          loader: 'css-loader'
        }]
      }, {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[contenthash].[ext]',
            outputPath: '/images/',
            esModule: false
          }
        }]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ],
  },
  devServer: {
    publicPath,
    contentBase: path.join(__dirname, distFolderName),
    compress: true,
    port: 5000,
    historyApiFallback: true
  }
};
