/*
 * @Author: czy0729
 * @Date: 2022-07-17 03:51:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:10:07
 */
import { Override, Subject, SubjectId } from '@types'

export type Props = {
  subject?: Override<
    Subject,
    {
      time?: string
    }
  >
  subjectId?: SubjectId
  epStatus?: number
}
