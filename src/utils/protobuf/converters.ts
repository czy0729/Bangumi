/*
 * @Author: czy0729
 * @Date: 2026-08-30 21:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:18
 *
 * 字典类数据集的还原层: proto 编码的 Pair/Group 数组 → 业务使用的 Record
 * 双平台共用纯函数, 在 decode 内按数据集应用
 */
import type { Data, DataAssets } from './types'

/** proto 编码的键值对 ( ja / d / katakana ) */
export type Pair<K = string, V = number> = {
  k: K
  v: V
}

/** proto 编码的 id 分组 ( anime-ids ) */
export type Group = {
  k: string
  v: number[]
}

/**
 * Pair 数组还原为 Record
 *  - proto3 默认值 (0 / '') 不编码, 缺失 v 的条目跳过, 与 JSON 源保持语义一致
 * */
export function pairsToRecord<V>(payload: Pair<string, V>[]): Record<string, V> {
  const result: Record<string, V> = {}
  payload.forEach(({ k, v }) => {
    if (v !== undefined) result[k] = v
  })
  return result
}

/** Group 数组还原为 Record */
export function groupsToRecord(payload: Group[]): Record<string, number[]> {
  const result: Record<string, number[]> = {}
  payload.forEach(({ k, v }) => {
    if (v) result[k] = v
  })
  return result
}

/**
 * 按数据集把 proto 解码的原始 payload 还原为业务数据
 *  - 对象数组类数据集恒等返回
 * */
export function convert<T extends DataAssets>(name: T, payload: unknown): Data[T] {
  switch (name) {
    case 'ja':
    case 'd':
      return pairsToRecord(payload as Pair<string, number>[]) as Data[T]

    case 'katakana':
      return pairsToRecord(payload as Pair<string, string>[]) as Data[T]

    case 'anime-ids':
      return groupsToRecord(payload as Group[]) as Data[T]

    default:
      return payload as Data[T]
  }
}
