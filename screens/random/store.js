/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 14:25:41
 */
import { computed } from 'mobx'
import { discoveryStore, systemStore } from '@stores'
import store from '@utils/store'
import { analysis } from '@utils/fetch'

export default class ScreenRandom extends store {
  init = async () => {
    if (!this.random._loaded) {
      this.fetchRandom(true)
    }
  }

  // -------------------- fetch --------------------
  fetchRandom = refresh => {
    analysis(`random?page=${this.random.pagination.page}`, '随便看看')
    return discoveryStore.fetchRandom(refresh)
  }

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
