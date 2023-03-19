/*
 * 用户 (他人视角)
 *
 * @Author: czy0729
 * @Date: 2019-07-24 10:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:51:48
 */
import { observable, computed } from 'mobx'
import { getTimestamp, HTMLDecode } from '@utils'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import {
  DEV,
  HTML_FRIENDS,
  HTML_USERS,
  HTML_USERS_BLOGS,
  HTML_USERS_CATALOGS,
  HTML_USERS_CHARCTER,
  HTML_USERS_MONO_RECENTS,
  HTML_USERS_PERSON,
  LIST_EMPTY
} from '@constants'
import { StoreConstructor, UserId } from '@types'
import userStore from '../user'
import { LOG_INIT } from '../ds'
import { NAMESPACE, INIT_USERS, INIT_USERS_INFO, STATE, LOADED } from './init'
import {
  cheerioFriends,
  cheerioUsers,
  cheerioCharacters,
  cheerioRecents,
  cheerioBlogs,
  cheerioCatalogs
} from './common'
import {
  Blogs,
  Catalogs,
  Characters,
  Friend,
  Friends,
  FriendsMap,
  MyFriendsMap,
  Persons,
  Recents,
  Users,
  UsersInfo
} from './types'

type CacheKey = keyof typeof LOADED

class UsersStore
  extends store
  implements StoreConstructor<Omit<typeof STATE, 'catalogsCollect'>>
{
  state = observable(STATE)

  private _loaded = LOADED

  init = async (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('UsersStore /', key)

    this._loaded[key] = true
    const data = await this.readStorage([key], NAMESPACE)

    if (key === 'myFriendsMap') {
      if (userStore.isLogin) {
        const { _loaded } = this.myFriendsMap

        /** 若登录了, 而且在2天内没更新过好友列表, 请求好友列表, 用于帖子楼层标记是否好友 */
        if (!_loaded || getTimestamp() - _loaded > 2 * 60 * 60 * 24) {
          this.fetchFriends()
        }
      }
    }

    return data
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 好友列表 */
  friends(userId?: UserId) {
    this.init('friends')
    return computed<Friends>(() => {
      const key = userId || userStore.myId
      return this.state.friends[key] || LIST_EMPTY
    }).get()
  }

  /** 我的好友 userId 哈希映射 */
  @computed get myFriendsMap(): MyFriendsMap {
    this.init('myFriendsMap')
    return this.state.myFriendsMap
  }

  /** 用户信息 */
  users(userId?: UserId) {
    this.init('users')
    return computed<Users>(() => {
      const key = userId || userStore.myId
      return this.state.users[key] || INIT_USERS
    }).get()
  }

  /** 用户简短信息 */
  usersInfo(userId?: UserId) {
    this.init('usersInfo')
    return computed<UsersInfo>(() => {
      const key = userId
      return this.state.usersInfo[key] || INIT_USERS_INFO
    }).get()
  }

  /** 用户收藏的虚拟角色 */
  characters(userId?: UserId) {
    this.init('characters')
    return computed<Characters>(() => {
      const key = userId || userStore.myId
      return this.state.characters[key] || LIST_EMPTY
    }).get()
  }

  /** 用户收藏的现实人物 */
  persons(userId?: UserId) {
    this.init('persons')
    return computed<Persons>(() => {
      const key = userId || userStore.myId
      return this.state.persons[key] || LIST_EMPTY
    }).get()
  }

  /** 我收藏人物的最近作品 */
  @computed get recents(): Recents {
    this.init('recents')
    return this.state.recents
  }

  /** 用户日志 */
  blogs(userId?: UserId) {
    this.init('blogs')
    return computed<Blogs>(() => {
      const key = userId || userStore.myId
      return this.state.blogs[key] || LIST_EMPTY
    }).get()
  }

  /** 用户目录 */
  catalogs(userId?: UserId, isCollect?: boolean) {
    const key = `catalogs${isCollect ? 'Collect' : ''}` as const
    this.init(key)
    return computed<Catalogs>(() => {
      const _userId = userId || userStore.myId
      return this.state[key][_userId] || LIST_EMPTY
    }).get()
  }

  // -------------------- computed --------------------
  /** 好友对象 */
  @computed get friendsMap(): FriendsMap {
    const { list } = this.friends()
    const map = {}
    list.forEach(item => (map[item.userId] = item))
    return map
  }

  /** 自定义的头像 */
  @computed get customAvatar() {
    try {
      const sign = this.users()?.sign || ''
      const avatars = sign.match(/\[avatar\](.+?)\[\/avatar\]/)
      const src = avatars ? String(avatars[1]).trim() : ''
      return fixedRemote(HTMLDecode(src), true)
    } catch (error) {
      return ''
    }
  }

  // -------------------- fetch --------------------
  /** 好友列表 */
  fetchFriends = async (args?: { userId?: UserId }) => {
    const { userId = userStore.myId } = args || {}
    const html = await fetchHTML({
      url: `!${HTML_FRIENDS(userId)}`
    })
    const friends = cheerioFriends(html)

    // - 20201124 缓存好友上一次历史名字
    friends.forEach((item: Friend) => {
      const lastItem = this.friendsMap[item.userId]
      const lastUserName = lastItem?.lastUserName
      if (lastUserName && lastUserName === item.userName) return

      item.lastUserName = lastItem?.userName || item.userName
    })

    const key = 'friends'
    this.setState({
      [key]: {
        [userId]: {
          list: friends || [],
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)

    // 自己要生成userId哈希映射
    if (userId === userStore.myId) {
      const myFriendsMap = {
        _loaded: getTimestamp()
      }
      friends.forEach((item: Friend) => (myFriendsMap[item.userId] = true))

      const key = 'myFriendsMap'
      this.setState({
        [key]: myFriendsMap
      })
      this.save(key)
    }

    return friends
  }

  /** 用户信息 (他人视角) */
  fetchUsers = async (args?: { userId?: UserId }) => {
    const { userId = userStore.myId } = args || {}
    const html = await fetchHTML({
      url: HTML_USERS(userId)
    })

    const users = cheerioUsers(html)
    const data = {
      ...users,
      _loaded: getTimestamp()
    }

    const key = 'users'
    this.setState({
      [key]: {
        [userId]: data
      }
    })
    this.save(key)

    return data
  }

  /** 用户收藏的虚拟角色 */
  fetchCharacters = async (args?: { userId?: UserId }, refresh?: boolean) => {
    const { userId = userStore.myId } = args || {}
    const { list, pagination } = this.characters(userId)
    const page = refresh ? 1 : pagination.page + 1
    const html = await fetchHTML({
      url: HTML_USERS_CHARCTER(userId, page)
    })
    const data = cheerioCharacters(html)

    let characters: Characters
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
    this.save(key)

    return characters
  }

  /** 用户收藏的现实人物 */
  fetchPersons = async (args?: { userId?: UserId }, refresh?: boolean) => {
    const { userId = userStore.myId } = args || {}
    const { list, pagination } = this.persons(userId)
    const page = refresh ? 1 : pagination.page + 1
    const html = await fetchHTML({
      url: HTML_USERS_PERSON(userId, page)
    })
    const data = cheerioCharacters(html)

    let persons: Persons
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
    this.save(key)

    return persons
  }

  /** 我收藏人物的最近作品 */
  fetchRecents = async (refresh?: boolean) => {
    const { list, pagination } = this.recents
    const page = refresh ? 1 : pagination.page + 1
    const html = await fetchHTML({
      url: HTML_USERS_MONO_RECENTS(page)
    })
    const data = cheerioRecents(html)

    let recents: Recents
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
    this.save(key)

    return recents
  }

  /** 用户日志 */
  fetchBlogs = async (args?: { userId?: UserId }, refresh?: boolean) => {
    const { userId = userStore.myId } = args || {}
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
    this.save(key)

    return this[key](userId)
  }

  /** 用户目录 */
  fetchCatalogs = async (
    args?: {
      userId?: UserId
      isCollect?: boolean
    },
    refresh?: boolean
  ) => {
    const { userId = userStore.myId, isCollect } = args || {}
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
    this.save(key)

    return this[key](userId, isCollect)
  }

  // -------------------- method --------------------
  /** 更新用户简短信息 */
  updateUsersInfo = async (item: {
    avatar: string
    userId: UserId
    userName: string
  }) => {
    const key = 'usersInfo'
    await this.init(key)

    this.setState({
      [key]: {
        [item.userId]: {
          ...item,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)
  }
}

export default new UsersStore()
