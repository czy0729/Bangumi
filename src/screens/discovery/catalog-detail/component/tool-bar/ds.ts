/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 20:30:39
 */
import { rc } from '@utils/dev'
import { COLLECT_DS, LAYOUT_DS, SORT_DS } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const SORT_DATA = SORT_DS.map(item => item.title)

export const LAYOUT_DATA = LAYOUT_DS.map(item => item.title)

export const COLLECT_DATA = COLLECT_DS.map(item => item.title)
