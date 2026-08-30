/*
 * @Author: czy0729
 * @Date: 2026-08-31 03:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:25:28
 *
 * 按 ID 末 N 位数字分桶的本地持久化工具
 *  - 目的: 避免单个 key JSON.stringify 后过长无法本地化, 同时减少每次写入量
 *  - 消费方: stores/{rakuen,subject,discovery} 等
 */
import type { Id } from '@types'

/** 取 id 末 digits 位数字作为桶下标, 非数字结尾兜底 0 */
export function getBucketId(id: Id, digits: number = 3): number {
  const str = String(id)
  return Number(str.slice(str.length - digits, str.length)) || 0
}

/**
 * 桶容量淘汰: 按 getTime 数值降序保留前 limit 条, 原地删除其余
 *  - 数值相同的条目保持原有 key 顺序 (稳定排序), 即数值键桶实际保留 id 较小者
 * @returns 被淘汰的 key 集合 (供联动清理其他同桶序号数据)
 * */
export function trimBucket<V>(
  bucket: Record<string, V>,
  limit: number,
  getTime: (item: V) => number
): string[] {
  const entries = Object.entries(bucket)
  if (entries.length <= limit) return []

  entries.sort(([, a], [, b]) => (getTime(b) || 0) - (getTime(a) || 0))

  const evicted: string[] = []
  entries.slice(limit).forEach(([key]) => {
    delete bucket[key]
    evicted.push(key)
  })
  return evicted
}
