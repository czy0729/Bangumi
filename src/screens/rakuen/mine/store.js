/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-07 14:20:20
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { HTML_GROUP_MINE } from '@constants/html'
import store from '@utils/store'

export default class ScreenMine extends store {
  init = () => this.fetchMine()

  // -------------------- get --------------------
  @computed get mine() {
    return {
      ...rakuenStore.mine,
      list: rakuenStore.mine.list.sort((a, b) => b.num - a.num)
    }
  }

  @computed get url() {
    return HTML_GROUP_MINE()
  }

  // -------------------- fetch --------------------
  fetchMine = () => rakuenStore.fetchMine()
}
