/*
 * @Author: czy0729
 * @Date: 2026-06-26 07:27:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-06-26 07:27:04
 */

/**
 * 确保 Map 缓存不超过指定大小，超出时淘汰最早的条目（FIFO）
 * @param cache Map 实例
 * @param maxSize 最大条目数，默认 100
 */
export function ensureCacheLimit<T>(cache: Map<string, T>, maxSize: number = 100) {
  if (cache.size > maxSize) {
    const firstKey = cache.keys().next().value
    if (firstKey !== undefined) cache.delete(firstKey)
  }
}
