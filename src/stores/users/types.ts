/*
 * @Author: czy0729
 * @Date: 2022-07-02 10:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-02 13:43:12
 */
import {
  Avatar,
  Cover,
  CoverCrt,
  DeepPartial,
  HTMLText,
  Id,
  ListEmpty,
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
export type Friends = ListEmpty<Partial<Friend>>

/** 好友对象 */
export type FriendsMap = Record<UserId, Friend>

/** 我的好友 userId 哈希映射 */
export type MyFriendsMap = Record<UserId, true | number> & {
  _loaded: number
}

/** 用户信息 */
export type Users = Partial<{
  userId: UserId
  userName: string
  sign: HTMLText
  join: string
  hobby: '0'
  percent: any
  recent: string
  doing: number
  collect: number
  wish: number
  onHold: number
  dropped: number
  connectUrl: string
  disconnectUrl: string
  formhash: string
  _loaded: number
}>

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

/** 用户目录 */
export type Catalogs = ListEmpty<
  Partial<{
    id: Id
    title: string
    userId: UserId
    userName: string
    avatar: Avatar<'s'>
    time: string
    num: string
  }>
>
