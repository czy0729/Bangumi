/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 10:11:04
 */
import { timelineStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenFriends extends Action {
  init = async () => {
    await timelineStore.init('active')

    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.refresh()
  }

  refresh = async () => {
    await this.fetchFriends()
    await this.setFriendGroupByActive()
    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
