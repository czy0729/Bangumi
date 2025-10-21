/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 16:51:43
 */
import type { ViewStyle, RatingStatus, CollectionStatus, SubjectActions } from '@types'

export type Props = {
  style?: ViewStyle

  /** 默认值, 实际使用 CollectionStatus */
  value?: CollectionStatus | RatingStatus | ''

  /** 动作替换词 */
  action?: SubjectActions

  /** 选择回调, 实际使用 CollectionStatus */
  onSelect?: (value?: CollectionStatus | RatingStatus) => any
}
