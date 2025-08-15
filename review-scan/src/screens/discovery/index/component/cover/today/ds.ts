/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 18:11:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Today')

export const WEEKDAY_CN = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日'
} as const
