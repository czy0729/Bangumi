/*
 * @Author: czy0729
 * @Date: 2026-09-29 17:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:10:00
 */
import type { Ctx } from '../../types'

type $ = Ctx['$']

export type Props = Pick<$['state'], 'adapt' | 'tag' | 'origin'> & {
  /** 每日放送列表 */
  list: $['calendar']['list']
}
