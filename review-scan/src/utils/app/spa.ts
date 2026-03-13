/*
 * @Author: czy0729
 * @Date: 2023-12-23 06:26:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 06:27:30
 */
import { AnyObject } from '@types'
import { urlStringify } from '../utils'

/**
 * 获取 APP 网页版页面对应 StoryId
 *  - CatalogDetail -> catalogdetail--catalog-detail
 *  - LoginV2 -> loginv2--login-v-2
 * */
export function getSPAId(routeName: string) {
  return `screens-${routeName.toLowerCase()}--${routeName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/(\d+)/g, '-$1')
    .toLowerCase()}`
}

/** 获取 APP 网页版参数 */
export function getSPAParams(routeName: string, params?: AnyObject) {
  return `iframe.html?${urlStringify({
    id: getSPAId(routeName),
    viewMode: 'story',

    /** params */
    ...Object.entries(params || {})
      // .filter(([key]) => !key.startsWith('_'))
      .filter(([key]) => key !== 'id')
      .filter(([, value]) => value)
      .reduce((obj, [key, value]) => {
        obj[key] = value
        return obj
      }, {})
  })}`
}
