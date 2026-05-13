/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:31:34
 */
import { computed } from 'mobx'
import { systemStore, tinygrailStore, userStore } from '@stores'
import { levelList } from '@tinygrail/_/utils'
import State from './state'

export default class Computed extends State {
  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get advance() {
    return systemStore.advance
  }

  @computed get advanceList() {
    return tinygrailStore.advanceList
  }

  @computed get computedList() {
    const { level } = this.state
    const list = this.advanceList
    if (!list._loaded) return list

    let _list = list
    if (level) {
      _list = {
        ..._list,
        list: levelList(level, _list.list)
      }
    }

    return _list
  }

  @computed get levelMap() {
    const { list } = this.advanceList
    const data = {}
    list.forEach(item => (data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)))
    return data
  }
}
