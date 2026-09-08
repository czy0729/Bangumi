/*
 * 运行时缓存统一清理入口
 * @Author: czy0729
 * @Date: 2026-09-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08 00:00:00
 */
import {
  FIND_SUBJECT_CN_CACHE_MAP,
  FIND_SUBJECT_JP_CACHE_MAP,
  GET_AVATAR_CACHE_MAP,
  NSFW_CACHE_MAP,
  X18S_CACHE_MAP
} from '../app/ds'
import CacheManager from '../cache-manager'
import { clearMatchCache } from '../match'

/**
 * 清空可重建的运行时缓存
 * - 只清「下次用到时可低成本重建」的纯计算 / 解析缓存: 搜索结果、HTML 解析、条目名、
 *   敏感判断、头像地址
 * - 不触碰任何持久化状态 (storage) 与 store (userStore / collection / setting 等),
 *   避免丢失用户数据
 * - 各缓存本身已有 ensureCacheLimit 上限, 这里只是让后台态尽快把内存还给系统
 */
export function clearRuntimeCaches() {
  CacheManager.clear()
  clearMatchCache()

  FIND_SUBJECT_CN_CACHE_MAP.clear()
  FIND_SUBJECT_JP_CACHE_MAP.clear()
  GET_AVATAR_CACHE_MAP.clear()
  NSFW_CACHE_MAP.clear()
  X18S_CACHE_MAP.clear()
}
