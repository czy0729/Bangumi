/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 12:47:41
 */
import { ViewStyle, RatingStatus } from '@types'

export type Props = {
  style?: ViewStyle

  /** 默认值 */
  value?: RatingStatus | ''

  /** 动作替换词 */
  action?: '看' | '读' | '玩' | '听'

  /** 选择回调 */
  onSelect?: (value?: RatingStatus) => any
}
