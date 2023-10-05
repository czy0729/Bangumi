/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-05 09:57:23
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

module.exports = config
