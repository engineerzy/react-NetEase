const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  optimization: {
    splitChunks: {
      chunks: 'async',
      maxAsyncRequests: 2, // 最大并行请求数目
      maxInitialRequests: 5, // 入口点最大请求数目
      minChunks: 2, // 拆分前必须共享模块的最小块数。
      minSize: 20000, // 生成块的最小大小（以字节为单位）。
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        // styles: {
        //   name: 'css/index',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true
        // },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      }
    }
  }
})
