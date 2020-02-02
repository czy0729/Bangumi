/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-02 04:53:57
 */
import { observable, computed } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'

export const tabs = [
  {
    title: '提醒',
    key: 'notify'
  },
  {
    title: '短信',
    key: 'pm'
  }
]

export default class ScreenNotify extends store {
  state = observable({
    page: 1,
    _loaded: false
  })

  init = () => queue([this.fetchNotify, () => this.fetchPM(true)])

  fetchNotify = () => rakuenStore.fetchNotify(true)

  fetchPM = refresh => userStore.fetchPM(refresh)

  // -------------------- get --------------------
  @computed get notify() {
    return rakuenStore.notify
  }

  @computed get pm() {
    return userStore.pm
  }

  // -------------------- action --------------------
  doClearNotify = () => {
    t('电波提醒.清除')
    rakuenStore.doClearNotify()
  }
}
