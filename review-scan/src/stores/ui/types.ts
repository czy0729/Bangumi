/*
 * @Author: czy0729
 * @Date: 2022-08-27 15:59:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 16:34:23
 */
import {
  // RatingStatus,
  SubjectId
} from '@types'

export type SubmitManageModalValues = {
  subjectId: SubjectId
  status?: any // RatingStatus | ''
  tags?: string
  comment?: string
  rating?: string | number
  privacy?: any // 0 | 1 | '0' | '1'
}
