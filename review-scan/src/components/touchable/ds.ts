/*
 * @Author: czy0729
 * @Date: 2023-07-25 17:58:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:44:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Touchable')

export const EXTRA_BUTTON_PROPS = {
  borderless: false,
  rippleColor: 'rgba(255, 255, 255, 0)',
  exclusive: true,
  disabled: true
} as const

export const EXTRA_BUTTON_PROPS_DARK = {
  borderless: false,
  rippleColor: 'rgba(0, 0, 0, 0)',
  exclusive: true,
  disabled: true
} as const
