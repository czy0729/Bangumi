/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-29 14:48:51
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
  HTML_USERS_MONO_RECENTS,
  HTML_USERS_BLOGS,
  HTML_USERS_CATALOGS
} from '@constants/html'
import userStore from '../user'
import { NAMESPACE, INIT_USERS } from './init'
import {
  cheerioFriends,
  cheerioUsers,
  cheerioCharacters,
  cheerioRecents,
  cheerioBlogs,
  cheerioCatalogs
} from './common'

class Users extends store {
  state = observable({
    /**
     * 好友列表
     * @param {*} userId
     */
    friends: {
      _: userId => userId || userStore.myId,
      0: LIST_EMPTY // <INIT_FRIENDS_ITEM>
    },

    /**
     * 我的好友userId哈希映射
     */
    myFriendsMap: {},

    /**
     * 用户介绍
     * @param {*} userId
     */
    users: {
      _: userId => userId || userStore.myId,
      0: INIT_USERS
    },

    /**
     * 用户收藏的虚拟角色
     * @param {*} userId
     */
    characters: {
      _: userId => userId || userStore.myId,
      0: LIST_EMPTY // <INIT_CHARACTER>
    },

    /**
     * 用户收藏的现实人物
     * @param {*} userId
     */
    persons: {
      _: userId => userId || userStore.myId,
      0: LIST_EMPTY // <INIT_CHARACTER>
    },

    /**
     * 我收藏人物的最近作品
     */
    recents: LIST_EMPTY, // INIT_RECENTS_ITEM

    /**
     * 用户日志
     * @param {*} userId
     */
    blogs: {
      _: userId => userId || userStore.myId,
      0: LIST_EMPTY // <INIT_BLOGS>
    },

    /**
     * 用户目录
     * @param {*} userId
     */
    catalogs: {
      // [userId]: LIST_EMPTY<INIT_CATALOGS>
    },
    catalogsCollect: {
      // [userId]: LIST_EMPTY<INIT_CATALOGS>
    }
  })

  init = async () => {
    const res = this.readStorage(
      [
        'friends',
        'myFriendsMap',
        'users',
        'characters',
        'persons',
        'recents',
        'blogs',
        'catalogs',
        'catalogsCollect'
      ],
      NAMESPACE
    )
    await res

    if (userStore.isLogin) {
      const { _loaded } = this.myFriendsMap

      /**
       * 若登陆了, 而且在7天内没更新过好友列表, 请求好友列表
       * 用于帖子楼层标记是否好友
       */
      if (!_loaded || getTimestamp() - _loaded > 7 * 60 * 60 * 24) {
        this.fetchFriends()
      }
    }

    return res
  }

  // -------------------- get --------------------
  catalogs(userId = userStore.myId, isCollect) {
    const key = `catalogs${isCollect ? 'Collect' : ''}`
    return computed(() => this.state[key][userId] || LIST_EMPTY).get()
  }

  // -------------------- fetch --------------------
  /**
   * 好友列表
   * @param {*} userId
   */
  fetchFriends = async ({ userId = userStore.myId } = {}) => {
    const html = await fetchHTML({
      url: `!${HTML_FRIENDS(userId)}`
    })

    const key = 'friends'
    const friends = cheerioFriends(html)
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
  fetchUsers = async ({ userId = userStore.myId } = {}) => {
    const html = await fetchHTML({
      url: HTML_USERS(userId)
    })

    const key = 'users'
    const users = cheerioUsers(html)
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
  fetchCharacters = async ({ userId = userStore.myId } = {}, refresh) => {
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
    const data = cheerioCharacters(html)

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
  fetchPersons = async ({ userId = userStore.myId } = {}, refresh) => {
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
    const data = cheerioCharacters(html)

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
    const data = cheerioRecents(html)

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

  /**
   * 用户日志
   */
  fetchBlogs = async ({ userId = userStore.myId } = {}, refresh) => {
    const key = 'blogs'
    const limit = 10
    const { list, pagination } = this[key](userId)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_USERS_BLOGS(userId, page)
    })
    const _list = cheerioBlogs(html)
    this.setState({
      [key]: {
        [userId]: {
          list: refresh ? _list : [...list, ..._list],
          pagination: {
            page,
            pageTotal: _list.length === limit ? 100 : page
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](userId)
  }

  /**
   * 用户日志
   */
  fetchCatalogs = async (
    { userId = userStore.myId, isCollect } = {},
    refresh
  ) => {
    const key = 'catalogs'
    const limit = 30
    const { list, pagination } = this[key](userId, isCollect)
    const page = refresh ? 1 : pagination.page + 1

    const html = await fetchHTML({
      url: HTML_USERS_CATALOGS(userId, page, isCollect)
    })
    const _list = cheerioCatalogs(html, isCollect)
    this.setState({
      [`${key}${isCollect ? 'Collect' : ''}`]: {
        [userId]: {
          list: refresh ? _list : [...list, ..._list],
          pagination: {
            page,
            pageTotal: _list.length === limit ? 100 : page
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](userId, isCollect)
  }
}

const Store = new Users()
Store.setup()

export default Store
