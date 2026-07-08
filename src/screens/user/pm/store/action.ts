/*
 * @Author: czy0729
 * @Date: 2024-09-13 01:04:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 01:19:08
 */
import { userStore } from '@stores'
import { feedback, info } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'

import type { Navigation } from '@types'

export default class Action extends Fetch {
  /** 当前滚动 Y */
  private _scrollY = 0

  /** 线程标签 Y 位置记录 */
  private _threadLabelPositions: Record<string, number> = {}

  /** 滚动到指定 Y */
  private _scrollTo = (y: number, animated: boolean = true) => {
    if (this.scrollViewRef?.scrollTo) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollTo({ x: 0, y, animated })
        } catch {}
      }, 160)
    }
  }

  /** 记录线程标签位置 */
  onLabelLayout = (threadId: string, y: number) => {
    this._threadLabelPositions[threadId] = y
  }

  /** 记录滚动位置 */
  onScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    this._scrollY = event.nativeEvent.contentOffset.y
  }

  /** 上一个线程标签 / 到顶 */
  onPrevThread = () => {
    if (this.state.thread) {
      this.scrollToTopEnd()
      return
    }

    const threads = this.threads
    const positions = threads
      .map(t => ({ id: t.id, y: this._threadLabelPositions[t.id] }))
      .filter((p): p is { id: string; y: number } => p.y != null)

    if (positions.length >= 2) {
      const target = [...positions].sort((a, b) => b.y - a.y).find(p => p.y < this._scrollY - 20)
      if (target) {
        this._scrollTo(target.y)
        this.setState({
          highlightedThreadId: target.id,
          highlightTick: this.state.highlightTick + 1
        })
        feedback(true)
        return
      }
    }
    this.scrollToTop(true)
  }

  /** 下一个线程标签 / 到底 */
  onNextThread = () => {
    if (this.state.thread) {
      this.scrollToBottomEnd()
      return
    }

    const threads = this.threads
    const positions = threads
      .map(t => ({ id: t.id, y: this._threadLabelPositions[t.id] }))
      .filter((p): p is { id: string; y: number } => p.y != null)

    if (positions.length >= 2) {
      const target = [...positions].sort((a, b) => a.y - b.y).find(p => p.y > this._scrollY + 20)
      if (target) {
        this._scrollTo(target.y)
        this.setState({
          highlightedThreadId: target.id,
          highlightTick: this.state.highlightTick + 1
        })
        feedback(true)
        return
      }
    }
    this.scrollToBottom(true)
  }

  /** 切换线程 */
  onThreadChange = (threadId: string) => {
    this.setState({
      thread: threadId
    })
    this.scrollToBottom()
    feedback(true)

    if (threadId) {
      this.fetchPMDetail(threadId).then(() => this.scrollToBottom())
    } else {
      this.fetchPMDetail()
    }
  }

  /** 滚动到底 */
  scrollToBottom = (animated: boolean = false) => {
    if (this.scrollViewRef?.scrollToEnd) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollToEnd({
            animated
          })
        } catch {}
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
        } catch {}
      }, 160)
    }
  }

  /** 长按到顶（含反馈） */
  scrollToTopEnd = () => {
    this.scrollToTop(true)
    feedback(true)
  }

  /** 长按到底（含反馈） */
  scrollToBottomEnd = () => {
    this.scrollToBottom(true)
    feedback(true)
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
    this.setState({
      title
    })
  }

  /** 内容改变 */
  onChange = (value: string) => {
    this.setState({
      value
    })
  }

  /** 提交 */
  doSubmit = (content: string, navigation: Navigation) => {
    if (this.userId) {
      if (!this.pmParams?.formhash) {
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

    this.doReply(content)
  }

  /** 新短信 */
  doCreate = (content: string, navigation: Navigation) => {
    const msgTitle = this.state.title.trim()

    userStore.doPM(
      {
        msg_title: msgTitle || '',
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
          type: 'pm'
        })

        t('短信.新短信')
      }
    )
  }

  /** 回复短信 */
  doReply = (content: string) => {
    const { thread } = this.state
    const tid = `${this.id}${thread ? `|${thread}` : ''}`
    const form = userStore.pmDetail(tid)?.form
    const data: Record<string, any> = {
      msg_body: content,
      ...(thread ? {} : { msg_title: form?.msg_title ?? '' }),
      formhash: form?.formhash,
      msg_receivers: form?.msg_receivers,
      related: thread || form?.related,
      submit: '回复'
    }
    if (thread) data.redirect_thread = thread

    userStore.doPM(data, async () => {
      this.setState({
        value: ''
      })

      if (thread) {
        await this.fetchPMDetail(thread)
      } else {
        await this.fetchPMDetail()
      }
      feedback()
      this.scrollToBottom()

      t('短信.回复短信')
    })
  }
}
