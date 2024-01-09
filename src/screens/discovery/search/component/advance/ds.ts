/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:17:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 11:01:01
 */
import { rc } from '@utils/dev'
import { FN } from '@constants'
import { Navigation } from '@types'
import { STATE } from '../../ds'

import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Advance')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  cat: STATE.cat,
  value: STATE.value,
  onSubmit: FN
}
