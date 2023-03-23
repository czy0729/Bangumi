/*
 * APP 内各种需要缓存的数据集合
 * @Author: czy0729
 * @Date: 2023-02-27 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-23 19:55:17
 */
import { toJS } from 'mobx'
import { DEV } from '@constants'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, any>()

export default {
  /** 主动缓存 */
  set<T>(key: string, data: T) {
    if (!key) return data

    cacheMap.set(key, toJS(data))
    return data
  },

  /** 取缓存 */
  get(key: string) {
    if (DEV) console.info('CM get', key)

    return cacheMap.get(key)
  }
}
