/*
 * @Author: czy0729
 * @Date: 2024-12-03 13:48:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 22:51:14
 */
import { discoveryStore, userStore } from '@stores'
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  scrollViewRef = null

  inputRef = null

  forwardRef = (ref: any) => {
    this.scrollViewRef = ref
  }

  forwardInputRef = (ref: any) => {
    try {
      this.inputRef = ref.inputRef
    } catch (error) {}
  }

  /** 滚动到顶 */
  scrollToTop = () => {
    if (this.scrollViewRef?.scrollToIndex) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollToIndex({
            animated: true,
            index: 0,
            viewOffset: 0
          })

          setTimeout(() => {
            this.setState({
              visibleBottom: EXCLUDE_STATE.visibleBottom
            })
          }, 400)
        } catch (error) {}
      }, 160)
    }
  }

  /** 滚动到底 */
  scrollToBottom = (animated = false) => {
    if (this.scrollViewRef?.scrollToEnd) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollToEnd({
            animated,
            duration: 640
          })
        } catch (error) {}
      }, 160)
    }
  }

  onToggleShow = (nickname: string = '') => {
    if (!this.isWebLogin) {
      info('未登录')
      return
    }

    const { show, text } = this.state
    if (nickname) {
      const mark = `@${nickname}`
      this.setState({
        show: true,
        text: text.includes(mark) ? text : `@${nickname} ${text}`
      })
      setTimeout(() => {
        try {
          this.inputRef.focus()
        } catch (error) {}
      }, 0)
      return
    }

    this.setState({
      show: !show
    })
  }

  onToggleAutoRefresh = () => {
    this.setState({
      autoRefresh: !this.state.autoRefresh
    })
    this.save()
  }

  onChangeText = (text: string) => {
    this.setState({
      text: text.trim()
    })
  }

  onSubmit = () => {
    const { fetching, text } = this.state
    if (fetching) return

    if (!text) {
      info('请输入内容')
      return
    }

    this.setState({
      fetching: true,
      show: false
    })

    setTimeout(() => {
      this.updateDollars()
      discoveryStore.doDollars(
        {
          message: text
        },
        () => {
          this.setState({
            fetching: false,
            text: ''
          })
          this.updateDollars()

          t('Dollars.发送', {
            userId: userStore.myId
          })
        },
        () => {
          info('发送失败, 可能需要重新登录')
          this.setState({
            fetching: false,
            show: true
          })
        }
      )
    }, 80)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
