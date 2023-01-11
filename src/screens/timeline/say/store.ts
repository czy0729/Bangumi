/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:03:39
 */
import { observable, computed } from 'mobx'
import { timelineStore, userStore } from '@stores'
import { sleep } from '@utils'
import { info, feedback } from '@utils/ui'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HOST, IOS } from '@constants'
import i18n from '@constants/i18n'
import { Params } from './types'
import { Navigation, UserId } from '@types'

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
    const { id } = this.params
    return timelineStore.fetchSay({
      id
    })
  }

  /** @deprecated 根据 noAvatarUserIds 递归请求用户头像 */
  fetchAvatars = async () => {
    for (const item of this.noAvatarUserIds) {
      await userStore.fetchUsersInfo(item)
      await sleep(80)
    }
  }

  // -------------------- get --------------------
  /** 是否创建 */
  @computed get isNew() {
    const { id } = this.params
    return !id
  }

  /** 吐槽 */
  @computed get say() {
    const { id } = this.params
    return timelineStore.say(id)
  }

  @computed get users() {
    const { list } = this.say
    const map = {}
    const users = []
    list.reverse().forEach(item => {
      if (!map[item.id]) {
        users.push(item)
        map[item.id] = true
      }
    })
    return users
  }

  @computed get myId() {
    return userStore.myId
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  usersInfo(id: UserId) {
    return computed(() => userStore.usersInfo(id)).get()
  }

  /** 列表和缓存中都没有头像的用户 id */
  @computed get noAvatarUserIds() {
    const { _loaded, list } = this.say
    if (!_loaded) return []

    const data = []
    list.forEach(item => {
      if (
        !item.avatar &&
        item.id &&
        !data.includes(item.id) &&
        !this.usersInfo(item.id).username
      ) {
        data.push(item.id)
      }
    })

    return data.reverse()
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
    const { userId, id } = this.params
    return this.isNew
      ? `${HOST}/timeline?type=say`
      : `${HOST}/user/${userId}/timeline/status/${id}`
  }

  // -------------------- page --------------------
  /** 滚动到底 */
  scrollToBottom = (scrollView: any, animated = false) => {
    try {
      if (scrollView?.scrollToEnd) {
        setTimeout(() => {
          scrollView.scrollToEnd({
            animated,
            duration: 640
          })
        }, 160)
      }
    } catch (error) {}
  }

  /** 滚动到顶 */
  scrollToTop = (scrollView: any, animated = false) => {
    try {
      if (scrollView?.scrollTo) {
        setTimeout(() => {
          scrollView.scrollTo({
            x: 0,
            y: 0,
            animated,
            duration: 640
          })
        }, 160)
      }
    } catch (error) {}
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
      responseText => {
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
      }
    )
  }

  /** 回复吐槽 */
  doReply = (content: string, scrollView: any) => {
    t('吐槽.回复吐槽')

    const { id } = this.params
    const { list = [] } = this.say
    timelineStore.doReply(
      {
        id: String(id).split('#')[0],
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

        if (scrollView && scrollView.scrollToEnd) {
          setTimeout(() => {
            scrollView.scrollToEnd()
          }, 0)
        }
      }
    )
  }
}
