/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-29 11:35:31
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { HTML_FRIENDS, HTML_USERS, HTML_USERS_CHARCTERS } from '@constants/html'
import userStore from '../user'
import { NAMESPACE, INIT_USERS } from './init'
import { analysisFriends, analysisUsers, analysisCharacters } from './common'

class Users extends store {
  state = observable({
    /**
     * 好友列表
     */
    friends: {
      // [userId]: LIST_EMPTY | INIT_FRIENDS_ITEM
    },

    /**
     * 我的好友userId哈希映射
     */
    myFriendsMap: {},

    /**
     * 用户介绍
     */
    users: {
      // [userId]: INIT_USERS
    },

    /**
     * 用户收藏的虚拟角色
     */
    characters: {
      // [userId]: LIST_EMPTY
    }
  })

  init = async () => {
    await this.readStorageThenSetState(
      {
        friends: {},
        myFriendsMap: {},
        users: {}
      },
      NAMESPACE
    )

    if (userStore.isLogin) {
      const { _loaded } = this.myFriendsMap

      // 若登陆了, 而且在7天内没更新过好友列表, 请求好友列表
      if (!_loaded || getTimestamp() - _loaded > 7 * 60 * 60 * 24) {
        this.fetchFriends()
      }
    }
  }

  // -------------------- get --------------------
  friends(userId = userStore.myId) {
    return this.state.friends[userId] || LIST_EMPTY
  }

  @computed get myFriendsMap() {
    return this.state.myFriendsMap
  }

  users(userId = this.myId) {
    return computed(() => this.state.users[userId] || INIT_USERS).get()
  }

  // -------------------- fetch --------------------
  /**
   * 好友列表
   * @param {*} userId
   */
  async fetchFriends({ userId = userStore.myId } = {}) {
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

    // 自己要生成userId哈希映射
    if (userId === userStore.myId) {
      const myFriendsMap = {
        _loaded: getTimestamp()
      }
      friends.forEach(item => {
        myFriendsMap[item.userId] = true
      })

      const key = 'myFriendsMap'
      this.setState({
        [key]: myFriendsMap
      })
      this.setStorage(key, undefined, NAMESPACE)
    }

    return Promise.resolve(friends)
  }

  /**
   * 用户
   * @param {*} userId
   */
  async fetchUsers({ userId = userStore.myId } = {}) {
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

  /**
   * 用户收藏的虚拟角色
   */
  // fetchCharacters = async ({ userId } = {}, refresh) => {
  //   const html = await fetchHTML({
  //     url: HTML_USERS_CHARCTERS(userId)
  //   })

  //   const { list, pagination } = analysisCharacters(html)
  //   let characters
  //   if (refresh) {
  //     character = {
  //       list,
  //       pagination,
  //       _loaded: getTimestamp()
  //     }
  //   } else {
  //     const data = this.characters(userId)
  //     character = {
  //       ...this.characters(userId)
  //     }
  //   }
  // }
}

export default new Users()
