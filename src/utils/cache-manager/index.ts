/*
 * APP 内各种需要缓存的数据集合
 * @Author: czy0729
 * @Date: 2023-02-27 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-05 14:52:47
 */
import { toJS } from 'mobx'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, any>()

export default {
  /** 主动缓存 */
  set<T>(key: string | number, data: T) {
    if (!key) return data

    cacheMap.set(String(key), toJS(data))
    return data
  },

  /** 取缓存 */
  get(key: string | number) {
    return cacheMap.get(String(key))
  },

  /** 是否存在 */
  has(key: string | number) {
    return cacheMap.has(String(key))
  }
}
