/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:12:51
 */
import { TopicId } from '@types'

export type Data = {
  topicId: TopicId
  title: string
  desc?: string
  cover: string
}[]
