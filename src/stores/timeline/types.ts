/*
 * @Author: czy0729
 * @Date: 2022-07-02 01:16:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:08:33
 */
import { Avatar, Cover, ListEmpty, SubjectId, UrlUser, UserId } from '@types'

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

/** 吐槽 */
export type Say = ListEmpty<
  Partial<{
    id: UserId
    avatar: string
    name: string
    text: string
    date: string
    formhash: string
  }>
>

/** 隐藏 TA */
export type Hidden = Record<UserId, number>
