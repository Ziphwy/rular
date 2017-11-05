const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const fs = require('fs');
const packageJson = require('./package.json');
const path = require('path');

function rootDirReslove(uri) {
  return path.resolve(__dirname, uri);
}

const config = {
  target: 'electron',
  context: __dirname,
  entry: {
    app: rootDirReslove('src/app/index.js'),
    process: rootDirReslove('src/background/index.js'),
  },
  output: {
    // publicPath: '/',
    path: rootDirReslove('build'),
    filename: 'js/[name].[chunkhash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          rootDirReslove('src/app'),
          rootDirReslove('src/commons'),
          rootDirReslove('src/background'),
        ],
      },
      {
        test: /\.(jpe?g|png|ttf)/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          outputPath: 'assets',
          name: '[name].[hash:5].[ext]',
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
      chunks: ['app'],
      title: 'Rular',
      filename: 'page/app.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['process'],
      title: 'Rular-Process',
      filename: 'page/process.html',
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new CleanWebpackPlugin(rootDirReslove('dist')));
  config.plugins.push(new CleanWebpackPlugin(rootDirReslove('build')));
  config.plugins.push(new CopyWebpackPlugin([
    { from: './src/main-process', to: 'main-process' },
    { from: './src/icon', to: 'icon' },
    { from: './src/index.js', to: 'index.js' },
  ]));
  config.plugins.push({
    apply(compiler) {
      compiler.plugin('done', () => {
        const { name, version, description, main, author, license, repository, build } = packageJson;
        const buildPackage = { name, version, description, main, author, license, repository, build };
        fs.writeFileSync(rootDirReslove('build/package.json'), JSON.stringify(buildPackage));
      });
    },
  });
} else {
  config.plugins.push(new FriendlyErrorsWebpackPlugin());
  config.devtool = 'eval';
  config.devServer = {
    port: 8000,
    noInfo: true,
  };
}

module.exports = config;

