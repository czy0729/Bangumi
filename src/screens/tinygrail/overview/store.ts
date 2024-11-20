/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:42:15
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { levelList, sortList } from '@tinygrail/_/utils'
import { NAMESPACE, STATE, TABS } from './ds'
import { Direction, TabsKey } from './types'

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
  fetchList = (key?: TabsKey) => {
    if (!key) key = this.currentKey

    return key === 'refine/temple'
      ? tinygrailStore.fetchRefineTemple()
      : tinygrailStore.fetchList(key)
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

  list(key: TabsKey = TABS[0].key) {
    return computed(() =>
      key === 'refine/temple' ? tinygrailStore.refine_temple : tinygrailStore.list(key)
    ).get()
  }

  computedList(key: TabsKey) {
    return computed(() => {
      const list = this.list(key)
      if (key === 'refine/temple' || !list._loaded) return list

      let _list = list
      if (this.state.level) {
        _list = {
          ..._list,
          list: levelList(this.state.level, _list.list)
        }
      }

      if (this.state.sort) {
        _list = {
          ..._list,
          list: sortList(this.state.sort, this.state.direction, _list.list)
        }
      }

      return _list
    }).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('热门榜单.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)

    const { key } = TABS[page]
    const { _loaded } = this.list(key)
    if (!_loaded) this.fetchList(key)
  }

  /** 设置前往 */
  onSelectGo = (title: string) => {
    t('热门榜单.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(NAMESPACE)
  }

  /** 列表等级筛选排序 */
  onLevelSelect = (level: number) => {
    t('热门榜单.筛选', {
      level
    })

    this.setState({
      level
    })
    this.setStorage(NAMESPACE)
  }

  /** 列表排序 */
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
