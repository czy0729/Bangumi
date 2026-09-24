/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import type { Week } from '../../../github'

import type { Props as BarChartProps } from '../bar-chart/types'

export type Props = {
  /** 卡片宽度 */
  width: number

  weeks: Week[]
}

export type MiniChartProps = Pick<BarChartProps, 'weeks' | 'width' | 'height'> & {
  start: number
  end: number
  onMove: (index: number) => void
}
