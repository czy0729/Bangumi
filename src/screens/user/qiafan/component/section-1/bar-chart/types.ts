/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:16:36
 */
import type { Week } from '../../../github'

export type Props = {
  weeks: Week[]

  /** 图表区宽度 */
  width: number

  /** 图表区高度 */
  height: number

  /** 右侧竖排说明 */
  label?: string

  /** 横轴月份刻度带年份后两位 (Jul 26), 长跨度跨年图表开启 */
  withYearLabel?: boolean
}
