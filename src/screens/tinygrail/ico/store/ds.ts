/*
 * @Author: czy0729
 * @Date: 2021-03-05 14:43:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 07:01:32
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  _loaded: false as Loaded
}
