/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:44:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:23:27
 */
import { WEB } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  ipt: '',
  filter: '',
  isFocused: true
}

export const STATE = {
  ...EXCLUDE_STATE,
  type: (WEB ? 'all' : 'mine') as 'all' | 'mine',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
