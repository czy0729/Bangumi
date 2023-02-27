/*
 * APP 内各种需要缓存的数据集合
 * @Author: czy0729
 * @Date: 2023-02-27 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 02:39:23
 */
import { toJS } from 'mobx'

const CACHES = {}

export default {
  /** 主动缓存 */
  set<T>(key: string, data: T) {
    if (!key) return data

    CACHES[key] = toJS(data)
    return data
  },

  /** 取缓存 */
  get(key: string) {
    console.info('CM get', key)
    return CACHES[key]
  }
}
