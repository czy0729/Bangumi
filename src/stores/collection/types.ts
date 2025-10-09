/*
 * @Author: czy0729
 * @Date: 2022-05-27 04:40:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-24 10:07:53
 */
import {
  CollectionsOrder,
  CollectionStatus,
  CollectionStatusCn,
  CollectionStatusValue,
  ImagesAvatar,
  ListEmpty,
  Loaded,
  SubjectId,
  SubjectType,
  UrlUser,
  UserId
} from '@types'

/** 条目收藏信息 */
export type Collection = {
  status: {
    type: CollectionStatus | ''
    name: CollectionStatusCn | '未收藏'
    id: CollectionStatusValue
  }
  rating: number
  comment: string
  private: 0 | 1
  tag: string[]
  ep_status: number
  vol_status: number
  lasttouch: number
  user: {
    id: UserId
    url: UrlUser
    username: string
    nickname: string
    avatar: ImagesAvatar
    sign: string
    usergroup: number
  }
  _loaded: Loaded
}

/** 用户收藏项 (时光机页面) */
export type UserCollectionsItem = {
  id: SubjectId
  cover: string | '/img/no_icon_subject.png'
  name: string
  nameCn: string
  tip: string
  tags: string
  comments: string
  score: string | number
  time: string
  collected: boolean
}

/** 用户收藏 (时光机页面) */
export type UserCollections = ListEmpty<UserCollectionsItem>

/** 所有收藏条目状态 */
export type UserCollectionsMap = Record<SubjectId, CollectionStatusCn>

/** 瓷砖进度 */
export type MosaicTile = Record<string, number>

/** 用户收藏概览的标签 */
export type UserCollectionsTags = {
  tag: string
  count: number
}[]

/** 特定用户特定条目的收藏信息 */
export type UsersSubjectCollection = {
  rate: number
  comment: string
  type: CollectionStatusValue | ''
  update_at: string
  _loaded: Loaded
}

/** 条目的收藏状态 */
export type UserCollectionStatus = Record<SubjectId, CollectionStatusCn>

/** 条目的收藏状态最后一次请求时间戳 */
export type CollectionStatusLastFetchMS = Record<SubjectId, number>

/** 用户收藏概览请求参数 */
export type FetchUserCollectionsArgs = {
  userId?: UserId
  subjectType?: SubjectType
  type?: CollectionStatus
  order?: CollectionsOrder
  tag?: string
  auth?: boolean
}
