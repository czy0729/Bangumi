/*
 * @Author: czy0729
 * @Date: 2024-02-08 15:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 头部标识 + 埋点路径 + 菜单数据
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, TABS } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['versions', 'Versions'] as const

/** 菜单标题 */
export const MENUS = TABS.map(item => item.title)
