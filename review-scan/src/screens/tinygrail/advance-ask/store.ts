/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:31:34
 */
import { computed, observable } from 'mobx'
import { systemStore, tinygrailStore, userStore } from '@stores'
import { getTimestamp, info } from '@utils'
import store from '@utils/store'
import { DEV } from '@constants'
import { levelList } from '@tinygrail/_/utils'
import { EXCLUDE_STATE } from './ds'

export default class ScreenTinygrailAdvanceAsk extends store<typeof EXCLUDE_STATE> {
  state = observable({
    level: '',
    _loaded: false
  })

  init = () => {
    const { _loaded } = this.advanceList
    if (!_loaded) this.fetchAdvanceList(false)
  }

  // -------------------- fetch --------------------
  fetchAdvanceList = (showInfo = true) => {
    const { _loaded } = this.advanceList
    if (!_loaded) return tinygrailStore.fetchAdvanceList()

    if (!this.advance && getTimestamp() - Number(_loaded) < 60 * 60 * 4) {
      if (showInfo) {
        info('普通用户4小时内只能刷新一次')
      }
      return true
    }

    if (!DEV && this.advance && getTimestamp() - Number(_loaded) < 60 * 1) {
      if (showInfo) {
        info('为避免服务器压力, 1分钟后再刷新吧')
      }
      return true
    }

    return tinygrailStore.fetchAdvanceList()
  }

  // -------------------- get --------------------
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

  // -------------------- page --------------------
  onLevelSelect = (level: any) => {
    this.setState({
      level
    })
  }
}
