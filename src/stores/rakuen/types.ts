/*
 * @Author: czy0729
 * @Date: 2022-07-01 04:41:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 13:50:44
 */
import {
  ListEmpty,
  DeepPartial,
  Avatar,
  HTMLText,
  UserId,
  Id,
  CoverGroup,
  Loaded
} from '@types'

/** 超展开列表 */
export type Rakuen = ListEmpty<
  DeepPartial<{
    group: string
    groupHref: string
    avatar: Avatar<'l'>
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
  avatar: Avatar<'s'>
  floor: string
  formhash: string
  group: string
  groupHref: string
  groupThumb: string
  lastview: string
  message: HTMLText
  time: string
  title: string
  userId: UserId
  userName: string
  userSign: string
  tip: string
  close: string
  delete: boolean
  _loaded: Loaded
}

/** 帖子回复 */
export type Comments = ListEmpty<
  DeepPartial<{
    avatar: Avatar<'s'>
    floor: string
    id: Id
    message: HTMLText
    replySub: string
    time: string
    userId: UserId
    userName: string
    userSign: string
    erase: string
    sub: {
      avatar: Avatar<'s'>
      floor: string
      id: Id
      message: HTMLText
      replySub: string
      time: string
      userId: UserId
      userName: string
      userSign: string
      erase: string
    }[]
  }>
>

/** 电波提醒 */
export type Notify = {
  unread: number
  clearHref: string
  list: any[]
  _loaded?: number
}

/** 小组帖子列表 */
export type Group = {
  list: Partial<{
    href: string
    title: string
    userId: UserId
    userName: string
    replies: string
    time: string
  }>[]
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
export type Board = ListEmpty<
  DeepPartial<{
    href: `/subject/topic/${Id}`
    title: string
    userId: UserId
    userName: string
    replies: string
    time: string
  }>
>

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
