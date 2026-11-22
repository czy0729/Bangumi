/*
 * @Author: czy0729
 * @Date: 2022-03-07 21:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 16:20:00
 */
import { useEffect } from 'react'
import { Alert, BackHandler, NativeModules } from 'react-native'
import { DEV } from '@src/config'
import { err } from '../fetch'
import { update } from '../kv'
import { getTimestamp } from '../thirdParty/date'
import {
  deleteAsync,
  documentDirectory,
  EncodingType,
  getInfoAsync,
  readAsStringAsync
} from '../thirdParty/file-system'

/** 原生 RestartModule 崩溃时写入的堆栈文件 */
const NATIVE_CRASH_FILE = `${documentDirectory}crash/native_crash.txt`

/** 上报摘要长度上限 */
const CRASH_SUMMARY_MAX = 400

/** 自研重启模块 (原生缺失时为 undefined) */
const Restart = NativeModules.RestartModule as { restart: () => void } | undefined

/**
 * Android 全局异常处理 (替代 react-native-exception-handler)
 *  - JS 致命异常: ErrorUtils.setGlobalHandler 整体替换默认 handler; DEV 不接管, 保留红屏
 *    (与原库 allowedInDevMode=false 一致)
 *  - 原生崩溃: 由原生 RestartModule 安装 UncaughtExceptionHandler, 堆栈落文件后自动重启,
 *    下次启动由 reportNativeCrash 清理并上报 (DEV 仅清理)
 */
export default function useErrorHandlerAndroid(): void {
  useEffect(() => {
    reportNativeCrash()

    if (DEV) return

    // 整体替换而非链式回调默认 handler: 链式会走 native 崩溃流程, 弹窗失去展示时机
    ErrorUtils.setGlobalHandler(errorHandler)
  }, [])
}

/** 上报上一次原生崩溃: 摘要写 kv 并发崩溃埋点 (只留最近一次; DEV 不污染, 仅清理文件) */
async function reportNativeCrash() {
  try {
    const info = await getInfoAsync(NATIVE_CRASH_FILE)
    if (!info.exists) return

    if (DEV) {
      await deleteAsync(NATIVE_CRASH_FILE, { idempotent: true })
      return
    }

    const stack = await readAsStringAsync(NATIVE_CRASH_FILE, {
      encoding: EncodingType.UTF8
    })
    const summary = getCrashSummary(stack)
    const id = getTimestamp()
    update(`stack_${id}`, summary)
    err(`nativeCrash stackId:${id} ${summary}`)
    await deleteAsync(NATIVE_CRASH_FILE, { idempotent: true })
  } catch (error) {
    // 读取失败不影响启动
  }
}

/** 文件内容为「时间戳\n堆栈」, 只取时间戳与堆栈首个非空行 (异常类名 + message) */
function getCrashSummary(content: string): string {
  const lines = content.split('\n')
  const timestamp = lines[0].trim()
  const head = lines.slice(1).find(line => line.trim())?.trim() ?? ''
  const summary = `${timestamp} ${head}`.trim()
  return summary.length > CRASH_SUMMARY_MAX ? summary.slice(0, CRASH_SUMMARY_MAX) : summary
}

/** JS 致命错误: 堆栈存本地, 弹窗提示重启 (开发菜单直接调用) */
export function errorHandler(e: Error, isFatal: boolean) {
  if (isFatal) {
    const id = getTimestamp()
    update(`stack_${id}`, e.stack)
    err(`stackId:${id} ${e.name} ${e.message}`)

    Alert.alert(
      '致命错误',
      [
        `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}`,
        '',
        '很抱歉，需要重新启动。若此错误稳定触发，恳请截取此屏幕并告知作者，谢谢！'
      ].join('\n'),
      [
        {
          text: '重启',
          // 原生模块缺失时兜底退出应用, 避免点击后无任何反馈
          onPress: () => {
            if (Restart?.restart) {
              Restart.restart()
            } else {
              BackHandler.exitApp()
            }
          }
        }
      ]
    )
  }
}
