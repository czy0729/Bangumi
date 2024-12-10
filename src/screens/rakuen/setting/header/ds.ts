/*
 * @Author: czy0729
 * @Date: 2024-02-01 18:26:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-02-01 18:26:35
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['rakuen/settings', 'RakuenSetting'] as const

export const DATA = [TEXT_MENU_BROWSER] as const
