/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:16:32
 */
/** Learn more https://docs.expo.io/guides/customizing-metro */
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const FileStore = require('metro-cache').FileStore
const path = require('path')
config.cacheStores = [new FileStore({ root: path.join(__dirname, 'metro-cache') })]

const monorepoPackages = {
  stream: require.resolve('stream-browserify')
}

config.resolver.extraNodeModules = monorepoPackages
config.resolver.blacklistRE = [/packages\/.*/]
config.resolver.assetExts.push('proto', 'bin')

module.exports = config
