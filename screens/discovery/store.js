/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-29 04:05:18
 */
import { computed } from 'mobx'
import { calendarStore } from '@stores'
import store from '@utils/store'

export default class ScreenDiscovery extends store {
  init = async () => calendarStore.fetchHome()

  // -------------------- get --------------------
  @computed get home() {
    return calendarStore.home
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
