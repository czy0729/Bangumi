/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-02 18:43:33
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import { info } from '@utils/ui'
import store from '@utils/store'
import { t } from '@utils/fetch'

export default class ScreenPM extends store {
  state = observable({
    value: '',
    _loaded: false
  })

  init = async scrollView => {
    const { _loaded } = this.pmDetail
    if (_loaded) {
      this.scrollToBottom(scrollView)
    }

    const res = this.fetchPMDetail()
    await res

    this.scrollToBottom(scrollView)
    return res
  }

  fetchPMDetail = () => {
    const { id } = this.params
    return userStore.fetchPMDetail({
      id
    })
  }

  // -------------------- get --------------------
  @computed get pmDetail() {
    const { id } = this.params
    return userStore.pmDetail(id)
  }

  @computed get myId() {
    return userStore.myId
  }

  // -------------------- page --------------------
  /**
   * 滚动到底
   */
  scrollToBottom = scrollView => {
    if (scrollView && scrollView.scrollToEnd) {
      setTimeout(() => {
        scrollView.scrollToEnd({
          animated: false
        })
      }, 80)
    }
  }

  /**
   * 显示评论框
   */
  showFixedTextarea = (placeholder, replySub, message) => {
    t('短信.显示评论框')

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

  onChange = value => {
    this.setState({
      value
    })
  }

  // -------------------- action --------------------
  /**
   * 提交
   */
  doSubmit = (content, scrollView) => {
    const { form = {} } = this.pmDetail
    if (!form.formhash) {
      info('获取表单授权码失败')
      return
    }
    this.doReply(content, scrollView)
  }

  /**
   * 回复短信
   */
  doReply = (content, scrollView) => {
    t('短信.回复短信')

    const { form = {} } = this.pmDetail
    userStore.doPM(
      {
        msg_body: content,
        chat: 'on',
        submit: '回复',
        ...form
      },
      async () => {
        this.setState({
          value: ''
        })
        await this.fetchPMDetail()

        if (scrollView && scrollView.scrollToEnd) {
          setTimeout(() => {
            scrollView.scrollToEnd()
          }, 0)
        }
      }
    )
  }
}
