/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-02 09:32:18
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'

export default class Store extends store {
  init = async () => {
    let res

    // 假如有缓存, 不重新请求
    const { _loaded } = this.topic
    if (!_loaded) {
      res = this.fetchTopic(true)
    }

    return res
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

  // -------------------- fetch --------------------
  fetchTopic = refresh => {
    const { topicId } = this.params
    return rakuenStore.fetchTopic({ topicId }, refresh)
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
