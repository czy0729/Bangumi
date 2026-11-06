/*
 * @Author: czy0729
 * @Date: 2022-11-07 15:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 12:00:00
 *
 * 小圣杯工具栏: 排序选项与分组选项 Props
 */
import type { ReactNode } from 'react'
import type { WithViewStyles } from '@types'

/** 排序选项 */
export type Item = {
  /** 展示文案 */
  label: string

  /** 选项值 */
  value: string
}

export type Props = WithViewStyles<{
  /** 排序选项 */
  data?: readonly Item[]

  /** 当前排序值 */
  sort?: string

  /** 当前等级筛选, 空字符串为全部 */
  level?: string | number

  /** 各等级的数量 */
  levelMap?: Record<string, number>

  /** 排序方向 */
  direction?: '' | 'up' | 'down'

  /** 左侧自定义内容 */
  renderLeft?: ReactNode

  /** 切换排序 */
  onSortPress?: (value: string) => void

  /** 长按排序 */
  onSortLongPress?: () => void

  /** 选择等级筛选 */
  onLevelSelect?: (value: string) => void
}>
