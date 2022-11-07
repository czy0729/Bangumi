/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 16:42:55
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { levelList, sortList, relation } from '@tinygrail/_/utils'
import { ListKey } from '@stores/tinygrail/types'
import { NAMESPACE, TABS } from './ds'

export default class ScreenTinygrailOverview extends store {
  state = observable({
    page: 0,
    level: '',
    sort: '',
    direction: '' as '' | 'up' | 'down',
    go: '卖出',
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const res = this.getStorage(NAMESPACE)
    const state = await res
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      this.fetchList(this.currentKey)
    }

    return res
  }

  // -------------------- fetch --------------------
  fetchList = (key: ListKey) => {
    return tinygrailStore.fetchList(key)
  }

  // -------------------- get --------------------
  @computed get currentKey() {
    const { page } = this.state
    return TABS[page].key
  }

  @computed get levelMap() {
    const { list } = this.list(this.currentKey)
    const data = {}
    list.forEach((item: { level: string | number }) =>
      data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)
    )
    return data
  }

  list(key: ListKey = 'recent') {
    return computed(() => relation(tinygrailStore.list(key))).get()
  }

  computedList(key: ListKey) {
    const { sort, level, direction } = this.state
    return computed(() => {
      const list = this.list(key)
      if (!list._loaded) return list

      let _list = list
      if (level) {
        _list = {
          ..._list,
          list: levelList(level, _list.list)
        }
      }

      if (sort) {
        _list = {
          ..._list,
          list: sortList(sort, direction, _list.list)
        }
      }

      return _list
    }).get()
  }

  // -------------------- page --------------------
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('热门榜单.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  onSelectGo = (title: string) => {
    t('热门榜单.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(NAMESPACE)
  }

  tabChangeCallback = (page: number) => {
    const { title, key } = TABS[page]
    const { _loaded } = this.list(key)
    if (!_loaded || title === '最近活跃') this.fetchList(key)
  }

  onLevelSelect = (level: number) => {
    t('热门榜单.筛选', {
      level
    })

    this.setState({
      level
    })
    this.setStorage(NAMESPACE)
  }

  onSortPress = (item: string) => {
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

      t('热门榜单.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('热门榜单.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(NAMESPACE)
  }
}
