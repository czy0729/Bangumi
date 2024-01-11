/*
 * @Author: czy0729
 * @Date: 2024-01-11 15:40:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:07:05
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Pagination')

export const HEAT_MAPS = {
  onPrev: '目录.上一页',
  onNext: '目录.下一页',
  search: '目录.页码跳转'
} as const
