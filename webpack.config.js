const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	devtool: 'inline-source-map', // 开发调试
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: './dist',
		port: 9000,
		hot: true
	},
	mode: "development",
	module: {
		rules: [
			// 加载css样式
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
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
			},
			// 加载数据
			{
				test: /\.(csv|tsv)$/,
				use: [
					'csv-loader'
				]
			},
			{
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			}
		]
	},
	plugins: [
		// 每次构建前清理 /dist 文件夹(https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional);参数为对象类型，默认删除'dist'文件夹下的内容
		new CleanWebpackPlugin(),
		// 自动生成index.html,自动引入多个输出的bundle.js
		new HtmlWebpackPlugin({
			title: 'Hot Module Replacement'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
  };