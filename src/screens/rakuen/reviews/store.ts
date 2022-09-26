/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 21:24:46
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { HTML_REVIEWS } from '@constants'
import { TopicId } from '@types'
import { Params } from './types'

const NAMESPACE = 'ScreenBoard'

export default class ScreenBoard extends store {
  params: Params

  state = observable({
    history: [],
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(this.key)
    this.setState({
      ...state,
      _loaded: true
    })

    return this.fetchReviews()
  }

  // -------------------- fetch --------------------
  /** 条目影评列表 (日志) */
  fetchReviews = () => {
    return rakuenStore.fetchReviews({
      subjectId: this.subjectId
    })
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  @computed get reviews() {
    return rakuenStore.reviews(this.subjectId)
  }

  @computed get url() {
    return HTML_REVIEWS(this.subjectId)
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  // -------------------- page --------------------
  onItemPress = (topicId: TopicId, replies?: number) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }
}
