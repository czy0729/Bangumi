/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 08:43:04
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { NAMESPACE, STATE, TABS } from './ds'
import { TabsKey } from './types'

export default class ScreenTinygrailICO extends store<typeof STATE> {
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
      this.fetchList(TABS[page].key)
    }

    return true
  }

  // -------------------- fetch --------------------
  fetchList = (key: TabsKey) => {
    return tinygrailStore.fetchList(key)
  }

  // -------------------- get --------------------
  list(key: TabsKey = TABS[0]['key']) {
    return computed(() => tinygrailStore.list(key)).get()
  }

  // -------------------- page --------------------
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('ICO.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = (page: number) => {
    const { title, key } = TABS[page]
    const { _loaded } = this.list(key)
    if (!_loaded || title === '最近活跃') this.fetchList(key)
  }
}
