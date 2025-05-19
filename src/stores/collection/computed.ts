/*
 * @Author: czy0729
 * @Date: 2023-04-24 02:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:52:31
 */
import { computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import {
  CollectActions,
  CollectionStatus,
  CollectionStatusCn,
  StoreConstructor,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  UserId
} from '@types'
import userStore from '../user'
import { DEFAULT_USERS_SUBJECT_COLLECTION, STATE } from './init'
import State from './state'
import {
  Collection,
  MosaicTile,
  UserCollections,
  UserCollectionsMap,
  UserCollectionsTags,
  UsersSubjectCollection
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 条目收藏信息 */
  collection(subjectId: SubjectId) {
    this.init('collection', true)
    return computed<Collection>(() => {
      return this.state.collection[subjectId] || {}
    }).get()
  }

  /** 用户收藏概览 (HTML, 全部) */
  userCollections(userId: UserId, subjectType: SubjectType, type: CollectionStatus) {
    this.init('userCollections', true)
    return computed<UserCollections>(() => {
      const key = `${userId || userStore.myUserId}|${subjectType}|${type}`
      return this.state.userCollections[key] || LIST_EMPTY
    }).get()
  }

  /** 用户收藏概览的标签 (HTML) */
  userCollectionsTags(userId: UserId, subjectType: SubjectType, type: CollectionStatus) {
    this.init('userCollectionsTags', true)
    return computed<UserCollectionsTags>(() => {
      const key = `${userId || userStore.myUserId}|${subjectType}|${type}`
      return this.state.userCollectionsTags[key] || []
    }).get()
  }

  /** @deprecated 所有收藏条目状态 */
  @computed get userCollectionsMap(): UserCollectionsMap {
    this.init('userCollectionsMap', true)
    return this.state.userCollectionsMap
  }

  /** 瓷砖进度 */
  @computed get mosaicTile(): MosaicTile {
    this.init('mosaicTile', true)
    return this.state.mosaicTile
  }

  /**
   * @deprecated
   * 请使用 collectionStore.collect 替代
   * 条目的收藏状态, 替代 userCollectionsMap
   * */
  collectionStatus(subjectId: SubjectId) {
    this.init('collectionStatus', true)
    return computed<CollectionStatusCn | ''>(() => {
      return this.state.collectionStatus[subjectId] || ''
    }).get()
  }

  /** 条目的收藏状态最后一次请求时间戳, 对应 collectionStatus, 共同维护 */
  _collectionStatusLastFetchMS(subjectId: SubjectId) {
    this.init('_collectionStatusLastFetchMS', true)
    return computed<number>(() => {
      return this.state._collectionStatusLastFetchMS[subjectId] || 0
    }).get()
  }

  /** 特定用户特定条目的收藏信息 */
  usersSubjectCollection(username: UserId, subjectId: SubjectId) {
    this.init('usersSubjectCollection', true)
    return computed<UsersSubjectCollection>(() => {
      return (
        this.state.usersSubjectCollection[`${username}|${subjectId}`] ||
        DEFAULT_USERS_SUBJECT_COLLECTION
      )
    }).get()
  }

  // -------------------- computed --------------------
  /** @deprecated 获取指定条目收藏状态名 */
  statusName(subjectId: SubjectId) {
    return computed<CollectionStatusCn | ''>(() => {
      const collection = this.collection(subjectId) as any
      return collection?.status?.name || ''
    }).get()
  }

  /** 获取指定条目收藏状态, 若传递了 type 会自动转换对应动作 */
  collect(subjectId: SubjectId, typeCn?: SubjectTypeCn) {
    return computed<CollectActions | ''>(() => {
      const value = this.collectionStatus(subjectId) || ''
      if (!value || !typeCn || typeCn === '动画' || typeCn === '三次元') return value
      if (typeCn === '书籍') return value.replace('看', '读') as CollectActions
      if (typeCn === '游戏') return value.replace('看', '玩') as CollectActions
      if (typeCn === '音乐') return value.replace('看', '听') as CollectActions
      return value
    }).get()
  }
}
