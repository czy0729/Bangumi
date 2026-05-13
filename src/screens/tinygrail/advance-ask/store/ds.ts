/*
 * @Author: czy0729
 * @Date: 2024-11-19 06:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 00:00:45
 */
import type { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const STATE = {
  level: '' as string,
  _loaded: false as Loaded
}
