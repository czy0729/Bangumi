/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 06:41:38
 */
import { applyProxy, logProxy } from '@utils/proxy'
import { WEB } from '@constants'
import { APP_ID, UA } from '@constants/constants'
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
      headers: {}
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
      requestConfig.data = urlStringify(data)
    }

    const proxyResult = applyProxy(requestConfig.url, requestConfig.headers)
    requestConfig.url = proxyResult.url
    requestConfig.headers = proxyResult.headers
    logProxy('fetch.v0', proxyResult.proxyType, url, requestConfig.url)

    const { data: responseData } = await axios(requestConfig)
    return safe(responseData) as T
  } catch (ex) {
    if (typeof config?.onError === 'function') config.onError(ex)
    return {} as T
  }
}
