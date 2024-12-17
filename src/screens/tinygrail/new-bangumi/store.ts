/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:32:02
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { ListKey } from '@stores/tinygrail/types'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { levelList, relation, sortList } from '@tinygrail/_/utils'
import { NAMESPACE, STATE, TABS } from './ds'

export default class ScreenTinygrailNew extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) this.fetchList(this.currentKey)
    return state
  }

  // -------------------- fetch --------------------
  fetchList = (key: ListKey) => {
    return tinygrailStore.fetchList(key)
  }

  // -------------------- get --------------------
  /** 最高市值 */
  @computed get mvc() {
    return tinygrailStore.mvc
  }

  @computed get currentKey() {
    const { page } = this.state
    return TABS[page].key
  }

  @computed get levelMap() {
    const { list } = this.list(this.currentKey)
    const data = {}
    list.forEach(item => (data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)))
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
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('新番榜单.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.saveStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  /** 设置前往 */
  onSelectGo = (title: string) => {
    t('新番榜单.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.saveStorage(NAMESPACE)
  }

  tabChangeCallback = (page: number) => {
    const { title, key } = TABS[page]
    const { _loaded } = this.list(key)
    if (!_loaded || title === '最近活跃') this.fetchList(key)
  }

  /** 筛选 */
  onLevelSelect = (level: any) => {
    t('新番榜单.筛选', {
      level
    })

    this.setState({
      level
    })
    this.saveStorage(NAMESPACE)
  }

  /** 排序 */
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

    this.saveStorage(NAMESPACE)
  }
}
