/*
 * APP 内各种需要缓存的数据集合
 * @Author: czy0729
 * @Date: 2023-02-27 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 23:27:04
 */
import { toJS } from 'mobx'

const CACHES = {}

export default {
  set(key: string, data: any) {
    if (!key) return false

    CACHES[key] = toJS(data)
    return true
  },

  get(key: string) {
    console.info('CM', 'get', key)
    return CACHES[key]
  }
}
