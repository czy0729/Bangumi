/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:50:33
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-09 05:50:33
 */
import { SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  epStatus: string | number
  name: string
  name_cn: string
  isFirst: boolean
}
