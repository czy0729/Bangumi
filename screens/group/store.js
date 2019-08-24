/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:49:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 10:17:43
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'

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

  /**
   * 加入小组
   */
  doJoin = async () => {
    const { joinUrl } = this.groupInfo
    if (!joinUrl) {
      return false
    }

    await fetchHTML({
      url: `${HOST}${joinUrl}`
    })
    info('已加入小组')

    return this.fetchGroupInfo()
  }

  /**
   * 退出小组
   */
  doBye = async () => {
    const { byeUrl } = this.groupInfo
    if (!byeUrl) {
      return false
    }

    await fetchHTML({
      url: `${HOST}${byeUrl}`
    })
    info('已退出小组')

    return this.fetchGroupInfo()
  }
}
