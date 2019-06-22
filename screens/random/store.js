/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 15:50:07
 */
import { computed } from 'mobx'
import { discoveryStore } from '@stores'
import store from '@utils/store'

export default class ScreenRandom extends store {
  // -------------------- get --------------------
  init = async () => {
    discoveryStore.fetchRandom()
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
