/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:31:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 22:11:41
 */
import type { CollectionStatus, RatingStatus, SubjectActions } from '@types'

export type Props = {
  status: CollectionStatus | RatingStatus | ''
  action: SubjectActions
  onSelect: (status: RatingStatus) => any
}
