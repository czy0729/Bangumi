/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-28 18:36:19
 */
import { computed } from 'mobx'
import { calendarStore, discoveryStore, tagStore } from '@stores'
import store from '@utils/store'

export default class ScreenDiscovery extends store {
  init = async () => {
    if (!this.random._loaded) {
      await discoveryStore.fetchRandom(true)
    }
    if (!this.calendar._loaded) {
      await calendarStore.fetchCalendar()
    }
    if (!this.rank._loaded) {
      await tagStore.fetchRank()
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

  @computed get rank() {
    return tagStore.rank()
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
