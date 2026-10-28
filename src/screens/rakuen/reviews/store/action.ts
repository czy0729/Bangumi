/*
 * @Author: czy0729
 * @Date: 2024-06-22 15:24:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import { rakuenStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import Fetch from './fetch'

import type { TopicId } from '@types'

export default class Action extends Fetch {
  onItemPress = (topicId: TopicId, replies?: number) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
