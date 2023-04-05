module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin'
      // ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
      // ['@babel/plugin-proposal-class-properties', { loose: true }]
      // ['babel-plugin-react-docgen-typescript', { exclude: 'node_modules' }]
    ]
  }
}
