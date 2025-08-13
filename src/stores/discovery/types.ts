/*
 * @Author: czy0729
 * @Date: 2022-06-14 14:21:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 15:52:46
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
export type Catalog = {
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
  _loaded: Loaded
}

/** 目录详情列表项 */
export type CatalogDetailItem = {
  id: SubjectId
  image: Cover<'c'>
  title: string
  type: SubjectTypeCn
  info: string
  comment: string
  isCollect: boolean
  order: string
  modify: string
  erase: string
}

/** 目录详情人物列表项 */
export type CatalogDetailMonoItem = {
  id: string
  image: Avatar<'g'>
  title: string
  info: string
  comment: string
}

/** 目录详情章节列表项 */
export type CatalogDetailEpItem = {
  id: string
  image: Cover<'g'>
  title: string
  info: string
  subId: string
  comment: string
}

/** 目录详情 */
export type CatalogDetail = {
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

  /** 条目 */
  list: CatalogDetailItem[]

  /** 角色 */
  crt: CatalogDetailMonoItem[]

  /** 人物 */
  prsn: CatalogDetailMonoItem[]

  /** 章节 */
  ep: CatalogDetailEpItem[]

  _loaded?: Loaded
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

export type ChannelRankItem = {
  id: SubjectId
  name: string
  cover: Cover<'c'>
  follow: string
}

/** 频道聚合 */
export type Channel = {
  rankTop: ChannelRankItem[]
  rank: ChannelRankItem[]
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
  _loaded?: number
}

type WikiItem = {
  id: `/subject/${SubjectId}`
  name: string
  userId: UserId
  userName: string
  detail: string
  time: string
}

/** 维基人 */
export type Wiki = DeepPartial<{
  counts: string[]
  lastCounts: string[]
  timeline: Record<
    'all' | 'lock' | 'merge' | 'crt' | 'prsn' | 'ep' | 'relation' | 'subjectPerson' | 'subjectCrt',
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

/** DOLLARS (聊天室) */
export type Dollars = Override<
  ListEmpty<{
    id: string
    avatar: string
    nickname: string
    msg: string
    color: string
  }>,
  {
    online: string
  }
>
