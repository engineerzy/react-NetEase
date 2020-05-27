const path = require('path');
const webpackEnvs = require('./webpack.env.conf');
const webpackConfig = {
	entry: webpackEnvs.entry,
	output: {
		filename: 'app.js',
		library: 'netease',
		libraryTarget: 'umd',
		publicPath: '/', //这是一个相对路径
		path: path.resolve(__dirname, '../dist'), // 必须是绝对路径
		chunkFilename: 'chunk[name].js'
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx'],
		alias: {
			'@': path.resolve(__dirname, '../src/'),
			'@images': path.resolve(__dirname, '../src/assets/images/')
		}
	},
	module: {
		rules: webpackEnvs.rules
	},
	plugins: webpackEnvs.plugins
}

module.exports = webpackConfig
