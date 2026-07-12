/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:36:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 19:47:53
 */
import type { Subject, SubjectId } from '@types'

export type Props = {
  subjectId?: SubjectId
  subject?: Partial<Subject>
  epStatus?: string | number
  tip?: string
  time?: string
}
