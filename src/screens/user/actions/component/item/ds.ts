/*
 * @Author: czy0729
 * @Date: 2024-05-06 13:38:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 单条标识
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

/** 生效条目的操作菜单 */
export const MENU_ACTIVE = ['编辑', '停用', '删除', '测试'] as const

/** 停用条目的操作菜单 */
export const MENU_INACTIVE = ['编辑', '启用', '删除', '测试'] as const
