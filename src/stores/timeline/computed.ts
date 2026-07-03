/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 05:22:42
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { LIST_EMPTY } from '@constants'
import userStore from '../user'
import { DEFAULT_SCOPE, DEFAULT_TYPE } from './init'
import State from './state'

import type { Id, StoreConstructor, SubjectId, TimeLineScope, TimeLineType, UserId } from '@types'
import type { Likes } from '../rakuen/types'
import type { STATE } from './init'
import type { Hidden, Say, Timeline } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 时间胶囊 */
  timeline = computedFn(
    (scope: TimeLineScope = DEFAULT_SCOPE, type: TimeLineType = DEFAULT_TYPE) => {
      const ITEM_KEY = `${scope}|${type}` as const
      return (this.state.timeline[ITEM_KEY] || LIST_EMPTY) as Timeline
    }
  )

  /** 其他人的时间胶囊 */
  usersTimeline = computedFn((userId?: UserId) => {
    return (this.state.usersTimeline[userId || userStore.myId] || LIST_EMPTY) as Timeline
  })

  /** 时间胶囊回复表情 */
  likesList = computedFn((id: Id) => {
    const likes = this.likes(id)?.[id]
    if (!Object.keys(likes).length) return null

    return Object.entries(likes)
      .sort((a, b) => desc(Number(a[1]?.total || 0), Number(b[1]?.total || 0)))
      .map(item => item[1])
  })

  /** 用户条目吐槽联动回复表情关联 Id */
  relatedId = computedFn((userId: UserId, subjectId: SubjectId) => {
    return this.collectionsTimeline(userId)?.[subjectId] || 0
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 用户条目吐槽联动回复表情 */
  private _collectionsTimeline = computedFn((userId: UserId) => {
    return this.state.collectionsTimeline[userId] || {}
  })

  /** 时间胶囊回复表情 */
  private _likes = computedFn((id: Id) => {
    return {
      [id]: this.state.likes[id] || {}
    } as Likes
  })

  /** 吐槽 */
  private _say = computedFn((id: Id) => {
    const sayId = String(id).split('#')[0]
    return (this.state.say[sayId] || LIST_EMPTY) as Say
  })

  /** 多个用户的追踪收藏时间线 */
  private _collectionTimelines = computedFn((userIds: UserId[] = [], subjectId: SubjectId) => {
    return userIds
      .map(userId => {
        const data = this.state.collectionTimelines[userId]
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
  })

  /** 用户的收藏时间线次数追踪 */
  private _collectionTimelinesTrack = computedFn((userId: UserId) => {
    return this.state.collectionTimelinesTrack[userId] || 0
  })

  /** @deprecated 所有收藏条目状态 */
  @computed get formhash() {
    return this.state.formhash
  }

  /** 隐藏 TA */
  @computed get hidden(): Hidden {
    this.init('hidden', true)
    return this.state.hidden
  }

  /** 用户最后活跃时间 */
  @computed get active() {
    this.init('active', true)
    return this.state.active
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 用户条目吐槽联动回复表情 */
  collectionsTimeline(userId: UserId) {
    this.init('collectionsTimeline', true)
    return this._collectionsTimeline(userId)
  }

  /** 时间胶囊回复表情 */
  likes(id: Id) {
    this.init('likes', true)
    return this._likes(id)
  }

  /** 吐槽 */
  say(id: Id) {
    this.init('say', true)
    return this._say(id)
  }

  /** 多个用户的追踪收藏时间线 */
  collectionTimelines(userIds: UserId[] = [], subjectId: SubjectId) {
    this.init('collectionTimelines', true)
    return this._collectionTimelines(userIds, subjectId)
  }

  /** 用户的收藏时间线次数追踪 */
  collectionTimelinesTrack(userId: UserId) {
    this.init('collectionTimelinesTrack', true)
    return this._collectionTimelinesTrack(userId)
  }
}
