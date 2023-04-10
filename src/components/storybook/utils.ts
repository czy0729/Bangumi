/*
 * @Author: czy0729
 * @Date: 2023-04-10 15:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-10 22:11:28
 */
import { urlStringify } from '@utils'
import { AnyObject } from '@types'

export function parseUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const result = {}

  // @ts-expect-error
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

export function navigate(routeName: string, params: AnyObject = {}) {
  const name = routeName.toLocaleLowerCase()
  const config = {
    ...Object.entries(params || {})
      .filter(([key]) => !key.startsWith('_'))
      .reduce((obj, [key, value]) => {
        obj[key] = value
        return obj
      }, {}),
    viewMode: 'story',
    id: `screens-${name}--${name}`
  }
  const url = `iframe.html?${urlStringify(config)}`

  window.history.pushState({}, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
