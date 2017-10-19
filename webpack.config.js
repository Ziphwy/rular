const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'electron',
  context: __dirname,
  entry: {
    app: './src/app/index.js',
    process: './src/background-process/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].[chunkhash:5].js',
  },
  // externals: [
  //   function deal(context, request, callback) {
  //     if (/electron/.test(request)) {
  //       return callback(null, `require('${request}')`);
  //     }
  //     return callback();
  //   },
  // ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.(jpe?g|png|ttf)/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:5].[ext]',
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/app/index.html'),
      chunks: ['app'],
      filename: 'app.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/background-process/index.html'),
      chunks: ['process'],
      filename: 'process.html',
    }),
  ],
  devtool: 'eval',
  devServer: {
    port: 8000,
  },
};

