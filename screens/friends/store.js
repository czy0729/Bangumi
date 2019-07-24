/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-24 12:15:13
 */
import { observable, computed } from 'mobx'
import { usersStore } from '@stores'
import store from '@utils/store'

const namespace = 'ScreenFriends'

export default class ScreenFriends extends store {
  state = observable({})

  init = async () => this.fetchFriends()

  // -------------------- fetch --------------------
  fetchFriends = () => {
    const { userId } = this.params
    return usersStore.fetchFriends({ userId })
  }

  // -------------------- get --------------------
  @computed get friends() {
    const { userId } = this.params
    return usersStore.friends(userId)
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
