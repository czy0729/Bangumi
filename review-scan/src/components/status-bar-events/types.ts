/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:12:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:13:07
 */
import { StatusBarStyle } from 'react-native'
import { ColorValue } from '@types'

export type Props = {
  tinygrail?: boolean
  backgroundColor?: ColorValue
  barStyle?: StatusBarStyle
  translucent?: boolean
  animated?: boolean
  action?: 'onDidFocus' | 'onWillFocus' | 'onDidBlur' | 'onWillBlur'
}

export type PassProps = {
  onDidFocus: () => any
  onWillFocus?: () => any
}
