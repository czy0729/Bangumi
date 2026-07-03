/*
 * @Author: czy0729
 * @Date: 2023-04-25 13:59:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-23 20:44:26
 */
import { computed } from 'mobx'
import { HTMLDecode } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { fixedRemote } from '@utils/user-setting'
import { HOST_BGM_STATIC, LIST_EMPTY } from '@constants'
import discoveryStore from '../discovery'
import userStore from '../user'
import { INIT_USERS, INIT_USERS_INFO } from './init'
import State from './state'

import type { StoreConstructor, SubjectId, UserId } from '@types'
import type { STATE } from './init'
import type {
  Blogs,
  Catalogs,
  Characters,
  Friends,
  FriendsMap,
  Persons,
  Recents,
  Users,
  UsersInfo
} from './types'

export default class Computed
  extends State
  implements StoreConstructor<Omit<typeof STATE, 'catalogsCollect'>>
{
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 条目存在于多少个自己的目录中（O(1) 查询） */
  catalogSubjectCount = computedFn((subjectId: SubjectId) => {
    return this.catalogSubjectIndex.get(subjectId) || 0
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 寻找头像 */
  private _avatars = computedFn((userId?: UserId) => {
    const value = this.state.avatars[userId]
    // 兼容旧数据: 旧格式不含目录前缀 (如 21/77/217781.jpg), 默认补 000/
    const path = value && !/^\d{3}\//.test(value) && value !== 'icon.jpg' ? `000/${value}` : value
    return (path ? `${HOST_BGM_STATIC}/pic/user/l/${path}` : '') as string
  })

  /** 好友列表 */
  private _friends = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || userStore.myId
    return (this.state.friends[ITEM_KEY] || LIST_EMPTY) as Friends
  })

  /** 反向好友列表 */
  private _revFriends = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || userStore.myId
    return (this.state.revFriends[ITEM_KEY] || LIST_EMPTY) as Friends
  })

  /** 用户信息 */
  private _users = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || userStore.myId
    return (this.state.users[ITEM_KEY] || INIT_USERS) as Users
  })

  /** 用户简短信息 */
  private _usersInfo = computedFn((userId?: UserId) => {
    return (this.state.usersInfo[userId] || INIT_USERS_INFO) as UsersInfo
  })

  /** 用户收藏的虚拟角色 */
  private _characters = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || userStore.myId
    return (this.state.characters[ITEM_KEY] || LIST_EMPTY) as Characters
  })

  /** 用户收藏的现实人物 */
  private _persons = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || userStore.myId
    return (this.state.persons[ITEM_KEY] || LIST_EMPTY) as Persons
  })

  /** 用户日志 */
  private _blogs = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || userStore.myId
    return (this.state.blogs[ITEM_KEY] || LIST_EMPTY) as Blogs
  })

  /** 用户目录 */
  private _catalogs = computedFn((userId?: UserId, isCollect?: boolean) => {
    const STATE_KEY = `catalogs${isCollect ? 'Collect' : ''}` as const
    const ITEM_KEY = userId || userStore.myId
    return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Catalogs
  })

  /** @deprecated 所有收藏条目状态 */
  @computed get myFriendsMap() {
    this.init('myFriendsMap', true)
    return this.state.myFriendsMap
  }

  /** 我收藏的人物近况 */
  @computed get recents(): Recents {
    this.init('recents', true)
    return this.state.recents
  }

  /** @deprecated 好友对象 */
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

  /** 条目 → 目录数量索引（预计算，仅自己的目录） */
  @computed get catalogSubjectIndex() {
    const index = new Map<SubjectId, number>()
    this.catalogs().list.forEach(item => {
      discoveryStore.catalogDetail(item.id).list.forEach(i => {
        index.set(i.id, (index.get(i.id) || 0) + 1)
      })
    })
    return index
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 寻找头像 */
  avatars(userId?: UserId) {
    this.init('avatars', true)
    return this._avatars(userId)
  }

  /** 好友列表 */
  friends(userId?: UserId) {
    this.init('friends', true)
    return this._friends(userId)
  }

  /** 反向好友列表 */
  revFriends(userId?: UserId) {
    this.init('revFriends', true)
    return this._revFriends(userId)
  }

  /** 用户信息 */
  users(userId?: UserId) {
    this.init('users', true)
    return this._users(userId)
  }

  /** 用户简短信息 */
  usersInfo(userId?: UserId) {
    this.init('usersInfo', true)
    return this._usersInfo(userId)
  }

  /** 用户收藏的虚拟角色 */
  characters(userId?: UserId) {
    this.init('characters', true)
    return this._characters(userId)
  }

  /** 用户收藏的现实人物 */
  persons(userId?: UserId) {
    this.init('persons', true)
    return this._persons(userId)
  }

  /** 用户日志 */
  blogs(userId?: UserId) {
    this.init('blogs', true)
    return this._blogs(userId)
  }

  /** 用户目录 */
  catalogs(userId?: UserId, isCollect?: boolean) {
    const STATE_KEY = `catalogs${isCollect ? 'Collect' : ''}` as const
    this.init(STATE_KEY, true)
    return this._catalogs(userId, isCollect)
  }
}
