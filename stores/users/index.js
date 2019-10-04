/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-01 22:53:29
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import {
  HTML_FRIENDS,
  HTML_USERS,
  HTML_USERS_CHARCTER,
  HTML_USERS_PERSON,
  HTML_USERS_MONO_RECENTS
} from '@constants/html'
import userStore from '../user'
import { NAMESPACE, INIT_USERS } from './init'
import {
  analysisFriends,
  analysisUsers,
  analysisCharacters,
  analysisRecents
} from './common'

class Users extends store {
  state = observable({
    /**
     * 好友列表
     */
    friends: {
      // [userId]: LIST_EMPTY<INIT_FRIENDS_ITEM>
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
      // [userId]: LIST_EMPTY<INIT_CHARACTER>
    },

    /**
     * 用户收藏的现实人物
     */
    persons: {
      // [userId]: LIST_EMPTY<INIT_CHARACTER>
    },

    /**
     * 我收藏人物的最近作品
     */
    recents: LIST_EMPTY
  })

  init = async () => {
    const res = this.readStorage(
      ['friends', 'myFriendsMap', 'users', 'characters', 'persons', 'recents'],
      NAMESPACE
    )
    await res

    if (userStore.isLogin) {
      const { _loaded } = this.myFriendsMap

      // 若登陆了, 而且在7天内没更新过好友列表, 请求好友列表
      if (!_loaded || getTimestamp() - _loaded > 7 * 60 * 60 * 24) {
        this.fetchFriends()
      }
    }

    return res
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

  characters(userId = this.myId) {
    return computed(() => this.state.characters[userId] || LIST_EMPTY).get()
  }

  persons(userId = this.myId) {
    return computed(() => this.state.persons[userId] || LIST_EMPTY).get()
  }

  @computed get recents() {
    return this.state.recents
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
  fetchCharacters = async ({ userId } = {}, refresh) => {
    const { list, pagination } = this.characters(userId)
    let page
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const html = await fetchHTML({
      url: HTML_USERS_CHARCTER(userId, page)
    })
    const data = analysisCharacters(html)

    let characters
    if (refresh) {
      characters = {
        list: data.list,
        pagination: data.pagination,
        _loaded: getTimestamp()
      }
    } else {
      characters = {
        list: [...list, ...data.list],
        pagination: {
          ...pagination,
          page: pagination.page + 1
        },
        _loaded: getTimestamp()
      }
    }

    const key = 'characters'
    this.setState({
      [key]: {
        [userId]: characters
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return characters
  }

  /**
   * 用户收藏的现实人物
   */
  fetchPersons = async ({ userId } = {}, refresh) => {
    const { list, pagination } = this.persons(userId)
    let page
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const html = await fetchHTML({
      url: HTML_USERS_PERSON(userId, page)
    })
    const data = analysisCharacters(html)

    let persons
    if (refresh) {
      persons = {
        list: data.list,
        pagination: data.pagination,
        _loaded: getTimestamp()
      }
    } else {
      persons = {
        list: [...list, ...data.list],
        pagination: {
          ...pagination,
          page: pagination.page + 1
        },
        _loaded: getTimestamp()
      }
    }

    const key = 'persons'
    this.setState({
      [key]: {
        [userId]: persons
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return persons
  }

  /**
   * 我收藏人物的最近作品
   */
  fetchRecents = async refresh => {
    const { list, pagination } = this.recents
    let page

    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const html = await fetchHTML({
      url: HTML_USERS_MONO_RECENTS(page)
    })
    const data = analysisRecents(html)

    let recents
    if (refresh) {
      recents = {
        list: data.list,
        pagination: data.pagination,
        _loaded: getTimestamp()
      }
    } else {
      recents = {
        list: [...list, ...data.list],
        pagination: {
          ...pagination,
          page: pagination.page + 1
        },
        _loaded: getTimestamp()
      }
    }

    const key = 'recents'
    this.setState({
      [key]: recents
    })
    this.setStorage(key, undefined, NAMESPACE)

    return recents
  }
}

export default new Users()
