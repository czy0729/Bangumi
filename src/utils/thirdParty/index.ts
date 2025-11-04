/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-03 15:28:50
 */
import Axios from './axios'

export function axios<T = any>(config: {
  method: 'get' | 'post'
  url: string
  headers?: {
    'User-Agent'?: string
    'Content-Type'?: 'application/json'
  }
  data?: Record<string, any>
}): Promise<{
  data: T
}> {
  // @ts-expect-error
  return Axios(config)
}
