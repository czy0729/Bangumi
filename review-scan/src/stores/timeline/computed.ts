/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:57:33
 */
import { computed } from 'mobx'
import { desc } from '@utils'
import { LIST_EMPTY } from '@constants'
import { Id, StoreConstructor, SubjectId, TimeLineScope, TimeLineType, UserId } from '@types'
import { Likes } from '../rakuen/types'
import userStore from '../user'
import { DEFAULT_SCOPE, DEFAULT_TYPE, STATE } from './init'
import State from './state'
import { Hidden, Say, Timeline } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 时间胶囊 */
  timeline(scope: TimeLineScope = DEFAULT_SCOPE, type: TimeLineType = DEFAULT_TYPE) {
    return computed<Timeline>(() => {
      const key = `${scope}|${type}`
      return this.state.timeline[key] || LIST_EMPTY
    }).get()
  }

  /** 其他人的时间胶囊 */
  usersTimeline(userId?: UserId) {
    return computed<Timeline>(() => {
      return this.state.usersTimeline[userId || userStore.myId] || LIST_EMPTY
    }).get()
  }

  /** 用户条目吐槽联动回复表情 */
  collectionsTimeline(userId: UserId) {
    this.init('collectionsTimeline', true)
    return computed(() => {
      return this.state.collectionsTimeline[userId] || {}
    }).get()
  }

  /** 时间胶囊回复表情 */
  likes(id: Id) {
    this.init('likes', true)
    return computed<Likes>(() => {
      return {
        [id]: this.state.likes[id] || {}
      }
    }).get()
  }

  /** 吐槽 */
  say(id: Id) {
    this.init('say', true)
    return computed<Say>(() => {
      const sayId = String(id).split('#')[0]
      return this.state.say[sayId] || LIST_EMPTY
    }).get()
  }

  /** 吐槽表单授权码 */
  @computed get formhash() {
    return this.state.formhash
  }

  /** 隐藏 TA */
  @computed get hidden(): Hidden {
    this.init('hidden', true)
    return this.state.hidden
  }

  /** ==================== computed ==================== */
  /** 时间胶囊回复表情 */
  likesList(id: Id) {
    return computed(() => {
      const likes = this.likes(id)?.[id]
      if (!Object.keys(likes).length) return null

      return Object.entries(likes)
        .sort((a, b) => desc(Number(a[1]?.total || 0), Number(b[1]?.total || 0)))
        .map(item => item[1])
    }).get()
  }

  /** 用户条目吐槽联动回复表情关联 Id */
  relatedId(userId: UserId, subjectId: SubjectId) {
    return computed(() => {
      return this.collectionsTimeline(userId)?.[subjectId] || 0
    }).get()
  }
}
