/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 页面交互状态: 滚动固定头部 / 评论框显隐 / 子楼层展开 / 锐评导航
 */
import { getHeaderFixed } from '@components/header-v2/utils'
import { rakuenStore } from '@stores'
import { feedback, info } from '@utils'
import { t } from '@utils/fetch'
import { EXCLUDE_STATE } from '../ds'
import Fetch from '../fetch'

import type { Id, ScrollEvent } from '@types'

export default class Ui extends Fetch {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 滑动回调 */
  onScroll = (e: ScrollEvent) => {
    const { y } = e.nativeEvent.contentOffset

    // 计算头部是否需要固定
    const fixed = getHeaderFixed(y, this.state.fixed)
    if (fixed === null) return

    this.setState({
      fixed
    })
  }

  /** 显示评论框 */
  showFixedTextarea = (placeholder: string, replySub: string, message?: string) => {
    t('日志.显示评论框', {
      blogId: this.blogId
    })

    this.setState({
      placeholder,
      replySub,
      message
    })
  }

  /** 收起评论框 */
  closeFixedTextarea = () => {
    this.setState({
      placeholder: '',
      replySub: '',
      message: '',
      editPostId: ''
    })
  }

  /** 输入框变化 */
  onChange = value => {
    this.setState({
      value
    })
  }

  /** 失败后恢复上次的内容 */
  recoveryContent = (content: string) => {
    t('日志.回复失败', {
      blogId: this.blogId
    })

    info('回复失败，可能是cookie失效了')
    this.setState({
      value: ''
    })
    setTimeout(() => {
      this.setState({
        value: content
      })
    }, 160)
  }

  updateShowHeaderTitle = (showHeaderTitle: boolean) => {
    this.setState({
      showHeaderTitle
    })
  }

  /** 显示编辑评论框 */
  showFixedTextareaEdit = async (postId: Id, showFixedTextareCallback: () => void) => {
    const value = await rakuenStore.fetchTopicEdit(postId, 'blog')
    if (value === true) {
      info('此楼层不再允许修改，可能已被回复过')
      return
    }

    if (!value) {
      info('未能获取到回复内容，可能授权过期了')
      return
    }

    this.setState({
      value: ''
    })
    setTimeout(() => {
      this.setState({
        editPostId: postId,
        value
      })
      showFixedTextareCallback()
    }, 0)
  }

  /** 展开的子楼层 */
  toggleExpand = (id: Id) => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id) ? expands.filter(item => item !== id) : [...expands, id]
    })
    this.save()
  }

  /** 显示锐评框 */
  showChatModal = () => {
    this.setState({
      chatModalVisible: true
    })
    feedback(true)
  }

  /** 隐藏锐评框 */
  hideChatModal = () => {
    this.setState({
      chatModalVisible: false
    })
  }

  /** 前一个锐评 */
  beforeChat = () => {
    let { index } = this.state.chat
    if (index === -1) return

    if (index === 0) {
      index = this.currentChatValues.length - 1
    } else {
      index -= 1
    }
    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }

  /** 后一个锐评 */
  nextChat = () => {
    let { index } = this.state.chat
    if (index === -1) return

    if (index === this.currentChatValues.length - 1) {
      index = 0
    } else {
      index += 1
    }
    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }
}
