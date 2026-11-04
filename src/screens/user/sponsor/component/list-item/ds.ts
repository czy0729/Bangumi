/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:49:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 列表项常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ListItem')

/** 两列布局下每一行的预估高度, 用于 InView 提前渲染 */
export const IN_VIEW_ROW_HEIGHT = 48
