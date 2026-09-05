/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 21:23:41
 */
/** Learn more https://docs.expo.io/guides/customizing-metro */
const fs = require('fs')
const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')
const { FileStore } = require('metro-cache')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// transform 缓存持久化到项目目录 (默认在 /tmp, 重启即丢), 二次启动 Metro 秒命中
config.cacheStores = [new FileStore({ root: path.join(__dirname, 'metro-cache') })]

const monorepoPackages = {
  stream: require.resolve('stream-browserify')
}

// Metro 0.76 不支持 package exports, cheerio 1.0 的 ./slim 子路径仅在 exports 中声明
// (require 条件 → dist/commonjs/slim.js), 无物理文件; Node 侧预算出实际路径供 resolveRequest 定向映射
const cheerioSlimPath = require.resolve('cheerio/slim')

config.resolver.extraNodeModules = monorepoPackages
// 构建产物与原生工程目录不参与解析与监听; 需锚定项目根, 否则会误伤 node_modules 内的同名目录 (如各包的 dist/)
const projectBlockList = ['dist', 'web', 'ios', 'android'].map(
  dir =>
    new RegExp(
      `${path
        .join(__dirname, dir)
        .replace(/[/\\]/g, '/')
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/.*`
    )
)
config.resolver.blockList = [/packages\/.*/, ...projectBlockList]
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
  if (moduleName === 'cheerio/slim') {
    return context.resolveRequest(context, cheerioSlimPath, platform)
  }

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

// Expo 默认 inlineRequires: false (全量模块同步 eval), 开启后模块首次使用时才执行, 首帧 eval 量大幅下降
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true
  }
})

module.exports = config
