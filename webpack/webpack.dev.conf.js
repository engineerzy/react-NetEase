
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
	plugins: [
		// 启用热更新替换
		new webpack.HotModuleReplacementPlugin(),
		// 美化错误和警告信息
		new FriendlyErrorsPlugin()
	],
	devServer: {
		// 打包输出地方
		// contentBase: '../dist',
		host: '127.0.0.1',
		port: 3000,
		hot: true,
		// 不打印信息到控制台，包括错误以及警告信息，启用friendly-errors-webpack-plugin插件来输出错误及警告信息
		quiet: true,
		// 写入到磁盘
		writeToDisk: true,
		// 仅允许本机访问
		disableHostCheck: false,
		hotOnly: true,
		compress: true, // 默认 false 即不使用 gz
		clientLogLevel: 'warning',
		historyApiFallback: true // 支持history路由模式，防止在浏览器直接输入地址时报404
	}
})
