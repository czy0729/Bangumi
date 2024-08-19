/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:44:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:25:31
 */
import { STORYBOOK } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  ipt: '',
  filter: '',
  isFocused: true
}

export const STATE = {
  type: (STORYBOOK ? 'all' : 'mine') as 'all' | 'mine',
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
