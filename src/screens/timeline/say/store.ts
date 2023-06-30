/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-17 14:14:38
 */
import { observable, computed } from 'mobx'
import { timelineStore, userStore } from '@stores'
import { info, feedback } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HOST, IOS, MODEL_TIMELINE_TYPE } from '@constants'
import i18n from '@constants/i18n'
import { Params } from './types'
import { Navigation, TimeLineType, UserId } from '@types'
import { webhookSay } from '@utils/webhooks'

export default class ScreenSay extends store {
  params: Params

  state = observable({
    value: '',
    _loaded: false
  })

  scrollViewRef: any = null

  init = async (scrollView?: any) => {
    if (scrollView) this.scrollViewRef = scrollView

    if (this.isNew) return timelineStore.fetchFormHash()

    const { _loaded } = this.say
    if (_loaded) this.scrollToBottom(this.scrollViewRef)

    await this.fetchSay()
    timelineStore.fetchFormHash()
  }

  /** 吐槽 */
  fetchSay = () => {
    return timelineStore.fetchSay({
      id: this.id
    })
  }

  /** 刷新吐槽的时间线 */
  fetchTimeline = () => {
    const type = MODEL_TIMELINE_TYPE.getValue<TimeLineType>('吐槽')
    return timelineStore.fetchTimeline(
      {
        scope: 'friend',
        type
      },
      true
    )
  }

  // -------------------- get --------------------
  @computed get id() {
    const { id, sayId } = this.params
    return sayId || id
  }

  /** 是否创建 */
  @computed get isNew() {
    return !this.id
  }

  /** 吐槽 */
  @computed get say() {
    const data = timelineStore.say(this.id)
    return {
      ...data,
      list: data.list.slice().reverse()
    }
  }

  @computed get myId() {
    return userStore.myId
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  /** 表单提交唯一码 */
  @computed get formhash() {
    return timelineStore.formhash
  }

  /** 对应网址 */
  @computed get url() {
    const { userId } = this.params
    return this.isNew
      ? `${HOST}/timeline?type=say`
      : `${HOST}/user/${userId}/timeline/status/${this.id}`
  }

  // -------------------- page --------------------
  /** 滚动到底 */
  scrollToBottom = (scrollView: any, animated = false) => {
    if (scrollView?.scrollToIndex) {
      setTimeout(() => {
        try {
          scrollView.scrollToIndex({
            animated,
            index: 0,
            viewOffset: 0
          })
        } catch (error) {}
      }, 160)
    }
  }

  /** 滚动到顶 */
  scrollToTop = (scrollView: any, animated = false) => {
    if (scrollView?.scrollToEnd) {
      setTimeout(() => {
        try {
          scrollView.scrollToEnd({
            animated,
            duration: 640
          })
        } catch (error) {}
      }, 160)
    }
  }

  /** 收起评论框 */
  closeFixedTextarea = () => {
    t('吐槽.显示评论框')

    this.setState({
      placeholder: '',
      replySub: '',
      message: ''
    })
  }

  /** 输入框变化 */
  onChange = (value: string) => {
    this.setState({
      value
    })
  }

  /** 长按 @ 某人 */
  at = (id: UserId) => {
    t('吐槽.at', {
      id
    })

    const { value } = this.state
    this.setState({
      value: `${value} @${id} `
    })
  }

  /** 失败后恢复上次的内容 */
  recoveryContent = (content: string) => {
    t('吐槽.回复失败')

    info('操作失败，可能是cookie失效了')
    this.setState({
      value: ''
    })
    setTimeout(() => {
      this.setState({
        value: content
      })
    }, 160)
  }

  // -------------------- action --------------------
  /** 提交 */
  doSubmit = (content: string, scrollView: any, navigation: Navigation) => {
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
    t('吐槽.新吐槽')

    timelineStore.doSay(
      {
        content,
        formhash: this.formhash
      },
      // @ts-expect-error
      async (responseText: string) => {
        let res = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {}

        // @ts-expect-error
        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
          return
        }

        const { onNavigationCallback } = this.params
        if (onNavigationCallback) onNavigationCallback(true)

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
  }

  /** 回复吐槽 */
  doReply = (content: string, scrollView: any) => {
    t('吐槽.回复吐槽')

    const { list = [] } = timelineStore.say(this.id)
    timelineStore.doReply(
      {
        id: String(this.id).split('#')[0],
        content,
        formhash: list[0].formhash
      },
      // @ts-expect-error
      async responseText => {
        let res = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {}

        // @ts-expect-error
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
  }
}
