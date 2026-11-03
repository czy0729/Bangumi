/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 *
 * 提交趋势卡片与缩略图 Props
 */
import type { Week } from '../../../github'

import type { Props as BarChartProps } from '../bar-chart/types'

export type Props = {
  /** 卡片宽度 */
  width: number

  /** 全部周的提交数 */
  weeks: Week[]
}

export type MiniChartProps = Pick<BarChartProps, 'weeks' | 'width' | 'height'> & {
  /** 区间起始周下标 */
  start: number

  /** 区间结束周下标 */
  end: number

  /** 松手后平移到大图指定的起始周 */
  onMove: (index: number) => void
}
