/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 19:02:46
 */
import { computed } from 'mobx'
import { calendarStore } from '@stores'
import store from '@utils/store'

export default class Store extends store {
  // -------------------- get --------------------
  @computed get calendar() {
    return calendarStore.calendar
  }

  init = async () => calendarStore.fetchCalendar()

  // -------------------- page --------------------

  // -------------------- action --------------------
}
