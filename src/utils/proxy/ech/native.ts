/*
 * @Author: czy0729
 * @Date: 2026-06-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 10:00:00
 */
import { NativeModules, Platform } from 'react-native'
import type { EchProxyConfig, EchProxyStatus, EchProxyLog } from './types'

const LINKING_ERROR =
  `The package 'bangumi-ech-proxy' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n'

const EchProxyModule = NativeModules.EchProxyModule
  ? NativeModules.EchProxyModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR)
        }
      }
    )

/**
 * 启动本地 ECH 代理服务
 * @returns 实际监听的端口号
 */
export async function nativeEnable(config: EchProxyConfig = {}): Promise<number> {
  if (Platform.OS !== 'android') return 0
  return EchProxyModule.enable({
    port: config.port ?? 0,
    dns: config.dns ?? 'https://cloudflare-dns.com/dns-query'
  })
}

/**
 * 停止本地 ECH 代理服务
 */
export async function nativeDisable(): Promise<void> {
  if (Platform.OS !== 'android') return
  return EchProxyModule.disable()
}

/**
 * 获取当前代理状态
 */
export async function nativeGetStatus(): Promise<EchProxyStatus> {
  if (Platform.OS !== 'android') return { running: false, port: 0 }
  return EchProxyModule.getStatus()
}

/**
 * @deprecated OkHttp 路由已通过 ProxySelector 自动处理, Java 端为 no-op。
 * 保留方法签名兼容 NativeModule 注册, JS 侧不再调用。
 */
export async function nativeSetOkHttpProxy(_port: number): Promise<void> {
  if (Platform.OS !== 'android') return
  return EchProxyModule.setOkHttpProxy(_port)
}

/**
 * @deprecated OkHttp 路由已通过 ProxySelector 自动处理, Java 端为 no-op。
 * 保留方法签名兼容 NativeModule 注册, JS 侧不再调用。
 */
export async function nativeClearOkHttpProxy(): Promise<void> {
  if (Platform.OS !== 'android') return
  return EchProxyModule.clearOkHttpProxy()
}

/**
 * 获取 Native 端收集的 ECH 日志
 */
export async function nativeGetLogs(): Promise<EchProxyLog[]> {
  if (Platform.OS !== 'android') return []
  return EchProxyModule.getLogs()
}
