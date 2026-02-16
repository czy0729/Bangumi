/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:43:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:41:24
 */
import { computed, observable } from 'mobx'
import { systemStore, tinygrailStore, userStore } from '@stores'
import { getTimestamp, info } from '@utils'
import store from '@utils/store'
import { DEV } from '@constants'
import { levelList, SORT_GF, sortList } from '@tinygrail/_/utils'
import { EXCLUDE_STATE } from './ds'

export const SORT_DS = [SORT_GF] as const

const NAMESPACE = 'ScreenTinygrailAdvanceAuction'

export default class ScreenTinygrailAdvanceAuction extends store<typeof EXCLUDE_STATE> {
  state = observable({
    level: '',
    sort: '',
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.advanceAuctionList
    tinygrailStore.fetchAuction()
    if (!_loaded) this.fetchAdvanceAuctionList(false)
    this.fetchCharaAll()
  }

  // -------------------- fetch --------------------
  fetchAdvanceAuctionList = (showInfo: boolean = true) => {
    const { _loaded } = this.advanceAuctionList
    if (!_loaded) return tinygrailStore.fetchAdvanceAuctionList()

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

    tinygrailStore.fetchAuction()
    return tinygrailStore.fetchAdvanceAuctionList()
  }

  fetchCharaAll = () => {
    return tinygrailStore.fetchCharaAll()
  }

  // -------------------- get --------------------
  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get advance() {
    return systemStore.advance
  }

  @computed get advanceAuctionList() {
    return tinygrailStore.advanceAuctionList
  }

  @computed get computedList() {
    const { level, sort } = this.state
    const list = this.advanceAuctionList
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
        list: sortList(sort, 'down', _list.list)
      }
    }

    return _list
  }

  @computed get levelMap() {
    const { list } = this.advanceAuctionList
    const data = {}
    list.forEach(item => (data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)))
    return data
  }

  @computed get auctioningMap() {
    const auctioningMap = {}
    tinygrailStore
      .list('auction')
      .list.filter(item => item.state === 0)
      .forEach(item => (auctioningMap[item.monoId] = true))
    return auctioningMap
  }

  @computed get myCharaAssetsMap() {
    const map = {}
    const { list } = tinygrailStore.charaAll()
    list.forEach(item => {
      map[item.id] = {
        state: item.state || 0,
        sacrifices: item.sacrifices || 0
      }
    })
    return map
  }

  // -------------------- page --------------------
  onLevelSelect = (level: any) => {
    this.setState({
      level
    })
  }

  onSortPress = (item: string) => {
    const { sort } = this.state
    this.setState({
      sort: item === sort ? '' : item
    })
    this.saveStorage(NAMESPACE)
  }
}
