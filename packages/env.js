/**
 * 开发环境切换脚本
 *
 * 功能说明：
 * - 一键切换 React Native 项目的 iOS/Android/Web 开发环境
 * - 自动管理 package.json、node_modules、babel.config.js、app.json 等配置文件
 * - 不同平台使用不同的依赖和配置，通过此脚本统一管理
 *
 * 使用方法：
 *   yarn env [ios | android | ipa | web]
 *
 * 工作原理：
 * 1. 将当前环境的 package.json 和 node_modules 备份到 packages/{env}/ 目录
 * 2. 将目标环境的 package.json 和 node_modules 恢复到根目录
 * 3. 根据目标平台更新 babel.config.js 和 app.json 配置
 *
 * 注意事项：
 * - 若非 mac 环境，切换前请关闭编辑器，避免 node_modules 被占用
 * - 主分支以 ios 环境代码为准，提交 git 前务必切回 ios 环境
 *
 * @Author: czy0729
 * @Date: 2023-10-04 19:53:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-10 16:30:20
 */

const fs = require('fs')
const path = require('path')

// ==================== 常量定义 ====================

/** 支持的环境列表 */
const SUPPORTED_ENVS = ['android', 'ios', 'web', 'ipa']

/** 根目录配置文件路径 */
const ROOT_PATHS = {
  packageJson: './package.json',
  nodeModules: './node_modules',
  babelConfig: './babel.config.js',
  appJson: './app.json'
}

/** 平台特定配置 */
const PLATFORM_CONFIG = {
  ios: {
    /** iOS 需要额外添加的 Expo 插件 */
    plugins: ['expo-asset', 'expo-font', 'expo-web-browser']
  },
  android: {
    /** Android 需要额外添加的 Expo 插件（当前为空） */
    plugins: []
  }
}

/** 所有平台特定的插件列表（用于判断是否需要移除） */
const ALL_PLATFORM_PLUGINS = [...PLATFORM_CONFIG.ios.plugins, ...PLATFORM_CONFIG.android.plugins]

/** expo-calendar 插件配置（所有平台都需要） */
const CALENDAR_PLUGIN = [
  'expo-calendar',
  { calendarPermission: 'The app needs to access your calendar.' }
]

// ==================== 工具函数 ====================

/**
 * 输出带时间戳的日志
 * @param {string} tag - 日志标签
 * @param {string} message - 日志内容
 */
function log(tag, message) {
  console.info(`[${tag}] ${message}`)
}

/**
 * 检查插件是否已存在
 * @param {Array} plugins - 插件列表
 * @param {string} pluginName - 插件名称
 * @returns {boolean}
 */
function hasPlugin(plugins, pluginName) {
  return plugins.some(plugin => {
    const name = Array.isArray(plugin) ? plugin[0] : plugin
    return name === pluginName
  })
}

/**
 * 获取插件名称
 * @param {string|Array} plugin - 插件配置
 * @returns {string}
 */
function getPluginName(plugin) {
  return Array.isArray(plugin) ? plugin[0] : plugin
}

// ==================== 配置更新函数 ====================

/**
 * 更新 babel.config.js
 *
 * Android 需要 react-native-reanimated/plugin，iOS 不需要
 * @param {string} target - 目标平台
 */
function updateBabelConfig(target) {
  const { babelConfig } = ROOT_PATHS

  if (!fs.existsSync(babelConfig)) {
    log('babel', '配置文件不存在，跳过')
    return
  }

  let content = fs.readFileSync(babelConfig, 'utf-8')
  const reanimatedPlugin = "'react-native-reanimated/plugin'"
  const hasReanimated = content.includes(reanimatedPlugin)

  if (target === 'android' && !hasReanimated) {
    // Android: 添加 reanimated plugin
    content = content.replace(/plugins:\s*\[/, `plugins: [${reanimatedPlugin},`)
    fs.writeFileSync(babelConfig, content)
    log('babel', '添加 react-native-reanimated/plugin (Android)')
  } else if (target !== 'android' && hasReanimated) {
    // iOS: 移除 reanimated plugin
    content = content.replace(/'react-native-reanimated\/plugin',?\s*/, '')
    fs.writeFileSync(babelConfig, content)
    log('babel', '移除 react-native-reanimated/plugin (iOS)')
  }
}

/**
 * 更新 app.json
 *
 * 根据目标平台：
 * - 更新 platforms 数组
 * - 添加/移除平台特定的 Expo 插件
 * @param {string} target - 目标平台
 */
function updateAppJson(target) {
  const { appJson: appJsonPath } = ROOT_PATHS

  if (!fs.existsSync(appJsonPath)) {
    log('app.json', '配置文件不存在，跳过')
    return
  }

  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'))
  const platformTarget = target === 'ipa' ? 'ios' : target
  const config = PLATFORM_CONFIG[platformTarget] || { plugins: [] }

  // 确保 expo 配置存在
  if (!appJson.expo) appJson.expo = {}
  if (!appJson.expo.plugins) appJson.expo.plugins = []

  const { plugins } = appJson.expo

  // 1. 确保 expo-calendar 插件存在
  if (!hasPlugin(plugins, 'expo-calendar')) {
    plugins.push(CALENDAR_PLUGIN)
    log('app.json', '添加 expo-calendar 插件')
  }

  // 2. 添加当前平台需要的插件
  for (const plugin of config.plugins) {
    if (!hasPlugin(plugins, plugin)) {
      plugins.push(plugin)
      log('app.json', `添加 ${plugin} 插件 (${target})`)
    }
  }

  // 3. 移除当前平台不需要的平台特定插件
  appJson.expo.plugins = plugins.filter(plugin => {
    const pluginName = getPluginName(plugin)

    // 保留 expo-calendar 和非平台特定插件
    if (pluginName === 'expo-calendar' || !ALL_PLATFORM_PLUGINS.includes(pluginName)) {
      return true
    }

    // 检查是否是当前平台需要的插件
    const isNeeded = config.plugins.includes(pluginName)
    if (!isNeeded) {
      log('app.json', `移除 ${pluginName} 插件 (${target})`)
    }
    return isNeeded
  })

  // 4. 更新 platforms 数组
  if (platformTarget === 'android') {
    appJson.expo.platforms = ['android']
  } else if (platformTarget === 'ios') {
    appJson.expo.platforms = ['ios']
  }

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2))
  log('app.json', `配置已更新 (${target})`)
}

