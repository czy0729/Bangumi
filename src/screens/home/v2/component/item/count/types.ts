/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:28:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-09 05:28:03
 */
import type { SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  epStatus: string | number
  isFirst: boolean
}
