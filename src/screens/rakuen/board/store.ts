/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 04:15:13
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { HTML_BOARD } from '@constants'
import { Params } from './types'
import { TopicId } from '@types'

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

    return this.fetchBoard()
  }

  // -------------------- fetch --------------------
  /** 条目帖子列表 */
  fetchBoard = () => {
    return rakuenStore.fetchBoard({
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

  @computed get board() {
    return rakuenStore.board(this.subjectId)
  }

  @computed get url() {
    return HTML_BOARD(this.subjectId)
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  // -------------------- page --------------------
  /** 更新帖子历史查看信息 */
  onItemPress = (topicId: TopicId, replies: any) => {
    return rakuenStore.updateTopicReaded(topicId, replies)
  }
}
