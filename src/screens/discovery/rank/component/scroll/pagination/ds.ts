/*
 * @Author: czy0729
 * @Date: 2022-07-22 15:47:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:29:24
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Pagination')

export const HEATMAPS = {
  prev: '排行榜.上一页',
  next: '排行榜.下一页',
  search: '排行榜.页码跳转'
} as const
