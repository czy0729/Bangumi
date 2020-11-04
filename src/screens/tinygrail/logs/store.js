/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-05 01:09:03
 */
import { observable, computed } from 'mobx'
import { tinygrailStore, systemStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'

export const tabs = [
  {
    title: '全部',
    key: 'all'
  },
  {
    title: '道具',
    key: 'items'
  },
  {
    title: '刮刮乐',
    key: 'lottery'
  },
  {
    title: 'ICO',
    key: 'ico'
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
    title: '竞拍',
    key: 'auction'
  },
  {
    title: '圣殿',
    key: 'temple'
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
    go: '卖出',
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      this.fetchBalance()
    }

    return res
  }

  // -------------------- fetch --------------------
  fetchBalance = () => tinygrailStore.fetchBalance()

  // -------------------- get --------------------
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get balance() {
    return tinygrailStore.balance
  }

  icons(monoId) {
    return computed(() => tinygrailStore.iconsCache(monoId)).get()
  }

  // -------------------- page --------------------
  onChange = page => {
    if (page === this.state.page) {
      return
    }

    t('资金日志.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  onSelectGo = title => {
    t('资金日志.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  tabChangeCallback = () => {
    const { _loaded } = this.balance
    if (!_loaded) {
      this.fetchBalance()
    }
  }
}
