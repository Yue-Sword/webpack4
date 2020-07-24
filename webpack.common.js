const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            transformAssetUrls: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: ['xlink:href', 'href'],
              use: ['xlink:href', 'href']
            }
          }
        }
      },
      // 加载css样式
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              // hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader'
          // 'postcss-loader'
        ]
      },
      // 加载图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
        'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 每次构建前清理 /dist 文件夹(https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional);参数为对象类型，默认删除'dist'文件夹下的内容
    new CleanWebpackPlugin(),
    // 自动生成index.html,自动引入多个输出的bundle.js
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html'
    }),
    new CopyPlugin([
      { from: 'static', to: 'static' }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      // chunkFilename: '[id].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'style',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'vue$': 'vue/dist/vue.common.js',
      '@utils': resolve('/src/utils')
    }
  }
};
