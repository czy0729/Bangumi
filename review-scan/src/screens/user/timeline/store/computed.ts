/*
 * @Author: czy0729
 * @Date: 2024-09-11 16:47:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 23:17:09
 */
import { computed } from 'mobx'
import { collectionStore, timelineStore, usersStore } from '@stores'
import { date, getTimestamp, pad } from '@utils'
import { D } from '@constants'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from '../ds'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userId
  }

  /** 用户信息 */
  @computed get users() {
    return usersStore.users(this.userId)
  }

  /** 加入 Bangumi 多少天 */
  @computed get days() {
    const { join } = this.users
    if (!join) return '-'

    const ts = getTimestamp(join.replace(' 加入', ''))
    return Math.floor((getTimestamp() - ts) / D)
  }

  /** 瓷砖进度 */
  @computed get mosaicTile() {
    return collectionStore.mosaicTile
  }

  /** 原始时间线数据 */
  @computed get timeline() {
    const timeline = timelineStore.timeline(DEFAULT_SCOPE, DEFAULT_TYPE)
    return {
      ...timeline,
      list: timeline.list.map(item => {
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
            .map((i, idx) => ({
              id: parseInt(i.match(/\d+/)[0]),
              name: item.p3.text[idx] || '',
              cover: item.image[idx] || '',
              star: item.star,
              comment: item.comment || ''
            })),
          time: item.time
        }
      })
    }
  }

  /**
   * 分组汇总时间线数据
   *  - 年 -> 月 (汇总) -> 日 -> 条目
   */
  @computed get daysTimeline() {
    const sections = []
    const sectionsMap = {}
    const sectionKey = 'date'
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

  @computed get monthsTimeline() {
    const sections = []
    const sectionsMap = {}
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

    sections.forEach(item => {
      item.data.forEach(i => {
        i.data.forEach(ii => {
          let { action } = ii
          action = action.replace(/玩|听|读/g, '看').replace('了', '')
          if (item.actions[action]) {
            item.actions[action] += ii.subject.length
          } else {
            item.actions[action] = ii.subject.length
          }
        })
      })
    })
    return sections
  }

  @computed get yearsTimeline() {
    const sections = []
    const sectionsMap = {}
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
