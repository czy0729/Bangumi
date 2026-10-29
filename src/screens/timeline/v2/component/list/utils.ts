/*
 * @Author: czy0729
 * @Date: 2024-05-18 17:47:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 */
import type { Id } from '@types'

/** 条目 key: id 在单个列表内唯一, 不掺 index */
export function keyExtractor(item: { id: Id }) {
  return String(item.id)
}
