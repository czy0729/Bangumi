/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:27:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-24 14:27:32
 */
import { TopicId } from '@types'

export function getInt(topicId: TopicId) {
  const str = String(topicId)
  return Number(str.slice(str.length - 2, str.length)) || 0
}
