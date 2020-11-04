/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-04 17:25:55
 */
import { observable, computed } from 'mobx'
import { tinygrailStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import { levelList } from '../_/utils'

export default class ScreenTinygrailAdvanceBid extends store {
  state = observable({
    level: '',
    _loaded: false
  })

  init = () => {
    const { _loaded } = this.advanceBidList
    if (!_loaded) {
      this.fetchAdvanceBidList(false)
    }
  }

  // -------------------- fetch --------------------
  fetchAdvanceBidList = (showInfo = true) => {
    const { _loaded } = this.advanceBidList
    if (!_loaded) {
      return tinygrailStore.fetchAdvanceBidList()
    }

    if (!this.advance && getTimestamp() - _loaded < 60 * 60 * 4) {
      if (showInfo) {
        info('普通用户4小时内只能刷新一次')
      }
      return true
    }

    if (this.advance && getTimestamp() - _loaded < 60 * 1) {
      if (showInfo) {
        info('为避免服务器压力, 1分钟后再刷新吧')
      }
      return true
    }

    return tinygrailStore.fetchAdvanceBidList()
  }

  // -------------------- get --------------------
  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get advance() {
    return tinygrailStore.advance
  }

  @computed get advanceBidList() {
    return tinygrailStore.advanceBidList
  }

  @computed get computedList() {
    const { level } = this.state
    const list = this.advanceBidList
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

    return _list
  }

  @computed get levelMap() {
    const { list } = this.advanceBidList
    const data = {}
    list.forEach(item =>
      data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)
    )
    return data
  }

  // -------------------- page --------------------
  onLevelSelect = level => {
    this.setState({
      level
    })
  }
}
