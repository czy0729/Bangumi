/*
 * @Author: czy0729
 * @Date: 2026-01-20 08:06:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:32:58
 *
 * p1 接口请求 (API_P1): 不拼 app_id / state, 不带 Authorization, timeout 透传
 *  - API_P1 为 next.bgm.tv, 不属 HOST, isHtml 恒为 false
 */
import { DEFAULT_TIMEOUT, request as requestCore } from '../request'

import type { RequestConfig } from '../request/types'

export async function request<T>(
  url: string,
  data?: object,
  config: RequestConfig = {
    timeout: DEFAULT_TIMEOUT,
    onError: () => {}
  }
): Promise<T> {
  return requestCore<T>(
    url,
    data,
    { ...config, auth: false },
    {
      tag: 'fetch.p1',
      state: false,
      html: false
    }
  )
}
