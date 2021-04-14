/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-07 10:24:24
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'

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

    return this.fetchBoard()
  }

  // -------------------- fetch --------------------
  fetchBoard = () =>
    rakuenStore.fetchBoard({
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

  @computed get board() {
    return rakuenStore.board(this.subjectId)
  }

  /**
   * 帖子历史查看记录
   */
  readed(topicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  // -------------------- page --------------------
  onItemPress = (topicId, replies) =>
    rakuenStore.updateTopicReaded(topicId, replies)
}
