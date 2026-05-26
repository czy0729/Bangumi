/*
 * @Author: czy0729
 * @Date: 2026-05-26 19:18:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-26 19:21:48
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 标签文字 */
  label?: string

  /** 时长值，如 "24.5h" */
  value?: string

  /** 是否隐藏小数位 */
  hideDecimal?: boolean
}>
