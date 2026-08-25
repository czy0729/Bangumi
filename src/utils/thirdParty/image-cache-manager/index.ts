/*
 * @Author: czy0729
 * @Date: 2024-03-06 11:38:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 15:39:38
 */
import { FileSystem } from '../file-system'
import { cleanupCache, getEntry, resetSession } from './utils'
import { BASE_DIR } from './ds'

import type { DownloadOptions } from './type'

/** 缓存失效: 移除内存记录与目录索引, 下次 getPath 重新下载 (本地文件损坏时调用) */
export { invalidate } from './utils'

export default class CacheManager {
  static get(uri: string, options: DownloadOptions) {
    return getEntry(uri, options)
  }

  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true })
    await FileSystem.makeDirectoryAsync(BASE_DIR)
    resetSession()
  }

  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.getInfoAsync(BASE_DIR)
    if (!result.exists) throw new Error(`${BASE_DIR} not found`)
    return result.size
  }
}

/** 本次会话是否已调度过缓存清理 */
let cleanupScheduled = false

/** 延迟调度一次 LRU 清理, 避开启动 IO 高峰 (dev 下 fast refresh 重挂模块也只跑一次/会话) */
export function scheduleCleanup() {
  if (cleanupScheduled) return
  cleanupScheduled = true

  setTimeout(() => {
    cleanupCache()
  }, 8000)
}
