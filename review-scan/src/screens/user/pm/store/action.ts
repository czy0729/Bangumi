/*
 * @Author: czy0729
 * @Date: 2024-09-13 01:04:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 01:14:15
 */
import { userStore } from '@stores'
import { feedback, info } from '@utils'
import { t } from '@utils/fetch'
import { Navigation } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 滚动到底 */
  scrollToBottom = (animated: boolean = false) => {
    if (this.scrollViewRef?.scrollToEnd) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollToEnd({
            animated
          })
        } catch (error) {}
      }, 160)
    }
  }

  /** 滚动到顶 */
  scrollToTop = (animated: boolean = false) => {
    if (this.scrollViewRef?.scrollTo) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollTo({
            x: 0,
            y: 0,
            animated
          })
        } catch (error) {}
      }, 160)
    }
  }

  /** 收起评论框 */
  closeFixedTextarea = () => {
    this.setState({
      placeholder: '',
      replySub: '',
      message: ''
    })

    t('短信.显示评论框')
  }

  /** 标题改变 */
  onTitleChange = (title: string) => {
    return this.setState({
      title
    })
  }

  /** 内容改变 */
  onChange = (value: string) => {
    return this.setState({
      value
    })
  }

  /** 提交 */
  doSubmit = (content: string, scrollView, navigation: Navigation) => {
    if (this.userId) {
      if (!this.pmParams.formhash) {
        info('获取表单授权码失败')
        return
      }

      this.doCreate(content, navigation)
      return
    }

    if (!this.pmDetail?.form?.formhash) {
      info('获取表单授权码失败, 需要别人回复过才能继续发送')
      return
    }

    this.doReply(content, scrollView)
  }

  /** 新短信 */
  doCreate = (content: string, navigation: Navigation) => {
    userStore.doPM(
      {
        msg_title: this.state.title,
        msg_body: content,
        submit: '发送',
        ...this.pmParams
      },
      () => {
        feedback()
        this.setState({
          title: '',
          value: ''
        })

        navigation.goBack()
        navigation.push('Notify', {
          type: 'out'
        })

        t('短信.新短信')
      }
    )
  }

  /** 回复短信 */
  doReply = (content: string, scrollView) => {
    userStore.doPM(
      {
        msg_body: content,
        chat: 'on',
        submit: '回复',
        ...(this.pmDetail?.form || {})
      },
      async () => {
        this.setState({
          value: ''
        })

        await this.fetchPMDetail()
        feedback()

        if (scrollView && scrollView.scrollToEnd) {
          setTimeout(() => {
            scrollView.scrollToEnd()
          }, 0)
        }

        t('短信.回复短信')
      }
    )
  }
}
