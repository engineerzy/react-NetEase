const path = require('path');
const os = require('os');
const Happypack = require('happypack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const envsConfig = require('./env-config');
const happyThreadPool = Happypack.ThreadPool({size: os.cpus().length});


const entry = {
	app: path.resolve(__dirname, '../src/main')
}

const rulesBase = [
	{
		test: /\.(js|jsx|ts|tsx)$/,
		use: {
			loader: 'happypack/loader?id=babel',
		},
		exclude: /node_modules/
	},
	{
		test: /\.(png|jpe?g|gif|svg|xlsx|zip)$/,
		loader: 'file-loader',
		options: {
			outputPath: 'assets/images'
		}
	},
	{
		test: /\.(css|scss)$/,
		use: [
			{
				loader: MiniExtractPlugin.loader,
				options: {
					module: true
				}
			},
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '[name]_[local]--[hash:base64:5]'
					}
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: [require('autoprefixer')]
				}
			},
			'sass-loader',
			{
				loader: 'sass-resources-loader',
				options: {
					resources: path.resolve(__dirname, '../src/assets/style/variable.scss')
				}
			}
		]
	}
]

const plugins = [
	// 打包进度条
	new ProgressBarPlugin(),
	// 打包之前清除dist目录
	new CleanWebpackPlugin(),
	// 抽离css文件，避免打包到一个文件中，
	new MiniExtractPlugin({
		ignoreOrder: true,
		filename: 'assets/css/[name].[contenthash:8].css',
		chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
	}),
	// 多进程打包js,ts文件，提高打包效率
	new Happypack({
		id: 'babel',
		loaders: [{
			path: 'babel-loader',
			query: {
				presets: ['@babel/preset-react'],
			},
		}],
		//共享进程池
		threadPool: happyThreadPool,
		//允许 HappyPack 输出日志
		verbose: true
	}),
	// 将打包后bundle注入到模板html中
	new HtmlWebpackPlugin({
		title: 'my app',
		template: path.resolve(__dirname, '../public/index.html')
	}),
	// 压缩css文件
	new OptimizeCssWebpackPlugin({})
]

module.exports = {
	rules: rulesBase,
	plugins,
	entry
}
