/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:51:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 条目组件标识与埋点
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '目录详情.跳转'
} as const
