/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 21:37:34
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'

export default class ScreenTopic extends store {
  init = () => this.fetchTopic(true)

  // -------------------- fetch --------------------
  fetchTopic = (refresh, reverse) => {
    const { topicId } = this.params
    return rakuenStore.fetchTopic({ topicId }, refresh, reverse)
  }

  // -------------------- get --------------------
  @computed get topic() {
    const { topicId } = this.params
    return rakuenStore.topic(topicId)
  }

  @computed get comments() {
    const { topicId } = this.params
    return rakuenStore.comments(topicId)
  }

  // -------------------- page --------------------
  /**
   * 吐槽箱倒序
   */
  toggleReverseComments = () => {
    const { _reverse } = this.comments
    this.fetchTopic(true, !_reverse)
  }

  // -------------------- action --------------------
}
