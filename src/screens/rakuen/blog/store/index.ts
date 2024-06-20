/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-21 05:25:50
 */
import { usersStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

class ScreenBlog extends Action {
  init = async () => {
    this.setState({
      ...((await this.getStorage(this.namespace)) || {}),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    usersStore.updateFriendsMap()

    return this.fetchBlog()
  }
}

export default ScreenBlog
