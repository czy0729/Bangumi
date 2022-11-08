/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 05:41:49
 */
import { observable, computed } from 'mobx'
import { tinygrailStore, systemStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { NAMESPACE } from './ds'
import { MonoId } from '@types'

export default class ScreenTinygrailLogs extends store {
  state = observable({
    page: 0,
    go: '卖出',
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(undefined, NAMESPACE)
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })
    if (needFetch) this.fetchBalance()
    return state
  }

  // -------------------- fetch --------------------
  /** 资金日志 */
  fetchBalance = () => {
    return tinygrailStore.fetchBalance()
  }

  // -------------------- get --------------------
  /** 小圣杯缩短资金数字显示 */
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  /** 资金日志 */
  @computed get balance() {
    return tinygrailStore.balance
  }

  icons(monoId: MonoId) {
    return computed(() => tinygrailStore.iconsCache(monoId)).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('资金日志.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback()
  }

  /** 设置前往 */
  onSelectGo = (title: string) => {
    t('资金日志.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(NAMESPACE)
  }

  tabChangeCallback = () => {
    const { _loaded } = this.balance
    if (!_loaded) this.fetchBalance()
  }
}
