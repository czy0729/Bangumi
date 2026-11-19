/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 00:00:00
 */

/** Log 参数 */
export type Props = {
  /** 是否直接使用传入的 y 坐标 */
  hasY: boolean

  /** 预测的 y 轴坐标 */
  y?: number

  /** 实际测量到的 y 轴坐标 */
  currentY?: number

  /** 列表项索引 */
  index?: number
}
