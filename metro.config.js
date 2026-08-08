/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-21 13:05:10
 */
/** Learn more https://docs.expo.io/guides/customizing-metro */
const fs = require('fs')
const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// const FileStore = require('metro-cache').FileStore
// config.cacheStores = [new FileStore({ root: path.join(__dirname, 'metro-cache') })]

const monorepoPackages = {
  stream: require.resolve('stream-browserify')
}

config.resolver.extraNodeModules = monorepoPackages
config.resolver.blacklistRE = [/packages\/.*/]
config.resolver.assetExts.push('proto', 'bin')

// Metro 0.76 不支持 tsconfig paths，从 tsconfig.json 动态读取别名映射
const { compilerOptions } = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, 'tsconfig.json'), 'utf-8')
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')
)
const { baseUrl = '.', paths = {} } = compilerOptions

const aliases = Object.entries(paths).reduce((acc, [pattern, targets]) => {
  const key = pattern.replace(/\/?\*$/, '')
  const value = path.resolve(__dirname, baseUrl, targets[0].replace(/\/?\*$/, ''))
  if (key) acc[key] = value
  return acc
}, {})

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (aliases[moduleName]) {
    return context.resolveRequest(context, aliases[moduleName], platform)
  }

  for (const key of Object.keys(aliases)) {
    const prefix = `${key}/`
    if (moduleName.startsWith(prefix)) {
      return context.resolveRequest(
        context,
        path.join(aliases[key], moduleName.slice(prefix.length)),
        platform
      )
    }
  }

  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
