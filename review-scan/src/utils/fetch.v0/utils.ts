/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 15:41:44
 */
import { getTimestamp, urlStringify } from '@utils'
import { safe } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import { WEB } from '@constants'
import { APP_ID, UA } from '@constants/constants'
import { syncUserStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import { Config } from './types'

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
    const { accessToken } = syncUserStore()

    // 随机数防止接口CDN缓存
    url += `${url.includes('?') ? '&' : '?'}${urlStringify({
      app_id: APP_ID,
      state: getTimestamp()
    })}`

    const config: Config = {
      method: typeof data === 'object' ? 'post' : 'get',
      url,
      headers: {}
    }

    if (!WEB) {
      config.headers['User-Agent'] = UA
    }

    if (accessToken.access_token) {
      config.headers.Authorization = `${accessToken.token_type} ${accessToken.access_token}`
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
