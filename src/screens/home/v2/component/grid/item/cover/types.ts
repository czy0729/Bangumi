/*
 * @Author: czy0729
 * @Date: 2025-10-08 00:23:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:23:58
 */
import type { Subject, SubjectId } from '@types'

export type Props = {
  subjectId: SubjectId
  subject: Partial<Subject>
  epStatus: string | number
}
