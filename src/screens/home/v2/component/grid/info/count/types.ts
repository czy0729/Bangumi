/*
 * @Author: czy0729
 * @Date: 2025-10-07 21:16:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:16:23
 */
import { Subject, SubjectId } from '@types'

export type Props = {
  subjectId: SubjectId
  subject: Partial<Subject>
  epStatus: string | number
  tip: string
}
