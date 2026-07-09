/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-09 00:00:00
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import { LIST_EMPTY } from '@constants'
import userStore from '../user'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from './init'
import State from './state'

import type { Id, StoreConstructor, SubjectId, TimeLineScope, TimeLineType, UserId } from '@types'
import type { STATE } from './init'
import type { Hidden } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 其他人的时间胶囊 */
  usersTimeline = (userId?: UserId) => {
    const STATE_KEY = 'usersTimeline'
    const ITEM_KEY = userId || userStore.myId

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  }

  /** 时间胶囊回复表情 */
  likesList = (id: Id) => {
    const STATE_KEY = 'likes'
    const likes = this.getState(STATE_KEY, id, {})
    if (!Object.keys(likes).length) return null

    return Object.entries(likes)
      .sort((a, b) => desc(Number(a[1]?.total || 0), Number(b[1]?.total || 0)))
      .map(item => item[1])
  }

  /** 用户条目吐槽联动回复表情关联 Id */
  relatedId = (userId: UserId, subjectId: SubjectId) => {
    return this.collectionsTimeline(userId)?.[subjectId] || 0
  }

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 时间胶囊 */
  private _timeline = (scope: TimeLineScope = DEFAULT_SCOPE, type: TimeLineType = DEFAULT_TYPE) => {
    const STATE_KEY = 'timeline'
    const ITEM_KEY = `${scope}|${type}` as const

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  }

  /** 用户条目吐槽联动回复表情 */
  private _collectionsTimeline = (userId: UserId) => {
    const STATE_KEY = 'collectionsTimeline'
    const ITEM_KEY = userId

    return this.getState(STATE_KEY, ITEM_KEY, {})
  }

  /** 时间胶囊回复表情 */
  private _likes = (id: Id) => {
    const STATE_KEY = 'likes'
    const ITEM_KEY = id

    return {
      [id]: this.getState(STATE_KEY, ITEM_KEY, {})
    }
  }

  /** 吐槽 */
  private _say = (id: Id) => {
    const STATE_KEY = 'say'
    const ITEM_KEY = id

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  }

  /** 多个用户的追踪收藏时间线 */
  private _collectionTimelines = (userIds: UserId[] = [], subjectId: SubjectId) => {
    return userIds
      .map(userId => {
        const STATE_KEY = 'collectionTimelines'
        const data = this.getState(STATE_KEY, userId)

        if (data?.map?.[subjectId]) {
          const { map, ...other } = data
          return {
            ...other,
            userId,
            sort: map[subjectId]
          }
        }
        return null
      })
      .filter(item => item !== null)
  }

  /** 用户的收藏时间线次数追踪 */
  private _collectionTimelinesTrack = (userId: UserId) => {
    const STATE_KEY = 'collectionTimelinesTrack'
    const ITEM_KEY = userId

    return this.getState(STATE_KEY, ITEM_KEY, 0)
  }

  // -------------------- @computed 缓存属性 --------------------
  /** @deprecated 所有收藏条目状态 */
  @computed get formhash() {
    const STATE_KEY = 'formhash'

    return this.getState(STATE_KEY)
  }

  /** 隐藏 TA */
  @computed get hidden(): Hidden {
    const STATE_KEY = 'hidden'
    this.init(STATE_KEY, true)

    return this.getState(STATE_KEY)
  }

  /** 用户最后活跃时间 */
  @computed get active() {
    const STATE_KEY = 'active'
    this.init(STATE_KEY, true)

    return this.getState(STATE_KEY)
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 时间胶囊 */
  timeline(scope: TimeLineScope = DEFAULT_SCOPE, type: TimeLineType = DEFAULT_TYPE) {
    const STATE_KEY = 'timeline'
    this.init(STATE_KEY, true)

    return this[`_${STATE_KEY}`](scope, type)
  }

  /** 用户条目吐槽联动回复表情 */
  collectionsTimeline(userId: UserId) {
    const STATE_KEY = 'collectionsTimeline'
    const ITEM_KEY = userId
    this.init(STATE_KEY, true)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 时间胶囊回复表情 */
  likes(id: Id) {
    const STATE_KEY = 'likes'
    const ITEM_KEY = id
    this.init(STATE_KEY, true)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 吐槽 */
  say(id: Id) {
    const STATE_KEY = 'say'
    const sayId = String(id).split('#')[0]
    const ITEM_KEY = sayId
    this.init(STATE_KEY, true)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 多个用户的追踪收藏时间线 */
  collectionTimelines(userIds: UserId[] = [], subjectId: SubjectId) {
    const STATE_KEY = 'collectionTimelines'
    this.init(STATE_KEY, true)

    return this[`_${STATE_KEY}`](userIds, subjectId)
  }

  /** 用户的收藏时间线次数追踪 */
  collectionTimelinesTrack(userId: UserId) {
    const STATE_KEY = 'collectionTimelinesTrack'
    const ITEM_KEY = userId
    this.init(STATE_KEY, true)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }
}
