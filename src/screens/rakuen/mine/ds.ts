/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:44:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:50:37
 */
import { STORYBOOK } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenMine'

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
