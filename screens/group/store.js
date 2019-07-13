/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:49:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-13 23:57:02
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'

const namespace = 'ScreenGroup'

export default class ScreenGroup extends store {
  state = observable({
    page: 1,
    show: true,
    ipt: '1',
    history: [],
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, this.key)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchGroupInfo()
    this.fetchGroup()
    return res
  }

  // -------------------- fetch --------------------
  fetchGroupInfo = () => {
    const { groupId } = this.params
    return rakuenStore.fetchGroupInfo({ groupId })
  }

  fetchGroup = () => {
    const { groupId } = this.params
    const { page } = this.state
    return rakuenStore.fetchGroup({ groupId, page })
  }

  // -------------------- get --------------------
  @computed get key() {
    const { groupId } = this.params
    return `${namespace}|${groupId}`
  }

  @computed get groupInfo() {
    const { groupId } = this.params
    return rakuenStore.groupInfo(groupId)
  }

  @computed get group() {
    const { groupId } = this.params
    const { page } = this.state
    return rakuenStore.group(groupId, page)
  }

  /**
   * 帖子历史查看记录
   */
  readed(topicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  // -------------------- page --------------------
  prev = async () => {
    const { page } = this.state
    if (page === 1) {
      return
    }

    this.setState({
      page: page - 1,
      show: false,
      ipt: String(page - 1)
    })
    this.fetchGroup()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, this.key)
    }, 400)
  }

  next = async () => {
    const { page } = this.state
    this.setState({
      page: page + 1,
      show: false,
      ipt: String(page + 1)
    })
    this.fetchGroup()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, this.key)
    }, 400)
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  onItemPress = (topicId, replies) => {
    rakuenStore.updateTopicReaded(topicId, replies)
  }

  // -------------------- action --------------------
  doSearch = () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    this.setState({
      page: _ipt,
      show: false,
      ipt: String(_ipt)
    })
    this.fetchGroup()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, this.key)
    }, 400)
  }
}
