/*
 * @Author: czy0729
 * @Date: 2022-06-14 21:12:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 21:13:25
 */
import { ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  id?: number
  bids?: number
  asks?: number
  change?: number
  current?: number
  fluctuation?: number
  total?: number
  marketValue?: number
  users?: number
  theme?: string
  _loaded: boolean | number
}
