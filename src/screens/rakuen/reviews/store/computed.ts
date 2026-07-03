/*
 * @Author: czy0729
 * @Date: 2024-06-22 15:17:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:38:11
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { HTML_REVIEWS, LIST_EMPTY } from '@constants'
import State from './state'
import { NAMESPACE } from './ds'

import type { TopicId } from '@types'

export default class Computed extends State {
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  @computed get reviews() {
    const reviews = rakuenStore.reviews(this.subjectId)
    if (!reviews._loaded) {
      return this.ota
        ? {
            ...this.ota,
            pagination: {
              page: 1,
              pageTotal: 10
            }
          }
        : LIST_EMPTY
    }

    return reviews
  }

  @computed get url() {
    return HTML_REVIEWS(this.subjectId)
  }

  /** 帖子历史查看记录 */
  readed = computedFn((topicId: TopicId) => {
    return rakuenStore.readed(topicId)
  })

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `reviews_${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Reviews']
  }
}
