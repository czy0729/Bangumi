/*
 * @Author: czy0729
 * @Date: 2026-05-08 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 条目组件类型
 */
import type { Id } from '@types'

export type Props = {
  /** 展示宽度 */
  width: number

  /** 展示高度 */
  height: number

  /** 距列顶部的 y 坐标 */
  y: number

  /** 图片 ID */
  id: Id

  /** 标签 (逗号分隔) */
  tags?: string
}
