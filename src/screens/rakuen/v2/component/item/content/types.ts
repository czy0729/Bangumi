/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:47:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:49:34
 */
import type { TopicId, UserId } from '@types'

export type Props = {
  groupCn: string
  replyCount: number
  time: string
  title: string
  topicId: TopicId
  userId: UserId
  userName: string
  avatar: string
  isGroup: boolean
}
