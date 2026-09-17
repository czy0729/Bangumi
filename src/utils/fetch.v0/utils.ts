/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 22:47:51
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

import type { Config, RequestConfig } from './types'

export async function request<T>(
  url: string,
  data?: object,
  config: RequestConfig = {
    timeout: 8000,
    auth: true,
    onError: () => {}
  }
): Promise<T> {
  checkDenied(url, true)

  try {
    // 随机数防止接口 CDN 缓存
    url += `${url.includes('?') ? '&' : '?'}${urlStringify({
      app_id: APP_ID,
      state: getTimestamp()
    })}`

    const requestConfig: Config = {
      method: !!data && typeof data === 'object' ? 'post' : 'get',
      url,
      headers: {},

      // timeout 此前声明但从未透传, axios 默认永不超时, 网络挂起时请求会永久悬挂
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

    const proxyResult = applyProxy(requestConfig.url, requestConfig.headers)
    requestConfig.url = proxyResult.url
    requestConfig.headers = proxyResult.headers
    logProxy('fetch.v0', proxyResult.proxyType, url, requestConfig.url)

    const { data: responseData } = (await axios(requestConfig)) as {
      data: Record<string, unknown>
    }
    return safe(responseData) as T
  } catch (ex) {
    if (typeof config?.onError === 'function') config.onError(ex as Error)
    return {} as T
  }
}
