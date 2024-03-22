/*
 * @Author: czy0729
 * @Date: 2024-03-22 06:04:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 06:04:26
 */
import { Loaded } from '@types'

export const COMPONENT = 'Replies'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  _loaded: false as Loaded
}
