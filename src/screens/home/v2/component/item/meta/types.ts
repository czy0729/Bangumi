/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:48:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-19 05:53:37
 */
import type { SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 条目类型 */
  typeCn: SubjectTypeCn

  /** 在看人数 */
  doing: number
}
