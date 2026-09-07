/*
 * @Author: czy0729
 * @Date: 2026-06-26 07:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 23:47:38
 */

/**
 * 确保 Map / Set 缓存不超过指定大小，超出时淘汰最早的条目（FIFO）
 * - 内部 while 收敛到 maxSize, 调用方无需关心超出多少, 批量 set 的场景同样安全
 * - 淘汰为 O(1) 的 delete(firstKey), 不遍历不排序, 可安全用于 HTML 解析等热路径
 * - Map 与 Set 的 keys() / delete() 签名一致, 故可共用
 * - maxSize <= 0 时会清空整个集合（keys() 取不到键时 break, 不会死循环）
 * @param cache Map 或 Set 实例
 * @param maxSize 最大条目数，默认 100
 */
export function ensureCacheLimit<K, T>(cache: Map<K, T> | Set<K>, maxSize: number = 100) {
  while (cache.size > maxSize) {
    const firstKey = cache.keys().next().value as K | undefined
    if (firstKey === undefined) break

    cache.delete(firstKey)
  }
}

/**
 * 确保数组不超过指定长度，超出时原地裁剪并返回同一引用
 * - 默认从尾部裁剪（保留头部 / 最早写入项），适用于 unshift 头插的日志、历史等
 * - keepTail 为 true 时从头部裁剪（保留尾部 / 最新写入项），适用于 push 尾插的记录
 * - 与 ensureCacheLimit 一致只做「保底裁剪」，依赖「每次写入后调用」的约定
 * @param list 数组
 * @param maxLength 最大长度，默认 100
 * @param keepTail 是否保留尾部（最新写入项），默认 false
 */
export function ensureArrayLimit<T>(
  list: T[],
  maxLength: number = 100,
  keepTail: boolean = false
): T[] {
  if (list.length > maxLength) {
    if (keepTail) list.splice(0, list.length - maxLength)
    else list.splice(maxLength)
  }
  return list
}
