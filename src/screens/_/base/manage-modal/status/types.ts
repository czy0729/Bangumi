/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:31:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 06:37:48
 */
import type { CollectionStatus, RatingStatus, SubjectActions } from '@types'

export type Props = {
  status: CollectionStatus | RatingStatus | ''
  action: SubjectActions
  onSelect: (value?: CollectionStatus | RatingStatus) => void
}
