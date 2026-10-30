/*
 * @Author: czy0729
 * @Date: 2024-01-15 22:16:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 对话列表的 key
 */
import type { SayItem } from '@stores/timeline/types'

/**
 * 条目 key
 *
 * 回复条目用解析器给出的 uid (解析正常时必然非空); 兜底分支只作用于主吐槽, 每层仅一条,
 * 故用其用户 Id 即可保证唯一, 且不随列表长度漂移
 *
 * @param item 吐槽条目
 */
export function keyExtractor(item: SayItem) {
  return item.uid || `say-${item.id}`
}
