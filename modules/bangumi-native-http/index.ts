/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 原生不跟随跳转请求 (仅 CI 打包的 IPA 内置, Expo Go 不可用)
 */
import { requireNativeModule } from 'expo-modules-core'

export type NativeHttpResult = {
  status?: number
  headers?: Record<string, string>
  body?: string
}

export type NativeHttpModule = {
  /** 发送请求, 不跟随 3xx; 3xx 由原生合成 200 + JSON {location} */
  fetchNoRedirect: (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: string | null
  ) => Promise<NativeHttpResult>
}

const MODULE_NAME = 'BangumiNativeHttp'

let moduleCache: NativeHttpModule | null | undefined

/** 获取原生模块, 不存在 (Expo Go) 时返回 null */
export function getNativeHttpModule(): NativeHttpModule | null {
  if (moduleCache === undefined) {
    try {
      moduleCache = requireNativeModule<NativeHttpModule>(MODULE_NAME)
    } catch {
      moduleCache = null
    }
  }

  return moduleCache
}
