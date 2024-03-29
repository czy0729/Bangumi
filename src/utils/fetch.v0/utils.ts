/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 01:14:13
 */
import { getTimestamp, urlStringify } from '@utils'
import { safe } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import { STORYBOOK } from '@constants'
import { APP_ID, UA } from '@constants/constants'
import { syncUserStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import { Config } from './types'

export async function request<T>(url: string, data?: object): Promise<T> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  // @ts-expect-error
  axios.defaults.withCredentials = false

  // @ts-expect-error
  axios.defaults.timeout = 8000

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

    if (!STORYBOOK) {
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
    return {} as T
  }
}
