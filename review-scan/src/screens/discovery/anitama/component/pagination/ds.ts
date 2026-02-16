/*
 * @Author: czy0729
 * @Date: 2024-04-07 09:17:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:19:56
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Pagination')

export const HEAT_MAPS = {
  prev: 'Anitama.上一页',
  next: 'Anitama.下一页',
  search: 'Anitama.页码跳转'
} as const