// ==================== 主逻辑函数 ====================

/**
 * 备份当前环境配置到 packages 目录
 *
 * 将根目录的 package.json 和 node_modules 移动到
 * packages/{当前环境}/ 目录下保存
 * @param {string} currentEnv - 当前环境名称
 */
function backupCurrentEnv(currentEnv) {
  const currentPackageJson = `./packages/${currentEnv}/package.json`
  const currentNodeModules = `./packages/${currentEnv}/node_modules`

  // 备份 package.json
  fs.copyFileSync(ROOT_PATHS.packageJson, currentPackageJson)
  log('backup', `package.json -> packages/${currentEnv}/`)

  // 备份 node_modules（如果目标目录不存在）
  if (fs.existsSync(ROOT_PATHS.nodeModules) && !fs.existsSync(currentNodeModules)) {
    fs.renameSync(ROOT_PATHS.nodeModules, currentNodeModules)
    log('backup', `node_modules -> packages/${currentEnv}/`)
  }
}

/**
 * 恢复目标环境配置到根目录
 *
 * 将 packages/{目标环境}/ 的 package.json 和 node_modules
 * 移动到根目录
 * @param {string} targetEnv - 目标环境名称
 */
function restoreTargetEnv(targetEnv) {
  const targetPackageJson = `./packages/${targetEnv}/package.json`
  const targetNodeModules = `./packages/${targetEnv}/node_modules`

  // 恢复 package.json
  if (fs.existsSync(targetPackageJson)) {
    fs.copyFileSync(targetPackageJson, ROOT_PATHS.packageJson)
    log('restore', `packages/${targetEnv}/package.json -> 根目录`)
  }

  // 恢复 node_modules
  if (fs.existsSync(targetNodeModules) && !fs.existsSync(ROOT_PATHS.nodeModules)) {
    fs.renameSync(targetNodeModules, ROOT_PATHS.nodeModules)
    log('restore', `packages/${targetEnv}/node_modules -> 根目录`)
  }
}

// ==================== 脚本入口 ====================

/**
 * 主函数
 * 执行环境切换流程
 */
function main() {
  const { packageJson: packageJsonPath } = ROOT_PATHS

  // 步骤 1: 获取当前环境并备份
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    let currentEnv = packageJson.name

    // 兼容旧的命名（bangumi-pro -> ios）
    if (currentEnv === 'bangumi-pro') currentEnv = 'ios'

    log('env', `当前环境: ${currentEnv}`)

    if (SUPPORTED_ENVS.includes(currentEnv)) {
      backupCurrentEnv(currentEnv)
    }
  }

  // 步骤 2: 获取目标环境并恢复
  const targetEnv = process.argv[2]

  if (!SUPPORTED_ENVS.includes(String(targetEnv).trim())) {
    log('error', `不支持的环境: ${targetEnv}`)
    log('info', `支持的环境: ${SUPPORTED_ENVS.join(', ')}`)
    process.exit(1)
  }

  log('env', `目标环境: ${targetEnv}`)

  // 恢复目标环境配置
  restoreTargetEnv(targetEnv)

  // 步骤 3: 更新平台特定配置
  updateBabelConfig(targetEnv)
  updateAppJson(targetEnv)

  log('done', '环境切换完成')
}

// 执行主函数
main()
