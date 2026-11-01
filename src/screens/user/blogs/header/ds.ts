/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:19:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 页面头部标识与菜单项
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

/** 右上角菜单项 */
export const DATA = [TEXT_MENU_BROWSER] as const
