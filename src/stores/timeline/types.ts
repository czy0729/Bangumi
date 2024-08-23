/*
 * @Author: czy0729
 * @Date: 2022-07-02 01:16:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 11:54:17
 */
import { Avatar, Cover, Id, ListEmpty, Loaded, SubjectId, UrlUser, UserId } from '@types'

export type TimelineItem = {
  date: string
  id: string
  avatar: {
    src: Avatar<'l'>
    url: UrlUser
  }
  p1: {
    text: string
    url: UrlUser
  }
  p2: {
    text: string
  }
  p3: {
    text: string[]
    url: string[]
  }
  p4: {
    text: string
  }
  subject: string
  subjectId: SubjectId
  time: string
  star: string
  comment: string
  reply: {
    content: string
    count: string | number
    url: string
  }
  like: {
    type: number
    mainId: number
    relatedId: number
  }
  image: Cover[]
  clearHref: string
}

/** 时间胶囊 */
export type Timeline = ListEmpty<TimelineItem>

/** 用户条目吐槽联动回复表情 */
export type CollectionsTimeline = Record<
  UserId,
  Record<SubjectId, Id> & {
    _loaded?: Loaded
  }
>

export type SayItem = {
  id: UserId
  avatar: string
  name: string
  text: string
  date: string
  uid: string
  formhash: string
}

/** 吐槽 */
export type Say = ListEmpty<SayItem>

/** 隐藏 TA */
export type Hidden = Record<UserId, number>
