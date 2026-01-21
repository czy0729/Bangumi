/*
 * @Author: czy0729
 * @Date: 2026-01-20 08:06:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-20 08:07:54
 */
import { urlStringify } from '@utils'
import { safe } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import { WEB } from '@constants'
import { UA } from '@constants/constants'
import { isDevtoolsOpen } from '../dom'

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
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  axios.defaults.withCredentials = false

  // @ts-expect-error
  axios.defaults.timeout = config?.timeout || 8000

  try {
    const config: Config = {
      method: typeof data === 'object' ? 'post' : 'get',
      url,
      headers: {}
    }

    if (!WEB) {
      config.headers['User-Agent'] = UA
    }

    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = urlStringify(data)
    }

    // @ts-expect-error
    const { data: responseData } = await axios(config)
    return safe(responseData) as T
  } catch (ex) {
    if (typeof config?.onError === 'function') config.onError(ex)
    return {} as T
  }
}
