/*
 * @Author: czy0729
 * @Date: 2023-04-10 15:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 17:23:41
 */
import { appNavigate, getSPAParams } from '@utils'
import { cleanQuery } from '@utils/dom'
import { AnyObject } from '@types'
import { setNavigating } from './state'

/** 获取所有网页参数并返回对象 */
export function parseUrlParams() {
  const params = new window.URLSearchParams(window?.location?.search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

/** 统一跳转函数, 不传参数等于后退 */
export function navigate(routeName?: string, params: AnyObject = {}, replace: boolean = false) {
  if (routeName === 'WebBrowser' && params?.url) {
    appNavigate(params.url)
    return
  }

  setNavigating(routeName === undefined ? 'POP' : replace ? 'REPLACE' : 'PUSH')
  if (!routeName) {
    window.history.back()
    return
  }

  window.history[replace ? 'replaceState' : 'pushState']({}, '', getSPAParams(routeName, params))
  window.dispatchEvent(new PopStateEvent('popstate'))

  setTimeout(() => {
    cleanQuery()
  }, 400)
}

export function getCurrentStoryId() {
  const params = new window.URLSearchParams(window.location.search)
  return params.get('id')
}
