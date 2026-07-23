/*
 * @Author: czy0729
 * @Date: 2022-06-14 14:21:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 06:26:07
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

  /** 创建日期 */
  time: string

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

/** 目录详情条目列表项 */
export type CatalogDetailItem = {
  /** 条目 ID */
  id: SubjectId

  /** 条目封面 */
  image: string

  /** 条目名称 */
  title: string

  /** 条目类型 */
  type: SubjectTypeCn

  /** 条目详情 */
  info: string

  /** 评论 */
  comment: string

  /** 是否收藏 */
  isCollect: boolean

  /** 排序 */
  order: string

  /** 修改表单 ID */
  modify: string

  /** 删除关联链接 */
  erase: string
}

/** 目录详情人物列表项 */
export type CatalogDetailMonoItem = {
  /** 角色/人物链接 */
  id: string

  /** 角色/人物名称 */
  image: string

  /** 角色/人物名称 */
  title: string

  /** 虚拟角色属性 / 人物职位 */
  info: string

  /** 评论 */
  comment: string
}

/** 目录详情小组列表项 */
export type CatalogDetailTopicItem = {
  /** 帖子链接 */
  id: string

  /** 发帖人头像 */
  image: string

  /** 帖子标题 */
  title: string

  /** 发帖者 · 小组名 · 时间 */
  info: string

  /** 发帖人空间链接 */
  subId: string

  /** 评论 */
  comment: string
}

/** 目录详情章节列表项 */
export type CatalogDetailEpItem = {
  /** 章节链接 */
  id: string

  /** 条目封面 */
  image: string

  /** 章节名称 */
  title: string

  /** 条目名称 */
  info: string

  /** 条目链接 */
  subId: string

  /** 评论 */
  comment: string
}

/** 目录详情日志列表项 */
export type CatalogDetailBlogItem = {
  /** 日志链接 */
  id: string

  /** 日志封面 */
  image: string

  /** 日志名称 */
  title: string

  /** 发帖者 · 时间 · 回复数 */
  info: string

  /** 发帖人空间链接 */
  subId: string

  /** 评论 */
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

  /** 收藏目录链接 */
  joinUrl: string

  /** 取消收藏目录链接 */
  byeUrl: string

  /** 条目 */
  list: CatalogDetailItem[]

  /** 角色 */
  crt: CatalogDetailMonoItem[]

  /** 人物 */
  prsn: CatalogDetailMonoItem[]

  /** 小组话题 */
  topic: CatalogDetailTopicItem[]

  /** 章节 */
  ep: CatalogDetailEpItem[]

  /** 日志 */
  blog: CatalogDetailBlogItem[]

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
  userId: UserId
  subject?: string
  subjectId?: SubjectId
  tags: string
}

/** 全站日志 */
export type Blog = ListEmpty<BlogItem>

/** 频道聚合热度排行项 */
export type ChannelRankItem = {
  /** 条目 ID */
  id: SubjectId

  /** 条目名称 */
  name: string

  /** 封面图 */
  cover: string

  /** 关注人数 */
  follow: string
}

/** 频道聚合好友相关项 */
export type ChannelFriendsItem = {
  /** 条目 ID */
  id: SubjectId

  /** 条目名称 */
  name: string

  /** 封面图 */
  cover: string

  /** 好友 ID */
  userId: UserId

  /** 好友昵称 */
  userName: string

  /** 好友动作（如"在看"） */
  action: string
}

/** 频道聚合讨论项 */
export type ChannelDiscussItem = {
  /** 帖子链接 subject/{topicId} */
  id: `subject/${SubjectId}`

  /** 帖子标题 */
  title: string

  /** 回复数 */
  replies: string

  /** 关联条目 ID */
  subjectId: SubjectId

  /** 关联条目名称 */
  subjectName: string

  /** 发帖人 ID */
  userId: UserId

  /** 发帖人昵称 */
  userName: string

  /** 发帖时间 */
  time: string
}

/** 频道聚合日志项 */
export type ChannelBlogItem = {
  /** 日志 ID */
  id: Id

  /** 日志标题 */
  title: string

  /** 封面图 */
  cover: string

  /** 发布时间 */
  time: string

  /** 回复数 */
  replies: string

  /** 内容摘要 */
  content: string

  /** 作者 */
  username: string

  /** 关联条目名称 */
  subject: string

  /** 标签 */
  tags: string
}

/** 频道聚合 */
export type Channel = {
  /** 热度排行（前 3） */
  rankTop: ChannelRankItem[]

  /** 热度排行 */
  rank: ChannelRankItem[]

  /** 好友最近关注 */
  friends: ChannelFriendsItem[]

  /** 标签 */
  tags: string[]

  /** 最新讨论 */
  discuss: ChannelDiscussItem[]

  /** 最新日志 */
  blog: ChannelBlogItem[]

  /** 加载时间戳 */
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

/** DOLLARS 项 (聊天室) */
export type DollarsItem = {
  id: string
  avatar: string
  nickname: string
  msg: string
  color: string
}

/** DOLLARS (聊天室) */
export type Dollars = Override<
  ListEmpty<DollarsItem>,
  {
    online: string
  }
>

/** 目录页面类型（空=全部, collect=收藏, me=我的） */
export type CatalogType = '' | 'collect' | 'me'

/** 获取全站日志参数 */
export type FetchBlogArgs = {
  type?: SubjectType | 'all' | ''
  page?: number
}
