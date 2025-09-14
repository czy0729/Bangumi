/*
 * @Author: czy0729
 * @Date: 2022-08-31 15:18:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 15:19:22
 */
import { Fn } from '@types'

export type Props = {
  isFocused?: boolean
  scrollTo?: Fn
  scrollToIndex?: Fn
  scrollToLocation?: Fn
  onPress?: Fn
}
