/*
 * @Author: czy0729
 * @Date: 2022-06-12 15:07:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-12 15:12:18
 */
import { _ } from '@stores'

export const LIMIT_HEAVY = _.device(8, 16)

export const TITLE_HIT_SLOPS = {
  top: _.device(8, 4),
  right: _.device(8, 4),
  bottom: _.device(2, 4),
  left: _.device(8, 4)
}

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
