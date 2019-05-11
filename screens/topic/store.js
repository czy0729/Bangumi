/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-11 21:04:06
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'

export default class Store extends store {
  init = () => this.fetchTopic(true)

  // -------------------- fetch --------------------
  fetchTopic = refresh => {
    const { topicId } = this.params
    return rakuenStore.fetchTopic({ topicId }, refresh)
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

  // -------------------- action --------------------
}
