/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:07:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:17:59
 */
import type { SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 日文名 */
  name: string

  /** 中文名 */
  name_cn: string

  /** 是否列表第一项 */
  isFirst: boolean
}
