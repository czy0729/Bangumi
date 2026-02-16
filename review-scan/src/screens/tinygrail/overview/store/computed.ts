/*
 * @Author: czy0729
 * @Date: 2024-12-16 20:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 20:22:41
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { levelList, sortList } from '@tinygrail/_/utils'
import { TABS } from '../ds'
import { TabsKey } from '../types'
import State from './state'

export default class Computed extends State {
  @computed get currentKey() {
    return TABS[this.state.page].key
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
}
