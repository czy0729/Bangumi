/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:59:42
 */
import { LIST_EMPTY } from '@constants'
import { UserId } from '@types'
import { Catalogs, Characters, Recents, Users } from './types'

export const NAMESPACE = 'Users'

export const INIT_USERS = {
  userId: '',
  userName: '',
  avatar: '',
  sign: '',
  join: '',
  hobby: '0',
  percent: '',
  recent: '',
  doing: '',
  collect: '',
  wish: '',
  onHold: '',
  dropped: '',
  connectUrl: '',
  disconnectUrl: '',
  formhash: '',
  ban: '',
  userStats: {
    avg: '',
    chart: {
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '5': '',
      '6': '',
      '7': '',
      '8': '',
      '9': '',
      '10': ''
    },
    collect: '',
    percent: '',
    scored: '',
    std: '',
    total: ''
  },
  networkService: []
} as Users

export const INIT_USERS_INFO = {
  avatar: '',
  userId: '',
  userName: '',
  _loaded: false
}

export const STATE = {
  /** 全局用户头像缓存索引 */
  avatars: {
    0: '' as string
  },

  /** 好友列表 */
  friends: {
    0: LIST_EMPTY
  },

  /** 我的好友 userId 哈希映射 */
  myFriendsMap: {
    _loaded: 0
  },

  /** 用户信息 */
  users: {
    0: INIT_USERS
  },

  /** 用户简短信息 */
  usersInfo: {
    0: INIT_USERS_INFO
  },

  /** 用户收藏的虚拟角色 */
  characters: {} as Record<UserId, Characters>,

  /** 用户收藏的现实人物 */
  persons: {} as Record<UserId, Characters>,

  /** 我收藏的人物近况 */
  recents: LIST_EMPTY as Recents,

  /** 用户日志 */
  blogs: {
    0: LIST_EMPTY
  },

  /** 用户目录 */
  catalogs: {} as Record<UserId, Catalogs>,

  /** 用户收藏的目录 */
  catalogsCollect: {} as Record<UserId, Catalogs>
}

export const LOADED = {
  avatars: false,
  blogs: false,
  catalogs: false,
  catalogsCollect: false,
  characters: false,
  friends: false,
  myFriendsMap: false,
  persons: false,
  recents: false,
  users: false,
  usersInfo: false
}
