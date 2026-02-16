/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:03:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 14:05:22
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import {
  HTML_FRIENDS,
  HTML_USERS,
  HTML_USERS_BLOGS,
  HTML_USERS_CATALOGS,
  HTML_USERS_CHARCTER,
  HTML_USERS_MONO_RECENTS,
  HTML_USERS_PERSON,
  HTML_USERS_WIKI
} from '@constants'
import { UserId } from '@types'
import userStore from '../user'
import {
  cheerioBlogs,
  cheerioCatalogs,
  cheerioCharacters,
  cheerioFriends,
  cheerioRecents,
  cheerioUsers
} from './common'
import Computed from './computed'
import { Characters, Friend, Persons, Recents } from './types'

export default class Fetch extends Computed {
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

    // 自己要生成 userId 哈希映射
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

  /** 查询是否存在用户 */
  checkUserExist = async (userId: UserId) => {
    const html = await fetchHTML({
      // 因为这个页面大部分用户都没有数据会比较小, 所以选取这个页面判断
      url: HTML_USERS_WIKI(String(userId).trim().toLocaleLowerCase())
    })
    return !html.includes('数据库中没有查询到该用户的信息')
  }
}
