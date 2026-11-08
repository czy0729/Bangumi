/*
 * @Author: czy0729
 * @Date: 2026-08-26 06:42:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 云快照结构
 */
import type { RecommendTopicItem, ResultData } from '@utils/kv/type'

/** 首屏帖子列表快照 */
export type OtaSearchTopics = ResultData<{
  /** 帖子列表 */
  data: RecommendTopicItem[]

  /** 分页信息 */
  pagination: {
    /** 总条数 */
    total?: number

    /** 单页条数 */
    limit?: number

    /** 起始偏移 */
    offset?: number
  }
}>
