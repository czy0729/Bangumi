/*
 * @Author: czy0729
 * @Date: 2022-08-27 15:59:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 06:44:07
 */
import type { SubjectId } from '@types'
import type { UpdateCollectionPrivacy, UpdateCollectionStatus } from '../collection/types'

export type SubmitManageModalValues = {
  subjectId: SubjectId
  status?: UpdateCollectionStatus
  tags?: string
  comment?: string
  rating?: string | number
  privacy?: UpdateCollectionPrivacy
}
