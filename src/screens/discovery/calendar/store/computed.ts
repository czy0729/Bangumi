/*
 * @Author: czy0729
 * @Date: 2024-06-20 17:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:57:52
 */
import { computed } from 'mobx'
import { calendarStore, subjectStore } from '@stores'
import { desc } from '@utils'
import { get } from '@utils/protobuf'
import { SubjectId } from '@types'
import { getTime } from '../utils'
import State from './state'

export default class Computed extends State {
  /** 每日放送 */
  @computed get calendar() {
    return calendarStore.calendar
  }

  /** SectionList sections */
  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) day = 7

    const showPrevDay = new Date().getHours() < 12
    const shift = day - (showPrevDay ? 2 : 1)
    const list = this.calendar.list.map(item => ({
      ...item,
      items: item.items.slice().sort((a, b) => desc(getTime(a), getTime(b)))
    }))
    return list
      .slice(shift)
      .concat(list.slice(0, shift))
      .map((item, index) => ({
        title: item.weekday.cn,
        index,
        data: [item]
      }))
  }

  /** 是否列表 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /** 放送站点 */
  sites(subjectId: SubjectId) {
    return computed(() => {
      if (!this.state.loadedBangumiData) return {}

      return get('bangumi-data')?.find(item => item.id == subjectId)?.s || {}
    }).get()
  }
}
