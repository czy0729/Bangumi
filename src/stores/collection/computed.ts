/*
 * @Author: czy0729
 * @Date: 2023-04-24 02:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 06:42:44
 */
import { computed } from 'mobx'
import { computedFn } from '@utils/computed-fn'
import { LIST_EMPTY } from '@constants'
import userStore from '../user'
import { DEFAULT_USERS_SUBJECT_COLLECTION } from './init'
import State from './state'

import type {
  CollectActions,
  CollectionStatus,
  CollectionStatusCn,
  StoreConstructor,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  UserId
} from '@types'
import type { STATE } from './init'
import type { Collection, UserCollections, UserCollectionsMap, UserCollectionsTags } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** @deprecated 获取指定条目收藏状态名 */
  statusName = computedFn((subjectId: SubjectId) => {
    const collection = this.collection(subjectId) as any
    return collection?.status?.name || ''
  })

  /** 获取指定条目收藏状态 */
  private _collect = computedFn((subjectId: SubjectId) => {
    return (this.collectionStatus(subjectId) || '') as CollectActions
  })

  /** 获取指定条目收藏状态, 若传递了 type 会自动转换对应动作 */
  collect(subjectId: SubjectId, typeCn?: SubjectTypeCn) {
    const value = this._collect(subjectId)
    if (!value || !typeCn || typeCn === '动画' || typeCn === '三次元') return value
    if (typeCn === '书籍') return value.replace('看', '读') as CollectActions
    if (typeCn === '游戏') return value.replace('看', '玩') as CollectActions
    if (typeCn === '音乐') return value.replace('看', '听') as CollectActions
    return value
  }

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 条目收藏信息 */
  private _collection = computedFn((subjectId: SubjectId) => {
    return (this.state.collection[subjectId] || {}) as Collection
  })

  /** 用户收藏概览 */
  private _userCollections = computedFn(
    (userId: UserId, subjectType: SubjectType, type: CollectionStatus) => {
      const ITEM_KEY = [userId || userStore.myUserId, subjectType, type].join('|')
      return (this.state.userCollections[ITEM_KEY] || LIST_EMPTY) as UserCollections
    }
  )

  /** 用户收藏概览 (照片墙专用) */
  private _userCollectionsForMilestone = computedFn(
    (userId: UserId, subjectType: SubjectType, type: CollectionStatus) => {
      const ITEM_KEY = [userId || userStore.myUserId, subjectType, type].join('|')
      return (this.state.userCollectionsForMilestone[ITEM_KEY] || LIST_EMPTY) as UserCollections
    }
  )

  /** 用户收藏概览的标签 */
  private _userCollectionsTags = computedFn(
    (userId: UserId, subjectType: SubjectType, type: CollectionStatus) => {
      const ITEM_KEY = [userId || userStore.myUserId, subjectType, type].join('|')
      return (this.state.userCollectionsTags[ITEM_KEY] || []) as UserCollectionsTags
    }
  )

  /** 用户收藏概览的标签 */
  private _userCollectionsTagsForMilestone = computedFn(
    (userId: UserId, subjectType: SubjectType, type: CollectionStatus) => {
      const ITEM_KEY = [userId || userStore.myUserId, subjectType, type].join('|')
      return (this.state.userCollectionsTagsForMilestone[ITEM_KEY] || []) as UserCollectionsTags
    }
  )

  /** @deprecated 所有收藏条目状态 */
  @computed get userCollectionsMap(): UserCollectionsMap {
    this.init('userCollectionsMap', true)
    return this.state.userCollectionsMap
  }

  /** 瓷砖进度 */
  @computed get mosaicTile() {
    const STATE_KEY = 'mosaicTile'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }

  /** @deprecated 条目的收藏状态 */
  private _collectionStatus = computedFn((subjectId: SubjectId) => {
    return (this.state.collectionStatus[subjectId] || '') as CollectionStatusCn | ''
  })

  /** 条目的收藏状态最后一次请求时间戳 */
  private __collectionStatusLastFetchMS = computedFn((subjectId: SubjectId) => {
    return this.state._collectionStatusLastFetchMS[subjectId] || 0
  })

  /** 特定用户特定条目的收藏信息 */
  private _usersSubjectCollection = computedFn((username: UserId, subjectId: SubjectId) => {
    return (
      this.state.usersSubjectCollection[`${username}|${subjectId}`] ||
      DEFAULT_USERS_SUBJECT_COLLECTION
    )
  })

  // -------------------- 导出方法 (分离 init) --------------------
  /** 条目收藏信息 */
  collection(subjectId: SubjectId) {
    this.init('collection', true)
    return this._collection(subjectId)
  }

  /** 用户收藏概览 */
  userCollections(userId: UserId, subjectType: SubjectType, type: CollectionStatus) {
    this.init('userCollections', true)
    return this._userCollections(userId, subjectType, type)
  }

  /** 用户收藏概览 (照片墙专用) */
  userCollectionsForMilestone(userId: UserId, subjectType: SubjectType, type: CollectionStatus) {
    this.init('userCollectionsForMilestone', true)
    return this._userCollectionsForMilestone(userId, subjectType, type)
  }

  /** 用户收藏概览的标签 */
  userCollectionsTags(userId: UserId, subjectType: SubjectType, type: CollectionStatus) {
    this.init('userCollectionsTags', true)
    return this._userCollectionsTags(userId, subjectType, type)
  }

  /** 用户收藏概览的标签 */
  userCollectionsTagsForMilestone(
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus
  ) {
    this.init('userCollectionsTagsForMilestone', true)
    return this._userCollectionsTagsForMilestone(userId, subjectType, type)
  }

  /** @deprecated 条目的收藏状态, 替代 userCollectionsMap */
  collectionStatus(subjectId: SubjectId) {
    this.init('collectionStatus', true)
    return this._collectionStatus(subjectId)
  }

  /** 条目的收藏状态最后一次请求时间戳, 对应 collectionStatus, 共同维护 */
  _collectionStatusLastFetchMS(subjectId: SubjectId) {
    this.init('_collectionStatusLastFetchMS', true)
    return this.__collectionStatusLastFetchMS(subjectId)
  }

  /** 特定用户特定条目的收藏信息 */
  usersSubjectCollection(username: UserId, subjectId: SubjectId) {
    this.init('usersSubjectCollection', true)
    return this._usersSubjectCollection(username, subjectId)
  }
}
