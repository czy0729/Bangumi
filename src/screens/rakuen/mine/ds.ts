/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:44:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:23:40
 */
import { STORYBOOK } from '@constants'
import { Loaded } from '@types'

export const COMPONENT = 'Mine'

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
