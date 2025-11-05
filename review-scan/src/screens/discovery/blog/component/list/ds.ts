/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:55:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 03:52:41
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '全站日志.跳转'
} as const

export const HEATMAPS = {
  prev: '全站日志.上一页',
  next: '全站日志.下一页',
  search: '全站日志.页码跳转'
} as const
