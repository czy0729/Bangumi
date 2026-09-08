/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 应用启动初始化（全局方法挂载与 console 重写, 拆分自 app.ts）
 */
import { FROZEN_FN } from '@constants/init'
import { DEV } from '@src/config'
import { globalLog, globalWarn, rerender } from '../dev'
import { warmUpSensitiveWords } from './sensitive'

/** 初始化全局方法和控制台重写 */
export function bootApp() {
  // 需要挂载到 global 的方法
  const GLOBAL_METHODS = {
    log: globalLog,
    warn: globalWarn,
    rerender: rerender
  }

  // 始终重写的 console 方法（生产+开发环境）
  const ALWAYS_OVERRIDE_CONSOLE = ['warn', 'error']

  // 仅在生产环境重写的 console 方法
  const PROD_ONLY_OVERRIDE_CONSOLE = ['info', 'log', 'debug', 'assert']

  // 冻结函数
  const FROZEN_FUNCTION = FROZEN_FN

  for (const [key, value] of Object.entries(GLOBAL_METHODS)) {
    global[key] = value
  }

  const consoleMethodsToOverride = [...ALWAYS_OVERRIDE_CONSOLE]
  if (!DEV) {
    consoleMethodsToOverride.push(...PROD_ONLY_OVERRIDE_CONSOLE)
  }

  consoleMethodsToOverride.forEach(method => {
    global.console[method] = FROZEN_FUNCTION
  })

  // 空闲时预热敏感词库, 避免解密阻塞启动流程
  setTimeout(warmUpSensitiveWords, 0)
}
