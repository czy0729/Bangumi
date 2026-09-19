/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:29:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:42:06
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

export type { RequestConfig } from '../request/types'

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
  infobox: unknown[]
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

/** v0 条目详情响应的最小类型 (仅声明用到的字段, 全部可选: 请求失败时响应体为空对象) */
export type V0Subject = {
  id?: SubjectId
  type?: CollectionStatusValue
  name?: string
  name_cn?: string
  summary?: string
  eps?: number
  date?: string
  rating?: Rating
  images?: Images
  collection?: Collection
}

export type V0Episodes = {
  data?: unknown[]
}

/** v0 条目角色 / 职员响应元素的最小类型 */
export type V0SubjectRelation = {
  id?: SubjectId
  images?: Images
  name?: string
  name_cn?: string
  relation?: string
}

export type V0RelationItem = {
  id?: SubjectId
  images?: Images
  name?: string
  name_cn?: string
  role_name?: string
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

export type UserCollection = ListEmpty<UserCollectionItem> & {
  /** 本次请求是否拿到有效响应 (空数组也算成功), 用于区分「确实没有在看收藏」与「请求失败 / 授权过期」 */
  _ok?: boolean
}

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
