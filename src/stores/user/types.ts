/*
 * @Author: czy0729
 * @Date: 2022-06-25 12:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-10 07:58:15
 */
import { CollectionStatus, CollectionStatusValue } from '@constants/model/types'
import {
  CollectionStatusCn,
  DeepPartial,
  Images,
  ListEmpty,
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

export type PmItem = {
  name: string
  avatar: string
  userId: UserId
  content: string
  time: string
}

export type PmParamsItem = {
  formhash: string
  msg_receivers: string
  _loaded?: number
}
