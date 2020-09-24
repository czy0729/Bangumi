/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-24 16:49:05
 */
import { observable, computed } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'

export const tabs = [
  {
    key: 'notify',
    title: '提醒'
  },
  {
    key: 'pmIn',
    title: '收件箱'
  },
  {
    key: 'pmOut',
    title: '已发送'
  }
]
const typePage = {
  pm: 1,
  out: 2
}

export default class ScreenNotify extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = () => {
    const { type } = this.params
    this.setState({
      page: typePage[type] || 0,
      _loaded: true
    })

    return queue([
      this.fetchNotify,
      () => this.fetchPM(true, 'pmIn'),
      () => this.fetchPM(true, 'pmOut')
    ])
  }

  fetchNotify = () => rakuenStore.fetchNotify(true)

  fetchPM = (refresh, key) => userStore.fetchPM(refresh, key)

  // -------------------- get --------------------
  @computed get notify() {
    return rakuenStore.notify
  }

  @computed get pmIn() {
    return userStore.pmIn
  }

  @computed get pmOut() {
    return userStore.pmOut
  }

  // -------------------- page --------------------
  onChange = page => {
    this.setState({
      page
    })
  }

  // -------------------- action --------------------
  doClearNotify = () => {
    t('电波提醒.清除')
    rakuenStore.doClearNotify()
  }
}
