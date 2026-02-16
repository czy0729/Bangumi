/*
 * @Author: czy0729
 * @Date: 2024-06-22 15:17:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 15:18:14
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { HTML_REVIEWS, LIST_EMPTY } from '@constants'
import { TopicId } from '@types'
import State from './state'
import { NAMESPACE } from './ds'

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
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

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
