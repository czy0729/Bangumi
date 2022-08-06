/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:14:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 12:52:15
 */
import { AnyObject } from '@types'

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
  data?: object
  headers?: {
    [key: string]: string
  }
  responseType?: '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text'
  withCredentials?: boolean
  showLog?: boolean
}
