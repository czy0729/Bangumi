/*
 * @Author: czy0729
 * @Date: 2022-06-25 12:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 17:19:53
 */
import type { CollectionStatus, CollectionStatusValue } from '@constants/model/types'
import type {
  CollectionStatusCn,
  Id,
  Images,
  ListEmpty,
  Loaded,
  Override,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue,
  UrlSubject,
  UserId
} from '@types'

/** 在看的收藏项 (进度页面) */
export type UserCollectionItem = {
  name: string
  subject_id: SubjectId
  ep_status: number
  vol_status: number
  lasttouch: number
  subject: {
    id: SubjectId
    url: UrlSubject
    type: SubjectTypeValue
    name: string
    name_cn: string
    summary: string
    eps: number
    eps_count: number
    air_date: string
    air_weekday: number
    images: Images
  }
  collection: {
    doing: number
  }
}

/** 在看的收藏 (进度页面) */
export type UserCollection = ListEmpty<UserCollectionItem>

/** 用户收藏概览项 */
export type CollectionsItem = {
  list: {
    id: SubjectId
    url: UrlSubject
    type: SubjectTypeValue
    name: string
    name_cn: string
    summary: string
    air_date: string
    air_weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6 | ''
    images: Images
  }[]
  status: CollectionStatusCn
  count: number
}

/** 用户收藏概览 (每种状态最多 25 条数据) */
export type UserCollections = ListEmpty<CollectionsItem>

/** 用户收藏统计项 */
export type CollectionsStatusItem = {
  type: SubjectTypeValue
  name: SubjectType
  name_cn: SubjectTypeCn
  collects: {
    status: {
      type: CollectionStatus
      name: CollectionStatusCn
      id: CollectionStatusValue
    }
    count: number
  }[]
}

/** 用户收藏统计 (每种状态条目的数量) */
export type UserCollectionsStatus = CollectionsStatusItem[]

/** 短信类型 */
export type PmType = 'pmIn' | 'pmOut'

/** 短信列表项 */
export type PmItem = {
  /** 会话 ID */
  id: Id

  /** 标题（descr 中 / 左侧） */
  title: string

  /** 预览内容（descr 中 / 右侧，可能带 Re:） */
  content: string

  /** 对方头像 */
  avatar: string

  /** 对方用户名 */
  name: string

  /** 对方用户 ID（当前实际填入会话 ID） */
  userId: UserId

  /** 最后消息时间 */
  time: string

  /** 是否未读 */
  new: boolean
}

/** 短信列表 */
export type Pm = ListEmpty<PmItem>

/** 短信详情项 */
export type PmDetailItem = {
  type?: 'label' | 'message'
  name: string
  avatar: string
  userId: UserId
  content: string
  time: string
  date?: string
}

/** 短信详情 */
export type PmDetail = Override<
  ListEmpty<PmDetailItem>,
  {
    form?: {
      related: string
      msg_receivers: string
      current_msg_id: string
      formhash: string
      msg_title: string
    }
  }
>

/** 发短信参数 */
export type PmParams = {
  formhash: string
  msg_receivers: string
  _loaded?: number
}

/** 同一个用户的短信关联集合项 */
export type PmMapItem = Record<
  string,
  {
    id: Id
    time: string
  }
>

/** 同一个用户的短信关联集合 */
export type PmMap = Record<UserId, PmMapItem>

/** 收视进度 (章节) */
export interface UserProgress {
  [key: string]: CollectionStatusCn | Loaded
  _loaded: Loaded
}
