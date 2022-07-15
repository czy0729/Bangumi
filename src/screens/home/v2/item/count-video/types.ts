/*
 * @Author: czy0729
 * @Date: 2022-07-14 14:13:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 14:14:14
 */
import { Subject, SubjectId } from '@types'

export type Props = {
  subjectId: SubjectId
  subject: Subject
  epStatus: string | number
}
