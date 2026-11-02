/*
 * @Author: czy0729
 * @Date: 2024-01-12 15:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 组件标识与操作菜单
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

/** 操作菜单: 预设项编辑只允许改排序 */
export const MENUS = {
  base: {
    active: ['停用', '编辑排序', '预览'],
    inactive: ['启用', '编辑排序', '预览']
  },
  custom: {
    active: ['停用', '编辑', '删除', '预览'],
    inactive: ['启用', '编辑', '删除', '预览']
  }
} as const
