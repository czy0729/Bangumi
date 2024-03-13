/*
 * @Author: czy0729
 * @Date: 2023-03-11 17:36:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 07:59:08
 */
export type Props = {
  shimmerColors?: string[]

  /** 渐变颜色风格 */
  type?: 'app' | 'tinygrail'

  /** 容器宽度 */
  width?: number

  /** 容器高度 */
  height?: number

  duration?: number
}
