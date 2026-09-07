/*
 * @Author: czy0729
 * @Date: 2023-02-27 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 05:32:31
 *
 * 客户端内各种需要缓存的数据集合
 */
import { toJS } from 'mobx'
import { ensureCacheLimit } from '../cache'

/** 缓存上限（条目数） */
const CACHE_MAX = 500

/**
 * 缓存搜索过的结果
 * - toJS 深拷贝后入库, 单条可能是整份列表, 必须为有界集合
 */
const cacheMap = new Map<string, unknown>()

export default {
  /** 主动缓存 */
  set<T>(key: string | number, data: T) {
    if (!key) return data

    cacheMap.set(String(key), toJS(data))
    ensureCacheLimit(cacheMap, CACHE_MAX)

    return data
  },

  /** 取缓存 */
  get<T>(key: string | number) {
    return cacheMap.get(String(key)) as T
  },

  /** 是否存在 */
  has(key: string | number) {
    return cacheMap.has(String(key))
  },

  /** 清空（切后台等时机释放可重建缓存） */
  clear() {
    cacheMap.clear()
  }
}
