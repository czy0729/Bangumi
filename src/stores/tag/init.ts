/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:05:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:40:36
 */
import { MODEL_SUBJECT_TYPE } from '@constants'

import type { SubjectType } from '@types'
import type { Browser, Rank, Tag } from './types'

export const NAMESPACE = 'Tag'

export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const STATE = {
  /** 标签条目 */
  tag: {} as Record<string, Tag>,

  /** 排行榜 */
  rank: {} as Record<string, Rank>,

  /** 排行榜 (不分页) */
  rankWithoutPagination: {} as Record<string, Rank>,

  /** 索引 */
  browser: {} as Record<string, Browser>
}

export const LOADED = {
  tag: false,
  rank: false,
  rankWithoutPagination: false,
  browser: false
}
