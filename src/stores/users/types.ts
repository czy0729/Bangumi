/*
 * @Author: czy0729
 * @Date: 2022-07-02 10:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:42:07
 */
import type {
  Avatar,
  ColorValue,
  HTMLText,
  Id,
  ListEmpty,
  Loaded,
  MonoId,
  SubjectId,
  SubjectTypeValue,
  UserId
} from '@types'
import type { LOADED } from './init'

export type CacheKey = keyof typeof LOADED

/** 好友项 */
export type Friend = {
  /** 头像 */
  avatar: string

  /** 用户 ID (改过后的) */
  userId: UserId

  /** 昵称 */
  userName: string

  /** 历史昵称 (自行对比保存) */
  lastUserName?: string
}

/** 好友列表 */
export type Friends = ListEmpty<Friend>

/** 好友对象 */
export type FriendsMap = Record<UserId, Friend>

/** 我的好友 userId 哈希映射 */
export type MyFriendsMap = Record<UserId, true | number> & {
  _loaded: number
}

export type NetworkServiceItem = {
  label: string
  value: string
  color: ColorValue
  href: string
}

/** 用户缩略统计 */
export type UserStats = {
  avg: string
  chart: {
    '1': string
    '10': string
    '2': string
    '3': string
    '4': string
    '5': string
    '6': string
    '7': string
    '8': string
    '9': string
  }
  collect: string
  percent: string
  scored: string
  std: string
  total: string
}

/** 用户信息 */
export type Users = {
  userId: UserId
  userName: string
  avatar: string
  sign: HTMLText
  join: string
  hobby: '0'
  percent: any
  recent: string
  doing: string | number
  collect: string | number
  wish: string | number
  onHold: string | number
  dropped: string | number
  connectUrl: string
  disconnectUrl: string
  formhash: string
  ban?: string
  userStats: UserStats
  networkService: NetworkServiceItem[]
  _loaded?: Loaded
}

/** 用户简短信息 */
export type UsersInfo = {
  avatar: Avatar
  userId: UserId
  userName: string
  _loaded: Loaded
}

/** 用户收藏的角色项 */
export type CharactersItem = {
  id: MonoId
  avatar: string
  name: string
}

/** 用户收藏的虚拟角色 */
export type Characters = ListEmpty<CharactersItem>

/** 用户收藏的现实人物 */
export type Persons = ListEmpty<CharactersItem>

/** 我收藏的人物近况项 */
export type RecentsItem = {
  id: MonoId
  cover: string
  type: SubjectTypeValue
  href: string
  name: string
  nameJP: string
  info: string
  star: string
  starInfo: string
  actors: {
    id: MonoId
    avatar: string
    name: string
    info: string
  }[]
}

/** 我收藏的人物近况 */
export type Recents = ListEmpty<RecentsItem>

/** 用户日志项 */
export type BlogsItem = {
  id: Id
  title: string
  cover: string
  time: string
  subject?: string
  subjectId?: SubjectId
  replies: string
  content: string
  tags: string[]
}

/** 用户日志 */
export type Blogs = ListEmpty<BlogsItem>

/** 用户目录项 */
export type CatalogsItem = {
  id: Id
  title: string
  userId: UserId
  userName: string
  avatar: string
  time: string
  update: string
  tip: string
  anime: number
  book: number
  music: number
  game: number
  real: number
}

/** 用户目录 */
export type Catalogs = ListEmpty<CatalogsItem>

export type FetchCatalogsArgs = {
  userId?: UserId
  isCollect?: boolean
}
