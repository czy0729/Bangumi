/*
 * @Author: czy0729
 * @Date: 2024-04-04 06:53:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-04 06:53:47
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['wiki', 'Wiki'] as const

export const DATA = [TEXT_MENU_BROWSER] as const
