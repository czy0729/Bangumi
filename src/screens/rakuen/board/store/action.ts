/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面业务动作
 */
import { rakuenStore } from '@stores'
import Fetch from './fetch'

import type { TopicId } from '@types'

export default class Action extends Fetch {
  /** 更新帖子历史查看信息 */
  onItemPress = (topicId: TopicId, replies: number) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }
}
