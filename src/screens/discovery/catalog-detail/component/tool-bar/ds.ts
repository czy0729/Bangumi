/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 工具栏组件标识与菜单数据
 */
import { rc } from '@utils/dev'
import { COLLECT_DS, SORT_DS } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const COMPONENT_SORT = rc(PARENT, 'Sort')

export const COMPONENT_MORE = rc(PARENT, 'More')

export const COMPONENT_COLLECT = rc(PARENT, 'Collect')

export const COMPONENT_UPDATE = rc(PARENT, 'Update')

export const SORT_DATA = SORT_DS.map(item => item.title)

export const COLLECT_DATA = COLLECT_DS.map(item => item.title)
