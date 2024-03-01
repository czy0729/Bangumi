/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 06:01:19
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { ListKey } from '@stores/tinygrail/types'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { levelList, relation, sortList } from '@tinygrail/_/utils'
import { NAMESPACE, STATE, TABS } from './ds'
import { Direction } from './types'

export default class ScreenTinygrailOverview extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) this.fetchList(this.currentKey)

    return true
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
    const { key } = TABS[page]
    const { _loaded } = this.list(key)
    if (!_loaded) this.fetchList(key)
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
      let nextDirection: Direction = 'down'
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
