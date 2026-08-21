/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 14:30:00
 */
import type { PropsWithChildren } from 'react'

/** 列表头测量组件属性 */
export type Props = PropsWithChildren<{
  /** 测量到头部实际高度后的回调 */
  onMeasure?: (height: number) => void
}>
