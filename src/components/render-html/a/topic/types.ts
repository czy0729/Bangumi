/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:39:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:40:14
 */
import type { TopicId } from '@types'

export type Props = {
  /** 帖子 ID */
  topicId?: TopicId

  /** 解析后的文本内容 */
  text?: string

  /** 链接点击回调 */
  onLinkPress?: () => void
}
