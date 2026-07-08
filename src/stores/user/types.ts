/*
 * @Author: czy0729
 * @Date: 2022-06-25 12:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:29:43
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
  /** 消息项类型，'label' 为日期分隔标签，'message' 为消息 */
  type?: 'label' | 'message'

  /** 发送者用户名（自己发送显示为 '我'） */
  name: string

  /** 发送者头像 */
  avatar: string

  /** 发送者用户 ID */
  userId: UserId

  /** 消息内容 */
  content: string

  /** 消息时间 */
  time: string

  /** 会话日期标签（仅首个消息项使用，作为顶部居中日期显示） */
  date?: string

  /** 所属线程 ID */
  threadId?: string

  /** 线程标题（type='label' 时作为线程分隔标题） */
  threadTitle?: string
}

/** 短信详情 */
export type PmDetail = Override<
  ListEmpty<PmDetailItem>,
  {
    form?: {
      /** 关联会话 ID */
      related: string

      /** 收件人 ID */
      msg_receivers: string

      /** 当前消息 ID */
      current_msg_id: string

      /** 表单校验值 */
      formhash: string

      /** 消息标题 */
      msg_title: string

      /** 新主题标记 */
      new_topic?: string

      /** 线程列表（当前会话下的子主题） */
      threads?: {
        /** 线程 ID */
        id: string

        /** 线程标题 */
        title: string

        /** 是否为当前线程 */
        current: boolean
      }[]

      /** 对方用户 ID */
      peerUserId?: string

      /** 对方用户名 */
      peerUserName?: string
    }
  }
>

/** 发短信参数 */
export type PmParams = {
  formhash: string
  msg_receivers: string
  _loaded?: number
}

/** 收视进度 (章节) */
export interface UserProgress {
  [key: string]: CollectionStatusCn | Loaded
  _loaded: Loaded
}
