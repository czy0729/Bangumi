/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:03:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:48:41
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

import type { UserId } from '@types'
import type { FetchCatalogsArgs } from './types'

export default class Fetch extends Computed {
  /** 好友列表 */
  fetchFriends = async (userId: UserId = userStore.myId) => {
    const STATE_KEY = 'friends'
    const STATE_KEY_2 = 'myFriendsMap'
    const ITEM_KEY = userId

    try {
      const html = await fetchHTML({
        url: `!${HTML_FRIENDS(userId)}`
      })

      const now = getTimestamp()
      const list = cheerioFriends(html)

      // 缓存好友上一次历史名字
      // friends.forEach((item: Friend) => {
      //   const lastItem = this.friendsMap[item.userId]
      //   const lastUserName = lastItem?.lastUserName
      //   if (lastUserName && lastUserName === item.userName) return
      //   item.lastUserName = lastItem?.userName || item.userName
      // })

      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list,
            _loaded: now
          }
        }
      })
      this.save(STATE_KEY)

      // 自己要生成 userId 哈希映射
      if (userId === userStore.myId) {
        const map = {
          _loaded: now
        }
        list.forEach(item => (map[item.userId] = true))

        this.setState({
          [STATE_KEY_2]: map
        })
        this.save(STATE_KEY_2)
      }
    } catch (error) {}

    return this[STATE_KEY](ITEM_KEY)
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
  fetchCharacters = async (userId: UserId = userStore.myId, refresh?: boolean) => {
    const STATE_KEY = 'characters'
    const ITEM_KEY = userId
    const LIMIT = 44

    try {
      const { list, pagination } = this[STATE_KEY](ITEM_KEY)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_USERS_CHARCTER(userId, page)
      })

      const next = cheerioCharacters(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next : [...list, ...next],
            pagination: {
              page,
              pageTotal: next.length >= LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchCharacters', error)
    }

    return this[STATE_KEY](ITEM_KEY)
  }

  /** 用户收藏的现实人物 */
  fetchPersons = async (userId: UserId = userStore.myId, refresh?: boolean) => {
    const STATE_KEY = 'persons'
    const ITEM_KEY = userId
    const LIMIT = 44

    try {
      const { list, pagination } = this[STATE_KEY](ITEM_KEY)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_USERS_PERSON(userId, page)
      })

      const next = cheerioCharacters(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next : [...list, ...next],
            pagination: {
              page,
              pageTotal: next.length >= LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchPersons', error)
    }

    return this[STATE_KEY](ITEM_KEY)
  }

  /** 我收藏人物的最近作品 */
  fetchRecents = async (refresh?: boolean) => {
    const STATE_KEY = 'recents'
    const LIMIT = 20

    try {
      const { list, pagination } = this.recents
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_USERS_MONO_RECENTS(page)
      })

      const next = cheerioRecents(html)
      this.setState({
        [STATE_KEY]: {
          list: refresh ? next : [...list, ...next],
          pagination: {
            page,
            pageTotal: next.length >= LIMIT ? 100 : page
          },
          _loaded: getTimestamp()
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchRecents', error)
    }

    return this[STATE_KEY]
  }

  /** 用户日志 */
  fetchBlogs = async (userId: UserId = userStore.myId, refresh?: boolean) => {
    const STATE_KEY = 'blogs'
    const ITEM_KEY = userId
    const LIMIT = 10

    try {
      const { list, pagination } = this[STATE_KEY](ITEM_KEY)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_USERS_BLOGS(userId, page)
      })

      const next = cheerioBlogs(html)
      this.setState({
        [STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next : [...list, ...next],
            pagination: {
              page,
              pageTotal: next.length >= LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(STATE_KEY)
    } catch (error) {
      this.error('fetchBlogs', error)
    }

    return this[STATE_KEY](userId)
  }

  /** 用户目录 */
  fetchCatalogs = async (args?: FetchCatalogsArgs, refresh?: boolean) => {
    const { userId = userStore.myId, isCollect } = args || {}

    const STATE_KEY = 'catalogs'
    const ITEM_ARGS = [userId, isCollect] as const
    const ITEM_KEY = userId
    const LIMIT = 30

    try {
      const { list, pagination } = this[STATE_KEY](...ITEM_ARGS)
      const page = refresh ? 1 : pagination.page + 1
      const html = await fetchHTML({
        url: HTML_USERS_CATALOGS(userId, page, isCollect)
      })

      const FINAL_STATE_KEY = `catalogs${isCollect ? 'Collect' : ''}` as const
      const next = cheerioCatalogs(html)
      this.setState({
        [FINAL_STATE_KEY]: {
          [ITEM_KEY]: {
            list: refresh ? next : [...list, ...next],
            pagination: {
              page,
              pageTotal: next.length >= LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        }
      })
      this.save(FINAL_STATE_KEY)
    } catch (error) {
      this.error('fetchCatalogs', error)
    }

    return this[STATE_KEY](...ITEM_ARGS)
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
