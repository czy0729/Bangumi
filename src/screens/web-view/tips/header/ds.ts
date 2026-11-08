/*
 * @Author: czy0729
 * @Date: 2024-02-08 19:29:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 12:00:00
 *
 * 头部标识 + 埋点路径 + 菜单数据
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, TABS } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tips', 'Tips'] as const

/** 菜单标题 */
export const MENUS = TABS.map(item => item.title)
