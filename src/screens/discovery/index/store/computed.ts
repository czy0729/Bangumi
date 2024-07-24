/*
 * @Author: czy0729
 * @Date: 2024-07-17 03:35:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-17 03:36:33
 */
import { computed } from 'mobx'
import { calendarStore, discoveryStore } from '@stores'
import { ON_AIR } from '@stores/calendar/onair'
import { appRandom, date, desc, getTimestamp } from '@utils'
import { SubjectType } from '@types'
import State from './state'

export default class Computed extends State {
  /** 发现页信息聚合 */
  @computed get home() {
    return calendarStore.home
  }

  /** 随机打乱 */
  @computed get ramdonHome() {
    return {
      ...this.home,
      anime: appRandom(this.home.anime, 'info'),
      book: appRandom(this.home.book, 'info'),
      game: appRandom(this.home.game, 'info'),
      music: appRandom(this.home.music, 'info'),
      real: appRandom(this.home.real, 'info')
    }
  }

  /** 今日上映 - 部。共 - 人收看今日番组 */
  @computed get today() {
    return calendarStore.home.today
  }

  /** 好友的频道聚合信息 */
  friendsChannel(type: SubjectType) {
    return computed(() => discoveryStore.channel(type).friends).get()
  }

  /** 放送数据 */
  @computed get calendar() {
    const { list } = calendarStore.calendar
    const _list = list.map(item => ({
      ...item,
      items: item.items
        .map(i => {
          const { air = 0, timeCN, timeJP } = calendarStore.onAir[i.id] || ON_AIR[i.id] || {}
          return {
            ...i,
            air,

            /**
             * @fixed 20210217 bangumi 的每日放送是以日本放送日作为分组, 所以时间应以日本时间为主
             * 避免刚好 +1 小时时差导致周几错误
             */
            timeCN: timeCN || timeJP || '2359'
          }
        })
        .filter(item => item.timeCN !== '2359') // 暂时把没有放送具体时间的番剧隐藏
        .sort((a, b) => desc(String(a.timeCN || ''), String(b.timeCN || '')))
    }))

    const calendar = []
    _list.forEach(item => {
      item.items.forEach(i => {
        calendar.push({
          ...i,
          weekday: item.weekday.id
        })
      })
    })

    return calendar.reverse()
  }

  /** 今日放送数据 */
  @computed get todayBangumi() {
    try {
      const time = date('Hi', getTimestamp())
      const current = parseInt(`${new Date().getDay() || 7}${time || '0000'}`)
      const index = this.calendar.findIndex(
        item => current >= parseInt(`${item.weekDayLocal || 7}${item.timeLocal || '0000'}`)
      )

      // 在前面和后面拼接多一组数据, 可以实现循环每周, 补全数据
      const circle = [...this.calendar, ...this.calendar, ...this.calendar]
      const data = circle
        .slice(index - 10 + this.calendar.length, index + 2 + this.calendar.length)
        .reverse()
      return data
    } catch (error) {
      return []
    }
  }
}
