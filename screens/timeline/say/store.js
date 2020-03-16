/* eslint-disable no-await-in-loop */
/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-16 22:57:31
 */
import { observable, computed } from 'mobx'
import { timelineStore, userStore } from '@stores'
import { sleep } from '@utils'
import { info } from '@utils/ui'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

export default class ScreenSay extends store {
  state = observable({
    value: '',
    _loaded: false
  })

  init = async scrollView => {
    if (this.isNew) {
      return timelineStore.fetchFormHash()
    }

    const { _loaded } = this.say
    if (_loaded) {
      this.scrollToBottom(scrollView)
    }

    const res = this.fetchSay()
    await res

    timelineStore.fetchFormHash()
    this.fetchAvatars()
    return res
  }

  fetchSay = () => {
    const { id } = this.params
    return timelineStore.fetchSay({
      id
    })
  }

  /**
   * 根据noAvatarUserIds递归请求用户头像
   */
  fetchAvatars = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.noAvatarUserIds) {
      await userStore.fetchUsersInfo(item)
      await sleep(80)
    }
  }

  // -------------------- get --------------------
  @computed get isNew() {
    const { id } = this.params
    return !id
  }

  @computed get say() {
    const { id } = this.params
    return timelineStore.say(id)
  }

  @computed get myId() {
    return userStore.myId
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  usersInfo(id) {
    return computed(() => userStore.usersInfo(id)).get()
  }

  /**
   * 列表和缓存中都没有头像的用户id
   */
  @computed get noAvatarUserIds() {
    const { _loaded, list } = this.say
    if (!_loaded) {
      return []
    }

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

    return data
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get formhash() {
    return timelineStore.formhash
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
      }, 200)
    }
  }

  /**
   * 显示评论框
   */
  showFixedTextarea = (placeholder, replySub, message) => {
    t('吐槽.显示评论框')

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

  at = id => {
    t('吐槽.at', {
      id
    })

    const { value } = this.state
    this.setState({
      value: `${value} @${id} `
    })
  }

  /**
   * 失败后恢复上次的内容
   */
  recoveryContent = content => {
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
  /**
   * 提交
   */
  doSubmit = (content, scrollView, navigation) => {
    if (this.isNew) {
      if (!this.formhash) {
        info('获取表单授权码失败, 请检查登陆状态')
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

  /**
   * 新吐槽
   */
  doSay = (content, navigation) => {
    t('吐槽.新吐槽')

    timelineStore.doSay(
      {
        content,
        formhash: this.formhash
      },
      responseText => {
        let res = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {
          // do nothing
        }

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
          return
        }

        const { onNavigationCallback } = this.params
        if (onNavigationCallback) {
          onNavigationCallback(true)
        }

        this.setState({
          value: ''
        })
        info('吐槽成功')
        navigation.goBack()
      }
    )
  }

  /**
   * 回复吐槽
   */
  doReply = (content, scrollView) => {
    t('吐槽.回复吐槽')

    const { id } = this.params
    const { list = [] } = this.say
    timelineStore.doReply(
      {
        id: String(id).split('#')[0],
        content,
        formhash: list[0].formhash
      },
      async responseText => {
        let res = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {
          // do nothing
        }

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
          return
        }

        this.setState({
          value: ''
        })
        await this.fetchSay()

        if (scrollView && scrollView.scrollToEnd) {
          setTimeout(() => {
            scrollView.scrollToEnd()
          }, 0)
        }
      }
    )
  }
}
