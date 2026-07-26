/*
 * @Author: czy0729
 * @Date: 2023-03-11 17:36:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 07:59:08
 */
export type Props = {
  /** 自定义渐变颜色数组，覆盖默认主题色 */
  shimmerColors?: string[]

  /** 渐变颜色风格，默认 'app' */
  type?: 'app' | 'tinygrail'

  /** 骨架屏宽度 */
  width?: number

  /** 骨架屏高度 */
  height?: number

  /** 动画时长（毫秒），默认 1600 */
  duration?: number
}
