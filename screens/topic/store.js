/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 03:19:43
 */
import { observable, computed } from 'mobx'
import { userStore, rakuenStore, subjectStore } from '@stores'
import store from '@utils/store'
import { removeHTMLTag } from '@utils/html'

export default class ScreenTopic extends store {
  state = observable({
    placeholder: '',
    replySub: '',
    message: ''
  })

  init = () => {
    // 章节需要请求章节详情
    if (this.isEp) {
      this.fetchEpFormHTML()
    }

    return this.fetchTopic(true)
  }

  // -------------------- fetch --------------------
  fetchTopic = (refresh, reverse) => {
    const { topicId } = this.params
    return rakuenStore.fetchTopic({ topicId }, refresh, reverse)
  }

  fetchEpFormHTML = () => {
    const { topicId } = this.params
    const epId = topicId.replace('ep/', '')
    return subjectStore.fetchEpFormHTML(epId)
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

  @computed get isEp() {
    const { topicId } = this.params
    return topicId.indexOf('ep/') === 0
  }

  @computed get isMono() {
    const { topicId } = this.params
    return topicId.indexOf('prsn/') === 0 || topicId.indexOf('crt/') === 0
  }

  @computed get monoId() {
    const { topicId } = this.params
    if (topicId.indexOf('prsn/') === 0) {
      return topicId.replace('prsn/', 'person/')
    }

    if (topicId.indexOf('crt/') === 0) {
      return topicId.replace('crt/', 'character/')
    }

    return topicId
  }

  @computed get epFormHTML() {
    const { topicId } = this.params
    const epId = topicId.replace('ep/', '')
    return subjectStore.epFormHTML(epId)
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  // -------------------- page --------------------
  /**
   * 吐槽箱倒序
   */
  toggleReverseComments = () => {
    const { _reverse } = this.comments
    this.fetchTopic(true, !_reverse)
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
    const { topicId } = this.params
    const { placeholder, replySub, message } = this.state
    const { formhash } = this.topic
    const { _reverse } = this.comments

    let type
    if (topicId.includes('group/')) {
      type = 'group/topic'
    } else if (topicId.includes('subject/')) {
      type = 'subject/topic'
    } else if (topicId.includes('ep/')) {
      type = 'subject/ep'
    } else if (topicId.includes('crt/')) {
      type = 'character'
    } else if (topicId.includes('prsn/')) {
      type = 'person'
    } else {
      return
    }

    if (replySub) {
      const [, topicId, related, , subReplyUid, postUid] = replySub.split(',')
      let _content = content
      if (message) {
        const _message = message.replace(
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
        () => {
          this.fetchTopic(true, _reverse)
        }
      )
    } else {
      rakuenStore.doReply(
        {
          type,
          topicId: topicId.match(/\d+/g)[0],
          content,
          formhash
        },
        () => {
          this.fetchTopic(true, _reverse)
        }
      )
    }
  }
}
