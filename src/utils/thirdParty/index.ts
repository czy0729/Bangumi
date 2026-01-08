/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-07 04:59:45
 */
import Axios from './axios'

export function axios<T = any>(config: {
  method: 'get' | 'post'
  url: string
  headers?: {
    'Content-Type'?: 'application/json'
    'User-Agent'?: string
    Authorization?: string
    Referer?: string
  }
  data?: Record<string, any>
}): Promise<{
  data: T
}> {
  // @ts-expect-error
  return Axios(config)
}
