/*
 * @Params: { _title }
 * @Author: czy0729
 * @Date: 2019-07-13 18:49:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 04:29:30
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import { info, feedback } from '@utils'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { HOST } from '@constants'
import { Params } from './types'
import { TopicId } from '@types'

const NAMESPACE = 'ScreenGroup'

export default class ScreenGroup extends store {
  params: Params

  state = observable({
    page: 1,
    show: true,
    ipt: '1',
    history: [],
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(this.key)
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchGroup()
    return this.fetchGroupInfo()
  }

  // -------------------- fetch --------------------
  /** 小组信息 */
  fetchGroupInfo = () => {
    return rakuenStore.fetchGroupInfo({
      groupId: this.groupId
    })
  }

  /** 小组帖子列表 */
  fetchGroup = () => {
    const { page } = this.state
    return rakuenStore.fetchGroup({
      groupId: this.groupId,
      page
    })
  }

  // -------------------- get --------------------
  @computed get groupId() {
    const { groupId = '' } = this.params
    return groupId
  }

  @computed get key() {
    return `${NAMESPACE}|${this.groupId}`
  }

  /** 小组信息 */
  @computed get groupInfo() {
    return rakuenStore.groupInfo(this.groupId)
  }

  /** 小组帖子列表 */
  @computed get group() {
    const { page } = this.state
    return rakuenStore.group(this.groupId, page)
  }

  /** 小组缩略图缓存 */
  @computed get groupThumb() {
    const { cover } = this.groupInfo
    if (cover) return cover

    const { _title } = this.params
    if (_title) return rakuenStore.groupThumb(_title)

    return ''
  }

  @computed get url() {
    return `${HOST}/group/${this.groupId}`
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  // -------------------- page --------------------
  /** 上一页 */
  prev = async () => {
    const { page } = this.state
    if (page === 1) return

    t('小组.上一页', {
      page: page - 1,
      groupId: this.groupId
    })

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

  /** 下一页 */
  next = async () => {
    const { page } = this.state
    t('小组.下一页', {
      page: page + 1,
      groupId: this.groupId
    })

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

  /** 页码输入框改变 */
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  /** 更新帖子历史查看信息 */
  onItemPress = (topicId: TopicId, replies: any) => {
    rakuenStore.updateTopicReaded(topicId, replies)
  }

  // -------------------- action --------------------
  /** 页码跳转 */
  doSearch = () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('小组.页码跳转', {
      page: _ipt,
      groupId: this.groupId
    })

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

  /** 加入小组 */
  doJoin = async () => {
    const { joinUrl } = this.groupInfo
    if (!joinUrl) return false

    t('小组.加入', {
      groupId: this.groupId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${joinUrl}`,
      data: {
        action: 'join-bye'
      }
    })
    feedback()
    info('已加入小组')

    return this.fetchGroupInfo()
  }

  /** 退出小组 */
  doBye = async () => {
    const { byeUrl } = this.groupInfo
    if (!byeUrl) return false

    t('小组.退出', {
      groupId: this.groupId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${byeUrl}`,
      data: {
        action: 'join-bye'
      }
    })
    feedback()
    info('已退出小组')

    return this.fetchGroupInfo()
  }
}
