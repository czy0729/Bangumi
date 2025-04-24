/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:15:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-24 19:55:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Log')

export const FILTER_MAP = {
  星之力: '星之力',
  鲤鱼: '鲤鱼之眼',
  成功: '精炼成功',
  失败: '精炼失败'
} as const
