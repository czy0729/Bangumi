/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-22 04:01:41
 */

/** Learn more https://docs.expo.io/guides/customizing-metro */
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
