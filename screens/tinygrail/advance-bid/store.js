/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-09 15:52:54
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'

const namespace = 'ScreenTinygrailAdvanceBid'

export default class ScreenTinygrailAdvanceBid extends store {
  state = observable({
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    const { _loaded } = this.advanceBidList
    if (!_loaded) {
      this.fetchAdvanceBidList(false)
    }
    return res
  }

  // -------------------- fetch --------------------
  fetchAdvanceBidList = (showInfo = true) => {
    const { _loaded } = this.advanceBidList
    if (!_loaded) {
      return tinygrailStore.fetchAdvanceBidList()
    }

    if (!this.advance && getTimestamp() - _loaded < 60 * 120) {
      if (showInfo) {
        info('普通用户2小时内只能刷新一次')
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
  @computed get advance() {
    return tinygrailStore.advance
  }

  @computed get advanceBidList() {
    return tinygrailStore.advanceBidList
  }
}
