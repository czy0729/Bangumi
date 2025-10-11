/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 01:00:34
 */
import { rc } from '@utils/dev'
import { SUBJECT_TYPE, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = [...SUBJECT_TYPE.map(item => item.title), TEXT_MENU_BROWSER] as const
