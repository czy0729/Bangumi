/*
 * @Author: czy0729
 * @Date: 2024-05-07 22:01:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-23 16:30:53
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['pm', 'PM'] as const

export const DATA = [TEXT_MENU_BROWSER] as const
