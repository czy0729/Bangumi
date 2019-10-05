/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-05 15:53:01
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export const tabs = [
  {
    title: '全部',
    key: 'all'
  },
  {
    title: '卖出',
    key: 'asks'
  },
  {
    title: '买入',
    key: 'bid'
  },
  {
    title: '圣殿',
    key: 'temple'
  },
  {
    title: 'ICO',
    key: 'ico'
  },
  {
    title: '分红',
    key: 'award'
  }
]
const namespace = 'ScreenTinygrailLogs'

export default class ScreenTinygrailLogs extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchBalance()
    return res
  }

  // -------------------- fetch --------------------
  fetchBalance = () => tinygrailStore.fetchBalance()

  // -------------------- get --------------------
  @computed get balance() {
    return tinygrailStore.balance
  }

  icons(monoId) {
    return computed(() => tinygrailStore.iconsCache(monoId)).get()
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = () => {
    const { _loaded } = this.balance
    if (!_loaded) {
      this.fetchBalance()
    }
  }

  // -------------------- action --------------------
}
