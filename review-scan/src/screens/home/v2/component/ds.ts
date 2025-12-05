/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:29:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 06:54:27
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Component')

export const WEEK_DAY_MAP = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日'
} as const
