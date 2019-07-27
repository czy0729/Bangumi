/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 10:46:34
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { HTML_FRIENDS, HTML_USERS } from '@constants/html'
import userStore from '../user'
import { NAMESPACE, INIT_USERS } from './init'
import { analysisFriends, analysisUsers } from './common'

class Users extends store {
  state = observable({
    // 好友列表
    friends: {
      // [userId]: LIST_EMPTY | INIT_FRIENDS_ITEM
    },

    // 用户介绍
    users: {
      // [userId]: INIT_USERS
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('friends', NAMESPACE),
      this.getStorage('users', NAMESPACE)
    ])
    const state = await res
    this.setState({
      friends: state[0] || {},
      users: state[1] || {}
    })

    return res
  }

  // -------------------- get --------------------
  friends(userId = userStore.myUserId) {
    return this.state.friends[userId] || LIST_EMPTY
  }

  users(userId = this.myUserId) {
    return computed(() => this.state.users[userId] || INIT_USERS).get()
  }

  // -------------------- fetch --------------------
  /**
   * 好友列表
   * @param {*} userId
   */
  async fetchFriends({ userId = userStore.myUserId } = {}) {
    const html = await fetchHTML({
      url: `!${HTML_FRIENDS(userId)}`
    })

    const key = 'friends'
    const friends = analysisFriends(html)
    this.setState({
      [key]: {
        [userId]: {
          list: friends || [],
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(friends)
  }

  /**
   * 用户
   * @param {*} userId
   */
  async fetchUsers({ userId = userStore.myUserId } = {}) {
    const html = await fetchHTML({
      url: HTML_USERS(userId)
    })

    const key = 'users'
    const users = analysisUsers(html)
    this.setState({
      [key]: {
        [userId]: {
          ...users,
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(users)
  }
}

export default new Users()
