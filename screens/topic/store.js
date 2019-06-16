/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-17 01:35:25
 */
import { computed } from 'mobx'
import store from '@utils/store'
import { rakuenStore, subjectStore } from '@stores'

export default class ScreenTopic extends store {
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

  // -------------------- page --------------------
  /**
   * 吐槽箱倒序
   */
  toggleReverseComments = () => {
    const { _reverse } = this.comments
    this.fetchTopic(true, !_reverse)
  }

  // -------------------- action --------------------
  /**
   * 回复主楼
   */
  doSubmit = content => {
    const { topicId } = this.params
    const { formhash } = this.topic
    const { _reverse } = this.comments
    rakuenStore.doReply(
      {
        topicId: topicId.match(/\d+/g)[0],
        content,
        formhash
      },
      () => {
        this.fetchTopic(true, _reverse)
      }
    )
  }

  doReplySub = (id, userId, nickname) => {
    console.log(id, userId, nickname)
  }
}
