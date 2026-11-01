/*
 * @Author: czy0729
 * @Date: 2024-05-07 21:35:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 15:16:22
 *
 * 列表组件标识与埋点事件
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 条目跳转埋点 */
export const EVENT = {
  id: '用户目录.跳转'
} as const
