/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 07:28:16
 */
import Axios from './axios'

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
}) => Promise<{ status: any; request: any; data: T; headers: any }>

type AxiosExtensions = {
  defaults: {
    withCredentials?: boolean
    timeout?: number
  }
}

type CustomAxios = AxiosFunction & AxiosExtensions

const axiosInstance: CustomAxios = (config: any) => {
  // @ts-expect-error
  return Axios(config)
}

axiosInstance.defaults = {
  withCredentials: false,
  timeout: 8000
}

export { axiosInstance as axios }
