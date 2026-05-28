/*
 * @Author: czy0729
 * @Date: 2026-01-20 08:06:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 07:28:23
 */
import { urlStringify } from '@utils'
import { WEB } from '@constants'
import { HOST, UA } from '@constants/constants'
import { safe } from '../fetch'
import { applyProxy, checkDenied, logProxy } from '../fetch/utils'
import { axios } from '../thirdParty'

import type { Config } from './types'

export async function request<T>(
  url: string,
  data?: object,
  config: {
    timeout?: number
    onError?: (ex: Error) => any
  } = {
    timeout: 8000,
    onError: () => {}
  }
): Promise<T> {
  checkDenied(url, true)

  try {
    const requestConfig: Config = {
      method: typeof data === 'object' ? 'post' : 'get',
      url,
      headers: {}
    }

    if (!WEB) {
      requestConfig.headers['User-Agent'] = UA
    }

    if (requestConfig.method === 'post') {
      requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      requestConfig.data = urlStringify(data)
    }

    const isHtml = requestConfig.url.includes(HOST) && !requestConfig.url.includes('api.')
    const proxyResult = applyProxy(requestConfig.url, requestConfig.headers, isHtml)
    requestConfig.url = proxyResult.url
    requestConfig.headers = proxyResult.headers
    logProxy('fetch.p1', proxyResult.proxyType, url, requestConfig.url)

    const { data: responseData } = await axios(requestConfig)
    return safe(responseData) as T
  } catch (ex) {
    if (typeof config?.onError === 'function') config.onError(ex)
    return {} as T
  }
}
