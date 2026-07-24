/*
 * @Author: czy0729
 * @Date: 2026-07-24 22:41:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 22:41:38
 */
import type { Fn } from '@types'
import type { Props as ParentProps } from '../types'

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
  onCancelLeft?: Fn
  onCancelRight?: Fn
  onFocus?: Fn
  onBlur?: Fn
  onChangeText?: (text: string) => void
}
