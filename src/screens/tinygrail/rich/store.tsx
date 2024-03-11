/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 10:56:28
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { NAMESPACE, STATE, TABS } from './ds'

export default class ScreenTinygrailRich extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      const { page } = this.state
      this.fetchRich(this.key(page))
    }

    return true
  }

  // -------------------- fetch --------------------
  /** 番市首富 */
  fetchRich = (key: string) => {
    return tinygrailStore.fetchRich(key)
  }

  // -------------------- get --------------------
  key(page: number) {
    return computed(() => TABS[page].key).get()
  }

  title(page: number) {
    return computed(() => TABS[page].title).get()
  }

  /** 番市首富 */
  rich(key: string) {
    return computed(() => tinygrailStore.rich(key)).get()
  }

  // -------------------- page --------------------
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('番市首富.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = (page: number) => {
    const key = this.key(page)
    const { _loaded } = this.rich(key)
    if (!_loaded) this.fetchRich(key)
  }
}
