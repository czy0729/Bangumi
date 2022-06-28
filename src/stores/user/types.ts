/*
 * @Author: czy0729
 * @Date: 2022-06-25 12:45:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-29 02:11:23
 */
import { CollectionStatus, CollectionStatusValue } from '@constants/model/types'
import {
  CollectionStatusCn,
  Images,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue,
  UrlSubject,
  UserId
} from '@types'

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
