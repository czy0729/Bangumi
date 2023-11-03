/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-19 22:54:10
 */
module.exports = function (api) {
  api.cache(true)

  const config = {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin']
  }

  if (process.env.STORYBOOK) {
    config.plugins.push(
      '@babel/plugin-transform-export-namespace-from',
      ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
      // ['babel-plugin-react-docgen-typescript', { exclude: 'node_modules' }]
    )
  }

  return config
}
