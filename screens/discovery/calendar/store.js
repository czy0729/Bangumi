/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-20 17:15:31
 */
import { computed } from 'mobx'
import { calendarStore, userStore } from '@stores'
import store from '@utils/store'
import { queue } from '@utils/fetch'

export default class ScreenCalendar extends store {
  init = () =>
    queue([
      () => calendarStore.fetchCalendar(),
      () => calendarStore.fetchOnAir()
    ])

  // -------------------- get --------------------
  @computed get calendar() {
    return calendarStore.calendar
  }

  @computed get onAir() {
    return calendarStore.onAir
  }

  @computed get userCollection() {
    return userStore.userCollection
  }

  @computed get sections() {
    let day = new Date().getDay()
    if (day === 0) {
      day = 7
    }
    return this.calendar.list
      .slice(day - 1)
      .concat(this.calendar.list.slice(0, day - 1))
      .map(item => ({
        title: item.weekday.cn,
        data: [item]
      }))
  }
}
