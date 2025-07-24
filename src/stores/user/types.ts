/*
 * @Author: czy0729
 * @Date: 2022-06-25 12:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-09 01:38:17
 */
import { CollectionStatus, CollectionStatusValue } from '@constants/model/types'
import {
  CollectionStatusCn,
  DeepPartial,
  Id,
  Images,
  ListEmpty,
  Override,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue,
  UrlSubject,
  UserId
} from '@types'

export type UserCollection = ListEmpty<
  DeepPartial<{
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
  }>
>

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

export type PmType = 'pmIn' | 'pmOut'

export type PmItem = {
  id: Id
  title: string
  content: string
  avatar: string
  name: string
  userId: UserId
  time: string
  new: boolean
}

export type Pm = ListEmpty<PmItem>

export type PmDetailItem = {
  name: string
  avatar: string
  userId: UserId
  content: string
  time: string
  date?: string
}

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

export type PmParamsItem = {
  formhash: string
  msg_receivers: string
  _loaded?: number
}

export type PmMapItem = Record<
  string,
  {
    id: Id
    time: string
  }
>

export type PmMap = Record<UserId, PmMapItem>
