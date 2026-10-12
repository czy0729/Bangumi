/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 工具栏组件标识与菜单数据
 */
import { rc } from '@utils/dev'
import { COLLECT_DS, LAYOUT_DS, SORT_DS } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const COMPONENT_SORT = rc(PARENT, 'Sort')

export const COMPONENT_LAYOUT = rc(PARENT, 'Layout')

export const COMPONENT_COLLECT = rc(PARENT, 'Collect')

export const COMPONENT_REVERSE = rc(PARENT, 'Reverse')

export const SORT_DATA = SORT_DS.map(item => item.title)

export const LAYOUT_DATA = LAYOUT_DS.map(item => item.title)

export const COLLECT_DATA = COLLECT_DS.map(item => item.title)
