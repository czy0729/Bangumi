/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 21:49:03
 */
import { computed } from 'mobx'
import { calendarStore, discoveryStore } from '@stores'
import store from '@utils/store'

export default class ScreenDiscovery extends store {
  init = async () => {
    if (!this.random._loaded) {
      discoveryStore.fetchRandom(true)
    }
    if (!this.calendar._loaded) {
      calendarStore.fetchCalendar()
    }
    return calendarStore.fetchHome()
  }

  // -------------------- get --------------------
  @computed get home() {
    return calendarStore.home
  }

  @computed get random() {
    return discoveryStore.random
  }

  @computed get calendar() {
    return calendarStore.calendar
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
