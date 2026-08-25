/*
 * @Author: czy0729
 * @Date: 2026-08-26 06:42:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 06:42:23
 */
import type { RecommendTopicItem } from '@utils/kv/type'

/** 本地缓存的快照结构 */
export type SearchGroupTopicsSnapshot = {
  data: RecommendTopicItem[]
  pagination: {
    total?: number
    limit?: number
    offset?: number
  }
}
