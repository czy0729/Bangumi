/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-03 22:16:44
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export const tabs = [
  {
    title: '最近活跃',
    key: 'recent'
  },
  {
    title: '新番活跃',
    key: 'nbc'
  },
  {
    title: '新番市值',
    key: 'tnbc'
  },
  {
    title: '最高市值',
    key: 'mvc'
  },
  {
    title: '最大涨幅',
    key: 'mrc'
  },
  {
    title: '最大跌幅',
    key: 'mfc'
  },
  {
    title: 'ICO资金',
    key: 'mvi'
  },
  {
    title: 'ICO人气',
    key: 'mpi'
  },
  {
    title: 'ICO活跃',
    key: 'rai'
  }
]
const namespace = 'ScreenTinygrail'

export default class ScreenTinygrail extends store {
  state = observable({
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数,
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
    this.fetchList(tabs[page].key)

    return res
  }

  // -------------------- fetch --------------------
  fetchList = key => tinygrailStore.fetchList(key)

  // -------------------- get --------------------
  @computed get mvc() {
    return tinygrailStore.mvc
  }

  list(key = 'recent') {
    return computed(() => tinygrailStore.list(key)).get()
  }

  // -------------------- page --------------------
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
    this.tabChangeCallback(page)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page,
      _page: page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { title, key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded || title === '最近活跃') {
      this.fetchList(key)
    }
  }

  // -------------------- action --------------------
}
