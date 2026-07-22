/*
 * @Author: czy0729
 * @Date: 2025-10-17 23:40:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-22 20:36:18
 */
import type { TopicId } from '@types'
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'groupHref' | 'href' | 'userId' | 'userName'> & {
  groupCn: string
  topicId: TopicId
  isGroup: boolean
}
