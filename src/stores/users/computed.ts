/*
 * @Author: czy0729
 * @Date: 2023-04-25 13:59:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:48:26
 */
import { computed } from 'mobx'
import { HTMLDecode } from '@utils'
import { fixedRemote } from '@utils/user-setting'
import { LIST_EMPTY } from '@constants'
import userStore from '../user'
import { INIT_USERS, INIT_USERS_INFO } from './init'
import State from './state'

import type { Avatar, StoreConstructor, UserId } from '@types'
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
  /** 寻找头像 */
  avatars(userId?: UserId) {
    this.init('avatars', true)
    return computed(() => {
      const value = this.state.avatars[userId]
      return (value ? `https://lain.bgm.tv/pic/user/l/000/${value}` : '') as Avatar<'l'>
    }).get()
  }

  /** 好友列表 */
  friends(userId?: UserId) {
    const STATE_KEY = 'friends'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = userId || userStore.myId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Friends
    }).get()
  }

  /** 我的好友 userId 哈希映射 */
  @computed get myFriendsMap() {
    const STATE_KEY = 'myFriendsMap'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }

  /** 用户信息 */
  users(userId?: UserId) {
    this.init('users', true)
    return computed<Users>(() => {
      const key = userId || userStore.myId
      return this.state.users[key] || INIT_USERS
    }).get()
  }

  /** 用户简短信息 */
  usersInfo(userId?: UserId) {
    this.init('usersInfo', true)
    return computed<UsersInfo>(() => {
      const key = userId
      return this.state.usersInfo[key] || INIT_USERS_INFO
    }).get()
  }

  /** 用户收藏的虚拟角色 */
  characters(userId?: UserId) {
    const STATE_KEY = 'characters'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = userId || userStore.myId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Characters
    }).get()
  }

  /** 用户收藏的现实人物 */
  persons(userId?: UserId) {
    const STATE_KEY = 'persons'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = userId || userStore.myId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Persons
    }).get()
  }

  /** 我收藏的人物近况 */
  @computed get recents(): Recents {
    const STATE_KEY = 'recents'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }

  /** 用户日志 */
  blogs(userId?: UserId) {
    const STATE_KEY = 'blogs'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = userId || userStore.myId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Blogs
    }).get()
  }

  /** 用户目录 */
  catalogs(userId?: UserId, isCollect?: boolean) {
    const STATE_KEY = `catalogs${isCollect ? 'Collect' : ''}` as const
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = userId || userStore.myId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as Catalogs
    }).get()
  }

  // -------------------- computed --------------------
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
}
