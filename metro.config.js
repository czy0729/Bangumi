/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 22:36:57
 */
/** Learn more https://docs.expo.io/guides/customizing-metro */
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const monorepoPackages = {
  stream: require.resolve('stream-browserify')
}

config.resolver.extraNodeModules = monorepoPackages
config.resolver.blacklistRE = [/packages\/.*/]
config.resolver.assetExts.push('proto', 'bin')

module.exports = config
