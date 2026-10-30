/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:47:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目正文区属性
 */
import type { TopicId } from '@types'
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'time' | 'title' | 'userId' | 'userName' | 'avatar'> & {
  groupCn: string
  replyCount: number
  epoch: number
  topicId: TopicId
  isGroup: boolean
}
