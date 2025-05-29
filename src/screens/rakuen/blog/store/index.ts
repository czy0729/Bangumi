/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-01 07:46:30
 */
import { rakuenStore, usersStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE, STATE } from './ds'

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
