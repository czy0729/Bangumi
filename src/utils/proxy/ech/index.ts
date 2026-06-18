/*
 * @Author: czy0729
 * @Date: 2026-06-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-18 00:48:27
 */
import { Platform } from 'react-native'
import { getStorage, setStorage } from '../../storage'
import {
  nativeClearOkHttpProxy,
  nativeDisable,
  nativeEnable,
  nativeGetStatus,
  nativeSetOkHttpProxy
} from './native'

import type { EchProxyConfig, EchProxyStatus } from './types'
export type { EchProxyConfig, EchProxyStatus }

const STORAGE_KEY = 'echProxyEnabled'

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
  if (Platform.OS !== 'android') return 0

  try {
    // 启动本地代理, 返回实际端口
    _port = await nativeEnable(config)
    if (_port > 0) {
      // 让 OkHttp 走本地代理
      await nativeSetOkHttpProxy(_port)
      _running = true
      await setStorage(STORAGE_KEY, '1')
    }
    return _port
  } catch (e) {
    console.warn('[ECH] enable failed:', e)
    _port = 0
    _running = false
    return 0
  }
}

/**
 * 停止 ECH 代理, 恢复 OkHttp 直连
 */
export async function disableEchProxy(): Promise<void> {
  if (Platform.OS !== 'android' || !_running) return

  try {
    await nativeClearOkHttpProxy()
    await nativeDisable()
  } catch (e) {
    console.warn('[ECH] disable failed:', e)
  } finally {
    _port = 0
    _running = false
    await setStorage(STORAGE_KEY, '0')
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
 * App 启动时恢复 ECH 代理状态
 * 若上次退出前是开启的, 自动重新启动
 */
export async function restoreEchProxy(): Promise<void> {
  if (Platform.OS !== 'android') return

  try {
    const enabled = await getStorage(STORAGE_KEY)
    if (enabled === '1') {
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

export { enableEchProxy as enable, disableEchProxy as disable }
