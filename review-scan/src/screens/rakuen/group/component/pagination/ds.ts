/*
 * @Author: czy0729
 * @Date: 2024-12-08 10:43:49
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-08 10:43:49
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Pagination')

export const HEAT_MAPS = {
  prev: '小组.上一页',
  next: '小组.下一页',
  search: '小组.页码跳转'
} as const
