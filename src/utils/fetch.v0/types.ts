/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:29:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 07:28:45
 */
import type {
  Collection as BaseCollection,
  CollectionStatusValue,
  Images,
  ListEmpty,
  Rating,
  Subject as BaseSubject,
  SubjectId,
  SubjectTypeValue,
  UserId
} from '@types'

export type Config = {
  method: 'get' | 'post'
  url: string
  headers: {
    Authorization?: string
    'User-Agent'?: string
    'Content-Type'?: 'application/x-www-form-urlencoded'
  }
  data?: string
}

export type RequestConfig = {
  timeout?: number
  auth?: boolean
  onError?: (ex: Error) => any
}

type Subject = {
  date: string
  platform: string
  images: Images
  summary: string
  name: string
  name_cn: string
  rank: number
  score: number
  tags: {
    name: string
    count: number
  }[]
  infobox: any[]
  rating: Rating
  total_episodes: number
  collection: BaseCollection
  id: SubjectId
  eps: number
  volumes: number
  locked: boolean
  nsfw: boolean
  type: CollectionStatusValue
}

export type CollectionItem = {
  updated_at: string
  comment: string
  tags: string[]
  subject_id: SubjectId
  ep_status: number
  vol_status: number
  subject_type: SubjectTypeValue
  type: CollectionStatusValue
  rate: number
  private: boolean
  subject: Subject
}

export type Collection = {
  data: CollectionItem[]
  total: number
  limit: number
  offset: number
}

export type UserCollectionItem = {
  name: string
  subject_id: SubjectId
  type: CollectionStatusValue
  ep_status: number
  vol_status: number
  lasttouch: number
  subject: BaseSubject
}

export type UserCollection = ListEmpty<UserCollectionItem>

export type Users = {
  avatar: {
    large: string
    medium: string
    small: string
  }
  id: number
  nickname: string
  sign: string
  url: string
  user_group: number
  username: UserId
}
