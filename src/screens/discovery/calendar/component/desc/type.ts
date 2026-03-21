/*
 * @Author: czy0729
 * @Date: 2024-08-09 19:36:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:21:28
 */
import type { SubjectId, TextStyle } from '@types'

export type Props = {
  style?: TextStyle
  subjectId: SubjectId
  sites?: any
  size?: number

  /** 是否筛选中才显示 */
  filterToShow?: boolean
}
