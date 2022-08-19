/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 17:11:19
 */
import { observable, computed } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import { TYPE_PAGE } from './ds'
import { Params } from './types'

export default class ScreenNotify extends store {
  params: Params

  state = observable({
    page: 0,
    _loaded: false
  })

  init = () => {
    const { type } = this.params
    this.setState({
      page: TYPE_PAGE[type] || 0,
      _loaded: true
    })

    return queue([
      () => this.fetchNotify(),
      () => this.fetchPM(true, 'pmIn'),
      () => this.fetchPM(true, 'pmOut')
    ])
  }

  /**  电波提醒 */
  fetchNotify = () => {
    return rakuenStore.fetchNotify(true)
  }

  /** 短信 */
  fetchPM = (refresh: boolean = false, key?: 'pmIn' | 'pmOut') => {
    return userStore.fetchPM(refresh, key)
  }

  // -------------------- get --------------------
  /** 电波提醒 */
  @computed get notify() {
    return rakuenStore.notify
  }

  /** 短信收信 */
  @computed get pmIn() {
    return userStore.pmIn
  }

  /** 短信发信 */
  @computed get pmOut() {
    return userStore.pmOut
  }

  // -------------------- page --------------------
  onTabsChange = (page: number) => {
    this.setState({
      page
    })
  }

  // -------------------- action --------------------
  /** 清除电波提醒未读 */
  doClearNotify = () => {
    t('电波提醒.清除')

    rakuenStore.doClearNotify()
  }
}
