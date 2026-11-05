/*
 * @Author: czy0729
 * @Date: 2024-09-11 16:47:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 用户时间线派生数据: 分组与统计
 */
import { computed } from 'mobx'
import { collectionStore, timelineStore, usersStore } from '@stores'
import { date, getTimestamp, pad } from '@utils'
import { D } from '@constants'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from '../ds'
import State from './state'

import type { DaySection, MonthSection, TimelineViewItem, YearSection } from '../types'

export default class Computed extends State {
  /** 用户 ID */
  @computed get userId() {
    return this.params.userId
  }

  /** 用户信息 */
  @computed get users() {
    return usersStore.users(this.userId)
  }

  /** 加入班咕咪多少天 */
  @computed get days() {
    const { join } = this.users
    if (!join) return '-'

    const ts = getTimestamp(join.replace(' 加入', ''))
    return Math.floor((getTimestamp() - ts) / D)
  }

  /** 活动瓷砖进度 */
  @computed get mosaicTile() {
    return collectionStore.mosaicTile
  }

  /** 构建适用的时间线数据 */
  @computed get timeline() {
    const { list, ...other } = timelineStore.timeline(DEFAULT_SCOPE, DEFAULT_TYPE)
    const timeline = list.map((item): TimelineViewItem => {
      // 处理 今天 | 昨天
      let _date = item.date
      if (_date === '今天') {
        _date = date('Y-m-d', getTimestamp())
      } else if (_date === '昨天') {
        _date = date('Y-m-d', getTimestamp() - D)
      } else {
        _date = String(_date)
          .split('-')
          .map(item => pad(item))
          .join('-')
      }

      return {
        id: item.id,
        date: _date,
        action: item.p2.text,
        subject: (item.p3.url || [])
          .filter(i => !!i)
          .map((i, idx) => {
            // url 形如 /subject/123, 取不到数字时按 0 处理
            const matched = i.match(/\d+/)

            return {
              id: matched ? Number(matched[0]) : 0,
              name: item.p3.text[idx] || '',
              cover: item.image[idx] || '',
              star: item.star,
              comment: item.comment || ''
            }
          }),
        time: item.time
      }
    })
    return {
      ...other,
      list: timeline,

      /** 未过滤的视图数据, 与 list 相同 */
      _list: timeline
    }
  }

  /**
   * 分组汇总时间线数据
   *  - 年 -> 月 (汇总) -> 日 -> 条目
   */
  @computed get daysTimeline() {
    const sections: DaySection[] = []
    const sectionsMap: Record<string, number> = {}
    const sectionKey: keyof TimelineViewItem = 'date'

    this.timeline.list.forEach(item => {
      const title = item[sectionKey]
      if (sectionsMap[title] === undefined) {
        sectionsMap[title] = sections.length
        sections.push({
          title,
          data: [item]
        })
      } else {
        sections[sectionsMap[title]].data.push(item)
      }
    })

    return sections
  }

  /** 按月汇总, 并统计当月各动作的条目数 */
  @computed get monthsTimeline() {
    const sections: MonthSection[] = []
    const sectionsMap: Record<string, number> = {}

    this.daysTimeline.forEach(item => {
      const month = item.title.slice(0, 7)
      if (sectionsMap[month] === undefined) {
        sectionsMap[month] = sections.length
        sections.push({
          title: month,
          data: [item],
          actions: {}
        })
      } else {
        sections[sectionsMap[month]].data.push(item)
      }
    })

    sections.forEach(section => {
      section.data.forEach(day => {
        day.data.forEach(entry => {
          const action = entry.action.replace(/玩|听|读/g, '看').replace('了', '')

          section.actions[action] = (section.actions[action] || 0) + entry.subject.length
        })
      })
    })

    return sections
  }

  /** 按年汇总 */
  @computed get yearsTimeline() {
    const sections: YearSection[] = []
    const sectionsMap: Record<string, number> = {}

    this.monthsTimeline.forEach(item => {
      const year = item.title.slice(0, 4)
      if (sectionsMap[year] === undefined) {
        sectionsMap[year] = sections.length
        sections.push({
          title: year,
          data: [item]
        })
      } else {
        sections[sectionsMap[year]].data.push(item)
      }
    })

    return sections
  }
}
