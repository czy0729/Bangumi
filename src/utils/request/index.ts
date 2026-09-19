/*
 * @Author: czy0729
 * @Date: 2026-09-19 09:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:34:15
 *
 * 请求层唯一实现: fetch.v0 / fetch.p1 共用, 模块差异由 RequestOptions 声明
 *  - checkDenied 在请求前调用
 *  - applyProxy 每请求实时读代理策略, 不可缓存
 *  - 失败时返回 {} as T 而非抛错, 上层按响应体的 data 数组判定有效性
 *  - Authorization 只认 config.auth 真值
 */
import { applyProxy, logProxy } from '@utils/proxy'
import { WEB } from '@constants'
import { APP_ID } from '@constants/app'
import { UA } from '@constants/env'
import { syncUserStore } from '../async'
import { safe } from '../fetch'
import { checkDenied } from '../fetch/utils'
import { axios } from '../thirdParty'
import { getTimestamp, urlStringify } from '../utils'

import type { Config, RequestConfig, RequestOptions } from './types'

/** 缺省超时 */
export const DEFAULT_TIMEOUT = 8000

/** 缺省配置: 每次调用返回新对象 */
function defaultConfig(): RequestConfig {
  return {
    timeout: DEFAULT_TIMEOUT,
    auth: true,
    onError: () => {}
  }
}

function defaultOptions(): RequestOptions {
  return {
    tag: '',
    state: false,
    html: false
  }
}

export async function request<T>(
  url: string,
  data?: object,
  config: RequestConfig = defaultConfig(),
  options: RequestOptions = defaultOptions()
): Promise<T> {
  checkDenied(url, true)

  const { tag, state, html } = options

  try {
    // 随机数防止接口 CDN 缓存
    const requestUrl = state
      ? `${url}${url.includes('?') ? '&' : '?'}${urlStringify({
          app_id: APP_ID,
          state: getTimestamp()
        })}`
      : url

    const requestConfig: Config = {
      method: !!data && typeof data === 'object' ? 'post' : 'get',
      url: requestUrl,
      headers: {},

      // 透传给 axios; 不传时 axios 永不超时
      timeout: config.timeout
    }

    if (!WEB) {
      requestConfig.headers['User-Agent'] = UA
    }

    if (config.auth) {
      const { accessToken } = syncUserStore()
      if (accessToken.access_token) {
        requestConfig.headers.Authorization = `${accessToken.token_type} ${accessToken.access_token}`
      }
    }

    if (requestConfig.method === 'post') {
      requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // POST 数据实际为键值字符串对象, urlStringify 要求索引签名, object 需显式收窄
      requestConfig.data = urlStringify(data as Record<string, string | number | boolean>)
    }

    const proxyResult = applyProxy(requestConfig.url, requestConfig.headers, html)
    requestConfig.url = proxyResult.url
    requestConfig.headers = proxyResult.headers
    logProxy(tag, proxyResult.proxyType, url, requestConfig.url)

    const { data: responseData } = (await axios(requestConfig)) as {
      data: Record<string, unknown>
    }
    return safe(responseData) as T
  } catch (ex) {
    if (typeof config?.onError === 'function') config.onError(ex as Error)
    return {} as T
  }
}
