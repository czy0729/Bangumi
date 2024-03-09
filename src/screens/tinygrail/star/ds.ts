/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:08:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-09 05:39:19
 */
import { Loaded } from '@types'

export const COMPONENT = 'TinygrailStar'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUD_STATE = {
  hover: 0,
  label: '全局'
}

export const STATE = {
  page: 1,
  limit: 100,
  ...EXCLUD_STATE,
  _loaded: false as Loaded
}
