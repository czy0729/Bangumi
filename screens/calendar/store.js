/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 20:41:26
 */
import { computed } from 'mobx'
import { calendarStore } from '@stores'
import store from '@utils/store'

export default class ScreenCalendar extends store {
  init = async () => calendarStore.fetchCalendar()

  // -------------------- get --------------------
  @computed get calendar() {
    return calendarStore.calendar
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
