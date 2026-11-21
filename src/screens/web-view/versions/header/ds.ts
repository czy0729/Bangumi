/*
 * @Author: czy0729
 * @Date: 2024-02-08 15:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 00:26:54
 *
 * 头部标识 + 埋点路径 + 菜单数据
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, TABS } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['versions', 'Versions'] as const

/** 菜单标题 */
export const MENUS = TABS.map(item => item.title)

/** 当前展示文档对应的菜单标题 (用于菜单勾选) */
export function getMenuTitle(uri: string) {
  return TABS.find(item => item.key === uri)?.title
}
