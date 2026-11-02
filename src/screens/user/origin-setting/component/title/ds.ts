/*
 * @Author: czy0729
 * @Date: 2024-01-12 15:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 04:12:23
 *
 * 组件标识与测试菜单空态
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Title')

/** 没有启用中的源头时的占位项 */
export const EMPTY_MENU = [{ text: '空' }] as const
