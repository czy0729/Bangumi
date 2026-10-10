/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:55:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 列表组件标识与跳转埋点事件名
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '全站日志.跳转'
} as const
