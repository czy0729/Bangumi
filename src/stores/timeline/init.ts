/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 05:22:23
 */
import { LIST_EMPTY, MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'

import type { TimeLineScope, TimeLineType, UserId } from '@types'
import type { CollectionsTimeline, CollectionTimelines, Timeline } from './types'

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
  timeline: {} as Record<string, Timeline>,

  /** 其他人的时间胶囊 */
  usersTimeline: {
    0: LIST_EMPTY
  },

  /** 用户条目吐槽联动回复表情 */
  collectionsTimeline: {
    0: {}
  } as CollectionsTimeline,

  /** 时间胶囊回复表情 */
  likes: {
    0: {}
  },

  /** 吐槽 */
  say: {
    0: LIST_EMPTY
  },

  /** 吐槽表单授权码 */
  formhash: '',

  /** 隐藏 TA */
  hidden: {},

  /** 用户最后活跃时间 */
  active: {} as Record<UserId, number>,

  /** 用户的追踪收藏时间线 */
  collectionTimelines: {} as Record<UserId, CollectionTimelines>,

  /** 用户的收藏时间线次数追踪 */
  collectionTimelinesTrack: {} as Record<UserId, number>
}

export const LOADED = {
  collectionsTimeline: false,
  hidden: false,
  likes: false,
  say: false,
  active: false,
  collectionTimelines: false,
  collectionTimelinesTrack: false
}
