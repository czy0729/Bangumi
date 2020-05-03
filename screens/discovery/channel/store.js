/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:04:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-02 21:43:24
 */
import { computed } from 'mobx'
import { discoveryStore } from '@stores'
import { HTML_GROUP_MINE } from '@constants/html'
import store from '@utils/store'

export default class ScreenChannel extends store {
  init = () => this.fetchChannel()

  // -------------------- get --------------------
  @computed get mine() {
    return discoveryStore.channel
  }

  @computed get url() {
    return HTML_GROUP_MINE()
  }

  // -------------------- fetch --------------------
  fetchChannel = () =>
    discoveryStore.fetchChannel({
      type: 'anime'
    })
}
