/*
 * @Author: czy0729
 * @Date: 2024-08-09 19:36:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import type { SubjectId, TextStyle } from '@types'
import type { Ctx } from '../../types'

type $ = Ctx['$']

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 样式 */
  style?: TextStyle

  /** 放送站点 */
  sites?: ReturnType<$['sites']>

  /** 字号 */
  size?: number

  /** 是否筛选中才显示 */
  filterToShow?: boolean
}
