/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:40:36
 */
import { LIST_EMPTY, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectType } from '@types'

export const NAMESPACE = 'Tag'

export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const INIT_TAG_ITEM = {
  id: '',
  cover: '',
  name: '',
  nameCn: '',
  tip: '',
  score: '',
  total: '',
  rank: '',
  collected: false
}

export const STATE = {
  /** 标签条目 */
  tag: {
    0: LIST_EMPTY
  },

  /** 排行榜 */
  rank: {
    0: LIST_EMPTY
  },

  /** 索引 */
  browser: {
    0: LIST_EMPTY
  }
}

export const LOADED = {
  tag: false,
  rank: false,
  browser: false
}
