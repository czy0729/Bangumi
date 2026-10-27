/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:44:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { WEB } from '@constants'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  ipt: '',
  filter: ''
}

export const STATE = {
  ...EXCLUDE_STATE,
  type: (WEB ? 'all' : 'mine') as 'all' | 'mine',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
