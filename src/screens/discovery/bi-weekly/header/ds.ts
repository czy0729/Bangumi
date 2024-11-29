/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:23:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 05:56:47
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['biweekly', 'BiWeekly'] as const

export const DATA = ['小组讨论', TEXT_MENU_BROWSER] as const
