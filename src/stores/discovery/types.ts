/*
 * @Author: czy0729
 * @Date: 2022-06-14 14:21:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:53:00
 */
import {
  Avatar,
  Cover,
  CoverPhoto,
  DeepPartial,
  Id,
  ListEmpty,
  Loaded,
  Override,
  SubjectId,
  SubjectTypeCn,
  UserId
} from '@types'

/** 目录 */
export type Catalog = DeepPartial<{
  list: {
    avatar: Avatar<'s'>
    name: string
    userId: UserId
    last: String
    title: string
    id: Id
    info: string
    book: string
    anime: string
    music: string
    game: string
    real: string
  }[]
  _loaded: number
}>

/** 目录详情 */
export type CatalogDetail = {
  list: {
    id: Id
    image: Cover<'c'>
    title: string
    type: SubjectTypeCn
    info: string
    comment: string
    isCollect: boolean
    order: string
    modify: string
    erase: string
  }[]
  title: string
  avatar: Avatar<'m'>
  progress: string
  nickname: string
  userId: UserId
  time: string
  replyCount: number | ''
  collect: null | string
  content: string
  joinUrl: string
  byeUrl: string
  _loaded: Loaded
}

/** 目录详情 (云缓存) */
export type CatalogDetailFromOSS = Override<
  CatalogDetail,
  {
    info: string
    total: number
  }
>

/** 标签 */
export type Tags = ListEmpty<{
  name: string
  nums: string
}>

/** 全站日志 */
export type Blog = DeepPartial<{
  list: {
    id: Id
    title: string
    cover: CoverPhoto<'g'>
    time: string
    replies: string
    content: string
    username: string
    subject: string
    tags: string
  }[]
  _loaded: Loaded
}>

/** 频道聚合 */
export type Channel = DeepPartial<{
  rankTop: {
    id: SubjectId
    name: string
    cover: Cover<'c'>
    follow: string
  }[]
  rank: {
    id: SubjectId
    name: string
    cover: Cover<'c'>
    follow: string
  }[]
  friends: {
    id: SubjectId
    name: string
    cover: Cover<'c'>
    userId: UserId
    userName: string
    action: string
  }[]
  tags: string[]
  discuss: {
    id: `subject/${SubjectId}`
    title: string
    replies: string
    subjectId: SubjectId
    subjectName: string
    userId: UserId
    userName: string
    time: string
  }[]
  blog: {
    id: Id
    title: string
    cover: CoverPhoto<'g'>
    time: string
    replies: string
    content: string
    username: string
    subject: string
    tags: string
  }[]
  _loaded: number
}>

type WikiItem = {
  id: `/subject/${SubjectId}`
  name: string
  userId: UserId
  userName: string
  detail: string
}

/** 维基人 */
export type Wiki = DeepPartial<{
  counts: string[]
  lastCounts: string[]
  timeline: Record<
    | 'all'
    | 'lock'
    | 'merge'
    | 'crt'
    | 'prsn'
    | 'ep'
    | 'relation'
    | 'subjectPerson'
    | 'subjectCrt',
    WikiItem[]
  >
  last: Record<'all' | 'anime' | 'book' | 'music' | 'game' | 'real', WikiItem[]>
}>

/** 资讯 */
export type News = DeepPartial<{
  list: {
    aid: Id
    url: string
    author: string
    origin: string
    cover: {
      url: string
      headers: {
        Referer: string
      }
    }
    title: string
    intro: string
    subtitle: string
  }[]
  _loaded: number
}>
