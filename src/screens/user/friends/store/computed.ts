/*
 * @Author: czy0729
 * @Date: 2024-09-13 04:54:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:18:42
 */
import { computed } from 'mobx'
import { _, usersStore, userStore } from '@stores'
import { HTML_FRIENDS } from '@constants'
import State from './state'

import type { UserId } from '@types'
import type { ListItem } from '../types'

export default class Computed extends State {
  /** 查询的用户 ID */
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  /** 用户信息 */
  users(userId: UserId) {
    return computed(() => usersStore.users(userId)).get()
  }

  /** 好友列表 */
  @computed get friends() {
    return usersStore.friends(this.userId)
  }

  /** 筛选 + 分组 + header 后的列表 */
  @computed get list(): ListItem[] {
    const { list } = this.friends
    const filter = this.state.filter.toUpperCase()
    const group = this.state.friendGroup

    // 搜索过滤
    let filtered = list
    if (filter.length) {
      filtered = list.filter(
        item =>
          item.userName.toUpperCase().includes(filter) ||
          String(item.userId).toUpperCase().includes(filter)
      )
    }

    // 用 Map 提速
    const map = new Map(filtered.map(item => [item.userId, item]))
    const result: ListItem[] = []
    const used = new Set<UserId>()

    const pushHeader = (title: string) => {
      result.push({ type: 'header', key: title, title })
    }

    const pushByIds = (ids?: UserId[], showItem: boolean = true) => {
      if (!ids?.length) return
      ids.forEach(id => {
        if (used.has(id)) return
        const item = map.get(id)
        if (!item) return
        if (showItem) result.push({ type: 'friend', key: String(id), item })
        used.add(id)
      })
    }

    if (!group) {
      // 没有分组，直接按过滤列表返回
      filtered.forEach(item => result.push({ type: 'friend', key: String(item.userId), item }))
      return result
    }

    // 遍历 friendGroup 的中文 key 顺序
    const groupOrder = [
      '一小时内',
      '一天内',
      '三天内',
      '一周内',
      '一月内',
      '半年内',
      '一年内',
      '超过一年'
    ] as const

    groupOrder.forEach(title => {
      const ids = group[title]
      if (ids?.length) {
        pushHeader(title)
        pushByIds(ids, !!filter || this.state.friendGroupShows[title])
      }
    })

    // 未知组：没有被任何分组覆盖的好友
    const unknown: UserId[] = []
    map.forEach((_, id) => {
      if (!used.has(id)) unknown.push(id)
    })

    if (unknown.length) {
      pushHeader('未知')
      pushByIds(unknown, !!filter || this.state.friendGroupShows['未知'])
    }

    return result
  }

  /** 一行多少个 */
  @computed get numColumns() {
    return _.portrait(5, 8)
  }

  /** 网址 */
  @computed get url() {
    return HTML_FRIENDS(this.params?.userId || userStore.myId)
  }

  @computed get hm() {
    return [this.url, 'Friends'] as const
  }
}
