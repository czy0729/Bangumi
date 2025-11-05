/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:36:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:36:23
 */
import { Subject, SubjectId } from '@types'

export type Props = {
  subjectId?: SubjectId
  subject?: Subject
  epStatus?: string | number
  tip?: string
  time?: string
}
