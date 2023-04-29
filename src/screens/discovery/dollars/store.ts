/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:25:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 17:33:29
 */
import { computed, observable } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { info, updateVisibleBottom } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { EXCLUDE_STATE } from './ds'

export default class ScreenDollars extends store {
  state = observable(EXCLUDE_STATE)

  scrollViewRef = null

  inputRef = null

  init = async () => {
    this.setState({
      ...EXCLUDE_STATE
    })
    return this.fetchDollars()
  }

  forwardRef = (ref: any) => {
    this.scrollViewRef = ref
  }

  forwardInputRef = (ref: any) => {
    try {
      this.inputRef = ref.inputRef
    } catch (error) {}
  }

  fetchDollars = () => {
    return discoveryStore.fetchDollars()
  }

  updateDollars = () => {
    return discoveryStore.updateDollars()
  }

  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get dollars() {
    return discoveryStore.dollars
  }

  /** 滚动到顶 */
  scrollToTop = (animated = false) => {
    try {
      if (this.scrollViewRef?.scrollTo) {
        setTimeout(() => {
          this.scrollViewRef.scrollTo({
            x: 0,
            y: 0,
            animated,
            duration: 640
          })
        }, 160)
      }
    } catch (error) {}
  }

  /** 滚动到底 */
  scrollToBottom = (animated = false) => {
    try {
      if (this.scrollViewRef?.scrollToEnd) {
        setTimeout(() => {
          this.scrollViewRef.scrollToEnd({
            animated,
            duration: 640
          })
        }, 160)
      }
    } catch (error) {}
  }

  onToggleShow = (nickname?: string) => {
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

  onChangeText = (text: string) => {
    this.setState({
      text: text.trim()
    })
  }

  onSubmit = () => {
    const { fething, text } = this.state
    if (fething) return

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
