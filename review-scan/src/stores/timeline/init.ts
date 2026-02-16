/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:57:34
 */
import { LIST_EMPTY, MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineScope, TimeLineType } from '@types'
import { CollectionsTimeline } from './types'

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
  timeline: {
    0: LIST_EMPTY
  },

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

  /** 隐藏TA */
  hidden: {}
}

export const LOADED = {
  collectionsTimeline: false,
  hidden: false,
  likes: false,
  say: false
}
