/*
 * @Author: czy0729
 * @Date: 2024-08-23 10:43:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 19:08:04
 *
 * 吐槽页业务逻辑
 */
import { timelineStore, userStore } from '@stores'
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { webhookSay } from '@utils/webhooks'
import { IOS } from '@constants'
import i18n from '@constants/i18n'
import Fetch from './fetch'
import { parseStatus } from './utils'
import { DELAY_FETCH_TIMELINE, DELAY_SCROLL } from './ds'

import type { Navigation, UserId } from '@types'

export default class Action extends Fetch {
  /** 滚动到底 */
  scrollToBottom = (animated = false) => {
    const scrollView = this.scrollViewRef
    if (scrollView?.scrollToOffset) {
      setTimeout(() => {
        try {
          scrollView.scrollToOffset({
            animated,
            offset: 0
          })
        } catch {}
      }, DELAY_SCROLL)
    }
  }

  /** 滚动到顶 */
  scrollToTop = (animated = false) => {
    const scrollView = this.scrollViewRef
    if (scrollView?.scrollToEnd) {
      setTimeout(() => {
        try {
          scrollView.scrollToEnd({
            animated
          })
        } catch {}
      }, DELAY_SCROLL)
    }
  }

  /** 收起评论框 */
  closeFixedTextarea = () => {
    t('吐槽.显示评论框')
  }

  /** 输入框变化 */
  onChange = (value: string) => {
    this.setState({
      value
    })
  }

  /** 长按 at 某人 */
  at = (id: UserId) => {
    this.setState({
      value: `${this.state.value} @${id} `,
      cursorEnd: this.state.cursorEnd + 1
    })

    t('吐槽.at', {
      id
    })
  }

  /** 失败后恢复上次的内容 */
  recoveryContent = (content: string) => {
    info('操作失败，可能是登录授权失效了')
    this.setState({
      value: ''
    })

    setTimeout(() => {
      this.setState({
        value: content
      })
    }, DELAY_SCROLL)

    t('吐槽.回复失败')
  }

  /** 提交 */
  doSubmit = (content: string, navigation: Navigation) => {
    if (!this.formhash) {
      info(`获取表单授权码失败, 请检查${i18n.login()}状态`)
      return
    }

    if (this.isNew) {
      this.doSay(content, navigation)
      return
    }

    this.doReply(content)
  }

  /** 新吐槽 */
  doSay = (content: string, navigation: Navigation) => {
    timelineStore.doSay(
      {
        content,
        formhash: this.formhash
      },
      async (responseText: string) => {
        if (IOS && parseStatus(responseText) !== 'ok') {
          this.recoveryContent(content)
          return
        }

        const { onNavigationCallback } = this.params
        if (typeof onNavigationCallback === 'function') onNavigationCallback(true)

        this.setState({
          value: ''
        })

        feedback()
        info('吐槽成功')
        navigation.goBack()

        setTimeout(async () => {
          const data = await this.fetchTimeline()
          const item = data?.list?.[0]
          if (item?.clearHref) {
            webhookSay(
              {
                content: item?.reply?.content,
                url: item?.reply?.url
              },
              userStore.userInfo
            )
          }
        }, DELAY_FETCH_TIMELINE)
      }
    )

    t('吐槽.新吐槽')
  }

  /** 回复吐槽 */
  doReply = (content: string) => {
    timelineStore.doReply(
      {
        id: String(this.id).split('#')[0],
        content,
        formhash: this.formhash
      },
      async responseText => {
        if (IOS && parseStatus(responseText) !== 'ok') {
          this.recoveryContent(content)
          return
        }

        this.setState({
          value: ''
        })

        await this.fetchSay()
        feedback()
      }
    )

    t('吐槽.回复吐槽')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
