/*
 * @Author: czy0729
 * @Date: 2025-04-15 18:33:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-04-15 18:33:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, WEEK_DAY_MAP } from '../ds'

export const COMPONENT = rc(PARENT, 'OnairCustom')

/** 静态映射：周几中文 -> 数字 */
export const REVERSE_WEEK_DAY_MAP = Object.entries(WEEK_DAY_MAP).reduce((acc, [k, v]) => {
  acc[v] = Number(k)
  return acc
}, {} as Record<string, number>)
