/*
 * @Author: czy0729
 * @Date: 2022-07-02 10:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:36:28
 */
import {
  Avatar,
  ColorValue,
  Cover,
  CoverCrt,
  DeepPartial,
  HTMLText,
  Id,
  ListEmpty,
  Loaded,
  MonoId,
  SubjectTypeValue,
  UrlSubject,
  UserId
} from '@types'

export type Friend = {
  avatar: Cover<'l'>
  userId: UserId
  userName: string
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
  userStats: {
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

/** 用户收藏的虚拟角色 */
export type Characters = ListEmpty<
  Partial<{
    avatar: CoverCrt<'g'>
    id: string
    name: string
  }>
>

/** 用户收藏的虚拟角色 */
export type Persons = ListEmpty<
  Partial<{
    avatar: CoverCrt<'g'>
    id: string
    name: string
  }>
>

/** 我收藏人物的最近作品 */
export type Recents = ListEmpty<
  DeepPartial<{
    id: MonoId
    cover: Cover<'c'>
    type: SubjectTypeValue
    href: UrlSubject
    name: string
    nameJP: string
    info: string
    star: string
    starInfo: string
    actors: {
      id: Id
      avatar: CoverCrt<'s'>
      name: string
      info: string
    }[]
  }>
>

/** 用户日志 */
export type Blogs = ListEmpty<
  Partial<{
    id: Id
    title: string
    cover: string
    time: string
    replies: string
    content: string
    tags: string[]
  }>
>

/** 用户目录项 */
export type CatalogsItem = {
  id: Id
  title: string
  userId: UserId
  userName: string
  avatar: Avatar<'s'>
  time: string
  num: string
}

/** 用户目录 */
export type Catalogs = ListEmpty<CatalogsItem>
