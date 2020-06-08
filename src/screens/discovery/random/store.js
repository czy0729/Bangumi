/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-22 02:55:48
 */
import { computed } from 'mobx'
import { discoveryStore, systemStore } from '@stores'
import store from '@utils/store'

export default class ScreenRandom extends store {
  init = () => {
    if (!this.random._loaded) {
      this.fetchRandom(true)
    }
  }

  onHeaderRefresh = () => this.fetchRandom(true)

  // -------------------- fetch --------------------
  fetchRandom = refresh => discoveryStore.fetchRandom(refresh)

  // -------------------- get --------------------
  @computed get random() {
    return discoveryStore.random
  }

  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }
}
