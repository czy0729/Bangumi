/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:00:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:24:44
 */
import { timelineStore, usersStore } from '@stores'
import { throttle } from '@utils'
import Computed from './computed'

import type { UserId } from '@types'

export default class Fetch extends Computed {
  private _fetchFriendsActive: boolean

  /** 好友列表 */
  fetchFriends = () => {
    return usersStore.fetchFriends(this.userId)
  }

  /** 好友活跃度 */
  fetchFriendsActive = async () => {
    if (this._fetchFriendsActive) return this.fetchFriendsActiveThresholds()

    const { fetching } = this.state
    if (fetching) return false

    this._fetchFriendsActive = true
    this.setState({
      fetching: true,
      percent: ''
    })
    await timelineStore.fetchUsersActiveQueue(
      this.friends.list.map(item => item.userId).slice(0, 400),
      this.updateProgress
    )
    this.setState({
      fetching: false,
      percent: ''
    })

    return this.setFriendGroupByActive()
  }

  /** 好友活跃度 (未知 + 3天内) */
  fetchFriendsActiveThresholds = async () => {
    const { fetching } = this.state
    if (fetching) return false

    const now = Date.now() / 1000
    const oneDay = 86400
    const threeDays = 3 * oneDay

    const toRefresh: UserId[] = []

    this.friends.list.forEach(item => {
      const lastActive = timelineStore.active[item.userId]

      // 未知活跃时间，必须刷新
      if (!lastActive) {
        toRefresh.push(item.userId)
        return
      }

      const diff = now - lastActive

      // 只刷新 3 天以内的好友（临界点 ±1天）
      if (diff > oneDay && diff <= threeDays + oneDay) {
        toRefresh.push(item.userId)
      }
    })

    if (!toRefresh.length) return true

    this.setState({
      fetching: true,
      percent: ''
    })
    await timelineStore.fetchUsersActiveQueue(toRefresh, this.updateProgress)
    this.setState({
      fetching: false,
      percent: ''
    })

    return this.setFriendGroupByActive()
  }

  /** 计算活跃度分组数据 */
  setFriendGroupByActive = async () => {
    const groups: Record<string, UserId[]> = {
      一小时内: [],
      一天内: [],
      三天内: [],
      一周内: [],
      一月内: [],
      半年内: [],
      一年内: [],
      超过一年: []
    }

    const now = Date.now() / 1000 // 当前时间戳秒

    // 先把每个好友分组，并保存 lastActive
    const temp: Record<string, { id: UserId; lastActive: number }[]> = {
      一小时内: [],
      一天内: [],
      三天内: [],
      一周内: [],
      一月内: [],
      半年内: [],
      一年内: [],
      超过一年: []
    }

    this.friends.list.forEach(item => {
      const lastActive = timelineStore.active[item.userId]

      if (lastActive === undefined || lastActive === null) {
        return
      }

      const diffSec = now - lastActive
      const days = diffSec / 86400

      if (diffSec <= 3600) temp['一小时内'].push({ id: item.userId, lastActive }) // 1小时内
      else if (days <= 1) temp['一天内'].push({ id: item.userId, lastActive })
      else if (days <= 3) temp['三天内'].push({ id: item.userId, lastActive })
      else if (days <= 7) temp['一周内'].push({ id: item.userId, lastActive })
      else if (days <= 30) temp['一月内'].push({ id: item.userId, lastActive })
      else if (days <= 182) temp['半年内'].push({ id: item.userId, lastActive })
      else if (days <= 365) temp['一年内'].push({ id: item.userId, lastActive })
      else temp['超过一年'].push({ id: item.userId, lastActive })
    })

    // 按 lastActive 倒序排列（越最近活跃越前）
    Object.keys(temp).forEach(key => {
      groups[key] = temp[key].sort((a, b) => b.lastActive - a.lastActive).map(i => i.id)
    })

    this.setState({
      friendGroup: groups
    })
    this.save()

    return true
  }

  /** 更新批量请求完成度 */
  updateProgress = throttle((percent: string) => {
    this.setState({
      percent
    })
  }, 1000)
}
