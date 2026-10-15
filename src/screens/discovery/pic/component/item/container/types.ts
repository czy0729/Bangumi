/*
 * @Author: czy0729
 * @Date: 2026-05-08 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 条目容器类型
 */
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  /** 展示宽度 */
  width: number

  /** 展示高度 */
  height: number

  /** 距列顶部的 y 坐标 */
  y: number
}>
