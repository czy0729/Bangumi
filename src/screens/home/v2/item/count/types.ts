/*
 * @Author: czy0729
 * @Date: 2022-07-14 14:11:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 14:11:58
 */
import { Subject, SubjectId } from '@types'

export type Props = {
  subjectId: SubjectId
  subject: Subject
  epStatus: string | number
  isFirst: boolean
}
