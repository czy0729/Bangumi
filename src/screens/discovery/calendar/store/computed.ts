/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-13 01:40:36
 */
import { computed } from 'mobx'
import { calendarStore, collectionStore, subjectStore } from '@stores'
import { desc, getOnAirItem } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { get } from '@utils/protobuf'
import {
  TEXT_MENU_FAVOR,
  TEXT_MENU_GRID,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST,
  TEXT_MENU_NOT_SHOW,
  TEXT_MENU_ONLY_SHOW,
  TEXT_MENU_SHOW,
  withSplit
} from '@constants'
import { PREV_DAY_HOUR } from '../ds'
import { getTime } from '../utils'
import State from './state'

import type { SubjectId } from '@types'
import type { SectionListCalendarItem } from '../types'

export default class Computed extends State {
  /** 每日放送 */
  @computed get calendar() {
    return calendarStore.calendar
  }

  /** 每日放送分区列表 */
  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) day = 7

    const showPrevDay = new Date().getHours() < PREV_DAY_HOUR
    const shift = day - (showPrevDay ? 2 : 1)

    const list = this.calendar.list.map(item => ({
      ...item,
      items: item.items
        .filter(item => {
          // 未知时间番剧
          if (!this.state.expand) {
            const time = getTime(item, item.id)
            if (!time || time === '2359') return false
          }

          // 收藏
          if (this.state.type === 'collect') {
            if (!collectionStore.collect(item.id)) return false
          }

          // 筛选
          const {
            type: onAirAdapt = '',
            origin: onAirOrigin = '',
            tag: onAirTag = ''
          } = getOnAirItem(item.id)
          if (
            (this.state.adapt && onAirAdapt !== this.state.adapt) ||
            (this.state.origin && !onAirOrigin?.includes(this.state.origin)) ||
            (this.state.tag && !onAirTag?.includes(this.state.tag))
          ) {
            return false
          }

          return true
        })
        .sort((a, b) => desc(getTime(a), getTime(b)))
    }))

    let listIndex = -1
    return list
      .slice(shift)
      .concat(list.slice(0, shift))
      .map((item, index) => ({
        title: item.weekday.cn,
        index,
        data: [
          {
            ...item,
            items: item.items.map(item => {
              listIndex += 1
              return {
                ...item,
                index: listIndex
              }
            }) as SectionListCalendarItem[]
          }
        ]
      }))
  }

  /** 是否列表 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 条目信息 */
  subject = computedFn((subjectId: SubjectId) => {
    return subjectStore.subject(subjectId)
  })

  /** 放送站点 */
  sites = computedFn((subjectId: SubjectId) => {
    if (!this.state.loadedBangumiData) return {}

    return get('bangumi-data')?.find(item => item.id == subjectId)?.s || {}
  })

  /** 工具栏菜单 */
  @computed get toolBar() {
    return [
      `${TEXT_MENU_LAYOUT}${withSplit(
        this.state.layout === 'list' ? TEXT_MENU_LIST : TEXT_MENU_GRID
      )}`,
      `${TEXT_MENU_FAVOR}${withSplit(
        this.state.type === 'all' ? TEXT_MENU_SHOW : TEXT_MENU_ONLY_SHOW
      )}`,
      `未知时间番剧${withSplit(this.state.expand ? TEXT_MENU_SHOW : TEXT_MENU_NOT_SHOW)}`
    ]
  }
}
