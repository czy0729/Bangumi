/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-07 20:12:10
 */
import { observable, computed } from 'mobx'
import {
  systemStore,
  rakuenStore,
  subjectStore,
  userStore,
  usersStore
} from '@stores'
import store from '@utils/store'
import { removeHTMLTag } from '@utils/html'
import decoder from '@utils/thirdParty/html-entities-decoder'

const namespace = 'ScreenTopic'

export default class ScreenTopic extends store {
  state = observable({
    placeholder: '',
    replySub: '',
    message: '',
    filterMe: false,
    filterFriends: false,
    reverse: false,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, this.namespace)
    this.setState({
      ...state,
      placeholder: '',
      replySub: '',
      message: '',
      _loaded: true
    })

    // 章节需要请求章节详情
    if (this.isEp) {
      this.fetchEpFormHTML()
    }

    return this.fetchTopic()
  }

  // -------------------- fetch --------------------
  fetchTopic = () =>
    rakuenStore.fetchTopic({
      topicId: this.topicId
    })

  fetchEpFormHTML = () => {
    const epId = this.topicId.replace('ep/', '')
    return subjectStore.fetchEpFormHTML(epId)
  }

  // -------------------- get --------------------
  @computed get topicId() {
    const { topicId = '' } = this.params
    if (!topicId) {
      return '0'
    }
    return topicId.split('#')[0]
  }

  /**
   * 需要跳转到的楼层id
   */
  @computed get postId() {
    const { topicId = '' } = this.params
    const [, postId] = topicId.split('#post_')
    return postId
  }

  @computed get namespace() {
    return `${namespace}|${this.topicId}`
  }

  @computed get topic() {
    return rakuenStore.topic(this.topicId)
  }

  @computed get comments() {
    const comments = rakuenStore.comments(this.topicId)
    const { filterMe, filterFriends, reverse } = this.state

    const list = reverse ? comments.list.reverse() : comments.list
    if (filterMe) {
      return {
        ...comments,
        list: list.filter(item => {
          if (item.sub.findIndex(i => i.userId === this.myId) !== -1) {
            return true
          }
          return item.userId === this.myId
        }),
        pagination: {
          page: 1,
          pageTotal: 1
        }
      }
    }

    // @notice 只显示好友相关评论
    if (filterFriends) {
      return {
        ...comments,
        list: list.filter(item => {
          if (item.sub.findIndex(i => this.myFriendsMap[i.userId]) !== -1) {
            return true
          }
          return this.myFriendsMap[item.userId]
        }),
        pagination: {
          page: 1,
          pageTotal: 1
        }
      }
    }

    return {
      ...comments,
      list
    }
  }

  @computed get isEp() {
    return this.topicId.indexOf('ep/') === 0
  }

  @computed get isMono() {
    return (
      this.topicId.indexOf('prsn/') === 0 || this.topicId.indexOf('crt/') === 0
    )
  }

  @computed get monoId() {
    if (this.topicId.indexOf('prsn/') === 0) {
      return this.topicId.replace('prsn/', 'person/')
    }

    if (this.topicId.indexOf('crt/') === 0) {
      return this.topicId.replace('crt/', 'character/')
    }

    return this.topicId
  }

  @computed get epFormHTML() {
    const epId = this.topicId.replace('ep/', '')
    return subjectStore.epFormHTML(epId)
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get readed() {
    return rakuenStore.readed(this.topicId)
  }

  @computed get myId() {
    return userStore.myId
  }

  @computed get myFriendsMap() {
    return usersStore.myFriendsMap
  }

  @computed get isUGCAgree() {
    return systemStore.isUGCAgree
  }

  // -------------------- page --------------------
  /**
   * 吐槽箱倒序
   */
  toggleReverseComments = () => {
    const { reverse } = this.state
    this.setState({
      reverse: !reverse
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 显示与我相关的回复
   */
  toggleFilterMe = () => {
    const { filterMe } = this.state
    this.setState({
      filterMe: !filterMe,
      filterFriends: false
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 显示好友相关的回复
   */
  toggleFilterFriends = () => {
    const { filterFriends } = this.state
    this.setState({
      filterMe: false,
      filterFriends: !filterFriends
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 显示评论框
   */
  showFixedTextarea = (placeholder, replySub, message) => {
    this.setState({
      placeholder,
      replySub,
      message
    })
  }

  /**
   * 收起评论框
   */
  closeFixedTextarea = () => {
    this.setState({
      placeholder: '',
      replySub: '',
      message: ''
    })
  }

  // -------------------- action --------------------
  /**
   * 回复
   */
  doSubmit = content => {
    const { placeholder, replySub, message } = this.state
    const { formhash } = this.topic

    let type
    if (this.topicId.includes('group/')) {
      type = 'group/topic'
    } else if (this.topicId.includes('subject/')) {
      type = 'subject/topic'
    } else if (this.topicId.includes('ep/')) {
      type = 'subject/ep'
    } else if (this.topicId.includes('crt/')) {
      type = 'character'
    } else if (this.topicId.includes('prsn/')) {
      type = 'person'
    } else {
      return
    }

    if (replySub) {
      const [, topicId, related, , subReplyUid, postUid] = replySub.split(',')
      let _content = content
      if (message) {
        const _message = decoder(message).replace(
          /<div class="quote"><q>.*<\/q><\/div>/,
          ''
        )
        _content = `[quote][b]${placeholder}[/b] 说: ${removeHTMLTag(
          _message
        )}[/quote]\n${content}`
      }
      rakuenStore.doReply(
        {
          type,
          content: _content,
          formhash,
          topicId,
          related,
          sub_reply_uid: subReplyUid,
          post_uid: postUid
        },
        () => this.fetchTopic()
      )
    } else {
      rakuenStore.doReply(
        {
          type,
          topicId: this.topicId.match(/\d+/g)[0],
          content,
          formhash
        },
        () => this.fetchTopic()
      )
    }
  }
}
