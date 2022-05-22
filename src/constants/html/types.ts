/*
 * @Author: czy0729
 * @Date: 2022-05-22 07:54:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-22 11:28:55
 */
import { ModelValueOf } from '@types'
import {
  COLLECTIONS_ORDERBY,
  COLLECTION_STATUS,
  RAKUEN_SCOPE,
  RAKUEN_TYPE,
  RATING_STATUS,
  SEARCH_CAT,
  SUBJECT_TYPE,
  TAG_ORDERBY,
  TIMELINE_SCOPE,
  TIMELINE_TYPE
} from '../model'

export type Id = number | string
export type SubjectId = Id
export type EpId = Id
export type UserId = Id
export type PersonId = `person/${Id}`
export type CharacterId = `character/${Id}`
export type MonoId = CharacterId | PersonId
export type TopicId = `${'group' | 'subject' | 'ep' | 'prsn'}/${Id}`

export type CollectionStatus = ModelValueOf<typeof COLLECTION_STATUS, 'value'>
export type CollectionsOrder = ModelValueOf<typeof COLLECTIONS_ORDERBY, 'value'>
export type Order = ModelValueOf<typeof TAG_ORDERBY, 'value'>
export type RakuenScope = ModelValueOf<typeof RAKUEN_SCOPE, 'value'>
export type RakuenType = ModelValueOf<typeof RAKUEN_TYPE, 'value'>
export type RatingStatus = ModelValueOf<typeof RATING_STATUS, 'value'>
export type SearchCat = ModelValueOf<typeof SEARCH_CAT, 'value'>
export type SubjectType = ModelValueOf<typeof SUBJECT_TYPE, 'label'>
export type TimeLineScope = ModelValueOf<typeof TIMELINE_SCOPE, 'value'>
export type TimeLineType = ModelValueOf<typeof TIMELINE_TYPE, 'value'>

export type RakuenReplyType =
  | 'group/topic'
  | 'subject/topic'
  | 'subject/ep'
  | 'person'
  | 'character'
