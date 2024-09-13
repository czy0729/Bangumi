/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:32:44
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  _loaded: false as Loaded
}
