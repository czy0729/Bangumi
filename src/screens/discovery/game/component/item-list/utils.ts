/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:17:13
 */
import { isArray } from '@utils'
import { CDN_GAME } from '@constants'

import type { SubjectId } from '@types'

/** 截图数量上限, 挡住脏数据导致的超大 new Array */
const MAX_LENGTH = 100

export function getThumbs(subjectId: SubjectId, length: number, thumb: boolean = true) {
  if (!Number.isInteger(length) || length <= 0) return []

  /** 超出上限截断展示, 不整条丢弃 */
  return new Array(Math.min(length, MAX_LENGTH))
    .fill('')
    .map((_item, index) => CDN_GAME(subjectId, index, thumb))
}

/** 取详情里的名称数组字段: 数组用原值, 单值包成数组, 空值 (含 null) 返回空数组 */
export function toArray<T = string>(item: Record<string, unknown> = {}, key: string): T[] {
  const value = item?.[key]
  if (isArray(value)) return value.filter(i => i !== undefined) as T[]
  if (!value) return []

  return [value as T]
}
