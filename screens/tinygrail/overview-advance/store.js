/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-08 16:38:24
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

    this.fetchAdvanceList(false)
    return res
  }

  // -------------------- fetch --------------------
  fetchAdvanceList = async (showInfo = true) => {
    const { _loaded } = this.advanceList
    if (!_loaded || getTimestamp() - _loaded > 60 * 30) {
      return tinygrailStore.fetchAdvanceList()
    }

    if (showInfo) {
      info('30分钟内只能刷新一次')
    }

    return false
  }

  // -------------------- get --------------------
  @computed get advanceList() {
    return tinygrailStore.advanceList
  }
}
