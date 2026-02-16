/*
 * @Author: czy0729
 * @Date: 2024-01-18 04:31:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:56:16
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['notify/all', 'Notify'] as const

export const DATA = [TEXT_MENU_BROWSER] as const
