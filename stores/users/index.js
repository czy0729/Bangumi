/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-24 14:07:17
 */
import { observable } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { HTML_FRIENDS } from '@constants/html'
import userStore from '../user'
import { NAMESPACE } from './init'
import { analysisFriends } from './common'

class Users extends store {
  state = observable({
    friends: {
      // [userId]: LIST_EMPTY | INIT_FRIENDS_ITEM
    }
  })

  async init() {
    const res = Promise.all([this.getStorage('friends', NAMESPACE)])
    const state = await res
    this.setState({
      friends: state[0] || {}
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 好友列表
   */
  friends(userId = userStore.myUserId) {
    return this.state.friends[userId] || LIST_EMPTY
  }

  // -------------------- fetch --------------------
  /**
   * 好友列表
   */
  async fetchFriends({ userId = userStore.myUserId }) {
    const html = await fetchHTML({
      url: `!${HTML_FRIENDS(userId)}`
    })
    const friends = analysisFriends(html)
    this.setState({
      friends: {
        [userId]: {
          list: friends || [],
          _loaded: getTimestamp()
        }
      }
    })

    return Promise.resolve(friends)
  }
}

export default new Users()
