/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:35:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 15:44:44
 */
import { computed } from 'mobx'
import { computedFn } from 'mobx-utils'
import { calendarStore, discoveryStore } from '@stores'
import { date, getTimestamp } from '@utils'
import State from './state'

import type { SubjectType } from '@types'
import type { CalendarItemFlat } from '@stores/calendar/types'

export default class Computed extends State {
  /** 发现页信息聚合 */
  @computed get home() {
    return calendarStore.home
  }

  /** 随机打乱（缓存在 state 中，仅 fetchHome 后更新） */
  @computed get ramdonHome() {
    return this.state.randomHome
  }

  /** 今日上映 - 部。共 - 人收看今日番组 */
  @computed get today() {
    return calendarStore.home.today
  }

  /** 好友的频道聚合信息 */
  friendsChannel = computedFn((type: SubjectType) => {
    return discoveryStore.channel(type).friends
  })

  /** 放送数据（已在 calendarStore 中缓存扁平化结果） */
  @computed get calendar(): CalendarItemFlat[] {
    return calendarStore.calendarFlat
  }

  /** 今日放送数据 */
  @computed get todayBangumi(): CalendarItemFlat[] {
    try {
      const calendar = this.calendar
      const len = calendar.length
      if (!len) return [] as CalendarItemFlat[]

      const time = date('Hi', getTimestamp())
      const current = parseInt(`${new Date().getDay() || 7}${time || '0000'}`)
      const index = calendar.findIndex(
        item => current >= parseInt(`${item.weekDayLocal || 7}${item.timeLocal || '0000'}`)
      )

      // 用取模实现循环，避免三倍复制
      const result: CalendarItemFlat[] = []
      for (let i = index - 10; i <= index + 1; i++) {
        result.push(calendar[((i % len) + len) % len])
      }
      return result.reverse()
    } catch (error) {
      return [] as CalendarItemFlat[]
    }
  }
}
