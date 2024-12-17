/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 07:18:41
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { MonoId } from '@types'
import { NAMESPACE, STATE } from './ds'

export default class ScreenTinygrailLogs extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: needFetch ? current : _loaded
    })
    if (needFetch) this.fetchBalance()
    return true
  }

  // -------------------- fetch --------------------
  /** 资金日志 */
  fetchBalance = () => {
    return tinygrailStore.fetchBalance()
  }

  // -------------------- get --------------------
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
    this.saveStorage(NAMESPACE)
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
    this.saveStorage(NAMESPACE)
  }

  tabChangeCallback = () => {
    const { _loaded } = this.balance
    if (!_loaded) this.fetchBalance()
  }
}
