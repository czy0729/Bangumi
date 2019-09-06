/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-08 10:38:09
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'

export default class ScreenNotify extends store {
  init = async () => this.fetchNotify()

  fetchNotify = () => rakuenStore.fetchNotify(true)

  // -------------------- get --------------------
  @computed get notify() {
    return rakuenStore.notify
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
  doClearNotify = () => rakuenStore.doClearNotify()
}
