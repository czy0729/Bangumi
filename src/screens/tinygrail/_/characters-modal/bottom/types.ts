/*
 * @Author: czy0729
 * @Date: 2026-07-24 22:41:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:12:04
 */
import type { Props as ParentProps } from '../types'
import type { Props as SearchInputProps } from '../search-input/types'

export type Props = Pick<ParentProps, 'onSubmit'> & {
  leftSelected?: ParentProps['leftItem']
  rightSelected?: ParentProps['rightItem']
  amount?: number
  loading?: boolean
  canSubmit?: boolean
  isChaos?: boolean
  isFishEye?: boolean
  isGuidePost?: boolean
  isStarBreak?: boolean
  isStarDust?: boolean
  isTemple?: boolean
  hasRight?: boolean
  onCancelLeft?: () => void
  onCancelRight?: () => void
  onFocus?: SearchInputProps['onFocus']
  onBlur?: SearchInputProps['onBlur']
  onChangeText?: (text: string) => void
}
