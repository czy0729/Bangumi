/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-23 04:15:00
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import { desc } from '@utils'
import store from '@utils/store'
import { HTML_GROUP_MINE } from '@constants/html'

export default class ScreenMine extends store {
  init = () => this.fetchMine()

  // -------------------- get --------------------
  @computed get mine() {
    return {
      ...rakuenStore.mine,
      list: rakuenStore.mine.list.sort((a, b) => desc(a, b, item => item.num))
    }
  }

  @computed get url() {
    return HTML_GROUP_MINE()
  }

  // -------------------- fetch --------------------
  fetchMine = () => rakuenStore.fetchMine()
}
