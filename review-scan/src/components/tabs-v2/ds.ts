/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:41:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-31 16:32:39
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TabsV2')

export const ANDROID_RIPPLE = {
  borderless: false,
  color: 'rgba(0, 0, 0, 0)',
  radius: 0,
  foreground: false
} as const
