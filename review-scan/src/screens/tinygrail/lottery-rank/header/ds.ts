/*
 * @Author: czy0729
 * @Date: 2025-07-17 14:00:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 06:17:30
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/lottery-rank', 'TinygrailLotteryRank'] as const
