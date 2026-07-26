/*
 * @Author: czy0729
 * @Date: 2026-07-26 15:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 15:28:25
 */
type AxiosFunction = <T = any>(config: {
  method?: 'get' | 'post'
  url: string
  headers?: {
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded'
    'User-Agent'?: string
    Authorization?: string
    Referer?: string
  }
  data?: Record<string, any> | string
  responseType?: 'arraybuffer'
}) => Promise<{ status: number; request: any; data: T; headers: Record<string, string> }>

type AxiosExtensions = {
  defaults: {
    withCredentials?: boolean
    timeout?: number
  }
  head: (url: string) => Promise<{ status: number; headers: Record<string, string> }>
}

export type CustomAxios = AxiosFunction & AxiosExtensions
