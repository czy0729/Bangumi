/*
 * @Author: czy0729
 * @Date: 2022-07-01 04:41:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-20 21:38:50
 */
import type {
  CoverGroup,
  DeepPartial,
  HTMLText,
  Id,
  ListEmpty,
  Loaded,
  Override,
  SubjectId,
  UserId
} from '@types'
import type { INIT_SETTING, LOADED } from './init'

export type CacheKey = keyof typeof LOADED | `comments${number}`

/** 0: 全部, 1: 我的好友, 2: 不接收 */
export type PrivacyValue = '0' | '1' | '2'

/** 绝交用户 */
export type BlockedUsersItem = {
  userId: UserId
  userName: string
  href: string
}

/** 超展开项 */
export type RakuenItem = {
  /** 小组名 */
  group: string

  /** 小组地址 */
  groupHref: string

  /** 用户头像 */
  avatar: string

  /** 用户 Id */
  userId: UserId

  /** 用户名 */
  userName: string

  /** 帖子标题 */
  title: string

  /** 帖子地址 */
  href: string

  /** 回复数 */
  replies: string

  /** 发帖时间 */
  time: string

  /** 绝对时间戳（秒），用于缓存冷启动后重新计算相对时间 */
  epoch?: number
}

/** 超展开 */
export type Rakuen = ListEmpty<RakuenItem>

/** 帖子历史查看信息 */
export type Readed = {
  /** 帖子查看时的回复数 */
  replies: number

  /** 帖子查看时间 */
  time: number

  /** 帖子查看时间, 需要多一个来缓存上一次点击事件, 用于制造页面内标记新楼层效果 */
  _time: number
}

/** 帖子内容 */
export type Topic = {
  /** 楼层 d */
  id?: Id

  /** 作者头像 */
  avatar: string

  /** 楼层 */
  floor: string

  /** 回复表单凭据 */
  formhash: string

  /** 贴贴类型 */
  likeType: string

  /** 小组名称 */
  group: string

  /** 小组地址 */
  groupHref: string

  /** 小组图片 */
  groupThumb: string

  /** 回复表单时间戳 */
  lastview: string

  /** 帖子内容 */
  message: HTMLText

  /** 发帖时间 */
  time: string

  /** 帖子标题 */
  title: string

  /** 作者 Id */
  userId: UserId

  /** 作者名称 */
  userName: string

  /** 作者签名 */
  userSign: string

  /** 存在即代表需要加入小组才能回复 */
  tip: string

  /** 存在即代表主题被关闭 */
  close: string

  /** 帖子已删除 */
  delete: boolean

  _loaded?: Loaded
}

/** 日志内容 */
export type Blog = Override<
  Topic,
  {
    related?: {
      id: SubjectId
      name: string
      image: string
    }[]
  }
>

/** 帖子回复项 (通用、子楼层) */
export type CommentsItem = {
  /** 用户头像 */
  avatar: string

  /** 楼层 */
  floor: string

  /** 楼层 d */
  id: Id

  /** 楼层内容 */
  message: HTMLText

  /** 回复参数 */
  replySub: string

  /** 发帖时间 */
  time: string

  /** 用户 Id */
  userId: UserId

  /** 用户名称 */
  userName: string

  /** 用户签名 */
  userSign: string

  /** 删除的链接 */
  erase: string
}

/** 帖子回复项 (主楼层) */
export type CommentsItemWithSub = Override<
  CommentsItem,
  {
    sub: CommentsItem[]
  }
>

/** 帖子回复 */
export type Comments = ListEmpty<CommentsItemWithSub>

/** 帖子回复表情 */
export type Likes = Record<
  string | number,
  Record<
    string | number,
    {
      emoji: string
      main_id: number
      total: string
      type: number
      value: string
      selected?: boolean
    }
  >
>

/** 电波提醒元信息接口（/json/notify） */
export type NotifyMeta = {
  /** 通知总数 */
  count: number

  /** 未读数 */
  notify_count: number

  /** 全部已读链接 */
  notify_ignore_url: string

  /** 未读短信数 */
  pm_count: number

  /** 短信全部已读链接 */
  pm_ignore_url: string

  /** 最近短信列表 */
  pm_list: any[]

  /** 短信收件箱链接 */
  pm_url: string
}

/** 电波提醒项 */
export type NotifyItem = {
  /** 用户头像 */
  avatar: string

  /** 通知链接 */
  href: string

  /** 回复内容（title 之前） */
  message: string

  /** 回复内容（title 之后） */
  message2: string

  /** 通知标题 */
  title: string

  /** 用户 ID */
  userId: UserId

  /** 用户名 */
  userName: string
}

/** 电波提醒 */
export type Notify = {
  /** 未读数 */
  unread: number

  /** 全部已读链接 */
  clearHref: string

  /** @deprecated */
  clearHTML?: string

  /** 电波提醒列表 */
  list: NotifyItem[]

  /** 加载时间戳 */
  _loaded?: number
}

/** 小组帖子列表项 */
export type GroupItem = {
  href: string
  title: string
  userId: UserId
  userName: string
  replies: string
  time: string
  tip?: string
  tipHref?: string
}

/** 小组帖子列表 */
export type Group = {
  list: GroupItem[]
  _loaded: number
}

/** 小组信息 */
export type GroupInfo = {
  title: string
  cover: string
  content: string
  create: string
  joinUrl: string
  byeUrl: string
  _loaded: number
}

/** 我的小组 */
export type Mine = ListEmpty<
  DeepPartial<{
    id: Id
    cover: CoverGroup<'l'>
    name: string
    num: number
  }>
>

/** 用户历史超展开帖子项 */
export type UserTopicsFromCDNItem = {
  topicId: `group/${Id}`
  title: string
  group: string
  date: string
  time: string
  avatar: string // '000/45/62/456208'
  userId: UserId
  userName: string
  replyCount?: number
}

/** 用户历史超展开帖子 */
export type UserTopicsFromCDN = ListEmpty<UserTopicsFromCDNItem>

/** 条目帖子项 */
export type BoardItem = {
  href: `/subject/topic/${Id}`
  title: string
  userId: UserId
  userName: string
  replies: string
  time: string
}

/** 条目帖子 */
export type Board = ListEmpty<BoardItem>

/** 条目讨论版项 */
export type ReviewsItem = {
  id: Id
  title: string
  avatar: string
  userId: UserId
  userName: string
  replies: string
  time: string
  content: string
}

/** 条目讨论版 */
export type Reviews = ListEmpty<ReviewsItem>

/** 用户书签 */
export type BookmarksItem = {
  href: string
  title: string
}

export type Setting = typeof INIT_SETTING

export type SettingKeys = keyof Setting
