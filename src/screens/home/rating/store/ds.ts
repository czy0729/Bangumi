/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:12:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:21:45
 */
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 2,

  /** 登录用户默认 true */
  isFriend: false,
  _fetching: false,
  _loaded: false as Loaded
}
