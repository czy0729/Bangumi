/*
 * @Author: czy0729
 * @Date: 2025-10-07 21:16:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:19:35
 */
import { Fn, Subject, SubjectId } from '@types'

export type Props = {
  subjectId: SubjectId
  subject: Partial<Subject>
  onPress?: Fn
}
