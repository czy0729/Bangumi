/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:14:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-14 01:04:39
 */
import { AnyObject } from '@types'

export type Config = {
  method?: 'GET' | 'POST'
  headers?: {
    [key: string]: any
  }
  timeout?: number
  body?: string
}

export type Body = {
  app_id: string
  state?: number
}

export type FetchAPIArgs = {
  method?: 'GET' | 'POST'
  url: string
  data?: AnyObject
  retryCb?: any
  info?: string
  noConsole?: boolean
}

export type FetchHTMLArgs = {
  method?: 'GET' | 'POST'
  url: string
  data?: AnyObject
  headers?: AnyObject
  cookie?: string
  raw?: boolean
}

export type XHRArgs = {
  method?: 'GET' | 'POST'
  url: string
  data?: AnyObject
  noConsole?: boolean
}

export type XHRCustomArgs = {
  method?: 'GET' | 'POST' | 'PUT'
  url: string
  data?: object | string
  headers?: {
    [key: string]: string
  }
  responseType?: '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text'
  withCredentials?: boolean
  showLog?: boolean
}
