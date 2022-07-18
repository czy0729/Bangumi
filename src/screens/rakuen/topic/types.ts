/*
 * @Author: czy0729
 * @Date: 2022-07-18 17:25:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 17:30:38
 */
import { TopicId, UserId } from '@types'

export type Params = {
  topicId: TopicId
  _title?: string
  _avatar?: string
  _userId?: UserId
  _userName?: string
  _desc?: string
  _group?: string
  _groupThumb?: string
  _noFetch?: boolean
}
