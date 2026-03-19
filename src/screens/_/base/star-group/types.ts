/*
 * @Author: czy0729
 * @Date: 2022-06-13 12:47:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:26:38
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 分数默认值 */
  value: number

  /** 分数选择回调 */
  onChange: (value?: number) => any
}>
