/*
 * @Author: czy0729
 * @Date: 2025-10-17 23:40:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 23:41:09
 */
import type { TopicId, UserId } from '@types'

export type Props = {
  groupCn: string
  groupHref: string
  href: string
  topicId: TopicId
  userId: UserId
  userName: string
  isGroup: boolean
}
