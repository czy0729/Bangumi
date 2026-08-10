/*
 * @Author: czy0729
 * @Date: 2026-08-11 00:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 00:50:00
 */
export type ShimmerProps = {
  /** 骨架屏宽度 */
  width: number

  /** 骨架屏高度 */
  height: number

  /** 渐变颜色数组 */
  colors: [string, string, string]

  /** 动画时长（毫秒） */
  duration: number
}
