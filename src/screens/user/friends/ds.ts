/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:57:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 02:55:40
 */
import { Loaded } from '@types'
import { Sort } from './types'

export const COMPONENT = 'Friends'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  sort: '' as Sort,
  filter: '',
  fetching: false
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
