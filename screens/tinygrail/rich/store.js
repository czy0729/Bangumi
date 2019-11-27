/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-27 20:00:08
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export const tabs = [
  {
    title: '1-50',
    key: '1/50'
  },
  {
    title: '51-100',
    key: '2/50'
  },
  {
    title: '价值最多',
    key: '1/100/0'
  },
  {
    title: '余额最多',
    key: '1/100'
  },
  {
    title: '初始最多',
    key: '1/100/2'
  }
]
const namespace = 'ScreenTinygrailRich'

export default class ScreenTinygrailRich extends store {
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

    const { page } = this.state
    this.fetchRich(this.key(page))
    return res
  }

  // -------------------- fetch --------------------
  fetchRich = key => tinygrailStore.fetchRich(key)

  // -------------------- get --------------------
  key(page) {
    return computed(() => tabs[page].key).get()
  }

  title(page) {
    return computed(() => tabs[page].title).get()
  }

  rich(key) {
    return computed(() => tinygrailStore.rich(key)).get()
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

  tabChangeCallback = page => {
    const key = this.key(page)
    const { _loaded } = this.rich(key)
    if (!_loaded) {
      this.fetchRich(key)
    }
  }

  // -------------------- action --------------------
}
