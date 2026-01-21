/*
 * @Author: czy0729
 * @Date: 2025-01-14 16:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 16:25:18
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { levelList, sortList } from '@tinygrail/_/utils'
import { Id } from '@types'
import { TABS } from '../ds'
import { TabsKeys } from '../types'
import State from './state'

export default class Computed extends State {
  @computed get currentKey() {
    return TABS[this.state.page].key
  }

  @computed get currentTitle() {
    return TABS[this.state.page].title.replace('我的', '')
  }

  @computed get canCancelCount() {
    if (this.currentTitle === '拍卖') {
      return this.computedList(this.currentKey).list.filter(item => item.state === 0).length
    }

    return this.computedList(this.currentKey).list.length
  }

  @computed get levelMap() {
    const data = {}
    this.list(this.currentKey).list.forEach(item =>
      data[item.level || 1] ? (data[item.level || 1] += 1) : (data[item.level || 1] = 1)
    )
    return data
  }

  list(key: TabsKeys = 'bid') {
    return computed(() => tinygrailStore.list(key)).get()
  }

  computedList(key: TabsKeys) {
    return computed(() => {
      const { sort, level, direction } = this.state
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

  @computed get hm() {
    const { type = 'bid' } = this.params
    return [`tinygrail/${type}`, 'TinygrailBid'] as const
  }

  topWeekRank(id: Id) {
    return computed(() => {
      const find = tinygrailStore.topWeek.list.find(item => item.id === id)
      return find?.rank || ''
    }).get()
  }
}
