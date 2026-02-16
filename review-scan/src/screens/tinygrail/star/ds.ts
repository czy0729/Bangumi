/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 17:50:56
 */
import { Loaded } from '@types'

export const COMPONENT = 'TinygrailStar'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 指数生成 2025/04/13 */
export const STAR_INDEX_WEIGHT = 2260

export const EXCLUDE_STATE = {
  hover: 0,
  label: '全局'
}

export const STATE = {
  page: 1,
  limit: 100,
  lastStarIndexWeight: STAR_INDEX_WEIGHT,
  starIndexWeight: STAR_INDEX_WEIGHT,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
