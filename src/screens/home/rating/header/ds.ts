/*
 * @Author: czy0729
 * @Date: 2024-02-28 11:10:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:48:54
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = [TEXT_MENU_BROWSER] as const
