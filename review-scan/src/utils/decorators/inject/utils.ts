/*
 * @Author: czy0729
 * @Date: 2024-05-01 14:43:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 14:43:45
 */
import { AnyObject } from '@types'
import { urlStringify } from '../../index'

export function getScreenKey(
  route: {
    params?: AnyObject
    routeName?: string
    name?: string
  } = {}
) {
  const params = Object.entries(route?.params || {})
    // 后期对页面跳转传递数据进行了优化, 排除 params 里面 _ 开头的 key, 如 _name, _image
    .filter(([key]) => !key.startsWith('_'))
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})

  return `${route.routeName || route.name}?${urlStringify(params, false)}`
}
