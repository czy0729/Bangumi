/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:03:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:16:52
 */
import { usersStore, userStore } from '@stores'
import { confirm, debounce, feedback, HTMLDecode, info, updateVisibleBottom } from '@utils'
import { t, xhr } from '@utils/fetch'
import {
  HTML_ACTION_DISCONNECT,
  HTML_ACTION_DISCONNECT_REV,
  TEXT_MENU_DISCONNECT,
  TEXT_MENU_DISCONNECT_REV,
  TEXT_MENU_PM
} from '@constants'
import Fetch from './fetch'

import type { Friend } from '@stores/users/types'
import type { Navigation } from '@types'

export default class Action extends Fetch {
  /** 过滤 */
  onFilterChange = debounce((filter: string) => {
    this.setState({
      filter: filter.trim()
    })
  })

  /** 切换显示分组 */
  toggleFriendGroup = (title: string) => {
    const { friendGroupShows } = this.state
    if (!(title in friendGroupShows)) return

    feedback(true)
    this.setState({
      friendGroupShows: {
        [title]: !friendGroupShows[title]
      }
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** 好友菜单选择 */
  onSelectFriendMenu = (title: string, item: Friend, navigation: Navigation) => {
    const userName = HTMLDecode(item.userName)

    switch (title) {
      case TEXT_MENU_PM:
        this.openPM(item, navigation)
        break

      case TEXT_MENU_DISCONNECT:
        confirm(`确认从朋友列表中去掉 ${userName}?`, () => this.doDisconnectFriend(item))
        break

      case TEXT_MENU_DISCONNECT_REV:
        confirm(`确认移除 ${userName} 对你的关注?`, () => this.doDisconnectRevFriend(item))
        break

      default:
        break
    }

    t('好友.长按菜单', {
      key: title,
      userId: item.userId
    })
  }

  /** 发短信 */
  private openPM = async (item: Friend, navigation: Navigation) => {
    const userName = HTMLDecode(item.userName)
    const userNumId = await this.getFriendUserNumId(item)
    if (!userNumId) return

    navigation.push('PM', {
      userId: userNumId,
      userName
    })
  }

  /** 解除好友 */
  doDisconnectFriend = async (item: Friend) => {
    const userNumId = await this.getFriendUserNumId(item)
    if (!userNumId) return

    const formhash = await this.getFormhash()
    if (!formhash) return

    xhr(
      {
        method: 'GET',
        url: HTML_ACTION_DISCONNECT(userNumId, formhash)
      },
      async () => {
        const removed = await usersStore.removeFriend({
          userId: this.userId,
          friendUserId: item.userId
        })
        if (removed) this.removeFriendGroupItem(item.userId)

        feedback()
        info('已解除好友')
      }
    )
  }

  /** 移除反向好友 */
  doDisconnectRevFriend = async (item: Friend) => {
    const userNumId = await this.getFriendUserNumId(item)
    if (!userNumId) return

    const formhash = await this.getFormhash()
    if (!formhash) return

    xhr(
      {
        method: 'GET',
        url: HTML_ACTION_DISCONNECT_REV(userNumId, formhash)
      },
      async () => {
        const removed = await usersStore.removeFriend({
          userId: this.userId,
          friendUserId: item.userId,
          type: 'rev'
        })
        if (removed) this.removeFriendGroupItem(item.userId)

        feedback()
        info('已移除对你的关注')
      }
    )
  }

  /** 从当前页活跃度分组移除好友 */
  private removeFriendGroupItem = (friendUserId: Friend['userId']) => {
    const { friendGroup } = this.state
    const titles = Object.keys(friendGroup)
    if (!titles.length) return false

    let changed = false
    const next: typeof friendGroup = {}

    titles.forEach(title => {
      const ids = friendGroup[title]
      next[title] = ids.filter(userId => String(userId) !== String(friendUserId))
      if (next[title].length !== ids.length) changed = true
    })

    if (!changed) return false

    this.setState({
      friendGroup: next
    })
    this.save()

    return true
  }

  /** 获取好友数字 ID */
  private getFriendUserNumId = async (item: Friend) => {
    const cached = userStore.usersInfo(item.userId)?.id
    if (cached) return cached

    try {
      const usersInfo = await userStore.fetchUsersInfo(item.userId)
      if (usersInfo?.id) return usersInfo.id
    } catch {}

    info('获取好友数字 ID 失败')
    return
  }

  /** 获取表单授权码 */
  private getFormhash = async () => {
    if (userStore.formhash) return userStore.formhash

    try {
      await userStore.doCheckCookie()
      if (userStore.formhash) return userStore.formhash
    } catch {}

    info('获取表单授权码失败')
    return
  }
}
