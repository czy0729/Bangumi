/*
 * @Author: czy0729
 * @Date: 2024-06-22 15:24:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 15:43:01
 */
import { rakuenStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { TopicId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  onItemPress = (topicId: TopicId, replies?: number) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
