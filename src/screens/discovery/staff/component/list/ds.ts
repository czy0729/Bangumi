/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:04:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:05:29
 *
 * 列表组件标识与埋点
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '新番档期.跳转'
} as const
