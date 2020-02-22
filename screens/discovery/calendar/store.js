/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-23 04:49:46
 */
import { computed } from 'mobx'
import { _, calendarStore, userStore } from '@stores'
import store from '@utils/store'
import { queue } from '@utils/fetch'

export const imageWidth = (_.window.width - _.wind * 2) * 0.3
export const imageHeight = imageWidth * 1.28
export const marginLeft = (_.window.width - 3 * imageWidth) / 4

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
