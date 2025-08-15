/*
 * @Author: czy0729
 * @Date: 2022-07-01 04:41:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:35:28
 */
import {
  Avatar,
  CoverGroup,
  DeepPartial,
  HTMLText,
  Id,
  ListEmpty,
  Loaded,
  Override,
  UserId
} from '@types'
import { INIT_SETTING } from './init'

/** 0: 全部, 1: 我的好友, 2: 不接收 */
export type PrivacyValue = '0' | '1' | '2'

/** 绝交用户 */
export type BlockedUsersItem = {
  userId: UserId
  userName: string
  href: string
}

/** 超展开列表 */
export type Rakuen = ListEmpty<
  DeepPartial<{
    group: string
    groupHref: string
    avatar: Avatar<'l'>
    userId: UserId
    userName: string
    title: string
    href: string
    replies: string
    time: string
  }>
>

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
  avatar: Avatar<'s'>

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

export type CommentsItem = {
  /** 用户头像 */
  avatar: Avatar<'s'>

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

export type NotifyItem = {
  avatar: Avatar<'l'>
  href: string
  message: string
  message2: string
  title: string
  userId: UserId
  userName: string
}

/** 电波提醒 */
export type Notify = {
  unread: number
  clearHref: string
  list: NotifyItem[]
  _loaded?: number
}

/** 小组帖子列表 */
export type Group = {
  list: {
    href: string
    title: string
    userId: UserId
    userName: string
    replies: string
    time: string
    tip?: string
    tipHref?: string
  }[]
  _loaded: number
}

/** 小组信息 */
export type GroupInfo = {
  title: string
  cover: CoverGroup<'l'>
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

/** 用户历史超展开帖子 (CDN) */
export type UserTopicsFormCDN = ListEmpty<
  DeepPartial<{
    topicId: `group/${Id}`
    title: string
    group: string
    date: string
    time: string
    avatar: string // '000/45/62/456208'
    userId: UserId
    userName: string
  }>
>

/** 条目帖子列表 */
export type Board = ListEmpty<{
  href: `/subject/topic/${Id}`
  title: string
  userId: UserId
  userName: string
  replies: string
  time: string
}>

/** 条目讨论版 */
export type Reviews = ListEmpty<
  DeepPartial<{
    id: Id
    title: string
    avatar: Avatar<'l'>
    userId: UserId
    userName: string
    replies: string
    time: string
    content: string
  }>
>

/** 用户书签 */
export type BookmarksItem = {
  href: string
  title: string
}

export type Setting = typeof INIT_SETTING

export type SettingKeys = keyof Setting
