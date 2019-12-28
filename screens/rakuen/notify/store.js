/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 13:59:22
 */
import { computed } from 'mobx'
import { rakuenStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'

export default class ScreenNotify extends store {
  init = async () => this.fetchNotify()

  fetchNotify = () => rakuenStore.fetchNotify(true)

  // -------------------- get --------------------
  @computed get notify() {
    return rakuenStore.notify
  }

  // -------------------- action --------------------
  doClearNotify = () => {
    t('电波提醒.清除')
    rakuenStore.doClearNotify()
  }
}
