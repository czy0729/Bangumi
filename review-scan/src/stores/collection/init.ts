/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:48:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:19:48
 */
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY,
  LIST_EMPTY
} from '@constants'
import { UsersSubjectCollection } from './types'

export const NAMESPACE = 'Collection'

export const DEFAULT_SUBJECT_TYPE = MODEL_SUBJECT_TYPE.getLabel('动画') as 'anime'

export const DEFAULT_COLLECTION_STATUS = MODEL_COLLECTION_STATUS.getValue(
  '在看'
) as 'do'

export const DEFAULT_ORDER = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间') as ''

export const DEFAULT_USERS_SUBJECT_COLLECTION = {
  rate: 0,
  comment: '',
  type: '',
  update_at: '',
  _loaded: false
} as UsersSubjectCollection

export const STATE = {
  /** 条目收藏信息 */
  collection: {
    0: {}
  },

  /** 用户收藏概览 (HTML, 全部) */
  userCollections: {
    0: LIST_EMPTY
  },

  /** 用户收藏概览的标签 (HTML) */
  userCollectionsTags: {
    0: []
  },

  /** @deprecated 所有收藏条目状态 */
  userCollectionsMap: {
    0: '看过' as const
  },

  /** 条目的收藏状态, 替代 userCollectionsMap */
  collectionStatus: {
    0: '看过'
  },

  /** 条目的收藏状态最后一次请求时间戳, 对应 collectionStatus, 共同维护 */
  _collectionStatusLastFetchMS: {
    0: 0
  },

  /** 瓷砖进度 */
  mosaicTile: {},

  /** 特定用户特定条目的收藏信息 */
  usersSubjectCollection: {
    0: DEFAULT_USERS_SUBJECT_COLLECTION
  }
}

export const LOADED = {
  _collectionStatusLastFetchMS: false,
  collection: false,
  collectionStatus: false,
  mosaicTile: false,
  userCollections: false,
  userCollectionsMap: false,
  userCollectionsTags: false,
  usersSubjectCollection: false
}
