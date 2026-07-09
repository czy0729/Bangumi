/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 05:22:23
 */
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'

import type { Id, TimeLineScope, TimeLineType, UserId } from '@types'
import type { Likes } from '../rakuen/types'
import type { CollectionsTimeline, CollectionTimelines, Hidden, Say, Timeline } from './types'

export const NAMESPACE = 'Timeline'

export const DEFAULT_SCOPE = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('好友')

export const DEFAULT_TYPE = MODEL_TIMELINE_TYPE.getValue<TimeLineType>('全部')

export const INIT_SAY_ITEM = {
  id: '',
  name: '',
  text: ''
}

export const STATE = {
  /** 时间胶囊 */
  timeline: {} as Record<`${TimeLineScope}|${TimeLineType}`, Timeline>,

  /** 其他人的时间胶囊 */
  usersTimeline: {} as Record<UserId, Timeline>,

  /** 用户条目吐槽联动回复表情 */
  collectionsTimeline: {} as CollectionsTimeline,

  /** 时间胶囊回复表情 */
  likes: {} as Likes,

  /** 吐槽 */
  say: {} as Record<Id, Say>,

  /** 吐槽表单授权码 */
  formhash: '',

  /** 隐藏 TA */
  hidden: {} as Hidden,

  /** 用户最后活跃时间 */
  active: {} as Record<UserId, number>,

  /** 用户的追踪收藏时间线 */
  collectionTimelines: {} as Record<UserId, CollectionTimelines>,

  /** 用户的收藏时间线次数追踪 */
  collectionTimelinesTrack: {} as Record<UserId, number>
}

export const LOADED = {
  timeline: false,
  collectionsTimeline: false,
  hidden: false,
  likes: false,
  say: false,
  active: false,
  collectionTimelines: false,
  collectionTimelinesTrack: false
}
