/*
 * @Author: czy0729
 * @Date: 2024-08-23 10:43:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-10 17:36:48
 */
import { FlatList } from 'react-native'
import { timelineStore, userStore } from '@stores'
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { webhookSay } from '@utils/webhooks'
import { IOS } from '@constants'
import i18n from '@constants/i18n'
import { Navigation, UserId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 滚动到底 */
  scrollToBottom = (scrollView: FlatList, animated = false) => {
    if (scrollView?.scrollToIndex) {
      setTimeout(() => {
        try {
          scrollView.scrollToIndex({
            animated,
            index: 0,
            viewOffset: 200
          })
        } catch (error) {}
      }, 160)
    }
  }

  /** 滚动到顶 */
  scrollToTop = (scrollView: FlatList, animated = false) => {
    if (scrollView?.scrollToEnd) {
      setTimeout(() => {
        try {
          scrollView.scrollToEnd({
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
      value: `${this.state.value} @${id} `
    })

    t('吐槽.at', {
      id
    })
  }

  /** 失败后恢复上次的内容 */
  recoveryContent = (content: string) => {
    info('操作失败，可能是cookie失效了')
    this.setState({
      value: ''
    })

    setTimeout(() => {
      this.setState({
        value: content
      })
    }, 160)

    t('吐槽.回复失败')
  }

  /** 提交 */
  doSubmit = (content: string, scrollView: FlatList, navigation: Navigation) => {
    if (this.isNew) {
      if (!this.formhash) {
        info(`获取表单授权码失败, 请检查${i18n.login()}状态`)
        return
      }

      this.doSay(content, navigation)
      return
    }

    const { list = [] } = this.say
    if (!list.length && !list[0].formhash) {
      info('获取表单授权码失败')
      return
    }

    this.doReply(content, scrollView)
  }

  /** 新吐槽 */
  doSay = (content: string, navigation: Navigation) => {
    timelineStore.doSay(
      {
        content,
        formhash: this.formhash
      },
      async (responseText: string) => {
        let res: {
          status?: string
        } = {}

        try {
          res = JSON.parse(responseText)
        } catch (error) {}

        if (IOS && res.status !== 'ok') {
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
        }, 4000)
      }
    )

    t('吐槽.新吐槽')
  }

  /** 回复吐槽 */
  doReply = (content: string, scrollView: FlatList) => {
    const { list = [] } = timelineStore.say(this.id)
    timelineStore.doReply(
      {
        id: String(this.id).split('#')[0],
        content,
        formhash: list[0].formhash
      },
      async responseText => {
        let res: {
          status?: string
        } = {}

        try {
          res = JSON.parse(responseText)
        } catch (error) {}

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
          return
        }

        this.setState({
          value: ''
        })

        await this.fetchSay()
        feedback()
        setTimeout(() => {
          this.scrollToBottom(scrollView, true)
        }, 80)
      }
    )

    t('吐槽.回复吐槽')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
