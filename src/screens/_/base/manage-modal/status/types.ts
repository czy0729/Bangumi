/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:31:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:40:05
 */
import type { CollectionStatus, RatingStatus, SubjectActions } from '@types'

export type Props = {
  status: CollectionStatus | RatingStatus | ''
  action: SubjectActions
  onSelect: (value?: CollectionStatus | RatingStatus) => any
}
