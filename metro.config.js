// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const monorepoPackages = {
  // crypto: require.resolve('crypto-browserify'),
  // path: require.resolve('path-browserify'),
  stream: require.resolve('stream-browserify')
}

config.resolver.extraNodeModules = monorepoPackages

module.exports = config
