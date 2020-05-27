module.exports = function (api) {
	api.cache(true)
	const presets = [
		[
			'@babel/preset-env',
			{
				modules: false
			}
		],
		'@babel/preset-react',
		'@babel/preset-typescript'
	]
	const plugins = [
		"@babel/plugin-transform-runtime",
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }]
	]

	return {
		presets,
		plugins
	}
}
