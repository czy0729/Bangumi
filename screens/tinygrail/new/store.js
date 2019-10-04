/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-04 14:43:16
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import {
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
} from '../_/utils'

export const tabs = [
  {
    title: '最近活跃',
    key: 'nbc'
  },
  {
    title: '最高市值',
    key: 'tnbc'
  }
]
export const sortDS = [
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
]
const namespace = 'ScreenTinygrailNew'

export default class ScreenTinygrailNew extends store {
  state = observable({
    page: 0,
    sort: '',
    direction: '',
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
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page,
      sort: '',
      direction: ''
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

  onSortPress = item => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }
}
