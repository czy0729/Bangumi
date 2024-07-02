/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-01 07:46:30
 */
import { rakuenStore, usersStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

let loadedFavor = false

class ScreenBlog extends Action {
  init = async () => {
    this.setState({
      ...((await this.getStorage(this.namespace)) || {}),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!loadedFavor) {
      rakuenStore.getFavor()
      loadedFavor = true
    }
    usersStore.updateFriendsMap()

    return this.fetchBlog()
  }
}

export default ScreenBlog
