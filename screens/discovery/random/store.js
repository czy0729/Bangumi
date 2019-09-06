/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-06 15:08:14
 */
import { computed } from 'mobx'
import { discoveryStore, systemStore } from '@stores'
import store from '@utils/store'

export default class ScreenRandom extends store {
  init = async () => {
    if (!this.random._loaded) {
      this.fetchRandom(true)
    }
  }

  // -------------------- fetch --------------------
  fetchRandom = refresh => discoveryStore.fetchRandom(refresh)

  // -------------------- get --------------------
  @computed get random() {
    return discoveryStore.random
  }

  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
