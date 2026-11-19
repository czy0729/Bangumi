/*
 * @Author: czy0729
 * @Date: 2023-04-15 04:37:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 20:10:00
 */
/** Learn more https://docs.expo.io/guides/customizing-metro */
const fs = require('fs')
const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')
const { FileStore } = require('metro-cache')

// 自研 mobx DEV 开关, 与 jest.config.js 共用同一份
const { MOBX_SELF } = require('./src/utils/thirdParty/mobx/switch')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// ---------- 缓存 ----------
// transform 缓存持久化到项目目录 (默认在 /tmp, 重启即丢), 二次启动 Metro 秒命中
config.cacheStores = [new FileStore({ root: path.join(__dirname, 'metro-cache') })]

// ---------- 解析器基础 ----------
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
config.resolver.extraNodeModules = {
  stream: require.resolve('stream-browserify')
}
config.resolver.assetExts.push('proto', 'bin')

// ---------- 定向映射 ----------
// Metro 0.76 不支持 package exports, cheerio 1.0 的 ./slim 子路径仅在 exports 中声明
// (require 条件 → dist/commonjs/slim.js), 无物理文件; Node 侧预算出实际路径供 resolveRequest 定向映射
const cheerioSlimPath = require.resolve('cheerio/slim')

// expo-file-system 自 SDK 53 起把旧 API 移到 /legacy 子路径, 更早版本 (SDK 47 / 49) 根入口即旧 API。
// 本配置为 ios / android / web 三环境共用 (env.js 只切换 package.json / node_modules / babel.config.js / app.json),
// 因此以当前环境能否解析 /legacy 决定是否需要回写, expoFileSystemPath 为 null 时不做任何改写
let expoFileSystemPath = null
try {
  require.resolve('expo-file-system/legacy')
} catch {
  expoFileSystemPath = require.resolve('expo-file-system')
}

// mobx 自研过渡: 'mobx' 指向 facade (src/utils/thirdParty/mobx)。
// 与 tsconfig 的 'mobx-react' → observer 映射同一模式; 不走 tsconfig paths 是因为 facade
// 自身要回引真值包, 类型空间会自环。子路径 'mobx/dist/index.js' 不命中精确匹配, 直达真包
const mobxFacadePath = path.resolve(__dirname, 'src/utils/thirdParty/mobx')
// DEV 开关关闭时交回默认解析 (官方包), 生产构建恒用自研
const useSelfMobx = MOBX_SELF || process.env.NODE_ENV === 'production' || !!process.env.EAS_BUILD

// ---------- tsconfig paths ----------
// Metro 0.76 不支持 tsconfig paths, 从 tsconfig.json 动态读取别名映射
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
const aliasEntries = Object.entries(aliases)

// ---------- 模块解析 ----------
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolve = name => context.resolveRequest(context, name, platform)

  // mobx: 自研 facade / 官方实现 (DEV 开关)
  if (moduleName === 'mobx') return resolve(useSelfMobx ? mobxFacadePath : 'mobx')

  // cheerio/slim: exports 子路径, 无物理文件
  if (moduleName === 'cheerio/slim') return resolve(cheerioSlimPath)

  // expo-file-system/legacy: 旧 SDK 回写根入口
  if (expoFileSystemPath && moduleName === 'expo-file-system/legacy') {
    return resolve(expoFileSystemPath)
  }

  // tsconfig paths: 精确匹配优先, 再做前缀匹配
  const alias = aliases[moduleName]
  if (alias) return resolve(alias)

  for (const [key, target] of aliasEntries) {
    const prefix = `${key}/`
    if (moduleName.startsWith(prefix)) {
      return resolve(path.join(target, moduleName.slice(prefix.length)))
    }
  }

  return resolve(moduleName)
}

// ---------- transform ----------
// Expo 默认 inlineRequires: false (全量模块同步 eval), 开启后模块首次使用时才执行, 首帧 eval 量大幅下降
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true
  }
})

module.exports = config
