/*
 * @Author: czy0729
 * @Date: 2022-06-14 14:21:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 17:27:49
 */
import type {
  DeepPartial,
  Id,
  ListEmpty,
  Loaded,
  Override,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  UserId
} from '@types'
import type { LOADED } from './init'

export type CacheKey = keyof typeof LOADED | `catalogDetail${number}`

/** 目录项 */
export type CatalogsItem = {
  /** 创建者头像 */
  avatar: string

  /** 创建者昵称 */
  name: string

  /** 创建者 ID */
  userId: UserId

  /** 最后更新日期 */
  last: string

  /** 目录标题 */
  title: string

  /** 目录 ID */
  id: Id

  /** 目录描述 */
  info: string

  /** 目录动画条目数 */
  anime: number

  /** 目录书籍条目数 */
  book: number

  /** 目录音乐条目数 */
  music: number

  /** 目录游戏条目数 */
  game: number

  /** 目录三次元条目数 */
  real: number
}

/** 目录 */
export type Catalog = ListEmpty<CatalogsItem>

/** 目录详情列表项 */
export type CatalogDetailItem = {
  id: SubjectId
  image: string
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
  image: string
  title: string
  info: string
  comment: string
}

/** 目录详情章节列表项 */
export type CatalogDetailEpItem = {
  id: string
  image: string
  title: string
  info: string
  subId: string
  comment: string
}

/** 目录详情 */
export type CatalogDetail = {
  title: string
  avatar: string
  progress: string
  nickname: string
  userId: UserId
  time: string
  last: string
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

/** 全站日志项 */
export type BlogItem = {
  id: Id
  title: string
  cover: string
  time: string
  replies: string
  content: string
  username: string
  subject: string
  tags: string
}

/** 全站日志 */
export type Blog = ListEmpty<BlogItem>

/** 频道聚合热度排行项 */
export type ChannelRankItem = {
  id: SubjectId
  name: string
  cover: string
  follow: string
}

/** 频道聚合好友相关项 */
export type ChannelFriendsItem = {
  id: SubjectId
  name: string
  cover: string
  userId: UserId
  userName: string
  action: string
}

/** 频道聚合 */
export type Channel = {
  rankTop: ChannelRankItem[]
  rank: ChannelRankItem[]
  friends: ChannelFriendsItem[]
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
    cover: string
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

/** 资讯项 */
export type NewsItem = {
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
}

/** 资讯 */
export type News = {
  list: NewsItem[]
  _loaded: Loaded
}

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

export type FetchCatalogArgs = {
  type?: '' | 'collect' | 'me'
  page?: number
}

export type FetchBlogArgs = {
  type?: SubjectType | 'all' | ''
  page?: number
}
