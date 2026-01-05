/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 20:20:39
 */
import { rakuenStore, usersStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

import type { STATE } from './ds'

let loadedFavor = false

export default class ScreenBlog extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      this.namespace
    )
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!loadedFavor) {
      rakuenStore.getFavor()
      loadedFavor = true
    }
    setTimeout(() => {
      usersStore.updateFriendsMap()
    }, 0)

    return this.fetchBlog()
  }
}
