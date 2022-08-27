/*
 * @Author: czy0729
 * @Date: 2022-08-27 15:59:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 16:01:50
 */
import { RatingStatus, SubjectId } from '@types'

export type SubmitManageModalValues = {
  subjectId: SubjectId
  status?: RatingStatus | ''
  tags?: string
  comment?: string
  rating?: string | number
  privacy?: 0 | 1 | '0' | '1'
}
