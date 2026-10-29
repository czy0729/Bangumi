/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * Store 数据类型
 */
import type { Comments, Topic } from '@stores/rakuen/types'
import type { DeepPartial } from '@types'

/** 云端帖子快照 (裁剪后的数据, 字段比 Topic / Comments 少) */
export type TopicSnapshot = {
  /** 快照时间戳 (秒) */
  ts?: number
  topic?: DeepPartial<Topic>
  comments?: DeepPartial<Comments>
}
