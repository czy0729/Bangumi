/*
 * @Author: czy0729
 * @Date: 2023-04-10 15:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 15:41:54
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
  const config = {
    viewMode: 'story',

    // params
    ...Object.entries(params || {})
      .filter(([key]) => !key.startsWith('_'))
      .reduce((obj, [key, value]) => {
        obj[key] = value
        return obj
      }, {}),

    // CatalogDetail -> catalogdetail -- CatalogDetail -> catalog-detail
    id: `screens-${routeName.toLowerCase()}--${routeName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()}`
  }
  const url = `iframe.html?${urlStringify(config)}`

  window.history.pushState({}, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
