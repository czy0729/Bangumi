/*
 * @Author: czy0729
 * @Date: 2022-07-14 17:13:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 17:22:15
 */
import { Subject, SubjectId } from '@types'

export type Props = {
  subjectId: SubjectId
  subject: Subject
  epStatus: number | string
  isTop: boolean
  isFirst: boolean
}
