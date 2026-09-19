/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:33:42
 *
 * v0 接口请求 (API_V0): state=true 拼 app_id / state 防接口 CDN 缓存, html=false
 */
import { DEFAULT_TIMEOUT, request as requestCore } from '../request'

import type { RequestConfig } from '../request/types'

export async function request<T>(
  url: string,
  data?: object,
  config: RequestConfig = {
    timeout: DEFAULT_TIMEOUT,
    auth: true,
    onError: () => {}
  }
): Promise<T> {
  return requestCore<T>(url, data, config, {
    tag: 'fetch.v0',
    state: true,
    html: false
  })
}
