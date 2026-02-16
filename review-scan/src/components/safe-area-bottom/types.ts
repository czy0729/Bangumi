/*
 * @Author: czy0729
 * @Date: 2023-08-07 15:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 15:53:51
 */
import { ViewProps } from 'react-native'
import { ReactNode, ViewStyle } from '@types'

export type Props = ViewProps & {
  style?: ViewStyle

  /** 复写的对应样式 */
  type?: 'bottom' | 'paddingBottom' | 'height'

  children?: ReactNode
}
