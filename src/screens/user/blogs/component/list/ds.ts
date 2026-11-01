/*
 * @Author: czy0729
 * @Date: 2024-05-07 18:08:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 列表标识与埋点
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 条目跳转埋点 */
export const EVENT = {
  id: '用户日志.跳转'
} as const
