/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 17:06:22
 */
import { Loaded } from '@types'

export const COMPONENT = 'Preview'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  epsThumbs: [],
  epsThumbsHeader: {},
  _loaded: false as Loaded
}
