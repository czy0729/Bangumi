/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-03 20:29:23
 */
/** Learn more https://docs.expo.io/guides/customizing-metro */
const { getDefaultConfig } = require('expo/metro-config')
const FileStore = require('metro-cache').FileStore
const path = require('path')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.cacheStores = [new FileStore({ root: path.join(__dirname, 'metro-cache') })]

const monorepoPackages = {
  stream: require.resolve('stream-browserify')
}

config.resolver.extraNodeModules = monorepoPackages
config.resolver.blacklistRE = [/packages\/.*/]
config.resolver.assetExts.push('proto', 'bin')

module.exports = config
