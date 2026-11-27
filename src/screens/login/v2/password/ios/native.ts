/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * iOS IPA 内置原生模块 (modules/bangumi-native-http) 的调用封装
 */
import { getNativeHttpModule } from '../../../../../../modules/bangumi-native-http'

import type { LoginResponse } from '../../types'

/** 当前安装包是否带原生不跟随跳转能力 (Expo Go 为 false) */
export function hasNativeNoRedirect(): boolean {
  return !!getNativeHttpModule()
}

/**
 * 原生发一次请求, 3xx 已由原生合成 200 + JSON
 *
 * @param config 请求参数
 */
export async function nativeRequest(config: {
  url: string
  method: string
  headers: Record<string, string>
  data?: string
}): Promise<LoginResponse> {
  const nativeHttp = getNativeHttpModule()
  if (!nativeHttp) throw new Error('原生请求模块不可用')

  const { url, method, headers, data } = config
  // x-no-redirect 只是给原生/节点看的标记, 不发给上游
  const nativeHeaders: Record<string, string> = {}
  Object.keys(headers).forEach(key => {
    if (key.toLowerCase() !== 'x-no-redirect') nativeHeaders[key] = headers[key]
  })

  const response = await nativeHttp.fetchNoRedirect(url, method, nativeHeaders, data ?? null)

  return {
    status: response.status,
    headers: response.headers,
    data: response.body ?? '',
    request: { responseURL: url }
  }
}
