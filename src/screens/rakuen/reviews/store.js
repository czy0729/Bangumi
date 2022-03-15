/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 23:01:01
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { HTML_REVIEWS } from '@constants/html'

const namespace = 'ScreenBoard'

export default class ScreenBoard extends store {
  state = observable({
    history: [],
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, this.key)
    this.setState({
      ...state,
      _loaded: true
    })

    return this.fetchReviews()
  }

  // -------------------- fetch --------------------
  fetchReviews = () =>
    rakuenStore.fetchReviews({
      subjectId: this.subjectId
    })

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get key() {
    return `${namespace}|${this.subjectId}`
  }

  @computed get reviews() {
    return rakuenStore.reviews(this.subjectId)
  }

  @computed get url() {
    return HTML_REVIEWS(this.subjectId)
  }

  /**
   * 帖子历史查看记录
   */
  readed(topicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  // -------------------- page --------------------
  onItemPress = (topicId, replies) => rakuenStore.updateTopicReaded(topicId, replies)
}
