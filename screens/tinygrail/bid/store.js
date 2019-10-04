/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-18 00:34:11
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export const tabs = [
  {
    title: '我的买单',
    key: 'bid'
  },
  {
    title: '我的卖单',
    key: 'asks'
  }
]

export default class ScreenTinygrailBid extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const { type } = this.params
    this.setState({
      page: type === 'bid' ? 0 : 1,
      _loaded: true
    })

    const { page } = this.state
    this.fetchList(tabs[page].key)
  }

  // -------------------- fetch --------------------
  fetchList = key => {
    if (key === 'bid') {
      return tinygrailStore.fetchBid()
    }
    return tinygrailStore.fetchAsks()
  }

  // -------------------- get --------------------
  list(key = 'bid') {
    return computed(() => tinygrailStore.list(key)).get()
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      this.fetchList(key)
    }
  }

  // -------------------- action --------------------
}
