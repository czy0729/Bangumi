/*
 * @Author: czy0729
 * @Date: 2022-05-22 13:09:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 07:52:10
 */
import { ModelValueOf } from '@types'
import {
  BROWSER_SORT,
  COLLECTIONS_ORDERBY,
  COLLECTION_STATUS,
  EP_STATUS,
  RAKUEN_SCOPE,
  RAKUEN_TYPE,
  RATING_STATUS,
  SEARCH_CAT,
  SUBJECT_TYPE,
  TAG_ORDERBY,
  TIMELINE_SCOPE,
  TIMELINE_TYPE
} from './index'

export type CollectionStatus = ModelValueOf<typeof COLLECTION_STATUS, 'value'>

export type CollectionStatusCn = ModelValueOf<typeof COLLECTION_STATUS, 'label'>

export type CollectionsOrder = ModelValueOf<typeof COLLECTIONS_ORDERBY, 'value'>

export type EpStatus = ModelValueOf<typeof EP_STATUS, 'value'>

export type TagOrder = ModelValueOf<typeof TAG_ORDERBY, 'value'>

export type RakuenScope = ModelValueOf<typeof RAKUEN_SCOPE, 'value'>

export type RakuenType = ModelValueOf<typeof RAKUEN_TYPE, 'value'>

export type RatingStatus = ModelValueOf<typeof RATING_STATUS, 'value'>

export type SearchCat = ModelValueOf<typeof SEARCH_CAT, 'value'>

/** 条目类型值 */
export type SubjectType = ModelValueOf<typeof SUBJECT_TYPE, 'label'>

/** 条目类型中文 */
export type SubjectTypeCn = ModelValueOf<typeof SUBJECT_TYPE, 'title'>

export type TimeLineScope = ModelValueOf<typeof TIMELINE_SCOPE, 'value'>

export type TimeLineType = ModelValueOf<typeof TIMELINE_TYPE, 'value'>

export type BrowserSort = ModelValueOf<typeof BROWSER_SORT, 'value'>
