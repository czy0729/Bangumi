/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:54:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 工具栏组件标识
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const COMPONENT_FILTER_KEY = rc(PARENT, 'FilterKey')

export const COMPONENT_FILTER_TYPE = rc(PARENT, 'FilterType')

export const COMPONENT_FILTER_YEAR = rc(PARENT, 'FilterYear')

export const COMPONENT_SEARCH = rc(PARENT, 'Search')

export const COMPONENT_TYPE = rc(PARENT, 'Type')
