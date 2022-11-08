/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 17:44:49
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { ListKey } from '@stores/tinygrail/types'
import { NAMESPACE, TABS } from './ds'

export default class ScreenTinygrailICO extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      const { page } = this.state
      this.fetchList(TABS[page].key)
    }

    return state
  }

  // -------------------- fetch --------------------
  fetchList = (key: ListKey) => {
    return tinygrailStore.fetchList(key)
  }

  // -------------------- get --------------------
  list(key: ListKey = 'recent') {
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
