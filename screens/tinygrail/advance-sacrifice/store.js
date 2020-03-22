/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:20:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-25 20:28:09
 */
import { computed } from 'mobx'
import { tinygrailStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'

export default class ScreenTinygrailAdvanceAuction extends store {
  init = () => {
    const { _loaded } = this.advanceSacrificeList
    if (!_loaded) {
      this.fetchAdvanceSacrificeList(false)
    }
  }

  // -------------------- fetch --------------------
  fetchAdvanceSacrificeList = (showInfo = true) => {
    const { _loaded } = this.advanceSacrificeList
    if (!_loaded) {
      return tinygrailStore.fetchAdvanceSacrificeList()
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

    return tinygrailStore.fetchAdvanceSacrificeList()
  }

  // -------------------- get --------------------
  @computed get advance() {
    return tinygrailStore.advance
  }

  @computed get advanceSacrificeList() {
    return tinygrailStore.advanceSacrificeList
  }

  @computed get myUserId() {
    return userStore.myUserId
  }
}
