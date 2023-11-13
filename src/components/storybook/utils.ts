/*
 * @Author: czy0729
 * @Date: 2023-04-10 15:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 09:04:12
 */
import { appNavigate, getSPAParams } from '@utils'
import { AnyObject } from '@types'
import { setNavigating } from './state'

/** 获取所有网页参数并返回对象 */
export function parseUrlParams() {
  const params = new URLSearchParams(window?.location?.search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

/** 统一跳转函数, 不传参数等于后退 */
export function navigate(
  routeName?: string,
  params: AnyObject = {},
  replace: boolean = false
) {
  if (routeName === 'WebBrowser' && params?.url) {
    appNavigate(params.url)
    return
  }

  setNavigating(routeName === undefined ? 'POP' : replace ? 'REPLACE' : 'PUSH')
  if (!routeName) {
    window.history.back()
    return
  }

  window.history[replace ? 'replaceState' : 'pushState'](
    {},
    '',
    getSPAParams(routeName, params)
  )
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function getCurrentStoryId() {
  const params = new window.URLSearchParams(window.location.search)
  return params.get('id')
}
