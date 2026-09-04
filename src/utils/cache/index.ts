/*
 * @Author: czy0729
 * @Date: 2026-06-26 07:27:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-06-26 07:27:04
 */

/**
 * 确保 Map 缓存不超过指定大小，超出时淘汰最早的条目（FIFO）
 * - 单次调用只淘汰 1 条, 依赖「每次 set 后调用」的约定; 批量 set 的调用点需循环调用
 * @param cache Map 实例
 * @param maxSize 最大条目数，默认 100
 */
export function ensureCacheLimit<K, T>(cache: Map<K, T>, maxSize: number = 100) {
  if (cache.size > maxSize) {
    const firstKey = cache.keys().next().value as K | undefined
    if (firstKey !== undefined) cache.delete(firstKey)
  }
}
