/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:39:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:40:14
 */
import { Fn, TopicId } from '@types'

export type Props = {
  topicId?: TopicId
  text?: string
  onLinkPress?: Fn
}
