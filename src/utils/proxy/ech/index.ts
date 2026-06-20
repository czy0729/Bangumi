/* eslint-disable no-console */
/*
 * @Author: czy0729
 * @Date: 2026-06-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-19 17:21:50
 */
import { Platform } from 'react-native'
import { systemStore } from '@stores'
import { ECH_PROXY_ENABLED } from '@src/config'
import {
  nativeDisable,
  nativeEnable,
  nativeGetLogs,
  nativeGetStatus
} from './native'

import type { EchProxyConfig, EchProxyLog, EchProxyStatus } from './types'
export type { EchProxyConfig, EchProxyLog, EchProxyStatus }

/** 当前代理端口, 0 表示未启用 */
let _port = 0

/** 是否正在运行 */
let _running = false

/**
 * 启动 ECH 代理
 * - 在 Android 上启动本地 HTTP 代理进程 (ECH + DoH)
 * - 配置 OkHttp 所有请求走本地代理
 * - iOS / Web 直接跳过
 */
export async function enableEchProxy(config: EchProxyConfig = {}): Promise<number> {
  if (Platform.OS !== 'android' || !ECH_PROXY_ENABLED) return 0

  try {
    // 启动本地代理, 返回实际端口
    // OkHttp 路由已通过 BangumiOkHttpClientFactory.ProxySelector 自动处理,
    // 不再需要 nativeSetOkHttpProxy
    _port = await nativeEnable(config)
    if (_port > 0) {
      _running = true
    } else {
      // native start 返回 0, 回滚
      await nativeDisable()
    }
    return _port
  } catch (e) {
    console.warn('[ECH] enable failed:', e)
    // 失败时回滚 native server, 防止残留
    try {
      await nativeDisable()
    } catch {}
    _port = 0
    _running = false
    return 0
  }
}

/**
 * 停止 ECH 代理, 恢复 OkHttp 直连
 */
export async function disableEchProxy(): Promise<void> {
  if (Platform.OS !== 'android') return

  try {
    await nativeDisable()
  } catch (e) {
    console.warn('[ECH] disable failed:', e)
  } finally {
    _port = 0
    _running = false
  }
}

/**
 * 获取代理端口 (同步, 读取内存缓存)
 */
export function getEchProxyPort(): number {
  return _port
}

/**
 * ECH 代理是否正在运行 (同步, 读取内存缓存)
 */
export function isEchProxyRunning(): boolean {
  return _running
}

/**
 * 客户端启动时恢复 ECH 代理状态
 * 从 systemStore.setting.echProxyEnabled 读取, 若为 true 则启动 native proxy
 */
export async function restoreEchProxy(): Promise<void> {
  if (Platform.OS !== 'android') return

  try {
    if (systemStore.setting.echProxyEnabled) {
      await enableEchProxy()
    }
  } catch {}
}

/**
 * 从 Native 侧同步真实状态 (异步, 调试用)
 */
export async function syncEchProxyStatus(): Promise<EchProxyStatus> {
  const status = await nativeGetStatus()
  _port = status.port
  _running = status.running
  return status
}

/**
 * 获取 Native 端收集的 ECH 日志
 */
export async function getEchProxyLogs(): Promise<EchProxyLog[]> {
  if (Platform.OS !== 'android' || !ECH_PROXY_ENABLED) return []
  return nativeGetLogs()
}

export { enableEchProxy as enable, disableEchProxy as disable }
