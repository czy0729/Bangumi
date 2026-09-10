/*
 * @Author: czy0729
 * @Date: 2026-09-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08 00:00:00
 *
 * 运行时缓存统一清理入口
 */
import { clearMemoryCache } from '@components/image/image'
import {
  FIND_SUBJECT_CN_CACHE_MAP,
  FIND_SUBJECT_JP_CACHE_MAP,
  GET_AVATAR_CACHE_MAP,
  NSFW_CACHE_MAP,
  X18S_CACHE_MAP
} from '../app/ds'
import CacheManager from '../cache-manager'
import { logger } from '../dev'
import { clearMatchCache } from '../match'

/**
 * 内存观察点: 输出各运行时可重建缓存的条目数
 * - logger 仅 DEV 生效, 正式包无任何开销
 * - 用于确认退后台 / 内存告警时是否触发回收, 以及缓存是否失控增长
 */
export function logRuntimeCacheSizes(tag: string) {
  logger.info('@utils/memory', tag, {
    findSubjectCn: FIND_SUBJECT_CN_CACHE_MAP.size,
    findSubjectJp: FIND_SUBJECT_JP_CACHE_MAP.size,
    getAvatar: GET_AVATAR_CACHE_MAP.size,
    nsfw: NSFW_CACHE_MAP.size,
    x18s: X18S_CACHE_MAP.size
  })
}

/**
 * 清空可重建的运行时缓存
 * - 只清「下次用到时可低成本重建」的纯计算 / 解析缓存: 搜索结果、HTML 解析、条目名、
 *   敏感判断、头像地址, 以及图片引擎的内存缓存 (磁盘缓存保留)
 * - 不触碰任何持久化状态 (storage) 与 store (userStore / collection / setting 等),
 *   避免丢失用户数据
 * - 各缓存本身已有 ensureCacheLimit 上限, 这里只是让后台态尽快把内存还给系统
 * - 图片内存缓存是 iOS 上被 Jetsam 杀掉的主要来源之一, 退后台 / 内存告警时必须释放
 */
export function clearRuntimeCaches() {
  logRuntimeCacheSizes('release')

  CacheManager.clear()
  clearMatchCache()

  FIND_SUBJECT_CN_CACHE_MAP.clear()
  FIND_SUBJECT_JP_CACHE_MAP.clear()
  GET_AVATAR_CACHE_MAP.clear()
  NSFW_CACHE_MAP.clear()
  X18S_CACHE_MAP.clear()

  // 异步清理, 失败不影响其他缓存
  clearMemoryCache()
}
