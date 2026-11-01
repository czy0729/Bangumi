/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:19:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:22:00
 *
 * 头部组件标识与右上角菜单项
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

/** 管理目录菜单项 */
export const TEXT_MENU_MANAGE = '管理目录'

/** 右上角菜单项 (自己的目录页, 含管理入口) */
export const DATA = [TEXT_MENU_MANAGE, TEXT_MENU_BROWSER] as const

/** 右上角菜单项 (他人的目录页, 弹窗只能管理自己的目录) */
export const DATA_OTHER = [TEXT_MENU_BROWSER] as const
