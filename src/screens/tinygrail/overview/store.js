/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-03 03:55:49
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import {
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
    key: 'recent'
  },
  {
    title: '最高市值',
    key: 'mvc'
  },
  {
    title: '最高股息',
    key: 'msrc'
  },
  {
    title: '最大涨幅',
    key: 'mrc'
  },
  {
    title: '最大跌幅',
    key: 'mfc'
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
const namespace = 'ScreenTinygrailOverview'

export default class ScreenTinygrailOverview extends store {
  state = observable({
    page: 0,
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
      const { page } = this.state
      this.fetchList(tabs[page].key)
    }

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

    t('热门榜单.标签页切换', {
      page
    })

    this.setState({
      page,
      sort: '',
      direction: ''
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  onSelectGo = title => {
    t('热门榜单.设置前往', {
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

    this.setStorage(undefined, undefined, namespace)
  }
}
