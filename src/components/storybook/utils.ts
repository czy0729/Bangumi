/*
 * @Author: czy0729
 * @Date: 2023-04-10 15:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 06:49:44
 */
import { appNavigate, getSPAParams } from '@utils'
import { cleanQuery } from '@utils/dom'
import { setNavigating } from './state'

import type { AnyObject } from '@types'

/** 获取所有网页参数并返回对象 */
export function parseUrlParams(): Record<string, string> {
  const params = new window.URLSearchParams(window?.location?.search)
  const result: Record<string, string> = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

/** 统一跳转函数, 不传参数等于后退 */
export function navigate(routeName?: string, params: AnyObject = {}, replace: boolean = false) {
  const { url } = params as { url?: string }
  if (routeName === 'WebBrowser' && url) {
    appNavigate(url)
    return
  }

  setNavigating(routeName === undefined ? 'POP' : replace ? 'REPLACE' : 'PUSH')
  if (!routeName) {
    window.history.back()
    return
  }

  if (replace) {
    window.history.replaceState({}, '', getSPAParams(routeName, params))
  } else {
    window.history.pushState({}, '', getSPAParams(routeName, params))
  }
  window.dispatchEvent(new window.PopStateEvent('popstate'))

  setTimeout(() => {
    cleanQuery()
  }, 400)
}

export function getCurrentStoryId() {
  const params = new window.URLSearchParams(window.location.search)
  return params.get('id')
}
