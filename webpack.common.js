const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let mode = 'production';
let mode_index = 0;

process.argv.forEach((val, index) => {
  if (val === '--mode') {
    mode_index = index;
  }
});

process.env.NODE_ENV = process.argv[mode_index + 1];

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.argv[mode_index + 1],
  entry: "./src/main.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, 
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff2?|ttf|svg|pdf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: '[name]_[sha512:hash:base64:7].[ext]',
              limit: 1024 * 30,
              fallback: "file-loader"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: "An example of webpack 4 & react",
      filename: "index.html"
    }),
    new CopyPlugin([
      { from: './public' },
    ])
  ],
  devtool: isDev ? 'source-map' : undefined,
  watch: isDev ? true : false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  }
};