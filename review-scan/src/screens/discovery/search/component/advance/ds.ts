/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:17:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 22:26:34
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { STATE } from '../../store/ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Advance')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  cat: STATE.cat,
  value: STATE.value,
  onSubmit: FROZEN_FN
}

export const DEFAULT_PROPS_MONO = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  value: STATE.value,
  onSubmit: FROZEN_FN
}
