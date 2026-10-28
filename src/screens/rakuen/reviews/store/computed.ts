/*
 * @Author: czy0729
 * @Date: 2024-06-22 15:17:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { HTML_REVIEWS, LIST_EMPTY } from '@constants'
import State from './state'
import { NAMESPACE } from './ds'

import type { Reviews } from '@stores/rakuen/types'
import type { TopicId } from '@types'

export default class Computed extends State {
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  @computed get reviews(): Reviews {
    // computedFn 深层类型解析为 error type, 显式收口
    const reviews = rakuenStore.reviews(this.subjectId) as Reviews
    if (!reviews._loaded) {
      if (this.ota) {
        return {
          ...this.ota,
          pagination: {
            page: 1,
            pageTotal: 10
          }
        } as Reviews
      }

      return LIST_EMPTY as Reviews
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
