/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-08 21:44:36
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'

const namespace = 'ScreenTinygrailOverviewAdvance'

export default class ScreenTinygrailOverviewAdvance extends store {
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

    const { _loaded } = this.advanceList
    if (!_loaded) {
      this.fetchAdvanceList(false)
    }
    return res
  }

  // -------------------- fetch --------------------
  fetchAdvanceList = (showInfo = true) => {
    const { _loaded } = this.advanceList
    if (!_loaded || getTimestamp() - _loaded > 60 * 120) {
      return tinygrailStore.fetchAdvanceList()
    }

    if (showInfo) {
      info('普通用户2小时内只能刷新一次')
    }

    return true
  }

  // -------------------- get --------------------
  @computed get advanceList() {
    return tinygrailStore.advanceList
  }
}
