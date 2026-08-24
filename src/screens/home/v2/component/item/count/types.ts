/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:28:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-09 05:28:03
 */
import type { SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 条目类型 */
  typeCn: SubjectTypeCn

  /** 已看集数 */
  epStatus: string | number

  /** 是否列表第一项 */
  isFirst: boolean
}
