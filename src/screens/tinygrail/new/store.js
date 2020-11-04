/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-04 09:53:23
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import {
  levelList,
  sortList,
  relation,
  SORT_SC,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_DJ,
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
  SORT_SC,
  SORT_HYD,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_DQJ,
  SORT_SCJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_XFJL,
  SORT_FHL
]
const namespace = 'ScreenTinygrailNew'

export default class ScreenTinygrailNew extends store {
  state = observable({
    page: 0,
    level: '',
    sort: '',
    direction: '',
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
      this.fetchList(this.currentKey)
    }

    return res
  }

  // -------------------- fetch --------------------
  fetchList = key => tinygrailStore.fetchList(key)

  // -------------------- get --------------------
  @computed get mvc() {
    return tinygrailStore.mvc
  }

  @computed get currentKey() {
    const { page } = this.state
    return tabs[page].key
  }

  @computed get levelMap() {
    const { list } = this.list(this.currentKey)
    const data = {}
    list.forEach(item =>
      data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)
    )
    return data
  }

  list(key = 'recent') {
    return computed(() => relation(tinygrailStore.list(key))).get()
  }

  computedList(key) {
    const { sort, level, direction } = this.state
    return computed(() => {
      const list = this.list(key)
      if (!list._loaded) {
        return list
      }

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
  onChange = page => {
    if (page === this.state.page) {
      return
    }

    t('新番榜单.标签页切换', {
      page
    })

    this.setState({
      page
      // sort: '',
      // direction: ''
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  onSelectGo = title => {
    t('新番榜单.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  tabChangeCallback = page => {
    const { title, key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded || title === '最近活跃') {
      this.fetchList(key)
    }
  }

  onLevelSelect = level => {
    t('新番榜单.筛选', {
      level
    })

    this.setState({
      level
    })
    this.setStorage(undefined, undefined, namespace)
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

      t('新番榜单.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('新番榜单.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }
}
