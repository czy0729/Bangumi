/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-13 21:51:40
 */
import { computed } from 'mobx'
import { calendarStore, userStore } from '@stores'
import store from '@utils/store'

export default class ScreenCalendar extends store {
  init = () => {
    calendarStore.fetchCalendar()
    calendarStore.fetchOnAir()
  }

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
}
