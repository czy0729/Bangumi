/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:08:13
 */
import { observable, computed } from 'mobx'
import { _, rakuenStore, userStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import { TYPE_PAGE } from './ds'
import { Params, PMKeys } from './types'

export default class ScreenNotify extends store {
  params: Params

  state = observable({
    /** 可视范围底部 y */
    visibleBottom: _.window.height,
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
  fetchPM = (refresh: boolean = false, key?: PMKeys) => {
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
  /** 标签页切换 */
  onTabsChange = (page: number) => {
    this.setState({
      page
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  /** 清除电波提醒未读 */
  doClearNotify = () => {
    t('电波提醒.清除')

    rakuenStore.doClearNotify()
  }
}
