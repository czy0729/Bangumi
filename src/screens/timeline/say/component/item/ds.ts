/*
 * @Author: czy0729
 * @Date: 2024-01-15 20:53:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 对话条目标识与埋点
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '吐槽.跳转'
} as const
